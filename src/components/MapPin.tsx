interface MapPinProps {
  top: string;
  left: string;
  label: string;
  onClick: () => void;
  isActive: boolean;
}

export default function MapPin({ top, left, label, onClick, isActive }: MapPinProps) {
  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer group z-10 transition-transform duration-300 hover:scale-110"
      style={{ top, left, transform: 'translate(-50%, -50%)' }}
      onClick={onClick}
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        <div
          className={`absolute inset-0 rounded-full bg-red-500 animate-ping ${
            isActive ? 'opacity-100 scale-150' : 'opacity-0'
          }`}
        ></div>
        <div
          className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-colors duration-300 ${
            isActive ? 'bg-yellow-400' : 'bg-red-600 group-hover:bg-yellow-400'
          }`}
        ></div>
      </div>

      <div
        className={`mt-2 px-3 py-1 rounded-full text-xs font-bold shadow-md transition-all duration-300 border ${
          isActive
            ? 'bg-yellow-400 text-slate-900 border-white scale-110'
            : 'bg-white/90 text-slate-900 border-slate-100 opacity-80 group-hover:opacity-100'
        }`}
      >
        {label}
      </div>
    </div>
  );
}
