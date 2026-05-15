import { Question } from "@/lib/questions";

interface Props {
  question: Question;
  number?: number;
  showAnswer?: boolean;
}

export default function QuestionCard({ question, number, showAnswer = true }: Props) {
  return (
    <article className="rounded-lg border border-ink-200 bg-white p-5 shadow-sm">
      <header className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-ink-900">
          {number !== undefined ? <span className="text-ink-500 mr-2">#{number}</span> : null}
          {question.prompt}
        </h3>
        <span className="shrink-0 rounded bg-ink-100 px-2 py-0.5 text-xs uppercase tracking-wide text-ink-700">
          {question.topic}
        </span>
      </header>
      <ol className="space-y-1.5">
        {question.options.map((opt) => {
          const isCorrect = showAnswer && opt.key === question.correctAnswer;
          return (
            <li
              key={opt.key}
              className={`flex gap-3 rounded px-3 py-2 text-sm ${
                isCorrect
                  ? "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200"
                  : "text-ink-800"
              }`}
            >
              <span className="font-mono font-semibold">{opt.key.toUpperCase()})</span>
              <span>{opt.text}</span>
              {isCorrect ? <span className="ml-auto text-xs font-semibold">Correct</span> : null}
            </li>
          );
        })}
      </ol>
      {showAnswer ? (
        <div className="mt-4 rounded border-l-4 border-rocket-400 bg-rocket-50 p-3 text-sm text-ink-800">
          <p>
            <span className="font-semibold">Why:</span> {question.explanation}
          </p>
          {question.reference ? (
            <p className="mt-1 text-xs text-ink-600">Reference: {question.reference}</p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
