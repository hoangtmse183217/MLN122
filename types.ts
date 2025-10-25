
export interface Feature {
  id: number;
  title: string;
}

export interface Question {
  id: number;
  text: string;
  options: {
    [key: string]: string;
  };
  correctAnswer: string;
  hint?: string;
}

// Fix: Add the missing FaqItem interface, which is used in components/Faq.tsx.
export interface FaqItem {
  id: number;
  question: string;
}
