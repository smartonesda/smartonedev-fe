/**
 * useSeoMeta — composable untuk set <title>, meta description, dan OG tags per halaman.
 * Dipanggil di dalam <script setup> setiap view.
 */

const SITE_NAME = 'SmartOneDev'
const DEFAULT_IMAGE = '/assets/images/light-smartone.png'

/**
 * @param {Object} options
 * @param {string} options.title       - Judul halaman (tanpa suffix site name)
 * @param {string} options.description - Deskripsi halaman
 * @param {string} [options.image]     - URL OG image (opsional, default light-smartone.png)
 * @param {string} [options.type]      - OG type (default: 'website')
 * @param {string} [options.url]       - Canonical URL (opsional)
 */
export function useSeoMeta({ title, description, image, type = 'website', url } = {}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const ogImage = image || DEFAULT_IMAGE

  // Helpers
  const setMeta = (selector, attr, value) => {
    let el = document.querySelector(selector)
    if (!el) {
      el = document.createElement('meta')
      const [attrName, attrVal] = selector.match(/\[([^=]+)="([^"]+)"\]/)?.slice(1) ?? []
      if (attrName) el.setAttribute(attrName, attrVal)
      document.head.appendChild(el)
    }
    el.setAttribute(attr, value)
  }

  const setLink = (rel, href) => {
    let el = document.querySelector(`link[rel="${rel}"]`)
    if (!el) {
      el = document.createElement('link')
      el.setAttribute('rel', rel)
      document.head.appendChild(el)
    }
    el.setAttribute('href', href)
  }

  // Title
  document.title = fullTitle

  // Primary meta
  setMeta('meta[name="description"]', 'content', description)

  // OG
  setMeta('meta[property="og:title"]', 'content', fullTitle)
  setMeta('meta[property="og:description"]', 'content', description)
  setMeta('meta[property="og:image"]', 'content', ogImage)
  setMeta('meta[property="og:type"]', 'content', type)
  if (url) setMeta('meta[property="og:url"]', 'content', url)

  // Twitter
  setMeta('meta[name="twitter:title"]', 'content', fullTitle)
  setMeta('meta[name="twitter:description"]', 'content', description)
  setMeta('meta[name="twitter:image"]', 'content', ogImage)

  // Canonical
  if (url) setLink('canonical', url)
}
