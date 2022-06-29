import React, { useEffect, useState } from 'react'

import CardBeforeGame from './components/CardBeforeGame'
import CardInGame from './components/CardInGame'
import incomingCards from '../incomingData/incomingData'
import { AnimationProvider } from '../AnimationContext'

const flagStopCardFlip = [true]

function CompareCards() {

  // each type of card must be 2 pieces
  const [quantityCardsNotInGame, setQuantityCardsNotInGame] =
    useState(incomingCards.map(() => 2))
  // laid out cards that are ready to play
  const [cardsInGame, setCardsInGame] = useState([])
  // cards that opened
  const [cardsOpened, setCardsOpened] = useState([])
  const [startGame, setStartGame] = useState(false)

  const addCardsToPlay = (order) => {
    setQuantityCardsNotInGame((state) => {
      const newState = [...state]
      newState[order] -= 1
      return newState
    })
    setCardsInGame((state) => [...state, incomingCards[order]])
  }

  const restartGame = () => {
    setQuantityCardsNotInGame(incomingCards.map(() => 2))
    setCardsInGame([])
    setCardsOpened([])
    setStartGame(false)
  }

  useEffect(() => {
    const totalCardsNotInGame = quantityCardsNotInGame.reduce((prevReturn, item) => {
      return prevReturn + item
    })
    if (totalCardsNotInGame === 0) {
      setStartGame(true)
    }
  }, [quantityCardsNotInGame])

  return (
    <>
      <div className='incoming-cards-wrapper'>
        {incomingCards.map((item, index) =>
          <CardBeforeGame
            key={item}
            cardName={item}
            order={index}
            quantityCardsNotInGame={quantityCardsNotInGame[index]}
            add={addCardsToPlay}
          />)}
        <button
          className='repeat-game'
          onClick={restartGame}
        >Restart Game</button>
      </div>

      <div className='play-cards-wrapper'>
        <AnimationProvider>
          {cardsInGame.map((item, index) =>
            <CardInGame
              key={item + index}
              cardName={item}
              cardsOpened={cardsOpened}
              setCardsOpened={setCardsOpened}
              setCardsInGame={setCardsInGame}
              flagStopCardFlip={flagStopCardFlip}
              startGame={startGame}
            />
          )}
        </AnimationProvider>
      </div>
    </>
  )
}

export default CompareCards