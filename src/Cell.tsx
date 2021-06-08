import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCircle } from "@fortawesome/free-solid-svg-icons";

type CellProps = {
  value: number;
  winCell: boolean;
  victory: boolean;
  playCell?: () => void;
};

const Cell = ({ value, winCell, victory, playCell }: CellProps) => {
  // console.log(value);

  return (
    <div className={`Board-cell${value ? " played" : ""} ${winCell ? "winCell" : ""}`} onClick={victory || value ? undefined : playCell}>
      {!!value && <FontAwesomeIcon size="4x" icon={value === 1 ? faTimes : faCircle} />}
    </div>
  );
};

export default Cell;
