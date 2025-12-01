import { useEffect, useState } from 'react';
import { Calendar, FileText } from 'lucide-react';
import { supabase, TimelineEvent } from '../lib/supabase';
import InfoModal from '../components/InfoModal';

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const { data, error } = await supabase
        .from('timeline_events')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'congress':
        return 'bg-blue-100 border-blue-500 text-blue-800';
      case 'resolution':
        return 'bg-green-100 border-green-500 text-green-800';
      default:
        return 'bg-slate-100 border-slate-500 text-slate-800';
    }
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <Calendar className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold">Dòng Thời Gian Lịch Sử</h1>
            <p className="text-blue-100 mt-2">
              Các sự kiện quan trọng trong lịch sử đại đoàn kết dân tộc
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-blue-600 to-green-600"></div>

          <div className="space-y-8">
            {events.map((event, index) => (
              <div key={event.id} className="relative pl-20">
                <div className="absolute left-4 top-0 w-9 h-9 bg-white border-4 border-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xs font-bold text-red-700">{index + 1}</span>
                </div>

                <div
                  className={`border-2 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer ${getCategoryColor(
                    event.category
                  )}`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5" />
                        <span className="text-sm font-semibold">{event.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InfoModal
        isOpen={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || ''}
        content={`${selectedEvent?.date}\n\n${selectedEvent?.description}`}
      />
    </div>
  );
}
