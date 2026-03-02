import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../Store/ModalSlice";

type RootState = {
  modal: {
    isOpen: boolean;
    content: React.ReactNode | null;
  };
};

const Modal = () => {
  const { isOpen, content } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[3px]"
      onClick={() => dispatch(modalActions.closeModal())}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-11/12 max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => dispatch(modalActions.closeModal())}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
        >
          ✕
        </button>

        {content}
      </div>
    </div>
  );
};

export default Modal;