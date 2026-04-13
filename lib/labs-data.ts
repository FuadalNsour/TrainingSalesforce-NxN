export interface LabScenario {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  chapterId: string;
  scenario: {
    title: string;
    context: string;
    situation: string;
    question: string;
  };
  correctAnswer: string;
  explanation: string;
  keyLearnings: string[];
}

export const LABS: Record<string, LabScenario> = {
  'lab-01': {
    id: 'lab-01',
    title: 'The Ghost Company',
    difficulty: 'beginner',
    description: 'Qualify a lead with suspicious company details',
    chapterId: '01-find-qualify',
    scenario: {
      title: 'The Ghost Company',
      context: 'You receive an inbound inquiry from "John Tech" at "TechFlow Industries"',
      situation: 'Company registration appears to be in a tax haven, financials are opaque, website is a basic template.',
      question: 'Which gate should you focus on first? What action do you take?',
    },
    correctAnswer: 'Focus on Gate 1 (Company Identity). Request official corporate documents, business license, and financial information.',
    explanation: 'Gate 1 screens for legitimacy. Red flags like tax haven registration should stop the process.',
    keyLearnings: [
      'Gate 1 screens for legitimacy',
      'Trust your instincts on suspicious profiles',
      'Document your qualification decision',
    ],
  },
  'lab-02': {
    id: 'lab-02',
    title: 'The Gatekeeper',
    difficulty: 'intermediate',
    description: 'Navigate stakeholder politics and decision authority',
    chapterId: '01-find-qualify',
    scenario: {
      title: 'The Gatekeeper',
      context: 'Sarah from a Fortune 500 company is enthusiastic about your solution',
      situation: 'Sarah is a junior analyst with no authority. She cannot introduce you to decision-makers.',
      question: 'Which gate is at risk? How do you proceed?',
    },
    correctAnswer: 'Gate 2 (Stakeholder Fit) is at risk. Help Sarah build a business case or respectfully pause.',
    explanation: 'A champion without authority is not enough. Either develop them or walk away.',
    keyLearnings: [
      'A champion without authority is not enough',
      'Help your contact build internal credibility',
      'Know when to pause and walk away',
    ],
  },
  'lab-03': {
    id: 'lab-03',
    title: 'The Feature Shopper',
    difficulty: 'intermediate',
    description: 'Uncover real business problems vs feature interest',
    chapterId: '01-find-qualify',
    scenario: {
      title: 'The Feature Shopper',
      context: 'Miguel is excited about your advanced reporting features',
      situation: 'He loves the functionality but hasnt defined what problem hes solving.',
      question: 'Which gate is failing? What should you do?',
    },
    correctAnswer: 'Gate 3 (Need & Fit) is failing. Push back with curiosity. Ask about current process and pain points.',
    explanation: 'A lack of defined need is a red flag. Uncover the problem, dont pitch features.',
    keyLearnings: [
      'Beware the feature shopper with no problem',
      'Use curiosity before conviction',
      'A vague pain point is not qualified',
    ],
  },
  'lab-04': {
    id: 'lab-04',
    title: 'Deal Size Reality Check',
    difficulty: 'intermediate',
    description: 'Assess deal viability and ROI',
    chapterId: '01-find-qualify',
    scenario: {
      title: 'Deal Size Reality Check',
      context: 'A startup is excited about your enterprise solution',
      situation: 'Company has 12 employees, $2M revenue. Implementation is $50K, annual license $30K.',
      question: 'Which gate fails? Should you pursue?',
    },
    correctAnswer: 'Gate 4 (Viability) fails. Deal economics don\'t work. Respectfully decline or offer smaller scope.',
    explanation: 'Not every qualified lead is viable. Protect your business margins.',
    keyLearnings: [
      'Deal size must fit business model',
      'ROI must be positive for both sides',
      'Walking away protects your margins',
    ],
  },
};

export function getLabById(id: string): LabScenario | undefined {
  return LABS[id];
}

export function getLabsByChapter(chapterId: string): LabScenario[] {
  return Object.values(LABS).filter((lab) => lab.chapterId === chapterId);
}
