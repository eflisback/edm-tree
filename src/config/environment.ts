export const BACKEND_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000/api'
    : 'https://api.edmtree.app/api'
