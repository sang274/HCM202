import { useEffect, useState } from 'react';
import { Users, Globe2, Shield, Flag, LucideIcon } from 'lucide-react';
import { supabase, CooperationField } from '../lib/supabase';
import InfoModal from '../components/InfoModal';

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  'globe-2': Globe2,
  shield: Shield,
  flag: Flag,
};

export default function CooperationFieldsPage() {
  const [fields, setFields] = useState<CooperationField[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState<CooperationField | null>(null);

  useEffect(() => {
    loadFields();
  }, []);

  async function loadFields() {
    try {
      const { data, error } = await supabase
        .from('cooperation_fields')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setFields(data || []);
    } catch (error) {
      console.error('Error loading fields:', error);
    } finally {
      setLoading(false);
    }
  }

  const getFieldColor = (index: number) => {
    const colors = [
      { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700', iconBg: 'bg-red-100' },
      { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700', iconBg: 'bg-blue-100' },
      { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700', iconBg: 'bg-green-100' },
      { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-700', iconBg: 'bg-amber-100' },
    ];
    return colors[index % colors.length];
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
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <Users className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold">Lĩnh Vực Hợp Tác</h1>
            <p className="text-amber-100 mt-2">
              Các lĩnh vực đoàn kết dân tộc và hợp tác quốc tế
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {fields.map((field, index) => {
          const Icon = iconMap[field.icon_name] || Users;
          const colors = getFieldColor(index);

          return (
            <div
              key={field.id}
              className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 hover:shadow-2xl transition-all cursor-pointer hover:-translate-y-1`}
              onClick={() => setSelectedField(field)}
            >
              <div className={`${colors.iconBg} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-8 h-8 ${colors.text}`} />
              </div>
              <h3 className={`text-2xl font-bold ${colors.text} mb-3`}>{field.title}</h3>
              <p className="text-slate-700 leading-relaxed">{field.description}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Tổng Quan Về Đoàn Kết</h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Đoàn kết dân tộc và đoàn kết quốc tế là hai trụ cột quan trọng trong tư tưởng Hồ Chí Minh.
            Việc kết hợp hài hòa giữa sức mạnh dân tộc với sức mạnh thời đại đã và đang tạo nên những
            thành tựu to lớn trong sự nghiệp xây dựng và phát triển đất nước.
          </p>
          <div className="bg-gradient-to-r from-red-50 to-amber-50 p-6 rounded-xl border-l-4 border-red-600">
            <p className="font-semibold text-slate-900">
              "Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công"
            </p>
            <p className="text-sm text-slate-600 mt-2">- Chủ tịch Hồ Chí Minh</p>
          </div>
          <p>
            Trong thời kỳ đổi mới và hội nhập, Việt Nam đã xây dựng được mối quan hệ hợp tác rộng rãi
            với các nước trên thế giới, vừa giữ vững độc lập tự chủ, vừa chủ động hội nhập quốc tế,
            tranh thủ tối đa nguồn lực bên ngoài để phát triển đất nước.
          </p>
        </div>
      </div>

      <InfoModal
        isOpen={selectedField !== null}
        onClose={() => setSelectedField(null)}
        title={selectedField?.title || ''}
        content={selectedField?.description || ''}
      />
    </div>
  );
}
