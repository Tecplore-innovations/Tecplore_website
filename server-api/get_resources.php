<?php
// Suppress all PHP notices/warnings from polluting JSON output
error_reporting(0);
ini_set('display_errors', 0);
ob_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    ob_end_clean();
    http_response_code(200);
    exit();
}

// ── Database config ────────────────────────────────────────────────────────
$host     = "localhost";
$dbname   = "YOUR_DATABASE_NAME";   // e.g. u123456789_tecplore
$username = "YOUR_DATABASE_USER";   // e.g. u123456789_admin
$password = "YOUR_DATABASE_PASSWORD";
// ──────────────────────────────────────────────────────────────────────────

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("
        SELECT
            id,
            title,
            type,
            subject,
            level,
            thumbnail,
            contentUrl,
            language,
            content_origin AS content,
            createdAt
        FROM resources
        ORDER BY createdAt DESC
    ");

    $resources = $stmt->fetchAll(PDO::FETCH_ASSOC);

    ob_end_clean();
    echo json_encode($resources, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

} catch (PDOException $e) {
    ob_end_clean();
    http_response_code(500);
    echo json_encode(["error" => "Database error"]);
}
?>
