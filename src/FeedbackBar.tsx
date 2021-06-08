import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCircle } from "@fortawesome/free-solid-svg-icons";
import { Result } from "./Types";

type FeedbackBarProps = {
  player: number;
  result: Result;
  resetGame: () => void;
};

const FeedbackBar = ({ player, result, resetGame }: FeedbackBarProps) => {

  let feedbackMessage
  if (result.winPlayer) {
    feedbackMessage = <span>
      Victoire joueur <FontAwesomeIcon icon={result.winPlayer === 1 ? faTimes : faCircle} />
    </span>
  } else if (result.draw) {
    feedbackMessage =
      <span>
        Egalité !
    </span>
  } else {
    feedbackMessage =
      <span>
        Au joueur <FontAwesomeIcon icon={player === 1 ? faTimes : faCircle} /> de jouer.
    </span>
  }

  return (
    <div className="FeedbackBar">
      <div className="FeedbackBar-message">
        {feedbackMessage}
      </div>
      <div>
        <button className="FeedbackBar-button" onClick={resetGame}>
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default FeedbackBar;
