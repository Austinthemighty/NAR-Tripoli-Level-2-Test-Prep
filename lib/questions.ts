import tripoliTechnicalRaw from "@/data/tripoli/technical.json";
import tripoliSafetyRaw from "@/data/tripoli/safety.json";
import narRegulationsRaw from "@/data/nar/regulations.json";
import narMotorRaw from "@/data/nar/motor-designations.json";
import narRangeSafetyRaw from "@/data/nar/range-safety.json";
import narStabilityRaw from "@/data/nar/stability.json";

export type Cert = "tripoli" | "nar";

export type TripoliSection = "technical" | "safety";
export type NarSection = "regulations" | "motor-designations" | "range-safety" | "stability";
export type Section = TripoliSection | NarSection;

export interface QuestionOption {
  key: string;
  text: string;
}

export interface Question {
  id: string;
  number: number;
  cert: Cert;
  section: Section;
  topic: string;
  prompt: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation: string;
  reference?: string;
}

const tripoliTechnical = tripoliTechnicalRaw as Question[];
const tripoliSafety = tripoliSafetyRaw as Question[];
const narRegulations = narRegulationsRaw as Question[];
const narMotor = narMotorRaw as Question[];
const narRangeSafety = narRangeSafetyRaw as Question[];
const narStability = narStabilityRaw as Question[];

export const TRIPOLI_QUESTIONS: Record<TripoliSection, Question[]> = {
  technical: tripoliTechnical,
  safety: tripoliSafety,
};

export const NAR_QUESTIONS: Record<NarSection, Question[]> = {
  regulations: narRegulations,
  "motor-designations": narMotor,
  "range-safety": narRangeSafety,
  stability: narStability,
};

export const CERT_META = {
  tripoli: {
    cert: "tripoli" as const,
    shortName: "Tripoli L2",
    longName: "Tripoli Level 2 Advanced Certification",
    bodyName: "Tripoli Rocketry Association (TRA)",
    examQuestions: 50,
    passingScore: 45,
    passingPercent: 90,
    sections: [
      { id: "technical" as Section, label: "Technical", count: 25 },
      { id: "safety" as Section, label: "Safety Code", count: 25 },
    ],
    poolSize: tripoliTechnical.length + tripoliSafety.length,
  },
  nar: {
    cert: "nar" as const,
    shortName: "NAR L2",
    longName: "NAR Level 2 High Power Certification",
    bodyName: "National Association of Rocketry (NAR)",
    examQuestions: 40,
    passingScore: 35,
    passingPercent: 87.5,
    sections: [
      { id: "regulations" as Section, label: "Applicable Regulations", count: 10 },
      { id: "motor-designations" as Section, label: "Rocket Motor Designations", count: 3 },
      { id: "range-safety" as Section, label: "Range and Safety Practices", count: 24 },
      { id: "stability" as Section, label: "Rocket Stability", count: 3 },
    ],
    poolSize:
      narRegulations.length + narMotor.length + narRangeSafety.length + narStability.length,
  },
};

export function getQuestionsByCert(cert: Cert): Question[] {
  if (cert === "tripoli") {
    return [...tripoliTechnical, ...tripoliSafety];
  }
  return [...narRegulations, ...narMotor, ...narRangeSafety, ...narStability];
}

export function getQuestionsBySection(cert: Cert, section: Section): Question[] {
  if (cert === "tripoli") {
    return TRIPOLI_QUESTIONS[section as TripoliSection] ?? [];
  }
  return NAR_QUESTIONS[section as NarSection] ?? [];
}

export function sectionLabel(cert: Cert, section: Section): string {
  const meta = CERT_META[cert].sections.find((s) => s.id === section);
  return meta?.label ?? String(section);
}

export function getQuestionById(id: string): Question | undefined {
  const cert: Cert = id.startsWith("tripoli") ? "tripoli" : "nar";
  return getQuestionsByCert(cert).find((q) => q.id === id);
}

export function getTopicsForCert(cert: Cert): { topic: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const q of getQuestionsByCert(cert)) {
    counts.set(q.topic, (counts.get(q.topic) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => a.topic.localeCompare(b.topic));
}
