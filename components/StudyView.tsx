"use client";

import { useMemo, useState } from "react";
import { Cert, CERT_META, getQuestionsByCert, Section } from "@/lib/questions";
import QuestionCard from "./QuestionCard";

interface Props {
  cert: Cert;
}

export default function StudyView({ cert }: Props) {
  const meta = CERT_META[cert];
  const all = useMemo(() => getQuestionsByCert(cert), [cert]);
  const [section, setSection] = useState<Section | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return all.filter((q) => {
      if (section !== "all" && q.section !== section) return false;
      if (!term) return true;
      return (
        q.prompt.toLowerCase().includes(term) ||
        q.explanation.toLowerCase().includes(term) ||
        q.topic.toLowerCase().includes(term) ||
        (q.reference ?? "").toLowerCase().includes(term)
      );
    });
  }, [all, section, search]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-ink-200 bg-white p-4 shadow-sm">
        <label className="text-sm font-medium text-ink-700">
          Section:
          <select
            className="ml-2 rounded border border-ink-200 bg-white px-2 py-1 text-sm"
            value={section}
            onChange={(e) => setSection(e.target.value as Section | "all")}
          >
            <option value="all">All sections</option>
            {meta.sections.map((s) => (
              <option key={String(s.id)} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="ml-auto flex-1 text-sm font-medium text-ink-700 sm:flex-none">
          <span className="sr-only">Search</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions, topics, references…"
            className="w-full rounded border border-ink-200 bg-white px-3 py-1.5 text-sm sm:w-72"
          />
        </label>
        <span className="text-xs text-ink-500">
          {filtered.length} of {all.length}
        </span>
      </div>

      <ol className="mt-6 space-y-4">
        {filtered.map((q, i) => (
          <li key={q.id}>
            <QuestionCard question={q} number={i + 1} showAnswer />
          </li>
        ))}
      </ol>
    </>
  );
}
