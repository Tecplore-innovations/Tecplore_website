<?php
// Live site content: photos and station details set from the /site-admin page.
//
// GET                  returns the saved content, for every visitor.
// GET ?status=1        says whether the server is set up.
// POST (needs the key) action=upload, action=remove or action=save.
//
// The access key is checked against admin-key.php, which is created on the
// server and never kept in the project. Without that file, nothing can be changed.

declare(strict_types=1);

error_reporting(0);
ini_set('display_errors', '0');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex');

const MAX_BYTES = 8 * 1024 * 1024;
const TYPES = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
    'image/avif' => 'avif',
];

$dataFile = __DIR__ . '/data/content.json';
$uploadDir = __DIR__ . '/uploads';
$keyFile = __DIR__ . '/admin-key.php';

function respond(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_SLASHES);
    exit;
}

function load_content(string $file): array
{
    $data = is_file($file) ? json_decode((string) file_get_contents($file), true) : null;
    if (!is_array($data)) {
        $data = [];
    }
    return [
        'photos' => is_array($data['photos'] ?? null) ? $data['photos'] : [],
        'stations' => is_array($data['stations'] ?? null) ? $data['stations'] : [],
        'customStations' => is_array($data['customStations'] ?? null) ? $data['customStations'] : [],
    ];
}

