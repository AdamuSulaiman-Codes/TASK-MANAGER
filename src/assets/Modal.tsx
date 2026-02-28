// components/Modal.tsx
import React, { type ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../Store/ModalSlice";


interface ModalProps {
  children: ReactNode;
  title?: string;
}

type RootState = {
  modal: {
    isOpen: boolean;
  };
};

const Modal: React.FC<ModalProps> = ({ children, title }) => {
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[3px]">
      <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={() => dispatch(modalActions.closeModal())}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
        >
          ✕
        </button>

        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;