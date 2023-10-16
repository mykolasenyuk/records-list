import { useEffect } from "react";
import ReactDOM from "react-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.code !== "Escape") {
      return;
    }
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  };
  const onBackBtnClick = () => {
    onClose();
  };

  return ReactDOM.createPortal(
    <div
      className={
        "fixed w-screen h-screen z-50  flex justify-center items-center top-0 left-0 backdrop-blur-sm"
      }
    >
      <div className={"p-8 relative  bg-white rounded-xl drop-shadow-2xl"}>
        <button
          type={"button"}
          onClick={onClose}
          className={"absolute top-1 right-1 "}
        >
          <IoMdCloseCircleOutline size={"1.5rem"} />
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
