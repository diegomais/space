export const getBackgroundImage = (id: string): string => {
  const backgrounds = [
    '/images/galaxy.jpg',
    '/images/iss.jpg',
    '/images/moon.jpg'
  ]

  return `url(${backgrounds[Number(id) % backgrounds.length]})`
}
