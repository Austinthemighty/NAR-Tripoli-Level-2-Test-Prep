import type { Metadata } from "next";
import SectionPicker from "@/components/SectionPicker";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tripoli L2 Flashcards",
  description:
    "Reveal-the-answer flashcards for the Tripoli Level 2 question pool. Mark each card as 'knew it' or 'missed' to track mastery in your browser.",
  path: "/tripoli/flashcards/",
});

export default function TripoliFlashcards() {
  return (
    <>
      <header className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-rocket-600">
          Tripoli L2
        </p>
        <h1 className="mt-1 text-3xl font-bold text-ink-900">Flashcards</h1>
      </header>
      <SectionPicker cert="tripoli" mode="flashcards" />
    </>
  );
}
