export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  joinDate: string
  barakahScore: number
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  dateEarned: string
}

export interface Post {
  id: string
  authorId: string
  author: UserProfile
  content: string
  createdAt: string
  updatedAt: string
  likes: number
  comments: Comment[]
  tags: string[]
  category: 'ibadah' | 'ilm' | 'khidmah' | 'personal' | 'work'
  barakahScore: number
}

export interface Comment {
  id: string
  authorId: string
  author: UserProfile
  content: string
  createdAt: string
  updatedAt: string
  likes: number
}

export interface CommunityStats {
  totalMembers: number
  activeMembers: number
  totalPosts: number
  totalComments: number
  averageBarakahScore: number
  topContributors: UserProfile[]
  recentAchievements: Achievement[]
} 