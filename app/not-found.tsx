import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-rocket-600">404</p>
      <h1 className="mt-2 text-3xl font-bold text-ink-900">Off-axis launch.</h1>
      <p className="mt-3 text-ink-700">
        That page didn't reach apogee. Let's get you back on the rail.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link
          href="/"
          className="rounded bg-rocket-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rocket-700"
        >
          Home
        </Link>
        <Link
          href="/tripoli/"
          className="rounded border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-800 hover:bg-ink-100"
        >
          Tripoli L2
        </Link>
        <Link
          href="/nar/"
          className="rounded border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-800 hover:bg-ink-100"
        >
          NAR L2
        </Link>
      </div>
    </section>
  );
}
