import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-200 bg-ink-50">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-ink-600">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="font-semibold text-ink-900">Rocket Cert Prep</p>
            <p className="mt-1 max-w-md">
              Free practice tests for the NAR Level 2 and Tripoli Level 2 high-power rocketry
              certification exams. Unofficial study aid.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-1">
            <Link href="/tripoli/" className="hover:text-rocket-600">
              Tripoli L2
            </Link>
            <Link href="/nar/" className="hover:text-rocket-600">
              NAR L2
            </Link>
            <Link href="/about/" className="hover:text-rocket-600">
              About
            </Link>
            <Link href="/resources/" className="hover:text-rocket-600">
              Resources
            </Link>
          </nav>
        </div>
        <p className="mt-6 text-xs text-ink-500">
          Not affiliated with the National Association of Rocketry or the Tripoli Rocketry
          Association. Always verify against the current official study guides before taking the
          certification exam.
        </p>
      </div>
    </footer>
  );
}
