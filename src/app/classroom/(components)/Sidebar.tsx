import CourseList from "./sidebar/CourseList";
import { ICourseField } from "@/hooks/queries/useGetCourseList";
import SectionHandlerButton from "./sidebar/SectionHandlerButton";
import EditButton from "./sidebar/EditButton";
import React, { forwardRef, useRef } from "react";
import useClickOutside from "@/hooks/classroom/useClickOutside";
import { useDispatch } from "react-redux";
import useCreateSection from "@/hooks/classroom/useCreateSection";
import useLectureOrder from "@/hooks/classroom/useLectureOrder";

interface IProps {
  courseList: ICourseField[];
  setCurrentCourse: React.Dispatch<React.SetStateAction<any>>;
}

const Sidebar = forwardRef<HTMLDivElement, IProps>(
  ({ courseList, setCurrentCourse }) => {
    const { handleCreateSection } = useCreateSection({
      courseList,
      setCurrentCourse,
    });
    const { getBackLectureOrderTrigger, setGetBackLectureOrderTrigger } =
      useLectureOrder(courseList);
    const sidebarRef = useRef<HTMLDivElement>(null);
    useClickOutside(
      sidebarRef,
      setGetBackLectureOrderTrigger,
      getBackLectureOrderTrigger,
    );

    return (
      <aside
        ref={sidebarRef}
        className="w-1/5 h-100 flex items-center flex-col mr-[20px] pt-[50px]"
      >
        <CourseList
          courseList={courseList}
          setCurrentCourse={setCurrentCourse}
        />
        <SectionHandlerButton
          text="섹션 추가"
          src="/images/plus.svg"
          onClick={handleCreateSection}
        />
        <EditButton />
      </aside>
    );
  },
);

export default Sidebar;
