import React, { useEffect, useState } from "react";
import { Toast } from "sfac-designkit-react";

type tPageToastProps = {
  toastMsg: string; // 토스트메세지
  isAccept: boolean; // ui변경(green/red)
  onClose: () => void;
};

const PageToast = ({ toastMsg, isAccept, onClose }: tPageToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    const closeTimer = setTimeout(() => {
      onClose();
    }, 1800); // 하단 duration에 맞게 조정

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`relative transition-all duration-300 ${
        visible ? "opacity-100 top-0" : "opacity-0 pointer-events-none top-2"
      }`}
    >
      <Toast
        className="w-auto inline-block min-w-[360px]"
        type={isAccept ? "Success" : "Error"}
        text={toastMsg}
      />
    </div>
  );
};

export default PageToast;
