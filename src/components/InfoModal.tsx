import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function InfoModal({ isOpen, onClose, title, content }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">{content}</p>
        </div>
      </div>
    </div>
  );
}
