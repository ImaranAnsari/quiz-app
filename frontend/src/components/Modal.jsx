import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
        <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button className="modal__close" onClick={onClose} aria-label="Close modal">
                    <X size={16} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
