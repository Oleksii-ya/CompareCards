import React from 'react'

function CardBeforeGame({ cardName, order, quantityCardsNotInGame, add }) {

  if (quantityCardsNotInGame < 1) {
    return ""
  }

  return (
    <span
      className='compare-items'
      onClick={() => add(order)}
    >
      {cardName}
    </span>
  )
}

export default CardBeforeGame