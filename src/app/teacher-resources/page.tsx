"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Play, FileText, Star, AlertCircle } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

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
    `rounded px-2.5 py-1.5 text-xs border cursor-pointer transition-all outline-none ${
      active
        ? "bg-white border-gray-900 text-gray-900 font-semibold"
        : "bg-gray-50 border-gray-300 text-gray-600 hover:border-gray-500"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <PageHero
        title="Teacher Resources Portal"
        subtitle="Access curated training materials and teaching resources"
        backgroundImage="/photos/career1.avif"
        overlayClass="bg-slate-950/80"
      />

      {/* ── Stats Bar ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap justify-center gap-6 text-xs">
            <div className="flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-gray-500" />
              <span className="font-semibold text-gray-900">{resources.filter((r) => r.type === "video").length}</span>
              <span className="text-gray-500">Videos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-gray-500" />
              <span className="font-semibold text-gray-900">{resources.filter((r) => r.type === "document").length}</span>
              <span className="text-gray-500">Documents</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-gray-500" />
              <span className="font-semibold text-gray-900">{subjects.length}</span>
              <span className="text-gray-500">Subjects</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* ── Filter strip (always visible) ── */}
        <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
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
              <button onClick={clearAllFilters} className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors px-1">
                Clear all
              </button>
            )}
          </div>
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-gray-100">
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
          <span className="text-sm font-semibold text-gray-700">
            {fetchState === "done" ? `${filteredResources.length} Resources` : ""}
          </span>
        </div>

        {/* ── Content ── */}
        {fetchState === "loading" && (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-lg">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mb-4" />
            <p className="text-sm text-gray-500">Loading resources...</p>
          </div>
        )}

        {fetchState === "error" && (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-lg">
            <AlertCircle className="w-10 h-10 text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-900 mb-1">Could not load resources</h3>
            <p className="text-sm text-gray-500 mb-4">Check your connection and try again.</p>
            <button
              onClick={() => { setFetchState("loading"); window.location.reload(); }}
              className="px-4 py-1.5 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {fetchState === "done" && filteredResources.length === 0 && (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
            <FileText className="w-10 h-10 mx-auto mb-3 text-gray-300" />
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              {activeFilterCount > 0 ? "No resources match your filters" : "No resources available"}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {activeFilterCount > 0
                ? "Try removing one or more filters to broaden your results."
                : "Resources will appear here once they are added."}
            </p>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-1.5 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors font-medium"
              >
                Clear All Filters
              </button>
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
              className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-start justify-between z-10">
                <div className="flex-1 pr-4">
                  <h2 className="text-base font-semibold text-gray-900 mb-1.5">
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
                      <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded font-medium text-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-500 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4">
                {selectedResource.type === "video" && (
                  <div className="w-full aspect-video rounded overflow-hidden bg-black">
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
                    <FileText className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-sm text-gray-600 mb-4">Preview is restricted for security reasons.</p>
                    <a
                      href={getAssetUrl(selectedResource.contentUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-gray-900 text-white rounded hover:bg-gray-800 transition font-medium text-sm"
                    >
                      Open PDF in New Tab
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Footer note ── */}
      <footer className="w-full bg-gray-100 border-t border-gray-200 py-6 px-6 mt-6">
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center md:text-left">
          <strong className="text-gray-700">Note:</strong> At Tecplore, we aim to empower educators with engaging STEM learning tools.
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
    <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">
      {label}
      <button onClick={onRemove} className="hover:text-gray-900">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

function TypeBadge({ type }: { type: "video" | "document" }) {
  return (
    <div className="absolute top-1.5 left-1.5 bg-gray-900/90 text-white px-1.5 py-0.5 rounded flex items-center gap-0.5 text-[10px] font-medium">
      {type === "video" ? <><Play className="w-2.5 h-2.5 fill-white" />VIDEO</> : <><FileText className="w-2.5 h-2.5" />DOC</>}
    </div>
  );
}

function ResourceCard({ resource, assetBase, onClick }: { resource: Resource; assetBase: string; onClick: () => void }) {
  return (
    <div
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 hover:shadow-sm transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={`${assetBase}${resource.thumbnail}`}
          alt={resource.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <TypeBadge type={resource.type} />
      </div>
      <div className="p-2.5">
        <h3 className="font-medium text-xs text-gray-900 mb-1.5 line-clamp-2 leading-tight">
          {resource.title}
        </h3>
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">{resource.level}</span>
            {resource.language && (
              <span className="text-gray-600 bg-gray-50 px-1.5 py-0.5 rounded">{resource.language}</span>
            )}
          </div>
          <span className="text-gray-500">{resource.subject}</span>
        </div>
      </div>
    </div>
  );
}

function ResourceRow({ resource, assetBase, onClick }: { resource: Resource; assetBase: string; onClick: () => void }) {
  return (
    <div
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-all cursor-pointer flex"
      onClick={onClick}
    >
      <div className="relative w-24 flex-shrink-0 bg-gray-100">
        <img
          src={`${assetBase}${resource.thumbnail}`}
          alt={resource.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-1 left-1 bg-gray-900/90 text-white px-1 py-0.5 rounded text-[9px] font-medium">
          {resource.type === "video" ? <Play className="w-2 h-2 fill-white" /> : <FileText className="w-2 h-2" />}
        </div>
      </div>
      <div className="flex-1 p-2.5 min-w-0">
        <h3 className="font-medium text-xs text-gray-900 mb-1 line-clamp-2 leading-tight">{resource.title}</h3>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="font-medium text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">{resource.level}</span>
          {resource.language && (
            <span className="text-gray-600 bg-gray-50 px-1.5 py-0.5 rounded">{resource.language}</span>
          )}
          <span className="text-gray-500 truncate">{resource.subject}</span>
        </div>
      </div>
    </div>
  );
}

export default TeacherResources;
