interface ILoadingSpinnerProps {
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  fullScreen = false,
}: ILoadingSpinnerProps) {
  const spinnerContainerClass = fullScreen
    ? "fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50"
    : "flex justify-center items-center w-full h-full";

  return (
    <div className={spinnerContainerClass}>
      <div className="absolute left-0 top-0 w-full h-full bg-white"></div>
      <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin w-6 h-6"></div>
    </div>
  );
}
