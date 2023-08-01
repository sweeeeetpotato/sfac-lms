import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import useAuth from "@/hooks/user/useAuth";
import useUsername from "@/hooks/user/useUserName";
import useUserProfileImage from "@/hooks/user/useUserProfileImage";
import { useDispatch } from "react-redux";
import { useAddComment } from "@/hooks/mutation/useAddComment";
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";
import UserImage from "./UserImage";

interface CommentFormProps {
  parentId?: string;
  lectureId: string;
  isReply?: boolean;
}
const CommentForm: FC<CommentFormProps> = ({
  parentId = "",
  lectureId,
  isReply,
}) => {
  const [comment, setComment] = useState("");
  const user = useAuth();
  const username = useUsername(user?.uid ?? null);
  const profileImage = useUserProfileImage(user?.uid ?? null);
  const mutation = useAddComment();
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && lectureId) {
      mutation.mutate({
        content: comment,
        lectureId: lectureId,
        parentId: parentId,
        userId: user.uid,
      });
      setComment("");
      if (!isReply) {
        dispatch(
          setModalVisibility({ modalName: "commentModalOpen", visible: false }),
        );
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="flex w-full h-25 flex-col space-x-4 items-start rounded-lg border text-gray-500 ">
      <div className="flex ml-4 mt-2">
        {profileImage && <UserImage profileImage={profileImage} />}
        <div className="ml-2 text-gray-500 mb-1 pt-[3px]">{username}</div>
      </div>
      <div className="flex w-full mb-2">
        <form onSubmit={handleSubmit} className="w-full flex pr-8">
          <textarea
            className="w-11/12 h-10 p-2 resize-none border-none rounded text-black outline-none"
            value={comment}
            onChange={handleInputChange}
            placeholder="댓글을 입력해주세요."
          />
          <div className="flex m-auto ml-2 justify-end w-40 pt-1">
            <button
              type="submit"
              disabled={!comment}
              className={`w-4/5 h-7 text-sm rounded-md float-right ${
                comment
                  ? "bg-blue-500 text-white hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              업로드
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
