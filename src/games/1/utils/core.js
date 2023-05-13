import {
  maxHealth,
  maxFood,
  handSize,
  cardUid,
  currentPlayingCard,
  state
} from '../state/state'
import {
  cards
} from '../state/cards'

// GAME
// Pile

export function drawCard () {
  if (getDrawPileCount() === 0) {
    refillPile()
  }

  const choice = Math.round(Math.random() * (getDrawPileCount() - 1)) + 1

  let	accumulation = 0
  for (const k in state.drawPile) {
    accumulation += state.drawPile[k]
    if (choice <= accumulation) {
      // Draw the card from the pile
      state.drawPile[k]--
      return {
        id: k,
        uid: cardUid++,
        def: cards[k]
      }
    }
  }
}

export function drawInitialHand (player) {
  for (let i = 0; i < handSize; i++) {
    player.hand.push(drawCard())
  }
}

export function addCardToPile (pile, cardId) {
  if (typeof pile[cardId] === 'number') {
    pile[cardId]++
  } else {
    pile[cardId] = 1
  }
}

export function refillPile () {
  Object.assign(state.drawPile, state.discardPile)
  state.discardPile = {}
}

export function getDrawPileCount () {
  let result = 0
  for (const k in state.drawPile) {
    result += state.drawPile[k]
  }
  return result
}

// Card play

export function applyCardEffect (card) {
  state.currentPlayer.lastPlayedCardId = card.id
  card.def.play(state.currentPlayer, state.currentOpponent)
  // Check if the stats (health, food) are not outside the boundaries
  state.players.forEach(checkStatsBounds)
}

export function getLastPlayedCard (player) {
  return cards[player.lastPlayedCardId]
}

// Player

export function checkStatsBounds (player) {
  // Health
  if (player.health < 0) {
    player.health = 0
  } else if (player.health > maxHealth) {
    player.health = maxHealth
  }

  // Food
  if (player.food < 0) {
    player.food = 0
  } else if (player.food > maxFood) {
    player.food = maxFood
  }
}

export function checkPlayerLost (player) {
  player.dead = (player.health === 0 || player.food === 0)
}

export function isOnePlayerDead () {
  return state.players.some(p => p.dead)
}

// Game Play
state.activeOverlay = 'player-turn'

export function beginGame () {
  state.players.forEach(drawInitialHand)
}

export function playCard (card) {
  if (state.canPlay) {
    state.canPlay = false
    currentPlayingCard = card

    // Remove the card from player hand
    const index = state.currentPlayer.hand.indexOf(card)
    state.currentPlayer.hand.splice(index, 1)

    // Add the card to the discard pile
    addCardToPile(state.discardPile, card.id)
  }
}

export function applyCard () {
  const card = currentPlayingCard

  applyCardEffect(card)

  // Wait a bit for the player to see what's going on
  setTimeout(() => {
    // Check if the players are dead
    state.players.forEach(checkPlayerLost)

    if (isOnePlayerDead()) {
      endGame()
    } else {
      nextTurn()
    }
  }, 700)
}

export function nextTurn () {
  state.turn++
  state.currentPlayerIndex = state.currentOpponentId
  state.activeOverlay = 'player-turn'
}

export function newTurn () {
  state.activeOverlay = null
  if (state.currentPlayer.skipTurn) {
    skipTurn()
  } else {
    startTurn()
  }
}

export function skipTurn () {
  state.currentPlayer.skippedTurn = true
  state.currentPlayer.skipTurn = false
  nextTurn()
}

export function startTurn () {
  state.currentPlayer.skippedTurn = false
  if (state.turn > 2) {
    // Draw new card
    setTimeout(() => {
      state.currentPlayer.hand.push(drawCard())
      state.canPlay = true
    }, 800)
  } else {
    state.canPlay = true
  }
}

export function endGame () {
  state.activeOverlay = 'game-over'
}
