'use client'

import { useState } from 'react'
import { Post, CommunityStats, UserProfile } from './types'
import NewPostModal from './components/NewPostModal'

const initialPosts: Post[] = [
  {
    id: '1',
    authorId: '1',
    author: {
      id: '1',
      name: 'Ahmad Ali',
      email: 'ahmad@example.com',
      joinDate: '2024-01-01',
      barakahScore: 85,
      achievements: []
    },
    content: 'Just completed my first 30-day Qur\'an reading challenge! Alhamdulillah for the barakah in this journey.',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
    likes: 15,
    comments: [],
    tags: ['quran', 'achievement'],
    category: 'ibadah',
    barakahScore: 90
  },
  {
    id: '2',
    authorId: '2',
    author: {
      id: '2',
      name: 'Fatima Khan',
      email: 'fatima@example.com',
      joinDate: '2024-01-15',
      barakahScore: 92,
      achievements: []
    },
    content: 'Started a new study group for Islamic finance. Looking for members who are interested in learning together!',
    createdAt: '2024-03-14T15:30:00Z',
    updatedAt: '2024-03-14T15:30:00Z',
    likes: 8,
    comments: [],
    tags: ['study-group', 'islamic-finance'],
    category: 'ilm',
    barakahScore: 85
  }
]

const initialStats: CommunityStats = {
  totalMembers: 150,
  activeMembers: 75,
  totalPosts: 45,
  totalComments: 120,
  averageBarakahScore: 88,
  topContributors: [
    {
      id: '1',
      name: 'Ahmad Ali',
      email: 'ahmad@example.com',
      joinDate: '2024-01-01',
      barakahScore: 85,
      achievements: []
    },
    {
      id: '2',
      name: 'Fatima Khan',
      email: 'fatima@example.com',
      joinDate: '2024-01-15',
      barakahScore: 92,
      achievements: []
    }
  ],
  recentAchievements: []
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [stats] = useState<CommunityStats>(initialStats)
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category === selectedCategory)

  const handleCreatePost = (newPost: Omit<Post, 'id' | 'author' | 'createdAt' | 'updatedAt' | 'likes' | 'comments'>) => {
    const post: Post = {
      ...newPost,
      id: (posts.length + 1).toString(),
      author: {
        id: '1', // This would come from the authenticated user
        name: 'Current User',
        email: 'user@example.com',
        joinDate: '2024-01-01',
        barakahScore: 85,
        achievements: []
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      comments: []
    }
    setPosts([post, ...posts])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Community</h1>
        <button
          onClick={() => setShowNewPostModal(true)}
          className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
        >
          New Post
        </button>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Members</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.totalMembers}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Active Members</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.activeMembers}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Posts</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.totalPosts}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Avg. Barakah Score</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.averageBarakahScore}%</dd>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-4">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            selectedCategory === 'all'
              ? 'bg-primary-100 text-primary-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedCategory('ibadah')}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            selectedCategory === 'ibadah'
              ? 'bg-primary-100 text-primary-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          Ibadah
        </button>
        <button
          onClick={() => setSelectedCategory('ilm')}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            selectedCategory === 'ilm'
              ? 'bg-primary-100 text-primary-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          Ilm
        </button>
        <button
          onClick={() => setSelectedCategory('khidmah')}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            selectedCategory === 'khidmah'
              ? 'bg-primary-100 text-primary-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          Khidmah
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {post.author.avatar ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={post.author.avatar}
                      alt={post.author.name}
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600 font-medium">
                        {post.author.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-900">{post.content}</p>
              </div>
              <div className="mt-4 flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-primary-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="ml-1">{post.likes}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-primary-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="ml-1">{post.comments.length}</span>
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <NewPostModal
        isOpen={showNewPostModal}
        onCloseAction={() => setShowNewPostModal(false)}
        onSave={handleCreatePost}
      />
    </div>
  )
} 