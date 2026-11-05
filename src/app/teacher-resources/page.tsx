"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Play, FileText, Star, AlertCircle } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";

interface Resource {
  id: number;
  title: string;
  type: "video" | "document";
  subject: string;
  level: string;
  thumbnail: string;
  contentUrl: string;
  createdAt: string;
  language: string;
  content: "Tecplore" | "Community";
}

const getYouTubeId = (url: string): string => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1).split("?")[0];
    return u.searchParams.get("v") ?? "";
  } catch {
    return "";
  }
};

type FetchState = "loading" | "error" | "done";

const TeacherResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>("loading");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  // Filters
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState<"All" | "video" | "document">("All");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [originFilter, setOriginFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const ASSET_BASE_URL = process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? "";

  const getAssetUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${ASSET_BASE_URL}${url}`;
  };

  // Unique options derived from full dataset
  const subjects  = Array.from(new Set(resources.map((r) => r.subject))).filter(Boolean).sort();
  const levels    = Array.from(new Set(resources.map((r) => r.level))).filter(Boolean).sort();
  const languages = Array.from(new Set(resources.map((r) => r.language))).filter(Boolean).sort();
  const origins   = Array.from(new Set(resources.map((r) => r.content))).filter(Boolean).sort();

  // Filter + sort pipeline
  const filteredResources = resources
    .filter((r) => subjectFilter  === "All" || r.subject  === subjectFilter)
    .filter((r) => levelFilter    === "All" || r.level    === levelFilter)
    .filter((r) => typeFilter     === "All" || r.type     === typeFilter)
    .filter((r) => languageFilter === "All" || r.language === languageFilter)
    .filter((r) => originFilter   === "All" || r.content  === originFilter)
    .sort((a, b) => {
      const diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return sortOrder === "newest" ? diff : -diff;
    });

  const activeFilterCount = [subjectFilter, levelFilter, typeFilter, languageFilter, originFilter].filter(
    (f) => f !== "All"
  ).length;

  const clearAllFilters = () => {
    setSubjectFilter("All");
    setLevelFilter("All");
    setTypeFilter("All");
    setLanguageFilter("All");
    setOriginFilter("All");
    setSortOrder("newest");
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get_resources.php`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setResources(data);
          setFetchState("done");
        } else {
          console.error("Unexpected response:", data);
          setFetchState("error");
        }
      } catch (err) {
        console.error("Failed to load resources:", err);
        setFetchState("error");
      }
    };
    fetchResources();
  }, []);

  // ─── Select class helper ────────────────────────────────────────────────────
  const selectCls = (active: boolean) =>
    `rounded-full px-2.5 py-1.5 text-xs border cursor-pointer transition-all outline-none ${
      active
        ? "bg-background border-primary text-foreground font-semibold"
        : "bg-background border-input text-body hover:border-primary/40"
    }`;

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <PageHero
        title="Teacher Resources Portal"
        subtitle="Access curated training materials and teaching resources"
      />

      {/* ── Stats Bar ── */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap justify-center gap-6 text-xs">
            <div className="flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-semibold text-foreground">{resources.filter((r) => r.type === "video").length}</span>
              <span className="text-muted-foreground">Videos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-semibold text-foreground">{resources.filter((r) => r.type === "document").length}</span>
              <span className="text-muted-foreground">Documents</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-semibold text-foreground">{subjects.length}</span>
              <span className="text-muted-foreground">Subjects</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* ── Filter strip (always visible) ── */}
        <div className="surface-card p-3 mb-3">
          <div className="flex flex-wrap gap-2 items-center">
            <select value={subjectFilter}  onChange={(e) => setSubjectFilter(e.target.value)}  className={selectCls(subjectFilter  !== "All")}>
              <option value="All">All Subjects</option>
              {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={levelFilter}    onChange={(e) => setLevelFilter(e.target.value)}    className={selectCls(levelFilter    !== "All")}>
              <option value="All">All Levels</option>
              {levels.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <select value={typeFilter}     onChange={(e) => setTypeFilter(e.target.value as "All" | "video" | "document")} className={selectCls(typeFilter !== "All")}>
              <option value="All">All Types</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
            </select>
            <select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)} className={selectCls(languageFilter !== "All")}>
              <option value="All">All Languages</option>
              {languages.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <select value={originFilter}   onChange={(e) => setOriginFilter(e.target.value)}   className={selectCls(originFilter   !== "All")}>
              <option value="All">All Origins</option>
              {origins.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")} className={selectCls(false)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            {activeFilterCount > 0 && (
              <button onClick={clearAllFilters} className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors px-1">
                Clear all
              </button>
            )}
          </div>
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-border">
              {subjectFilter  !== "All" && <Chip label={subjectFilter}  onRemove={() => setSubjectFilter("All")} />}
              {levelFilter    !== "All" && <Chip label={levelFilter}    onRemove={() => setLevelFilter("All")} />}
              {typeFilter     !== "All" && <Chip label={typeFilter}     onRemove={() => setTypeFilter("All")} />}
              {languageFilter !== "All" && <Chip label={languageFilter} onRemove={() => setLanguageFilter("All")} />}
              {originFilter   !== "All" && <Chip label={originFilter}   onRemove={() => setOriginFilter("All")} />}
            </div>
          )}
        </div>

        {/* Result count */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-semibold text-body">
            {fetchState === "done" ? `${filteredResources.length} Resources` : ""}
          </span>
        </div>

        {/* ── Content ── */}
        {fetchState === "loading" && (
          <div className="flex flex-col items-center justify-center py-20 surface-card">
            <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-sm text-muted-foreground">Loading resources...</p>
          </div>
        )}

        {fetchState === "error" && (
          <div className="flex flex-col items-center justify-center py-20 surface-card">
            <AlertCircle className="w-10 h-10 text-muted-foreground/50 mb-3" />
            <h3 className="text-base font-semibold text-foreground mb-1">Could not load resources</h3>
            <p className="text-sm text-muted-foreground mb-4">Check your connection and try again.</p>
            <Button size="sm" onClick={() => { setFetchState("loading"); window.location.reload(); }}>
              Retry
            </Button>
          </div>
        )}

        {fetchState === "done" && filteredResources.length === 0 && (
          <div className="text-center py-12 surface-card">
            <FileText className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
            <h3 className="text-base font-semibold text-foreground mb-1">
              {activeFilterCount > 0 ? "No resources match your filters" : "No resources available"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {activeFilterCount > 0
                ? "Try removing one or more filters to broaden your results."
                : "Resources will appear here once they are added."}
            </p>
            {activeFilterCount > 0 && (
              <Button size="sm" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            )}
          </div>
        )}

        {fetchState === "done" && filteredResources.length > 0 && (
          <>
            {/* Desktop grid */}
            <div className="hidden sm:grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} assetBase={ASSET_BASE_URL} onClick={() => setSelectedResource(resource)} />
              ))}
            </div>

            {/* Mobile list */}
            <div className="sm:hidden space-y-2">
              {filteredResources.map((resource) => (
                <ResourceRow key={resource.id} resource={resource} assetBase={ASSET_BASE_URL} onClick={() => setSelectedResource(resource)} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedResource && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelectedResource(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-background rounded-card w-full max-w-4xl max-h-[95vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-background border-b border-border px-4 py-3 flex items-start justify-between z-10">
                <div className="flex-1 pr-4">
                  <h2 className="text-base font-semibold text-foreground mb-1.5">
                    {selectedResource.title}
                  </h2>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {[
                      selectedResource.level,
                      selectedResource.language,
                      selectedResource.content === "Tecplore" ? "Original" : "External",
                      selectedResource.subject,
                      selectedResource.type === "video" ? "Video" : "Document",
                    ].map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="p-1.5 hover:bg-muted rounded-full transition-colors text-muted-foreground flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4">
                {selectedResource.type === "video" && (
                  <div className="w-full aspect-video rounded-card overflow-hidden bg-black">
                    {selectedResource.contentUrl.includes("youtube.com") || selectedResource.contentUrl.includes("youtu.be") ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeId(selectedResource.contentUrl)}`}
                        title={selectedResource.title}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video src={selectedResource.contentUrl} controls className="w-full h-full" />
                    )}
                  </div>
                )}

                {selectedResource.type === "document" && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground/50 mb-4" />
                    <p className="text-sm text-body mb-4">Preview is restricted for security reasons.</p>
                    <Button asChild>
                      <a
                        href={getAssetUrl(selectedResource.contentUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open PDF in New Tab
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Footer note ── */}
      <footer className="w-full bg-muted border-t border-border py-6 px-6 mt-6">
        <p className="text-body text-xs sm:text-sm leading-relaxed text-center md:text-left">
          <strong className="text-body">Note:</strong> At Tecplore, we aim to empower educators with engaging STEM learning tools.
          This section features both Tecplore&apos;s original creations and selected educational resources from trusted global communities.
          All third-party resources are shared for educational, non-commercial purposes.
          For edits or removal requests, please contact us at <strong>info@tecplore.com</strong>.
        </p>
      </footer>
    </div>
  );
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 bg-muted text-body text-xs px-2 py-0.5 rounded-full font-medium">
      {label}
      <button onClick={onRemove} className="hover:text-foreground">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

function TypeBadge({ type }: { type: "video" | "document" }) {
  return (
    <div className="absolute top-1.5 left-1.5 bg-ink/90 text-ink-foreground px-1.5 py-0.5 rounded-full flex items-center gap-0.5 text-[10px] font-medium">
      {type === "video" ? <><Play className="w-2.5 h-2.5 fill-white" />VIDEO</> : <><FileText className="w-2.5 h-2.5" />DOC</>}
    </div>
  );
}

function ResourceCard({ resource, assetBase, onClick }: { resource: Resource; assetBase: string; onClick: () => void }) {
  return (
    <div
      className="group surface-card-interactive overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={`${assetBase}${resource.thumbnail}`}
          alt={resource.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <TypeBadge type={resource.type} />
      </div>
      <div className="p-2.5">
        <h3 className="font-medium text-xs text-foreground mb-1.5 line-clamp-2 leading-tight">
          {resource.title}
        </h3>
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1">
            <span className="font-medium text-foreground bg-muted px-1.5 py-0.5 rounded-full">{resource.level}</span>
            {resource.language && (
              <span className="text-body bg-muted px-1.5 py-0.5 rounded-full">{resource.language}</span>
            )}
          </div>
          <span className="text-muted-foreground">{resource.subject}</span>
        </div>
      </div>
    </div>
  );
}

function ResourceRow({ resource, assetBase, onClick }: { resource: Resource; assetBase: string; onClick: () => void }) {
  return (
    <div
      className="group surface-card-interactive overflow-hidden cursor-pointer flex"
      onClick={onClick}
    >
      <div className="relative w-24 flex-shrink-0 bg-muted">
        <img
          src={`${assetBase}${resource.thumbnail}`}
          alt={resource.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-1 left-1 bg-ink/90 text-ink-foreground px-1 py-0.5 rounded-full text-[9px] font-medium">
          {resource.type === "video" ? <Play className="w-2 h-2 fill-white" /> : <FileText className="w-2 h-2" />}
        </div>
      </div>
      <div className="flex-1 p-2.5 min-w-0">
        <h3 className="font-medium text-xs text-foreground mb-1 line-clamp-2 leading-tight">{resource.title}</h3>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="font-medium text-foreground bg-muted px-1.5 py-0.5 rounded-full">{resource.level}</span>
          {resource.language && (
            <span className="text-body bg-muted px-1.5 py-0.5 rounded-full">{resource.language}</span>
          )}
          <span className="text-muted-foreground truncate">{resource.subject}</span>
        </div>
      </div>
    </div>
  );
}

export default TeacherResources;
