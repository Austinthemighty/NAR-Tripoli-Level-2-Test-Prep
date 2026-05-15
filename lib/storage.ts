"use client";

import { Cert } from "./questions";

const NS = "narTripoliL2";

export interface AttemptRecord {
  questionId: string;
  correct: boolean;
  timestamp: number;
}

export interface ExamHistoryEntry {
  cert: Cert;
  score: number;
  total: number;
  passed: boolean;
  percent: number;
  timestamp: number;
}

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(`${NS}:${key}`);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(`${NS}:${key}`, JSON.stringify(value));
  } catch {
    /* quota or private mode — ignore */
  }
}

export function recordAttempt(cert: Cert, questionId: string, correct: boolean): void {
  const key = `attempts:${cert}`;
  const records = read<AttemptRecord[]>(key, []);
  records.push({ questionId, correct, timestamp: Date.now() });
  if (records.length > 2000) records.splice(0, records.length - 2000);
  write(key, records);
}

export function getAttempts(cert: Cert): AttemptRecord[] {
  return read<AttemptRecord[]>(`attempts:${cert}`, []);
}

export function getMasteryByQuestion(cert: Cert): Map<string, { attempts: number; correct: number }> {
  const out = new Map<string, { attempts: number; correct: number }>();
  for (const a of getAttempts(cert)) {
    const cur = out.get(a.questionId) ?? { attempts: 0, correct: 0 };
    cur.attempts += 1;
    if (a.correct) cur.correct += 1;
    out.set(a.questionId, cur);
  }
  return out;
}

export function recordExam(entry: ExamHistoryEntry): void {
  const key = `exams:${entry.cert}`;
  const history = read<ExamHistoryEntry[]>(key, []);
  history.unshift(entry);
  if (history.length > 50) history.length = 50;
  write(key, history);
}

export function getExamHistory(cert: Cert): ExamHistoryEntry[] {
  return read<ExamHistoryEntry[]>(`exams:${cert}`, []);
}

export function toggleStar(cert: Cert, questionId: string): boolean {
  const key = `starred:${cert}`;
  const starred = new Set(read<string[]>(key, []));
  if (starred.has(questionId)) {
    starred.delete(questionId);
  } else {
    starred.add(questionId);
  }
  write(key, Array.from(starred));
  return starred.has(questionId);
}

export function getStarred(cert: Cert): Set<string> {
  return new Set(read<string[]>(`starred:${cert}`, []));
}

export function clearAll(cert: Cert): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(`${NS}:attempts:${cert}`);
  window.localStorage.removeItem(`${NS}:exams:${cert}`);
  window.localStorage.removeItem(`${NS}:starred:${cert}`);
}
