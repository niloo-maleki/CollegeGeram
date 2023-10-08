import React from "react";
import { ReactComponent as NotSwitch } from "assets/icons/notSwitch.svg";
import { ReactComponent as Switch } from "assets/icons/Switch.svg";

interface ISwicher {
  onClick: () => void;
  closeFraind?: boolean;
  bodyText?: string;
}
const Swicher = (props: ISwicher) => {
  const { onClick, closeFraind , bodyText } = props;
  return (
    <div
      onClick={onClick}
      className="flex gap-4 items-center self-start cursor-pointer"
    >
      {closeFraind ? <Switch className="fill-lightYellow" /> : <NotSwitch />}
      <span className="text-sm font-medium text-darkGreen">{bodyText}</span>
    </div>
  );
};

export default Swicher;
