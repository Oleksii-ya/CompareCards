import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimationContext } from "../../AnimationContext"

function CardInGame({
  cardName,
  cardsOpened,
  setCardsOpened,
  setCardsInGame,
  flagStopCardFlip,
  startGame
}) {
  const [name] = useState(cardName);
  const [frontSide, setFrontSide] = useState(false);
  const [nameForCompare, setNameForCompare] = useContext(AnimationContext);
  const flagCloseCard = useRef(false)
  const flagEqualCards = useRef(false)

  useEffect(() => {
    if (flagCloseCard.current) {
      setTimeout(() => {
        setFrontSide((frontSide) => !frontSide);
        flagStopCardFlip[0] = true;
        flagCloseCard.current = false;
      }, 1500);
    }
  }, [flagCloseCard.current])

  useEffect(() => {
    if (flagEqualCards.current) {
      setTimeout(() => {
        setCardsInGame((state) => {
          return state.filter((item) => {
            return item !== name;
          });
        });
        setCardsOpened([]);
        flagStopCardFlip[0] = true;
        flagEqualCards.current = false;
      }, 1500);
    }
  }, [flagEqualCards.current])

  const handlerCardClick = (event) => {
    if (!flagStopCardFlip[0]) {
      return;
    }
    setFrontSide((frontSide) => !frontSide);
    const numberOpenedCards = cardsOpened.length;
    const isCurrrentCardOpened = !!event.target.textContent;

    // Start game, no opened card
    if (numberOpenedCards === 0) {
      setCardsOpened([name]);
      return;
    }

    // Have just one opened cart
    if (isCurrrentCardOpened) {
      setCardsOpened([]);
      return;
    }

    if (cardsOpened[0] !== name) {
      flagStopCardFlip[0] = false;
      flagCloseCard.current = true;
    }

    if (cardsOpened[0] === name) {
      flagStopCardFlip[0] = false
      setNameForCompare(name)
      flagEqualCards.current = true
    }
  };

  const animationClass = name === nameForCompare ? "hide-animation" : ""

  return (
    <div
      className={frontSide ? `front-side play-card ${animationClass}` : `play-card`}
      onClick={startGame ? handlerCardClick : () => { }}
    >
      {frontSide ? name : ""}
    </div>
  );
}

export default CardInGame;
