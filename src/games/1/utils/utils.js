// WORLD

export function getWorldRatio () {
  return 1 / 1920 * window.innerWidth
}

export const loadSVG = {
  methods: {
    loadSVG (name) {
      return require(`../assets/svg/${name}.svg`)
    }
  }
}
