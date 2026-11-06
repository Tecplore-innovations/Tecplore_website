"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CONFIRM_ITEMS, SHOW_CONFIRM_HIGHLIGHTS } from "@/lib/confirm";
import {
  EMPTY_CONTENT,
  normaliseContent,
  PHOTO_GROUPS,
  SITE_API,
  STATION_TAGS,
  type CustomStation,
  type SiteContent,
  type StationTag,
} from "@/lib/siteContent";
import { builtInStations, stationTags } from "@/lib/stations";

const stations = [...builtInStations].sort((a, b) => a.title.localeCompare(b.title));

/** Everything still highlighted on the site, with a link to go and see it. */
function ConfirmList({ content }: { content: SiteContent }) {
  const emptySlots = PHOTO_GROUPS.filter((group) => group.id !== "rnd").flatMap((group) =>
    group.slots
      .filter((slot) => !content.photos[`${group.id}.${slot.id}`])
      .map((slot) => `${group.title}: ${slot.label}`)
  );

  return (
    <section className="mt-12">
      <h2 className="mb-2 text-xl font-semibold text-foreground">Highlighted on the site</h2>
      <p className="mb-4 text-sm text-body">
        Yellow highlights are {SHOW_CONFIRM_HIGHLIGHTS ? "on" : "off"}. The master switch and this list
        are in src/lib/confirm.ts. Delete an item there to clear it.
      </p>
      <ul className="space-y-3">
        {Object.entries(CONFIRM_ITEMS).map(([id, item]) => (
          <li key={id} className="surface-card p-4 text-sm">
            <p className="mb-1">
              <mark className="needs-confirm">{item.text}</mark>
            </p>
            <p className="text-body">{item.note}</p>
            <a href={item.page} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
              Open {item.page}
            </a>
          </li>
        ))}
      </ul>
      <h3 className="mb-2 mt-6 font-semibold text-foreground">Photo placeholders still empty</h3>
      <ul className="list-disc space-y-1 pl-5 text-sm text-body">
        {emptySlots.map((slot) => (
          <li key={slot}>{slot}</li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-body">
        Space required and YouTube links show as placeholders on each station that doesn&apos;t have them
        yet, in its pop-up on{" "}
        <a href="/learning-stations" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
          Learning Stations
        </a>
        .
      </p>
    </section>
  );
}

const EMPTY_STATION = { title: "", short: "", long: "", notice: "", why: "" };

type EditField = "space" | "youtube" | "title" | "short" | "long" | "notice" | "why";

const TEXT_FIELDS = [
  ["title", "Name"],
  ["short", "Short description, for the card"],
  ["long", "Full description"],
  ["notice", "Notice"],
  ["why", "Why"],
] as const;

export default function SiteAdminPage() {
  // The key stays in this page only, and is gone on refresh.
  const [key, setKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [content, setContent] = useState<SiteContent>(EMPTY_CONTENT);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState(EMPTY_STATION);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    setIsLocal(window.location.hostname === "localhost");
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    fetch(SITE_API, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setContent(normaliseContent(data)))
      .catch(() => setMessage("Could not load the saved content."));
  }, [unlocked]);

  async function send(body: FormData) {
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch(SITE_API, { method: "POST", headers: { "X-Admin-Key": key }, body });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        // PHP does not run under npm run dev, so the page gets HTML back here.
        throw new Error(
          "The server part isn't running here. This page only works on the uploaded site, not with npm run dev."
        );
      }
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      return data;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function unlock() {
    const body = new FormData();
    body.set("action", "check");
    if (await send(body)) setUnlocked(true);
  }

  async function changePhoto(action: "upload" | "remove", slot: string, file?: File) {
    const body = new FormData();
    body.set("action", action);
    body.set("slot", slot);
    if (file) body.set("file", file);
    const data = await send(body);
    if (data) {
      setContent(normaliseContent(data));
      setMessage(action === "upload" ? "Photo added to the site." : "Photo removed.");
    }
  }

  async function saveDetails(current: SiteContent = content) {
    const captions = Object.fromEntries(
      Object.entries(current.photos).map(([slot, photo]) => [slot, photo.caption ?? ""])
    );
    // Every built-in station is sent with its tags, so unticking one is kept.
    const stationData = Object.fromEntries(
      [...stations, ...current.customStations].map((station) => [
        station.id,
        { ...current.stations[station.id], tags: stationTags(station.id, current) },
      ])
    );
    const body = new FormData();
    body.set("action", "save");
    body.set(
      "data",
      JSON.stringify({ captions, stations: stationData, customStations: current.customStations })
    );
    const data = await send(body);
    if (data) {
      setContent(normaliseContent(data));
      setMessage("Saved. The site now shows these details.");
    }
    return Boolean(data);
  }

  async function addStation() {
    const id = Math.max(1000, ...content.customStations.map((station) => station.id)) + 1;
    const station: CustomStation = { ...draft, id, tags: [] };
    const saved = await saveDetails({ ...content, customStations: [...content.customStations, station] });
    if (saved) setDraft(EMPTY_STATION);
  }

  async function removeStation(id: number) {
    if (content.photos[`station.${id}`]) await changePhoto("remove", `station.${id}`);
    await saveDetails({
      ...content,
      customStations: content.customStations.filter((station) => station.id !== id),
    });
  }

  function toggleTag(id: number, tag: StationTag) {
    const current = stationTags(id, content);
    const tags = current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag];
    setContent((previous) =>
      previous.customStations.some((station) => station.id === id)
        ? {
            ...previous,
            customStations: previous.customStations.map((station) =>
              station.id === id ? { ...station, tags } : station
            ),
          }
        : { ...previous, stations: { ...previous.stations, [id]: { ...previous.stations[id], tags } } }
    );
  }

  const tagBoxes = (id: number, title: string) => (
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {STATION_TAGS.map((tag) => (
        <label key={tag.id} className="flex items-center gap-1.5 text-sm text-body">
          <input
            type="checkbox"
            aria-label={`Show ${title} on ${tag.label}`}
            checked={stationTags(id, content).includes(tag.id)}
            onChange={() => toggleTag(id, tag.id)}
          />
          {tag.label}
        </label>
      ))}
    </div>
  );

  const setStation = (id: number, field: EditField, value: string) =>
    setContent((current) => ({
      ...current,
      stations: { ...current.stations, [id]: { ...current.stations[id], [field]: value } },
    }));

  const setCaption = (slot: string, caption: string) =>
    setContent((current) => ({
      ...current,
      photos: { ...current.photos, [slot]: { ...current.photos[slot], caption } },
    }));

  if (!unlocked) {
    return (
      <main className={`mx-auto min-h-[60vh] px-6 py-20 ${isLocal ? "max-w-3xl" : "max-w-md"}`}>
        <h1 className="heading-section mb-6">Site Admin</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            unlock();
          }}
        >
          <label htmlFor="key" className="field-label">
            Access key
          </label>
          <input
            id="key"
            type="password"
            autoComplete="off"
            value={key}
            onChange={(event) => setKey(event.target.value)}
            className="field-select mb-4 w-full"
          />
          <Button type="submit" disabled={busy || !key}>
            Open
          </Button>
        </form>
        {message && <p className="mt-4 text-sm text-destructive">{message}</p>}
        {/* Saving needs the server, but this list can be used with npm run dev. */}
        {isLocal && <ConfirmList content={content} />}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="heading-section mb-2">Site Admin</h1>
      <p className="mb-8 text-body">Changes here appear on the site straight away, with no rebuild.</p>
      {message && (
        <p role="status" className="surface-card mb-6 p-4 font-semibold text-foreground">
          {message}
        </p>
      )}

      {PHOTO_GROUPS.map((group) => (
        <section key={group.id} className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-foreground">{group.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.slots.map((slot) => {
              const id = `${group.id}.${slot.id}`;
              const photo = content.photos[id];
              return (
                <div key={id} className="surface-card p-4">
                  <p className="mb-2 font-semibold text-foreground">{slot.label}</p>
                  {photo ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo.src} alt="" className="mb-3 aspect-[4/3] w-full rounded-card object-cover" />
                      <input
                        aria-label={`Caption for ${slot.label}`}
                        placeholder="Caption"
                        value={photo.caption ?? ""}
                        onChange={(event) => setCaption(id, event.target.value)}
                        className="field-select mb-3 w-full"
                      />
                      <Button variant="secondary" size="sm" disabled={busy} onClick={() => changePhoto("remove", id)}>
                        Remove
                      </Button>
                    </>
                  ) : (
                    <input
                      aria-label={`Upload a photo for ${slot.label}`}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      disabled={busy}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) changePhoto("upload", id, file);
                      }}
                      className="w-full text-sm text-body"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">Learning stations</h2>
        <div className="space-y-3">
          {stations.map((station) => (
            <div key={station.id} className="surface-card grid gap-3 p-4 md:grid-cols-[1fr_1fr_2fr] md:items-center">
              <div className="md:col-span-3">
                <p className="mb-1 font-semibold text-foreground">{station.title}</p>
                {tagBoxes(station.id, station.title)}
              </div>
              <span className="hidden md:block" />
              <input
                aria-label={`Space required for ${station.title}`}
                placeholder="Space required, e.g. 3 m x 2 m"
                value={content.stations[station.id]?.space ?? ""}
                onChange={(event) => setStation(station.id, "space", event.target.value)}
                className="field-select w-full"
              />
              <input
                aria-label={`YouTube link for ${station.title}`}
                placeholder="https://www.youtube.com/watch?v=..."
                value={content.stations[station.id]?.youtube ?? ""}
                onChange={(event) => setStation(station.id, "youtube", event.target.value)}
                className="field-select w-full"
              />
              <details className="md:col-span-3">
                <summary className="cursor-pointer text-sm font-semibold text-primary">
                  Change text or main photo
                </summary>
                <div className="mt-3 space-y-3">
                  <p className="text-sm text-body">Leave a box empty to keep the original wording.</p>
                  {TEXT_FIELDS.map(([field, label]) => (
                    <input
                      key={field}
                      aria-label={`${label} for ${station.title}`}
                      placeholder={station[field]}
                      value={content.stations[station.id]?.[field] ?? ""}
                      onChange={(event) => setStation(station.id, field, event.target.value)}
                      className="field-select w-full"
                    />
                  ))}
                  <input
                    aria-label={`Replace the main photo for ${station.title}`}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    disabled={busy}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) changePhoto("upload", `station.${station.id}`, file);
                    }}
                    className="w-full text-sm text-body"
                  />
                  {content.photos[`station.${station.id}`] && (
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={busy}
                      onClick={() => changePhoto("remove", `station.${station.id}`)}
                    >
                      Go back to the original photo
                    </Button>
                  )}
                </div>
              </details>
            </div>
          ))}
          {content.customStations.map((station) => {
            const photo = content.photos[`station.${station.id}`];
            return (
              <div key={station.id} className="surface-card space-y-3 p-4">
                <p className="font-semibold text-foreground">{station.title} (added here)</p>
                {tagBoxes(station.id, station.title)}
                {TEXT_FIELDS.map(([field, label]) => (
                  <input
                    key={field}
                    aria-label={`${label} for ${station.title}`}
                    placeholder={label}
                    value={station[field]}
                    onChange={(event) =>
                      setContent((current) => ({
                        ...current,
                        customStations: current.customStations.map((item) =>
                          item.id === station.id ? { ...item, [field]: event.target.value } : item
                        ),
                      }))
                    }
                    className="field-select w-full"
                  />
                ))}
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    aria-label={`Space required for ${station.title}`}
                    placeholder="Space required, e.g. 3 m x 2 m"
                    value={content.stations[station.id]?.space ?? ""}
                    onChange={(event) => setStation(station.id, "space", event.target.value)}
                    className="field-select w-full"
                  />
                  <input
                    aria-label={`YouTube link for ${station.title}`}
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={content.stations[station.id]?.youtube ?? ""}
                    onChange={(event) => setStation(station.id, "youtube", event.target.value)}
                    className="field-select w-full"
                  />
                </div>
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo.src} alt="" className="h-24 rounded-card object-cover" />
                ) : (
                  <input
                    aria-label={`Upload a photo for ${station.title}`}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    disabled={busy}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) changePhoto("upload", `station.${station.id}`, file);
                    }}
                    className="w-full text-sm text-body"
                  />
                )}
                <Button variant="secondary" size="sm" disabled={busy} onClick={() => removeStation(station.id)}>
                  Delete this station
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">Add a learning station</h2>
        <div className="surface-card space-y-3 p-4">
          {TEXT_FIELDS.map(([field, label]) => (
            <input
              key={field}
              aria-label={label}
              placeholder={label}
              value={draft[field]}
              onChange={(event) => setDraft({ ...draft, [field]: event.target.value })}
              className="field-select w-full"
            />
          ))}
          <Button disabled={busy || !draft.title.trim()} onClick={addStation}>
            Add station
          </Button>
          <p className="text-sm text-body">Then tick its pages and add its photo in the list above.</p>
        </div>
      </section>

      <Button disabled={busy} onClick={() => saveDetails()}>
        Save everything
      </Button>

      <ConfirmList content={content} />
    </main>
  );
}
