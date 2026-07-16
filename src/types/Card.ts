export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export type QuestionType = 'multiple-choice' | 'fill-blank' | 'scenario' | 'flashcard'

export type CardCategory =
  | 'Nmap'
  | 'Recon Tools'
  | 'Web Attacks'
  | 'AD/Kerberos'
  | 'Cloud/Containers'
  | 'Reporting/Documents'
  | 'Wireless/Social Engineering'
  | 'Scripting/Code Interpretation'

export interface ScenarioCondition {
  condition: string
  bestAction: string
}

export interface BattleCard {
  id: string
  category: CardCategory
  difficulty: Difficulty
  questionType?: QuestionType
  frontPrompt: string
  answer: string
  choices?: string[]
  acceptedAnswers?: string[]
  scenario?: ScenarioCondition
  explanation: string
  command?: string
  memoryHook: string
  examTrap: string
  tags: string[]
}

export interface CardProgress {
  correct: number
  review: number
  favorite: boolean
  needsReview: boolean
  lastSeen?: string
}

export type ProgressMap = Record<string, CardProgress>
