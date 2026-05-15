import type { Metadata } from "next";
import SectionPicker from "@/components/SectionPicker";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "NAR L2 Flashcards",
  description:
    "Reveal-the-answer flashcards for the NAR Level 2 question pool. Track 'knew it' and 'missed' answers privately in your browser.",
  path: "/nar/flashcards/",
});

export default function NarFlashcards() {
  return (
    <>
      <header className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-rocket-600">NAR L2</p>
        <h1 className="mt-1 text-3xl font-bold text-ink-900">Flashcards</h1>
      </header>
      <SectionPicker cert="nar" mode="flashcards" />
    </>
  );
}
