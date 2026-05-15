"use client";

import { useMemo, useState } from "react";
import { Cert, Question } from "@/lib/questions";
import { recordAttempt } from "@/lib/storage";

interface Props {
  cert: Cert;
  questions: Question[];
}

export default function Flashcard({ cert, questions }: Props) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [marked, setMarked] = useState<Record<string, "knew" | "missed">>({});

  const q = questions[index];
  const stats = useMemo(() => {
    let knew = 0;
    let missed = 0;
    for (const v of Object.values(marked)) {
      if (v === "knew") knew += 1;
      else missed += 1;
    }
    return { knew, missed };
  }, [marked]);

  if (!q) {
    return <p className="text-ink-600">No cards available.</p>;
  }

  function mark(verdict: "knew" | "missed") {
    setMarked((prev) => ({ ...prev, [q.id]: verdict }));
    recordAttempt(cert, q.id, verdict === "knew");
    advance();
  }

  function advance() {
    setFlipped(false);
    setIndex((i) => Math.min(i + 1, questions.length - 1));
  }

  function back() {
    setFlipped(false);
    setIndex((i) => Math.max(0, i - 1));
  }

  const correct = q.options.find((o) => o.key === q.correctAnswer);

  return (
    <section aria-label="Flashcards" className="space-y-4">
      <div className="flex items-center justify-between text-sm text-ink-600">
        <span>
          Card <strong className="text-ink-900">{index + 1}</strong> of {questions.length}
        </span>
        <span>
          Knew: <strong className="text-emerald-700">{stats.knew}</strong> · Missed:{" "}
          <strong className="text-rose-700">{stats.missed}</strong>
        </span>
      </div>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="min-h-[260px] w-full rounded-xl border border-ink-200 bg-white p-6 text-left shadow-sm transition hover:border-rocket-300"
        aria-label={flipped ? "Show prompt" : "Reveal answer"}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded bg-ink-100 px-2 py-0.5 text-xs uppercase tracking-wide text-ink-700">
            {q.topic}
          </span>
          <span className="text-xs text-ink-500">
            {flipped ? "Answer" : "Tap to reveal"}
          </span>
        </div>
        {!flipped ? (
          <>
            <h2 className="text-lg font-semibold text-ink-900">{q.prompt}</h2>
            <ol className="mt-3 space-y-1.5 text-sm text-ink-700">
              {q.options.map((o) => (
                <li key={o.key}>
                  <span className="mr-2 font-mono font-semibold">{o.key.toUpperCase()})</span>
                  {o.text}
                </li>
              ))}
            </ol>
          </>
        ) : (
          <>
            <p className="text-sm uppercase tracking-wide text-emerald-700">
              Answer: {q.correctAnswer.toUpperCase()}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-ink-900">{correct?.text}</h2>
            <p className="mt-3 text-sm text-ink-700">{q.explanation}</p>
            {q.reference ? (
              <p className="mt-2 text-xs text-ink-500">Reference: {q.reference}</p>
            ) : null}
          </>
        )}
      </button>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={back}
          disabled={index === 0}
          className="rounded border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 disabled:opacity-40"
        >
          ← Previous
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => mark("missed")}
            className="rounded bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-800 hover:bg-rose-200"
          >
            Missed
          </button>
          <button
            type="button"
            onClick={() => mark("knew")}
            className="rounded bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Knew it
          </button>
        </div>
      </div>
    </section>
  );
}
