"use client";

import { useEffect, useMemo, useState } from "react";
import { Cert, CERT_META } from "@/lib/questions";
import { buildPracticeExam, gradeExam, PracticeExam as ExamData, ExamResult } from "@/lib/quiz-engine";
import { recordExam } from "@/lib/storage";
import Quiz from "./Quiz";
import Flashcard from "./Flashcard";

interface Props {
  cert: Cert;
}

type Mode = "intro" | "taking" | "result" | "review-quiz" | "review-flashcards";

export default function PracticeExam({ cert }: Props) {
  const meta = CERT_META[cert];
  const [mode, setMode] = useState<Mode>("intro");
  const [exam, setExam] = useState<ExamData | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ExamResult | null>(null);
  const [index, setIndex] = useState(0);

  function start() {
    const ex = buildPracticeExam(cert);
    setExam(ex);
    setAnswers({});
    setResult(null);
    setIndex(0);
    setMode("taking");
  }

  function submit() {
    if (!exam) return;
    const formatted = exam.questions.map((q) => ({
      questionId: q.id,
      selected: answers[q.id] ?? null,
    }));
    const r = gradeExam(exam, formatted);
    setResult(r);
    setMode("result");
    recordExam({
      cert,
      score: r.score,
      total: r.total,
      passed: r.passed,
      percent: r.percent,
      timestamp: Date.now(),
    });
  }

  useEffect(() => {
    if (mode === "result" && typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [mode]);

  const answeredCount = useMemo(
    () => (exam ? exam.questions.filter((q) => answers[q.id]).length : 0),
    [answers, exam]
  );

  if (mode === "intro") {
    return (
      <div className="rounded-lg border border-ink-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-ink-900">Simulated {meta.shortName} Exam</h2>
        <p className="mt-2 text-ink-700">
          {meta.examQuestions} questions drawn randomly from the official {meta.poolSize}-question
          pool. Pass with {meta.passingScore} of {meta.examQuestions} correct (
          {Math.round(meta.passingPercent)}%).
        </p>
        <ul className="mt-3 text-sm text-ink-600">
          {meta.sections.map((s) => (
            <li key={String(s.id)}>
              • {s.label}: <strong>{s.count}</strong> question{s.count === 1 ? "" : "s"}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={start}
          className="mt-5 rounded bg-rocket-600 px-5 py-2.5 font-semibold text-white hover:bg-rocket-700"
        >
          Start practice exam
        </button>
      </div>
    );
  }

  if (mode === "taking" && exam) {
    const q = exam.questions[index];
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-ink-600">
          <span>
            Question <strong className="text-ink-900">{index + 1}</strong> of {exam.questions.length}
          </span>
          <span>
            Answered <strong className="text-ink-900">{answeredCount}</strong> /{" "}
            {exam.questions.length}
          </span>
        </div>

        <div className="rounded-lg border border-ink-200 bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="rounded bg-ink-100 px-2 py-0.5 text-xs uppercase tracking-wide text-ink-700">
              {q.topic}
            </span>
            <span className="text-xs text-ink-500">{q.section}</span>
          </div>
          <h2 className="mb-4 text-lg font-semibold text-ink-900">{q.prompt}</h2>
          <ol className="space-y-2">
            {q.options.map((opt) => {
              const selected = answers[q.id] === opt.key;
              return (
                <li key={opt.key}>
                  <button
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [q.id]: opt.key }))
                    }
                    className={`w-full rounded border px-4 py-3 text-left text-sm transition ${
                      selected
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
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="rounded border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 disabled:opacity-40"
          >
            ← Previous
          </button>
          {index < exam.questions.length - 1 ? (
            <button
              type="button"
              onClick={() => setIndex((i) => Math.min(exam.questions.length - 1, i + 1))}
              className="rounded bg-ink-900 px-4 py-2 text-sm font-semibold text-white hover:bg-ink-800"
            >
              Next →
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              className="rounded bg-rocket-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rocket-700"
            >
              Submit exam
            </button>
          )}
        </div>

        <details className="rounded border border-ink-200 bg-white p-3 text-sm">
          <summary className="cursor-pointer font-medium text-ink-700">
            Jump to question
          </summary>
          <div className="mt-3 grid grid-cols-10 gap-1">
            {exam.questions.map((qq, i) => {
              const answered = !!answers[qq.id];
              const here = i === index;
              return (
                <button
                  key={qq.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`rounded px-1 py-1 text-xs ${
                    here
                      ? "bg-rocket-600 text-white"
                      : answered
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-ink-100 text-ink-700"
                  }`}
                  aria-label={`Go to question ${i + 1}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </details>
      </div>
    );
  }

  if (mode === "result" && result && exam) {
    return (
      <div className="space-y-6">
        <div
          className={`rounded-lg border p-6 shadow-sm ${
            result.passed
              ? "border-emerald-200 bg-emerald-50"
              : "border-rose-200 bg-rose-50"
          }`}
        >
          <h2 className="text-2xl font-bold">
            {result.passed ? "🎉 Pass" : "Keep studying"}
          </h2>
          <p className="mt-2 text-lg">
            You scored <strong>{result.score}</strong> of {result.total} (
            {result.percent.toFixed(1)}%). Pass = {result.passingScore}/{result.total}.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {result.sectionResults.map((s) => (
              <div
                key={String(s.section)}
                className="rounded bg-white px-3 py-2 text-sm text-ink-800"
              >
                <strong>{s.label}:</strong> {s.correct} / {s.total}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={start}
              className="rounded bg-rocket-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rocket-700"
            >
              Take another exam
            </button>
            {result.missed.length > 0 ? (
              <>
                <button
                  type="button"
                  onClick={() => setMode("review-quiz")}
                  className="rounded bg-ink-900 px-4 py-2 text-sm font-semibold text-white hover:bg-ink-800"
                >
                  Study missed questions ({result.missed.length}) →
                </button>
                <button
                  type="button"
                  onClick={() => setMode("review-flashcards")}
                  className="rounded border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-800 hover:bg-ink-100"
                >
                  Flashcards on missed
                </button>
              </>
            ) : null}
          </div>
        </div>

        {result.missed.length > 0 ? (
          <section>
            <h3 className="mb-3 text-lg font-semibold text-ink-900">
              Read-through review: {result.missed.length} missed question
              {result.missed.length === 1 ? "" : "s"}
            </h3>
            <ol className="space-y-3">
              {result.missed.map((m) => {
                const correct = m.question.options.find(
                  (o) => o.key === m.question.correctAnswer
                );
                const picked = m.selected
                  ? m.question.options.find((o) => o.key === m.selected)
                  : null;
                return (
                  <li
                    key={m.question.id}
                    className="rounded border border-ink-200 bg-white p-4 text-sm shadow-sm"
                  >
                    <p className="font-semibold text-ink-900">{m.question.prompt}</p>
                    <p className="mt-2 text-rose-700">
                      <span className="font-mono mr-2">
                        {m.selected ? m.selected.toUpperCase() + ")" : "—"}
                      </span>
                      Your answer: {picked ? picked.text : "(no answer)"}
                    </p>
                    <p className="mt-1 text-emerald-700">
                      <span className="font-mono mr-2">{m.question.correctAnswer.toUpperCase()})</span>
                      Correct: {correct?.text}
                    </p>
                    <p className="mt-2 text-ink-700">{m.question.explanation}</p>
                    {m.question.reference ? (
                      <p className="mt-1 text-xs text-ink-500">
                        Reference: {m.question.reference}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </section>
        ) : null}
      </div>
    );
  }

  if ((mode === "review-quiz" || mode === "review-flashcards") && result) {
    const missedQuestions = result.missed.map((m) => m.question);
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-ink-200 bg-white p-4 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-ink-900">
              Studying {missedQuestions.length} missed question
              {missedQuestions.length === 1 ? "" : "s"}
            </p>
            <p className="text-xs text-ink-600">
              From your last exam — score {result.score}/{result.total} (
              {result.percent.toFixed(0)}%)
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setMode(mode === "review-quiz" ? "review-flashcards" : "review-quiz")
              }
              className="rounded border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-800 hover:bg-ink-100"
            >
              Switch to {mode === "review-quiz" ? "flashcards" : "quiz"}
            </button>
            <button
              type="button"
              onClick={() => setMode("result")}
              className="rounded bg-ink-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink-800"
            >
              ← Back to results
            </button>
          </div>
        </div>
        {mode === "review-quiz" ? (
          <Quiz cert={cert} questions={missedQuestions} title="Missed questions" />
        ) : (
          <Flashcard cert={cert} questions={missedQuestions} />
        )}
      </div>
    );
  }

  return null;
}
