export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export type CardCategory =
  | 'Nmap'
  | 'Recon Tools'
  | 'Web Attacks'
  | 'AD/Kerberos'
  | 'Cloud/Containers'
  | 'Reporting/Documents'
  | 'Wireless/Social Engineering'
  | 'Scripting/Code Interpretation'

export interface BattleCard {
  id: string
  category: CardCategory
  difficulty: Difficulty
  frontPrompt: string
  answer: string
  choices?: string[]
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
