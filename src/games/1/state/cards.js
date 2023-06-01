let cards = [
  {
    id: 'pikemen', // service marketing
    type: 'attack',
    title: 'Service Marketing',
    description: 'Spend 1 <b>Repertory</b><br>Deal 1 <b>Capital</b>',
    note: 'Meet customer needs by providing high quality service.',
    play (player, opponent) {
      player.food -= 1
      opponent.health -= 1
    }
  },
  {
    id: 'catapult', // Thero CRM
    type: 'attack',
    title: 'Thero CRM',
    description: 'Spend 2 <b>Repertory</b><br>Deal 2 <b>Capital</b>',
    play (player, opponent) {
      player.food -= 2
      opponent.health -= 2
    }
  },
  {
    id: 'trebuchet', // Thero STP
    type: 'attack',
    title: 'Thero STP',
    description: 'Spend 3 <b>Repertory</b><br>Take 1 <b>Capital</b><br>Deal 4 <b>Capital</b>',
    note: 'Market segmentation, target market and positioning theory!',
    play (player, opponent) {
      player.food -= 3
      player.health -= 1
      opponent.health -= 4
    }
  },
  {
    id: 'archers', // Theory 4P
    type: 'attack',
    title: 'Theory 4P',
    description: 'Spend 3 <b>Repertory</b><br>Deal 3 <b>Capital</b>',
    note: 'Product, Price, Promotion, Place.(Remember them!)',
    play (player, opponent) {
      player.food -= 3
      opponent.health -= 3
    }
  },
  {
    id: 'knighthood', // Theory 5C
    type: 'attack',
    title: 'Theory 5C',
    description: 'Spend 7 <b>Repertory</b><br>Deal 5 <b>Capital</b>',
    note: 'Customer, Company, Competition, Channel and Context.(Customer first!)',
    play (player, opponent) {
      player.food -= 7
      opponent.health -= 5
    }
  },
  {
    id: 'repair', // financing
    type: 'support',
    title: 'Financing',
    description: 'Repair 5 <b>Capital</b><br>Skip your next turn',
    play (player, opponent) {
      player.skipTurn = true
      player.health += 5
    }
  },
  {
    id: 'quick-repair', // marketing
    type: 'support',
    title: 'Marketing',
    description: 'Spend 3 <b>Repertory</b><br>Repair 3 <b>Capital</b>',
    note: 'Marketing is very important for businesses!',
    play (player, opponent) {
      player.food -= 3
      player.health += 3
    }
  },
  {
    id: 'farm', // supply chain
    type: 'support',
    title: 'Supply Chain',
    description: 'Gather 5 <b>Repertory</b><br>Skip your next turn',
    note: '&#171;The advantage in the supply chain is temporary.&#187;',
    play (player, opponent) {
      player.skipTurn = true
      player.food += 5
    }
  },
  {
    id: 'granary', // production plan
    type: 'support',
    title: 'Production Plan',
    description: 'Gather 2 <b>Repertory</b>',
    play (player, opponent) {
      player.food += 2
    }
  },
  {
    id: 'poison', // cost leadership
    type: 'special',
    title: 'Cost Leadership',
    description: 'Spend 1 <b>Capital</b><br>Your opponent lose 3 <b>Capital</b>',
    note: 'Reduce costs and offer products at lower prices to gain market share.',
    play (player, opponent) {
      player.health -= 1
      opponent.health -= 3
    }
  },
  {
    id: 'fireball', // innovate
    type: 'special',
    title: 'Innovate',
    description: 'Take 3 <b>Capital</b><br>Deal 5 <b>Capital</b><br>Skip your turn',
    note: 'Enhance the core competitiveness of enterprises through innovation.',
    play (player, opponent) {
      player.health -= 3
      player.skipTurn = true
      opponent.health -= 5
    }
  },
  {
    id: 'chapel', // SWOT
    type: 'special',
    title: 'SWOT!',
    description: 'Do nothing',
    note: 'Conduct a SWOT analysis of the business and wait for new opportunities.',
    play (player, opponent) {
      // Nothing happens...
    }
  },
  {
    id: 'curse', // price war
    type: 'special',
    title: 'Price War',
    description: 'Everyone:<br>Lose 3 <b>Repertory</b><br>Take 3 <b>Capital</b>',
    play (player, opponent) {
      player.food -= 3
      player.health -= 3
      opponent.food -= 3
      opponent.health -= 3
    }
  },
  {
    id: 'miracle', // coopetition
    type: 'special',
    title: 'Co-opetition',
    description: 'Everyone:<br>Gather 3 <b>Repertory</b><br>Repair 3 <b>Capital</b>',
    play (player, opponent) {
      player.food += 3
      player.health += 3
      opponent.food += 3
      opponent.health += 3
    }
  }
]

cards = cards.reduce((map, card) => {
  card.description = card.description.replace(/\d+\s+<b>.*?<\/b>/gi, '<span class="effect">$&</span>')
  card.description = card.description.replace(/<b>(.*?)<\/b>/gi, (match, p1) => {
    const id = p1.toLowerCase()
    return `<b class="keyword ${id}">${p1} <img src="${require('../assets/svg/' + id + '.svg')}"/></b>`
  })
  map[card.id] = card
  return map
}, {})

const pile = {
  pikemen: 4,
  catapult: 4,
  trebuchet: 3,
  archers: 3,
  knighthood: 3,
  'quick-repair': 4,
  granary: 4,
  repair: 3,
  farm: 3,
  poison: 2,
  fireball: 2,
  chapel: 2,
  curse: 1,
  miracle: 1
}

export {
  cards,
  pile
}
