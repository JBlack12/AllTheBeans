import React, { useState } from "react";
import { Tooltip } from "shards-react";

export function CustomTooltip({ SubmitTip }) {
  const [requiredToolTips] = useState([
    {
      id: "#name",
      message: "The name is required to be at least 5 characters",
    },
    {
      id: "#date",
      message:
        'The date is required to be in the format "MM/DD/YYYY", or you can use the calender available by clicking on the icon to the right',
    },
    { id: "#price", message: "The price is required to be a number value" },
    {
      id: "#colour",
      message: "The colour is required to be at least 3 characters",
    },
    {
      id: "#aroma",
      message: "The aroma is required to be at least 5 characters",
    },
    {
      id: "#image",
      message: 'The image file you attach must be either a "JPG" or "PNG"',
    },
  ]);

  return requiredToolTips.map((tipObject, index) => {
    return <TooltipStructure key={index} tips={tipObject}></TooltipStructure>;
  });
}

function TooltipStructure({ tips }) {
  const [display, setDisplay] = useState(false);
  function toggle() {
    setDisplay(!display);
  }
  return (
    <Tooltip open={display} target={tips.id} toggle={() => toggle()}>
      {tips.message}
    </Tooltip>
  );
}
