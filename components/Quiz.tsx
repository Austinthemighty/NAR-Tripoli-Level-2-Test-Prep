"use client";

import { useMemo, useState } from "react";
import { Cert, Question } from "@/lib/questions";
import { recordAttempt } from "@/lib/storage";

interface Props {
  cert: Cert;
  questions: Question[];
  title?: string;
}

interface AnswerState {
  selected: string | null;
  checked: boolean;
}

export default function Quiz({ cert, questions, title }: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});

  const q = questions[index];
  const state = answers[q?.id] ?? { selected: null, checked: false };

  const correctCount = useMemo(
    () =>
      Object.entries(answers).reduce((acc, [id, s]) => {
        if (!s.checked) return acc;
        const found = questions.find((x) => x.id === id);
        return acc + (found && s.selected === found.correctAnswer ? 1 : 0);
      }, 0),
    [answers, questions]
  );

  if (!q) {
    return <p className="text-ink-600">No questions available.</p>;
  }

  function select(key: string) {
    if (state.checked) return;
    setAnswers((prev) => ({ ...prev, [q.id]: { selected: key, checked: false } }));
  }

  function check() {
    if (state.selected == null) return;
    const correct = state.selected === q.correctAnswer;
    recordAttempt(cert, q.id, correct);
    setAnswers((prev) => ({
      ...prev,
      [q.id]: { selected: state.selected, checked: true },
    }));
  }

  function next() {
    setIndex((i) => Math.min(i + 1, questions.length - 1));
  }

  function prev() {
    setIndex((i) => Math.max(i - 1, 0));
  }

  return (
    <section aria-label={title ?? "Quiz"} className="space-y-4">
      <div className="flex items-center justify-between text-sm text-ink-600">
        <span>
          Question <strong className="text-ink-900">{index + 1}</strong> of {questions.length}
        </span>
        <span>
          Correct so far: <strong className="text-ink-900">{correctCount}</strong>
        </span>
      </div>

      <div className="rounded-lg border border-ink-200 bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="rounded bg-ink-100 px-2 py-0.5 text-xs uppercase tracking-wide text-ink-700">
            {q.topic}
          </span>
          {q.reference ? <span className="text-xs text-ink-500">Ref: {q.reference}</span> : null}
        </div>
        <h2 className="mb-4 text-lg font-semibold text-ink-900">{q.prompt}</h2>
        <ol className="space-y-2">
          {q.options.map((opt) => {
            const selected = state.selected === opt.key;
            const correct = state.checked && opt.key === q.correctAnswer;
            const wrongPick = state.checked && selected && opt.key !== q.correctAnswer;
            return (
              <li key={opt.key}>
                <button
                  type="button"
                  onClick={() => select(opt.key)}
                  disabled={state.checked}
                  className={`w-full rounded border px-4 py-3 text-left text-sm transition ${
                    correct
                      ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                      : wrongPick
                        ? "border-rose-300 bg-rose-50 text-rose-900"
                        : selected
                          ? "border-rocket-400 bg-rocket-50 text-ink-900"
                          : "border-ink-200 bg-white text-ink-800 hover:border-rocket-300 hover:bg-rocket-50"
                  }`}
                >
                  <span className="mr-3 font-mono font-semibold">{opt.key.toUpperCase()})</span>
                  {opt.text}
                </button>
              </li>
            );
          })}
        </ol>

        {state.checked ? (
          <div
            className={`mt-4 rounded p-3 text-sm ${
              state.selected === q.correctAnswer
                ? "bg-emerald-50 text-emerald-900"
                : "bg-rose-50 text-rose-900"
            }`}
          >
            <p className="font-semibold">
              {state.selected === q.correctAnswer
                ? "Correct"
                : `Incorrect — the correct answer is ${q.correctAnswer.toUpperCase()}.`}
            </p>
            <p className="mt-1">{q.explanation}</p>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          className="rounded border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 disabled:opacity-40"
        >
          ← Previous
        </button>
        <div className="flex gap-2">
          {!state.checked ? (
            <button
              type="button"
              onClick={check}
              disabled={state.selected == null}
              className="rounded bg-rocket-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rocket-700 disabled:opacity-40"
            >
              Check answer
            </button>
          ) : null}
          <button
            type="button"
            onClick={next}
            disabled={index >= questions.length - 1}
            className="rounded bg-ink-900 px-4 py-2 text-sm font-semibold text-white hover:bg-ink-800 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
