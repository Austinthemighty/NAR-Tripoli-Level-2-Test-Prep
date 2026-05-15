"use client";

import { useMemo, useState } from "react";
import { Cert, CERT_META, getQuestionsBySection, Section } from "@/lib/questions";
import { buildSectionQuiz } from "@/lib/quiz-engine";
import Quiz from "./Quiz";
import Flashcard from "./Flashcard";

interface Props {
  cert: Cert;
  mode: "quiz" | "flashcards";
}

export default function SectionPicker({ cert, mode }: Props) {
  const meta = CERT_META[cert];
  const [section, setSection] = useState<Section | null>(null);
  const [size, setSize] = useState(10);
  const [run, setRun] = useState(0);

  const questions = useMemo(() => {
    if (!section) return [];
    if (mode === "flashcards") {
      return getQuestionsBySection(cert, section);
    }
    return buildSectionQuiz(cert, section, size, Date.now() + run);
  }, [cert, section, size, run, mode]);

  if (section && questions.length > 0) {
    const sectionLabel =
      meta.sections.find((s) => s.id === section)?.label ?? String(section);
    return (
      <>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-ink-600">
            <span className="font-semibold text-ink-900">{sectionLabel}</span> · {questions.length}{" "}
            question{questions.length === 1 ? "" : "s"}
          </p>
          <button
            type="button"
            onClick={() => setSection(null)}
            className="text-sm text-rocket-600 hover:underline"
          >
            ← Change section
          </button>
        </div>
        {mode === "quiz" ? (
          <Quiz cert={cert} questions={questions} title={sectionLabel} />
        ) : (
          <Flashcard cert={cert} questions={questions} />
        )}
      </>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-ink-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink-900">Pick a section</h2>
        {mode === "quiz" ? (
          <p className="mt-1 text-sm text-ink-700">
            Each quiz draws a random sample of questions from the section. Choose how many you want.
          </p>
        ) : (
          <p className="mt-1 text-sm text-ink-700">
            Flashcards show every question in the section. Mark "knew it" or "missed" as you go.
          </p>
        )}
        {mode === "quiz" ? (
          <label className="mt-3 inline-flex items-center gap-2 text-sm text-ink-700">
            Questions per quiz:
            <select
              className="rounded border border-ink-200 bg-white px-2 py-1 text-sm"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            >
              {[5, 10, 15, 20, 25].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {meta.sections.map((s) => {
          const count = getQuestionsBySection(cert, s.id).length;
          return (
            <li key={String(s.id)}>
              <button
                type="button"
                onClick={() => {
                  setSection(s.id);
                  setRun((r) => r + 1);
                }}
                className="w-full rounded-xl border border-ink-200 bg-white p-5 text-left shadow-sm transition hover:border-rocket-300"
              >
                <h3 className="font-semibold text-ink-900">{s.label}</h3>
                <p className="mt-1 text-sm text-ink-600">
                  {count} question{count === 1 ? "" : "s"} in the pool
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
