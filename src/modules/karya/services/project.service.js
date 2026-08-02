import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const ProjectService = {
  /**
   * Fetch all projects from API
   * @returns {Promise<Array>}
   */
  async getProjects() {
    try {
      const response = await axios.get(`${API_URL}/gallery`)
      return response.data.data || response.data || []
    } catch (err) {
      console.error('Failed to fetch projects via service:', err.message)
      throw err
    }
  },

  /**
   * Filter projects by term and category
   * @param {Array} projects 
   * @param {string} search 
   * @param {string} category 
   * @param {string} sortBy 
   * @returns {Array}
   */
  filterProjects(projects, { search = '', category = 'All', sortBy = 'Terbaru' } = {}) {
    let result = [...projects]

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase().trim()
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.author.toLowerCase().includes(query) ||
        (p.tech && p.tech.some(t => t.toLowerCase().includes(query)))
      )
    }

    // Category filter
    if (category !== 'All') {
      result = result.filter(p => p.category === category)
    }

    // Sorting logic
    result.sort((a, b) => {
      if (sortBy === 'Terbaru') {
        return new Date(b.created_at || b.createdAt || 0) - new Date(a.created_at || a.createdAt || 0)
      }
      if (sortBy === 'Populer') {
        return (b.stars || 0) - (a.stars || 0)
      }
      if (sortBy === 'Nama A-Z') {
        return a.title.localeCompare(b.title)
      }
      return 0
    })

    return result
  },

  /**
   * Get featured projects
   * @param {Array} projects 
   * @returns {Array}
   */
  getFeaturedProjects(projects) {
    return projects.filter(p => p.featured)
  },

  /**
   * Get project by slug or ID
   * @param {Array} projects 
   * @param {string} slugOrId 
   * @returns {Object|null}
   */
  getProjectBySlug(projects, slugOrId) {
    return projects.find(p => p.slug === slugOrId || String(p.id) === slugOrId) || null
  }
}
