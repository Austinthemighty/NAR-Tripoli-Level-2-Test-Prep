import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CERT_META } from "@/lib/questions";

export const metadata: Metadata = buildMetadata({
  title: "Free NAR & Tripoli Level 2 Practice Exams",
  description:
    "Free practice tests, study mode, and flashcards for the NAR Level 2 and Tripoli Level 2 high-power rocketry certification exams. Full question bank, instant feedback.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <section className="rounded-2xl bg-gradient-to-br from-ink-900 to-ink-800 px-6 py-16 text-white shadow-lg sm:px-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-rocket-300">
          Free · No sign-up · Mobile-friendly
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Pass your Level 2 high-power rocketry certification.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-200">
          Practice exams, flashcards, and the complete question bank for the{" "}
          <strong className="text-white">NAR Level 2</strong> and{" "}
          <strong className="text-white">Tripoli Level 2</strong> written tests. Everything you
          need to walk into your cert flight ready.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/tripoli/practice/"
            className="rounded-lg bg-rocket-500 px-5 py-3 font-semibold text-white shadow hover:bg-rocket-600"
          >
            Take a Tripoli L2 practice exam →
          </Link>
          <Link
            href="/nar/practice/"
            className="rounded-lg bg-white px-5 py-3 font-semibold text-ink-900 shadow hover:bg-ink-100"
          >
            Take a NAR L2 practice exam →
          </Link>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {(["tripoli", "nar"] as const).map((cert) => {
          const meta = CERT_META[cert];
          return (
            <article
              key={cert}
              className="rounded-xl border border-ink-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-ink-900">{meta.longName}</h2>
              <p className="mt-1 text-sm text-ink-600">{meta.bodyName}</p>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="text-ink-500">Question pool</dt>
                  <dd className="font-semibold text-ink-900">{meta.poolSize}</dd>
                </div>
                <div>
                  <dt className="text-ink-500">Exam length</dt>
                  <dd className="font-semibold text-ink-900">{meta.examQuestions} Qs</dd>
                </div>
                <div>
                  <dt className="text-ink-500">Pass</dt>
                  <dd className="font-semibold text-ink-900">
                    {meta.passingScore} / {meta.examQuestions} ({Math.round(meta.passingPercent)}%)
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-500">Sections</dt>
                  <dd className="font-semibold text-ink-900">{meta.sections.length}</dd>
                </div>
              </dl>
              <ul className="mt-4 space-y-1 text-sm text-ink-700">
                {meta.sections.map((s) => (
                  <li key={String(s.id)}>
                    • {s.label} — {s.count} on exam
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={`/${cert}/practice/`}
                  className="rounded bg-rocket-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rocket-700"
                >
                  Practice exam
                </Link>
                <Link
                  href={`/${cert}/quiz/`}
                  className="rounded border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-800 hover:bg-ink-100"
                >
                  Quiz
                </Link>
                <Link
                  href={`/${cert}/flashcards/`}
                  className="rounded border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-800 hover:bg-ink-100"
                >
                  Flashcards
                </Link>
                <Link
                  href={`/${cert}/study/`}
                  className="rounded border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-800 hover:bg-ink-100"
                >
                  Study guide
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-ink-200 bg-white p-5">
          <h3 className="font-semibold text-ink-900">Exact exam format</h3>
          <p className="mt-1 text-sm text-ink-700">
            Practice exams match the real cert: section counts, question count, and pass threshold.
          </p>
        </div>
        <div className="rounded-lg border border-ink-200 bg-white p-5">
          <h3 className="font-semibold text-ink-900">Every question, explained</h3>
          <p className="mt-1 text-sm text-ink-700">
            Each Q includes the official rationale and the NFPA / TUSC / FAR reference.
          </p>
        </div>
        <div className="rounded-lg border border-ink-200 bg-white p-5">
          <h3 className="font-semibold text-ink-900">Private by design</h3>
          <p className="mt-1 text-sm text-ink-700">
            No accounts, no tracking, no database. Your progress lives in your browser.
          </p>
        </div>
      </section>
    </>
  );
}
