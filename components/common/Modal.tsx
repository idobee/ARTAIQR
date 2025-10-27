import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import XIcon from '../icons/XIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-brand-gray rounded-lg shadow-2xl w-full max-w-md p-6 relative transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-brand-dark pb-3 mb-4">
          <h2 className="text-2xl font-serif text-brand-gold">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-brand-dark transition-colors" aria-label="Close modal">
            <XIcon className="h-6 w-6 text-gray-400" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;