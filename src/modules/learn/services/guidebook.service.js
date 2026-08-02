import guidebooks from '../data/guidebooks.js'

/**
 * Service to handle guidebook data retrieval, search, filter, and sort.
 * Isolated from raw components to allow easy database integration later.
 */
export const GuidebookService = {
  /**
   * Fetches all published guidebooks.
   * @returns {Promise<Array>}
   */
  async getGuidebooks() {
    // Mimic database async call latency
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(guidebooks.filter(g => g.published))
      }, 100)
    })
  },

  /**
   * Performs client-side search, filtering, and sorting based on dynamic query parameters.
   * @param {Object} params
   * @param {string} params.search
   * @param {string} params.category
   * @param {string} params.sortBy
   * @returns {Promise<Array>}
   */
  async queryGuidebooks({ search = '', category = 'Semua', sortBy = 'Featured' } = {}) {
    const all = await this.getGuidebooks()
    let results = [...all]

    // Search query resolution (title, technology, category)
    if (search.trim()) {
      const query = search.toLowerCase().trim()
      results = results.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.technology.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      )
    }

    // Category filter resolution
    if (category !== 'Semua') {
      const catQuery = category.toLowerCase().trim()
      results = results.filter(item => item.category.toLowerCase() === catQuery)
    }

    // Sort order resolution
    results.sort((a, b) => {
      if (sortBy === 'Featured') {
        // Featured entries first, then fallback to title comparison
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return a.title.localeCompare(b.title)
      }
      
      if (sortBy === 'Newest') {
        // Chronological descending sort order
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      }

      if (sortBy === 'Alphabet') {
        // Alphabetic order ascending
        return a.title.localeCompare(b.title)
      }

      return 0
    })

    return results
  }
}
