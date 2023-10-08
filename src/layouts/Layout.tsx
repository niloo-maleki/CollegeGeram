import React, { ReactNode } from "react";
import dryTree from "assets/icons/dry-tree.svg";

interface IlayoutProps {
  children: ReactNode;
  showDryTree?: boolean;
}
const Layout = (props: IlayoutProps) => {
  const { children, showDryTree = true } = props;

  return (
    <div className="flex flex-grow justify-center items-center w-full bg-layoutGray overflow-y-auto h-full md:h-fit">
      <div className="flex flex-col items-center justify-center w-full">
        {children}
        {showDryTree && (
          <div className="flex items-center justify-center mt-20 w-40">
            <img src={dryTree} alt="dryTree" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
