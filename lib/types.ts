export type GridSize = 'small' | 'medium' | 'large'

<<<<<<< HEAD
=======
export type ContentWidth = 'full' | 'contained'

>>>>>>> template/main
export interface Project {
  id: string
  title: string
  client: string
  year: number
<<<<<<< HEAD
=======
  type: string
>>>>>>> template/main
  category: string
  slug: string
  cover: string | null
  media: string[]
  videoUrls: string[]
  gridSize: GridSize
<<<<<<< HEAD
  order: number
  published: boolean
  description: string
}
=======
  contentWidth: ContentWidth
  order: number
  published: boolean
  isProtected: boolean
  description: string
  publishedAt: string
  notifyDays: number
}

export interface UpdateItem {
  id: string
  title: string
  slug: string
  publishedAt: string
  notifyDays: number
}

export type ProjectBlock =
  | { type: 'text'; text: string }
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'image'; src: string }
  | { type: 'video'; url: string }
  | { type: 'columns'; columns: ProjectBlock[][] }
>>>>>>> template/main
