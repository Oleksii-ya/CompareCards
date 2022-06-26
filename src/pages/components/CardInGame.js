import React, { useState } from "react";

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

  const handlerCardClick = (event) => {
    if (!flagStopCardFlip[0]) {
      return;
    }
    setFrontSide(!frontSide);
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
      setTimeout(() => {
        setFrontSide(frontSide);
        flagStopCardFlip[0] = true;
      }, 1500);
    }

    if (cardsOpened[0] === name) {
      
      flagStopCardFlip[0] = false;
      setTimeout(() => {
        setCardsInGame((state) => {
          return state.filter((item) => {
            return item !== name;
          });
        });
        setCardsOpened([]);

        flagStopCardFlip[0] = true;
      }, 1500);
    }
  };

  return (
    <div
      className={frontSide ? "front-side play-card" : "play-card"}
      onClick={startGame ? handlerCardClick : () => { }}
    >
      {frontSide ? name : ""}
    </div>
  );
}

export default CardInGame;
