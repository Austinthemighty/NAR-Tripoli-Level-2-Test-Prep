import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "High-Power Rocketry Resources",
  description:
    "Official study guides, safety codes, FAA rules, and other resources to prepare for the NAR or Tripoli Level 2 certification exam.",
  path: "/resources/",
});

const resources: { group: string; items: { name: string; href: string; note?: string }[] }[] = [
  {
    group: "Official certification & study material",
    items: [
      {
        name: "NAR Level 2 certification info",
        href: "https://www.nar.org/high-power-rocketry-info/high-power-certification/",
      },
      {
        name: "NAR HPRL2-2020-V2 Study Guide (NAR site)",
        href: "https://www.nar.org/",
        note: "Search the NAR document library for the latest study guide.",
      },
      {
        name: "Tripoli Rocketry Association",
        href: "https://www.tripoli.org/",
      },
      {
        name: "Tripoli certification procedures",
        href: "https://www.tripoli.org/Certification",
      },
    ],
  },
  {
    group: "Codes & regulations",
    items: [
      {
        name: "NFPA 1127 — Code for High Power Rocketry",
        href: "https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=1127",
      },
      {
        name: "FAA Part 101 — Amateur Rockets",
        href: "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-101",
      },
      {
        name: "Tripoli Unified Safety Code (TUSC)",
        href: "https://www.tripoli.org/SafetyCode",
      },
      {
        name: "NAR High Power Rocket Safety Code",
        href: "https://www.nar.org/safety-information/high-power-rocket-safety-code/",
      },
    ],
  },
  {
    group: "Background reading",
    items: [
      {
        name: "Handbook of Model Rocketry — G. Harry Stine (7th ed., Chapter 9 on stability)",
        href: "https://www.google.com/books/edition/Handbook_of_Model_Rocketry/oRm9CgAAQBAJ",
      },
      {
        name: "Apogee Components Peak of Flight newsletter archives",
        href: "https://www.apogeerockets.com/Peak-of-Flight",
      },
      {
        name: "OpenRocket simulator",
        href: "https://openrocket.info/",
      },
      {
        name: "RockSim",
        href: "https://www.apogeerockets.com/Rocket_Software/RockSim",
      },
    ],
  },
];

export default function Resources() {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-ink-900">Resources</h1>
      <p className="mt-3 text-ink-700">
        These are the canonical sources behind the questions on this site. When in doubt, defer to
        these.
      </p>
      <div className="mt-8 space-y-8">
        {resources.map((group) => (
          <section key={group.group}>
            <h2 className="text-lg font-semibold text-ink-900">{group.group}</h2>
            <ul className="mt-3 space-y-2">
              {group.items.map((r) => (
                <li
                  key={r.href}
                  className="rounded-lg border border-ink-200 bg-white p-3 text-sm"
                >
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-medium text-rocket-700 hover:underline"
                  >
                    {r.name} ↗
                  </a>
                  {r.note ? <p className="mt-1 text-ink-600">{r.note}</p> : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
