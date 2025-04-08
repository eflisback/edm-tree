import { Genre } from './types'

const flattenGenres = (genre: Genre): Genre[] => {
  let genres: Genre[] = [genre]

  genre.subgenres.forEach((subgenre) => {
    genres = genres.concat(flattenGenres(subgenre))
  })

  return genres
}

export const getRandomGenre = (genre: Genre): Genre => {
  const allGenres = flattenGenres(genre)

  const randomIndex = Math.floor(Math.random() * allGenres.length)

  return allGenres[randomIndex]
}
