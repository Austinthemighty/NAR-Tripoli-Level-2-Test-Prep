import type { Metadata } from "next";
import { Cert, CERT_META, Question } from "./questions";

export const SITE = {
  name: "Rocket Cert Prep",
  tagline: "Free practice exams and study tools for NAR & Tripoli Level 2 high-power rocketry certification.",
  url: "https://rockettestprep.austinthemighty.com",
  defaultDescription:
    "Free practice exams, flashcards, and study guides for the NAR Level 2 and Tripoli Level 2 high-power rocketry certification exams. Full question banks, instant feedback, mobile-friendly.",
};

export function buildMetadata(opts: {
  title: string;
  description?: string;
  path: string;
  image?: string;
}): Metadata {
  const description = opts.description ?? SITE.defaultDescription;
  const url = `${SITE.url}${opts.path}`;
  const image = opts.image ?? `${SITE.url}/og-default.png`;
  return {
    title: opts.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

export function courseJsonLd(cert: Cert) {
  const meta = CERT_META[cert];
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${meta.longName} Practice Exam`,
    description: `Free practice exams and a complete question bank (${meta.poolSize} questions) for the ${meta.longName}.`,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      sameAs: SITE.url,
    },
    educationalCredentialAwarded: meta.shortName,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${Math.ceil(meta.examQuestions * 0.75)}M`,
    },
  };
}

export function faqJsonLd(questions: Question[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => {
      const correct = q.options.find((o) => o.key === q.correctAnswer);
      return {
        "@type": "Question",
        name: q.prompt,
        acceptedAnswer: {
          "@type": "Answer",
          text: correct ? `${correct.text}. ${q.explanation}` : q.explanation,
        },
      };
    }),
  };
}
