import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, addDoc, DocumentReference } from "firebase/firestore";
import { db } from "@utils/firebase";
import { Attachment, SubmittedAssignment } from "@/types/firebase.types";

const submitAssignment = async (
  assignmentId: string,
  submitAssignmentValue: SubmittedAssignment,
  attachmentValue: Attachment,
): Promise<DocumentReference> => {
  try {
    const assignmentRef = doc(db, "assignments", assignmentId);

    const addSubmittedAssignmentData = await addDoc(
      collection(db, "submittedAssignments"),
      { submitAssignmentValue },
    );

    await addDoc(collection(db, "attachment"), {
      ...attachmentValue,
      submittedAssignmentId: "서브밋참조",
      useId: "유저참조",
    });

    // submittedAssignment안에 서브컬렉션으로 feedbacks가 존재하므로 넣어줌
    await addDoc(
      collection(
        db,
        "submittedAssignments",
        addSubmittedAssignmentData.id,
        "feedbacks",
      ),
      {},
    );

    return addSubmittedAssignmentData;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const useSubmitAssignmnet = (
  assignmentId: string,
  submitAssignmentValue: SubmittedAssignment,
  attachmentValue: Attachment,
) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    () =>
      submitAssignment(assignmentId, submitAssignmentValue, attachmentValue),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getSubmittedAssignment", assignmentId]);
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  return { mutate, isLoading, error };
};

export { useSubmitAssignmnet };
