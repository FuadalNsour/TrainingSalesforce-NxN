// lib/types.ts

export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: number; // in minutes
  audience: Role[];
  sections: Section[];
  keyTakeaways: string[];
  nextChapterId?: string;
}

export interface Section {
  id: string;
  type: SectionType;
  title?: string;
  content: unknown; // Type depends on section type
  order: number;
}

export type SectionType =
  | 'hero'
  | 'narrative'
  | 'process-timeline'
  | 'comparison-cards'
  | 'stage-table'
  | 'demo-callout'
  | 'lab-challenge'
  | 'warning-panel'
  | 'checklist'
  | 'scenario-card'
  | 'recap';

export type Role = 'sales' | 'account-manager' | 'crm' | 'leadership' | 'all';

export interface LifecycleStage {
  id: string;
  name: string;
  description: string;
  order: number;
  color: string;
  entryLogic: string;
  exitLogic: string;
  userActions: string[];
  commonMistakes: string[];
  relatedRoles: Role[];
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  context: string;
  question: string;
  options: ScenarioOption[];
  correctAnswerId: string;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface CommonMistake {
  id: string;
  title: string;
  description: string;
  whyHarmful: string[];
  correctBehavior: string;
  whereItHappens: string;
  relatedStages: string[];
}

export interface ChapterReference {
  id: string;
  title: string;
  order: number;
  duration?: number; // in minutes
}

export interface CourseMetadata {
  title: string;
  description: string;
  duration: number; // total minutes
  audience: Role[];
  chapters: ChapterReference[];
  version: string;
  lastUpdated: string;
}

export interface UserProgress {
  userId: string;
  chaptersCompleted: string[];
  currentChapter: string;
  currentSection: number;
  scenariosCompleted: string[];
  labsCompleted: string[];
}
