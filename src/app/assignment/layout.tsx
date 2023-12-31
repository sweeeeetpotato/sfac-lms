import React, { ReactNode } from "react";
import AssignmentLeftNav from "./(components)/AssignmentLeftNav";

interface Props {
  children: ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="max-w-[1024px] mx-auto my-0">
      <div>
        <div className="w-full flex mb-[20px]">
          <div className="w-1/5 h-100 flex items-center justify-start flex-col ml-[20px]">
            <AssignmentLeftNav />
          </div>
          <div className="w-4/5 ml-[50px]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default layout;
