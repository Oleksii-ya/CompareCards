import React, { useState } from 'react'

import CardBeforeGame from './components/CardBeforeGame'
import CardInGame from './components/CardInGame'
import incomingCards from '../incomingData/incomingData'
const flagStopCardFlip = [true];

function CompareCards() {
 
  // each type of card must be 2 pieces
  const [quantityCardsNotInGame, setQuantityCardsNotInGame] =
    useState(incomingCards.map(() => 2))
  // laid out cards that are ready to play
  const [cardsInGame, setCardsInGame] = useState([])
  // cards that opened
  const [cardsOpened, setCardsOpened] = useState([])

  const addCardsToPlay = (order) => {
    setQuantityCardsNotInGame((state) => {
      const newState = [...state]
      newState[order] -= 1
      return newState
    })
    setCardsInGame((state) => [...state, incomingCards[order]])
  }

  return (
    <>
      {incomingCards.map((item, index) =>
        <CardBeforeGame
          key={item}
          cardName={item}
          order={index}
          quantityCardsNotInGame={quantityCardsNotInGame[index]}
          add={addCardsToPlay}
        />)}

      <div className='play-cards-wrapper'>
        {cardsInGame.map((item, index) =>
          <CardInGame
            key={item + index}
            cardName={item}
            cardsOpened={cardsOpened}
            setCardsOpened={setCardsOpened}
            setCardsInGame={setCardsInGame}

            flagStopCardFlip={flagStopCardFlip}
          />
        )}
      </div>
    </>
  )
}

export default CompareCards