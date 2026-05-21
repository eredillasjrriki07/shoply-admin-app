// app/components/ui/Modal.tsx
import { useEffect, useRef } from "react";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
};

const Modal = ({ open, onClose, title, children }: ModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open && !dialog.open) {
            dialog.showModal();
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    // Close when ESC is pressed or backdrop is clicked
    function handleClick(e: React.MouseEvent<HTMLDialogElement>) {
        if (e.target === dialogRef.current) onClose();
    }

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onClick={handleClick}
            className="fixed inset-0 m-auto w-full max-w-xl rounded-lg p-0 backdrop:bg-black/40"
        >
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                    ✕
                </button>
            </div>
            <div className="px-6 py-5">{children}</div>
        </dialog>
    );
};

export default Modal;