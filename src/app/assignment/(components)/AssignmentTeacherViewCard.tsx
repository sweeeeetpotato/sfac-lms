"use client";
import { useState } from "react";
import AssignmentModal from "./AssignmentModal";
import AssignmentProfileImage from "./AssignmentProfileImage";
import AssignmentFeedback from "./AssignmentFeedback";
import { User } from "@/types/firebase.types";
interface OwnProps {
  item: any;
}

const AssignmentTeacherViewCard: React.FC<OwnProps> = ({ item }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  console.log("item", item);

  return (
    <>
      <div
        className="flex justify-between items-start px-[21px] py-[24px] border rounded-[10px] gap-[5px] mb-[15px]"
        onClick={() => {
          setIsDetailOpen(true);
        }}
      >
        <div className="flex justify-start items-start gap-[14px]">
          <AssignmentProfileImage />
          <div>
            <div className="mb-[5px] flex justify-start items-center gap-[6px]">
              <span className="text-grayscale-100 text-[16px] font-[700]">
                김지은
              </span>
              <span className="w-[5px] h-[5px] bg-grayscale-20 rounded-full" />
              <span className="text-grayscale-40 text-[14px] font-[400]">
                수강생
              </span>
            </div>
            <p className="text-grayscale-40 text-[14px] font-[400] line-clamp-1">
              https://github.com/sniperfactory-official/sfac-lms-team-b/blob/develop/src/app/globals.css
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-end basis-[80px] shrink-0">
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <circle cx="9.98193" cy="9.5" r="9" fill="#FF3A3A" />{" "}
            <path
              d="M14.0737 14.5H12.2964L7.94873 8.21094H7.8667V14.5H5.81592V4.60156H7.62061L11.9409 10.8906H12.0366V4.60156H14.0737V14.5Z"
              fill="white"
            />{" "}
          </svg>
          <p className="text-grayscale-40 text-[14px] font-[500] mt-[5px]">
            2023/06/29
          </p>
        </div>
      </div>

      <AssignmentModal
        title="상세보기"
        isOpen={isDetailOpen}
        isBottomButton={false}
        onClose={() => {
          setIsDetailOpen(false);
        }}
      >
        <AssignmentFeedback />
      </AssignmentModal>
    </>
  );
};

export default AssignmentTeacherViewCard;