function save_content(string $file, array $content): void
{
    // Empty lists must stay objects, so the site reads them correctly.
    $out = [
        'photos' => (object) $content['photos'],
        'stations' => (object) $content['stations'],
        'customStations' => array_values($content['customStations']),
    ];
    $json = json_encode($out, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    if ($json === false || file_put_contents($file, $json, LOCK_EX) === false) {
        respond(500, ['error' => 'Could not save.']);
    }
}

function clean_text($value, int $max): string
{
    return mb_substr(trim(strip_tags((string) $value)), 0, $max);
}

function valid_slot($slot): bool
{
    return is_string($slot) && preg_match('/^[a-z]{2,20}\.[a-z0-9]{1,20}$/', $slot) === 1;
}

function clean_tags($tags): array
{
    return is_array($tags) ? array_values(array_intersect(['ngos', 'schools', 'parks'], $tags)) : [];
}

function delete_upload(string $uploadDir, array $photo): void
{
    $name = basename((string) ($photo['src'] ?? ''));
    if (preg_match('/^[a-f0-9]{32}\.(jpg|png|webp|avif)$/', $name) === 1 && is_file("$uploadDir/$name")) {
        unlink("$uploadDir/$name");
    }
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    if (isset($_GET['status'])) {
        respond(200, [
            'keyInstalled' => is_file($keyFile),
            'canSave' => is_writable(__DIR__ . '/data'),
            'canUpload' => is_writable($uploadDir),
        ]);
    }
    respond(200, load_content($dataFile));
}

if ($method !== 'POST') {
    respond(405, ['error' => 'Not allowed.']);
}

// Everything below changes the site, so it needs the access key.
$settings = is_file($keyFile) ? include $keyFile : null;
$expected = is_array($settings) ? (string) ($settings['key_sha256'] ?? '') : '';
$given = (string) ($_SERVER['HTTP_X_ADMIN_KEY'] ?? '');
if (strlen($expected) !== 64 || $given === '' || !hash_equals($expected, hash('sha256', $given))) {
    respond(401, ['error' => 'Wrong access key.']);
}

$content = load_content($dataFile);
$action = (string) ($_POST['action'] ?? $_GET['action'] ?? '');

if ($action === 'check') {
    respond(200, ['ok' => true]);
}

if ($action === 'upload') {
    $slot = $_POST['slot'] ?? '';
    $file = $_FILES['file'] ?? null;
    if (!valid_slot($slot) || !is_array($file) || ($file['error'] ?? 1) !== UPLOAD_ERR_OK) {
        respond(400, ['error' => 'The upload failed.']);
    }
    if (!is_uploaded_file($file['tmp_name']) || $file['size'] > MAX_BYTES) {
        respond(400, ['error' => 'Photos must be 8 MB or smaller.']);
    }
    // The file type is read from the file itself, never from its name.
    $type = (string) (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
    if (!isset(TYPES[$type])) {
        respond(400, ['error' => 'Use a JPG, PNG, WebP or AVIF photo.']);
    }
    $name = bin2hex(random_bytes(16)) . '.' . TYPES[$type];
    if (!move_uploaded_file($file['tmp_name'], "$uploadDir/$name")) {
        respond(500, ['error' => 'Could not store the photo.']);
    }
    if (isset($content['photos'][$slot])) {
        delete_upload($uploadDir, $content['photos'][$slot]);
    }
    $content['photos'][$slot] = [
        'src' => "/site-api/uploads/$name",
        'caption' => clean_text($_POST['caption'] ?? '', 120),
    ];
    save_content($dataFile, $content);
    respond(200, $content);
}

if ($action === 'remove') {
    $slot = $_POST['slot'] ?? '';
    if (!valid_slot($slot)) {
        respond(400, ['error' => 'Unknown photo.']);
    }
    if (isset($content['photos'][$slot])) {
        delete_upload($uploadDir, $content['photos'][$slot]);
        unset($content['photos'][$slot]);
    }
    save_content($dataFile, $content);
    respond(200, $content);
}

if ($action === 'save') {
    $input = json_decode((string) ($_POST['data'] ?? ''), true);
    if (!is_array($input)) {
        respond(400, ['error' => 'Nothing to save.']);
    }
    foreach (($input['captions'] ?? []) as $slot => $caption) {
        if (valid_slot($slot) && isset($content['photos'][$slot])) {
            $content['photos'][$slot]['caption'] = clean_text($caption, 120);
        }
    }
    $stations = [];
    foreach (($input['stations'] ?? []) as $id => $station) {
        if (!is_array($station) || preg_match('/^\d{1,6}$/', (string) $id) !== 1) {
            continue;
        }
        $space = clean_text($station['space'] ?? '', 60);
        $youtube = trim((string) ($station['youtube'] ?? ''));
        if ($youtube !== '' && preg_match('#^https://(www\.)?(youtube\.com|youtu\.be)/[^\s"<>]+$#', $youtube) !== 1) {
            respond(400, ['error' => 'Use a full YouTube link starting with https://.']);
        }
        $entry = [
            'space' => $space,
            'youtube' => $youtube,
            'title' => clean_text($station['title'] ?? '', 80),
            'short' => clean_text($station['short'] ?? '', 160),
            'long' => clean_text($station['long'] ?? '', 800),
            'notice' => clean_text($station['notice'] ?? '', 200),
            'why' => clean_text($station['why'] ?? '', 200),
        ];
        if (isset($station['tags'])) {
            $entry['tags'] = clean_tags($station['tags']);
        }
        $stations[(string) $id] = $entry;
    }
    $content['stations'] = $stations;

    $added = [];
    foreach (array_slice(is_array($input['customStations'] ?? null) ? $input['customStations'] : [], 0, 100) as $station) {
        $title = is_array($station) ? clean_text($station['title'] ?? '', 80) : '';
        $id = is_array($station) ? (string) ($station['id'] ?? '') : '';
        if ($title === '' || preg_match('/^\d{1,6}$/', $id) !== 1) {
            continue;
        }
        $added[] = [
            'id' => (int) $id,
            'title' => $title,
            'short' => clean_text($station['short'] ?? '', 160),
            'long' => clean_text($station['long'] ?? '', 800),
            'notice' => clean_text($station['notice'] ?? '', 200),
            'why' => clean_text($station['why'] ?? '', 200),
            'tags' => clean_tags($station['tags'] ?? []),
        ];
    }
    $content['customStations'] = $added;
    save_content($dataFile, $content);
    respond(200, $content);
}

respond(400, ['error' => 'Unknown action.']);
