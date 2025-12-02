import { useEffect, useState, useRef } from 'react';
import { MapIcon, ZoomIn, ZoomOut, Maximize, Move } from 'lucide-react';
import { supabase, MapLocation } from '../lib/supabase';
import MapPin from '../components/MapPin';
import InfoModal from '../components/InfoModal';

const VIETNAM_COORDS = { x: 77.5, y: 56 };

const APEC_PARTNERS = [
  { name: 'USA', x: 22, y: 35 },
  { name: 'China', x: 79, y: 38 },
  { name: 'Japan', x: 86, y: 34 },
  { name: 'Russia', x: 75, y: 18 },
  { name: 'South Korea', x: 83, y: 36 },
  { name: 'Australia', x: 86, y: 75 },
  { name: 'Canada', x: 22, y: 25 },
  { name: 'Singapore', x: 77, y: 62 },
];

export default function InteractiveMap() {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;
  const ZOOM_STEP = 0.5;

  useEffect(() => {
    loadLocations();
    seedMapData();
  }, []);

  async function seedMapData() {
    const { data: existing } = await supabase
      .from('map_locations')
      .select('id')
      .limit(1);

    if (existing && existing.length > 0) return;
  }

  async function loadLocations() {
    try {
      const { data, error } = await supabase
        .from('map_locations')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setLocations(data || []);
    } catch (error) {
      console.error('Error loading locations:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + ZOOM_STEP, MAX_SCALE));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - ZOOM_STEP, MIN_SCALE);
      if (newScale === MIN_SCALE) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const clampPosition = (x: number, y: number, currentScale: number) => {
    if (!containerRef.current) return { x, y };
    if (currentScale === 1) return { x: 0, y: 0 };

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const scaledWidth = width * currentScale;
    const scaledHeight = height * currentScale;
    const maxDragX = (scaledWidth - width) / 2;
    const maxDragY = (scaledHeight - height) / 2;

    return {
      x: Math.min(Math.max(x, -maxDragX), maxDragX),
      y: Math.min(Math.max(y, -maxDragY), maxDragY),
    };
  };

  const onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (scale === 1) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y,
    });
  };

  const onPointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;
    setPosition(clampPosition(newX, newY, scale));
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  const renderConnectionLines = () => {
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {APEC_PARTNERS.map((partner, idx) => {
          const midX = (VIETNAM_COORDS.x + partner.x) / 2;
          const controlY = Math.min(VIETNAM_COORDS.y, partner.y) - 10;

          return (
            <g key={idx}>
              <path
                d={`M ${VIETNAM_COORDS.x} ${VIETNAM_COORDS.y} Q ${midX} ${controlY} ${partner.x} ${partner.y}`}
                fill="none"
                stroke="#ffc107"
                strokeWidth="0.3"
                strokeLinecap="round"
                filter="url(#glow)"
                className="animate-pulse"
                style={{
                  animation: `fadeIn 0.5s ease-out ${idx * 0.1}s forwards`,
                  opacity: 0,
                }}
              />
              <circle cx={partner.x} cy={partner.y} r="0.5" fill="#ffc107" className="animate-pulse" />
            </g>
          );
        })}
        <circle cx={VIETNAM_COORDS.x} cy={VIETNAM_COORDS.y} r="0.8" fill="#ef4444" className="animate-ping" />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <MapIcon className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold">Bản Đồ Tương Tác</h1>
            <p className="text-green-100 mt-2">
              Khám phá các địa điểm quan trọng trong lịch sử đoàn kết dân tộc và quốc tế
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-white">
        <div
          className="relative aspect-[16/9] bg-slate-900 overflow-hidden select-none touch-none"
          ref={containerRef}
        >
          <div
            ref={contentRef}
            className="w-full h-full relative origin-center transition-transform duration-100 ease-out"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            }}
            onMouseDown={onPointerDown}
            onMouseMove={onPointerMove}
            onMouseUp={onPointerUp}
            onMouseLeave={onPointerUp}
            onTouchStart={onPointerDown}
            onTouchMove={onPointerMove}
            onTouchEnd={onPointerUp}
          >
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')",
                filter: 'sepia(20%) saturate(80%) hue-rotate(190deg) contrast(110%)',
              }}
            ></div>

            <div className="absolute inset-0 bg-slate-900/10 pointer-events-none z-0"></div>

            {renderConnectionLines()}

            {locations.map((location) => (
              <MapPin
                key={location.id}
                top={`${location.latitude}%`}
                left={`${location.longitude}%`}
                label={location.name}
                isActive={selectedLocation?.id === location.id}
                onClick={() => {
                  if (!isDragging) setSelectedLocation(location);
                }}
              />
            ))}
          </div>

          <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
            <div className="bg-white/90 backdrop-blur shadow-lg rounded-lg border border-white/50 p-1 flex flex-col gap-1">
              <button
                onClick={handleZoomIn}
                disabled={scale >= MAX_SCALE}
                className="p-2 hover:bg-green-50 rounded-md text-slate-900 disabled:opacity-30 transition-colors"
                title="Phóng to"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={handleReset}
                className="p-2 hover:bg-green-50 rounded-md text-slate-900 transition-colors border-y border-gray-200"
                title="Đặt lại"
              >
                <Maximize className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomOut}
                disabled={scale <= MIN_SCALE}
                className="p-2 hover:bg-green-50 rounded-md text-slate-900 disabled:opacity-30 transition-colors"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {scale === 1 && (
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium text-slate-900 shadow-sm border border-white/50 pointer-events-none z-10 hidden md:block">
              Sử dụng nút +/- để phóng to
            </div>
          )}

          {scale > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/80 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 pointer-events-none z-20">
              <Move className="w-3 h-3" />
              Kéo để di chuyển
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50">
          <h3 className="font-bold text-slate-800 mb-4">Các địa điểm và đối tác</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className="text-left bg-white p-4 rounded-lg border-2 border-slate-200 hover:border-green-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-slate-800">{location.name}</h4>
                  {location.partnership_year && (
                    <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {location.partnership_year}
                    </span>
                  )}
                </div>
                {location.country && location.country !== location.name && (
                  <p className="text-xs text-slate-500 mb-1">{location.country}</p>
                )}
                <p className="text-sm text-slate-600 line-clamp-2">{location.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <InfoModal
        isOpen={selectedLocation !== null}
        onClose={() => setSelectedLocation(null)}
        title={selectedLocation?.name || ''}
        content={selectedLocation?.description || ''}
        country={selectedLocation?.country}
        partnershipYear={selectedLocation?.partnership_year}
      />
    </div>
  );
}
