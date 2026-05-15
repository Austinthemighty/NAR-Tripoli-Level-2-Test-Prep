import Link from "next/link";
import { Cert, CERT_META, getQuestionsByCert, getTopicsForCert } from "@/lib/questions";

interface Props {
  cert: Cert;
}

export default function CertOverview({ cert }: Props) {
  const meta = CERT_META[cert];
  const total = getQuestionsByCert(cert).length;
  const topics = getTopicsForCert(cert);

  return (
    <>
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-rocket-600">
          {meta.shortName}
        </p>
        <h1 className="mt-1 text-3xl font-bold text-ink-900 sm:text-4xl">{meta.longName}</h1>
        <p className="mt-2 text-ink-700">
          {meta.bodyName}. Practice on the complete {total}-question pool used to build the
          official {meta.examQuestions}-question exam.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-ink-200 bg-white p-4">
          <p className="text-xs uppercase text-ink-500">Question pool</p>
          <p className="text-2xl font-bold text-ink-900">{total}</p>
        </div>
        <div className="rounded-lg border border-ink-200 bg-white p-4">
          <p className="text-xs uppercase text-ink-500">Exam length</p>
          <p className="text-2xl font-bold text-ink-900">{meta.examQuestions}</p>
        </div>
        <div className="rounded-lg border border-ink-200 bg-white p-4">
          <p className="text-xs uppercase text-ink-500">Passing score</p>
          <p className="text-2xl font-bold text-ink-900">
            {meta.passingScore}/{meta.examQuestions}
          </p>
          <p className="text-xs text-ink-500">{Math.round(meta.passingPercent)}%</p>
        </div>
        <div className="rounded-lg border border-ink-200 bg-white p-4">
          <p className="text-xs uppercase text-ink-500">Topics</p>
          <p className="text-2xl font-bold text-ink-900">{topics.length}</p>
        </div>
      </section>

      <section className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link
          href={`/${cert}/practice/`}
          className="group rounded-xl border border-ink-200 bg-white p-5 shadow-sm hover:border-rocket-300"
        >
          <h2 className="text-lg font-semibold text-ink-900">Take a practice exam →</h2>
          <p className="mt-1 text-sm text-ink-700">
            {meta.examQuestions} random questions matching the real exam composition. Graded at
            the end with full review.
          </p>
        </Link>
        <Link
          href={`/${cert}/quiz/`}
          className="group rounded-xl border border-ink-200 bg-white p-5 shadow-sm hover:border-rocket-300"
        >
          <h2 className="text-lg font-semibold text-ink-900">Quiz by section →</h2>
          <p className="mt-1 text-sm text-ink-700">
            Pick a section, get instant feedback per question. Best for targeted weak-spot work.
          </p>
        </Link>
        <Link
          href={`/${cert}/flashcards/`}
          className="group rounded-xl border border-ink-200 bg-white p-5 shadow-sm hover:border-rocket-300"
        >
          <h2 className="text-lg font-semibold text-ink-900">Flashcards →</h2>
          <p className="mt-1 text-sm text-ink-700">
            Reveal-the-answer cards for spaced repetition. Mark "knew it" or "missed" to track
            mastery.
          </p>
        </Link>
        <Link
          href={`/${cert}/study/`}
          className="group rounded-xl border border-ink-200 bg-white p-5 shadow-sm hover:border-rocket-300"
        >
          <h2 className="text-lg font-semibold text-ink-900">Browse the study guide →</h2>
          <p className="mt-1 text-sm text-ink-700">
            All {total} questions with the correct answer and explanation visible. Searchable by
            section.
          </p>
        </Link>
      </section>

      <section className="mt-8 rounded-xl border border-ink-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-ink-900">Exam composition</h2>
        <p className="mt-1 text-sm text-ink-700">
          The official exam draws {meta.examQuestions} questions in this exact mix:
        </p>
        <ul className="mt-3 space-y-1 text-sm text-ink-800">
          {meta.sections.map((s) => (
            <li key={String(s.id)} className="flex justify-between border-b border-ink-100 py-1.5">
              <span>{s.label}</span>
              <span className="font-semibold">{s.count} questions</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-xl border border-ink-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-ink-900">Topics covered</h2>
        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-ink-700 sm:grid-cols-3">
          {topics.map((t) => (
            <li key={t.topic}>
              {t.topic} <span className="text-ink-500">({t.count})</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
