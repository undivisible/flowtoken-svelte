export type Sep = "diff" | "word" | "char";

export interface TokenWithSource {
  text: string;
  source: number;
}

export interface DiffTracker {
  prevInput: string;
  fullText: string;
  tokens: TokenWithSource[];
}

export function createDiffTracker(): DiffTracker {
  return {
    prevInput: "",
    fullText: "",
    tokens: [],
  };
}

export function updateDiffTracker(tracker: DiffTracker, input: string): TokenWithSource[] {
  if (!tracker.prevInput || input.length < tracker.prevInput.length) {
    tracker.tokens = [];
    tracker.fullText = "";
  }

  if (input !== tracker.prevInput) {
    if (input.includes(tracker.fullText)) {
      const uniqueNewContent = input.slice(tracker.fullText.length);
      if (uniqueNewContent.length > 0) {
        tracker.tokens = [
          ...tracker.tokens,
          { text: uniqueNewContent, source: tracker.tokens.length },
        ];
        tracker.fullText = input;
      }
    } else {
      tracker.tokens = [{ text: input, source: 0 }];
      tracker.fullText = input;
    }
  }

  tracker.prevInput = input;
  return tracker.tokens;
}

export function splitPlainTokens(input: string, sep: Exclude<Sep, "diff">): string[] {
  if (sep === "word") {
    return input.split(/(\s+)/).filter((token) => token.length > 0);
  }

  return Array.from(input);
}
