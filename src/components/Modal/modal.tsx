import type { FC, ReactNode } from "react";
import style from './modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div
        className={style.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={style.modalClose} onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};
