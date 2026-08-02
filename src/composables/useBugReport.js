import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useBugReport() {
  const route = useRoute()

  const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdVzbUcWMzn6oMhFkY8yxCu8XxkEkRhgNsdujlG2yZIpBCBHw/viewform?usp=publish-editor'

  // Show bug report button on all routes EXCEPT tracker page
  const shouldShow = computed(() => {
    return route.path !== '/tracker'
  })

  return {
    FORM_URL,
    shouldShow
  }
}
