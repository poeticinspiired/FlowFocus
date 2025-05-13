'use client'

import { useState } from 'react'
import { Post } from '../types'

interface NewPostModalProps {
  isOpen: boolean
  onCloseAction: () => void
  onSave: (post: Omit<Post, 'id' | 'author' | 'createdAt' | 'updatedAt' | 'likes' | 'comments'>) => void
}

const categories = [
  { value: 'ibadah', label: 'Ibadah', description: 'Acts of worship and spiritual development' },
  { value: 'ilm', label: 'Ilm', description: 'Seeking knowledge and learning' },
  { value: 'khidmah', label: 'Khidmah', description: 'Service to community and others' },
  { value: 'personal', label: 'Personal', description: 'Personal development and well-being' },
  { value: 'work', label: 'Work', description: 'Professional and career development' },
]

export default function NewPostModal({ isOpen, onCloseAction, onSave }: NewPostModalProps) {
  const [formData, setFormData] = useState({
    content: '',
    category: 'ibadah' as Post['category'],
    tags: '',
    authorId: '1', // This would come from the authenticated user
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      barakahScore: 0, // This would be calculated based on content analysis
    })
    onCloseAction()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Create New Post</h3>
              <p className="mt-1 text-sm text-gray-500">
                Share your thoughts, achievements, or questions with the community.
              </p>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                id="content"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="What's on your mind?"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Post['category'] })}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label} - {category.description}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="e.g., quran, study-group, achievement"
              />
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
              >
                Post
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                onClick={onCloseAction}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 