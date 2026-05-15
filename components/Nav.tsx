import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b border-ink-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-ink-900 hover:text-rocket-600">
          <span aria-hidden="true" className="text-2xl">🚀</span>
          <span className="font-semibold">Rocket Cert Prep</span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 text-sm">
          <Link
            href="/tripoli/"
            className="rounded px-3 py-2 text-ink-700 hover:bg-ink-100 hover:text-ink-900"
          >
            Tripoli L2
          </Link>
          <Link
            href="/nar/"
            className="rounded px-3 py-2 text-ink-700 hover:bg-ink-100 hover:text-ink-900"
          >
            NAR L2
          </Link>
          <Link
            href="/about/"
            className="rounded px-3 py-2 text-ink-700 hover:bg-ink-100 hover:text-ink-900"
          >
            About
          </Link>
          <Link
            href="/resources/"
            className="rounded px-3 py-2 text-ink-700 hover:bg-ink-100 hover:text-ink-900"
          >
            Resources
          </Link>
        </nav>
      </div>
    </header>
  );
}
