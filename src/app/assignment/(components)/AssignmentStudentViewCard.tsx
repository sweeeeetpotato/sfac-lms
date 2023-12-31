"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/firebase.types";
import { Avatar, Text, Button } from "sfac-designkit-react";
import { ISubmittedAssignment } from "@/hooks/queries/useGetSubmittedAssignment";
import AssignmentModal from "./AssignmentModal";
import AssignmentSubmitWithLink from "./AssignmentSubmitWithLink";
import AssignmentSubmitWithFile from "./AssignmentSubmitWithFile";
import AssignmentFeedback from "./AssignmentFeedback";

interface IStudentViewCardProps {
  user: User;
  assignmentId: string;
  submittedAssignment: ISubmittedAssignment | null;
}

const AssignmentStudentViewCard = ({
  user,
  assignmentId,
  submittedAssignment,
}: IStudentViewCardProps) => {
  const [submittedAssignmentState, setSubmittedAssignment] = useState<
    ISubmittedAssignment | null | undefined
  >(undefined);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    if (submittedAssignment) {
      let copySubmittedAssignment = { ...submittedAssignment };
      setSubmittedAssignment(copySubmittedAssignment);
    } else if (submittedAssignment === null) {
      setSubmittedAssignment(undefined);
      setIsDetailOpen(false);
    }
  }, [submittedAssignment]);

  return (
    <>
      <div className="flex justify-between items-center px-[21px] py-[24px] border rounded-[10px]">
        <div className="flex justify-start items-center gap-[14px]">
          <Avatar
            src={user.profileImage}
            ringColor="ring-grayscale-10"
            className="ring-1"
          />
          <div>
            <div className="mb-[5px] flex justify-start items-center gap-[6px]">
              <Text size="base" weight="bold" className="text-grayscale-100">
                {user.username}
              </Text>
              <span className="w-[5px] h-[5px] bg-grayscale-20 rounded-full" />
              <Text size="sm" weight="medium" className="text-grayscale-40">
                {user.role}
              </Text>
            </div>
            <span className="py-[4px] px-[10px] text-[10px] font-[400] text-grayscale-60 rounded-[4px] bg-grayscale-5">
              {submittedAssignment ? "제출 완료" : "제출 전"}
            </span>
          </div>
        </div>
        <div>
          {!submittedAssignment ? (
            // 제출 전
            <div className="flex justify-end items-center gap-[14px]">
              <Button
                variant="secondary"
                text="파일 첨부"
                className="max-w-[115px] whitespace-nowrap flex justify-center items-center"
                asChild
                onClick={() => {
                  setIsFileOpen(true);
                }}
              />
              <Button
                variant="secondary"
                text="링크"
                className="max-w-[115px] whitespace-nowrap flex justify-center items-center"
                asChild
                onClick={() => {
                  setIsLinkOpen(true);
                }}
              />
            </div>
          ) : (
            // 제출 후
            <div>
              <Button
                variant="primary"
                text="확인하기"
                className="max-w-[115px] whitespace-nowrap flex justify-center items-center"
                asChild
                onClick={() => {
                  setIsDetailOpen(true);
                }}
              />
            </div>
          )}
        </div>
      </div>
      {/* 과제: 링크 제출 */}
      <AssignmentModal
        title="과제 제출"
        isOpen={isLinkOpen}
        isBottomButton={true}
        onClose={() => {
          setIsLinkOpen(false);
        }}
      >
        {isLinkOpen ? (
          <AssignmentSubmitWithLink
            assignmentId={assignmentId}
            userId={user.id}
            onClose={() => {
              setIsLinkOpen(false);
            }}
          />
        ) : null}
      </AssignmentModal>
      {/* 과제: 파일 제출 */}
      <AssignmentModal
        title="과제 제출"
        isOpen={isFileOpen}
        isBottomButton={true}
        onClose={() => {
          setIsFileOpen(false);
        }}
      >
        {isFileOpen ? (
          <AssignmentSubmitWithFile
            assignmentId={assignmentId}
            userId={user.id}
            onClose={() => {
              setIsFileOpen(false);
            }}
          />
        ) : null}
      </AssignmentModal>

      {/* 과제: 과제 상세 */}
      <AssignmentModal
        title="상세보기"
        isOpen={isDetailOpen}
        isBottomButton={false}
        onClose={() => {
          setIsDetailOpen(false);
        }}
      >
        {isDetailOpen ? (
          <AssignmentFeedback
            submittedAssignment={submittedAssignmentState}
            assignmentId={assignmentId}
            loginUser={user}
            setIsDetailOpen={setIsDetailOpen}
          />
        ) : null}
      </AssignmentModal>
    </>
  );
};

export default AssignmentStudentViewCard;
