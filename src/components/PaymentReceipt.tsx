import { Fee, Student } from '../types/database';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useRef, useEffect, useState } from 'react';
import { School, BookOpen, Users, CreditCard, CheckCircle, Printer, X, Download } from 'lucide-react';

interface PaymentReceiptProps {
  fee: Fee;
  student: Student;
  onClose: () => void;
  onPrint: () => void;
}

export default function PaymentReceipt({ fee, student, onClose, onPrint }: PaymentReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [schoolName, setSchoolName] = useState('مدرسة النور');
  const [schoolInfo, setSchoolInfo] = useState({
    name: 'مدرسة النور',
    address: 'الرياض - حي النور',
    phone: '٠١٢٣٤٥٦٧٨٩',
    email: 'info@alnoor.edu.sa',
    logo: null as string | null
  });

  useEffect(() => {
    // محاولة جلب اسم المدرسة من التخزين المحلي أو من الإعدادات
    const savedSchoolName = localStorage.getItem('school_name');
    if (savedSchoolName) {
      setSchoolName(savedSchoolName);
      setSchoolInfo(prev => ({ ...prev, name: savedSchoolName }));
    }

    // محاولة جلب معلومات المدرسة كاملة
    const savedSchoolInfo = localStorage.getItem('school_info');
    if (savedSchoolInfo) {
      try {
        const parsed = JSON.parse(savedSchoolInfo);
        setSchoolInfo(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('خطأ في قراءة معلومات المدرسة');
      }
    }
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy - hh:mm a', { locale: ar });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getPaymentMethodText = (method: string) => {
    const methods: Record<string, string> = {
      cash: 'نقداً',
      card: 'بطاقة ائتمان',
      bank_transfer: 'تحويل بنكي',
      check: 'شيك'
    };
    return methods[method] || method;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" dir="rtl">
        {/* شريط الأدوات المتحسن */}
        <div className="sticky top-0 bg-gradient-to-l from-emerald-600 to-teal-600 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <School className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">إيصال سداد معتمد</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onPrint}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all flex items-center gap-2 backdrop-blur-sm border border-white/30"
            >
              <Printer className="w-5 h-5" />
              <span>طباعة</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* محتوى الإيصال المطور */}
        <div ref={receiptRef} className="p-8 bg-gradient-to-b from-gray-50 to-white" id="payment-receipt">
          {/* الهيدر مع الشعار المحسن */}
          <div className="text-center mb-8 border-b-2 border-dashed border-emerald-200 pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
                {schoolInfo.logo ? (
                  <img src={schoolInfo.logo} alt={schoolInfo.name} className="w-20 h-20 object-contain" />
                ) : (
                  <School className="w-12 h-12 text-white" />
                )}
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-l from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              {schoolInfo.name}
            </h1>
            <div className="flex justify-center gap-4 text-sm text-gray-600 mt-2">
              <span>{schoolInfo.address}</span>
              <span>•</span>
              <span dir="ltr">{schoolInfo.phone}</span>
              <span>•</span>
              <span>{schoolInfo.email}</span>
            </div>
            <p className="text-gray-600 mt-2">إيصال سداد المصاريف الدراسية</p>
          </div>

          {/* رقم الإيصال والتاريخ - تصميم محسن */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
              <span className="text-emerald-600 text-sm block mb-1">رقم الإيصال</span>
              <span className="font-bold text-gray-900 text-lg">#{fee.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
              <span className="text-emerald-600 text-sm block mb-1">تاريخ الإصدار</span>
              <span className="font-bold text-gray-900">{formatDate(fee.created_at)}</span>
            </div>
          </div>

          {/* بيانات الطالب - تصميم محسن */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
              <Users className="w-5 h-5 text-emerald-600" />
              بيانات الطالب
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-gray-600 text-sm mb-1">الاسم الثلاثي</p>
                <p className="font-bold text-gray-900 text-lg">{student.full_name}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-gray-600 text-sm mb-1">الفصل / المرحلة</p>
                <p className="font-bold text-gray-900 text-lg">{student.grade}</p>
              </div>
              {student.parent_name && (
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-600 text-sm mb-1">وليّ الأمر</p>
                  <p className="font-bold text-gray-900">{student.parent_name}</p>
                </div>
              )}
              {student.parent_phone && (
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-600 text-sm mb-1">رقم التواصل</p>
                  <p className="font-bold text-gray-900" dir="ltr">{student.parent_phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* تفاصيل الدفع - تصميم محسن */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              تفاصيل الدفع
            </h3>
            <div className="bg-white rounded-xl border-2 border-emerald-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-l from-emerald-600 to-teal-600 text-white">
                  <tr>
                    <th className="text-right p-4 text-sm font-medium">البيان</th>
                    <th className="text-right p-4 text-sm font-medium">المبلغ</th>
                    <th className="text-right p-4 text-sm font-medium">طريقة الدفع</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-emerald-50/30 transition-colors">
                    <td className="p-4">
                      <div>
                        <span className="font-bold text-gray-900">{fee.payment_type}</span>
                        {fee.notes && (
                          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                            <BookOpen className="w-4 h-4 text-emerald-600" />
                            {fee.notes}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-emerald-600 text-xl">
                        {formatCurrency(fee.amount)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {getPaymentMethodText('cash')}
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td className="p-4 font-bold text-gray-900 text-lg">الإجمالي</td>
                    <td className="p-4" colSpan={2}>
                      <span className="font-bold text-emerald-600 text-2xl">
                        {formatCurrency(fee.amount)}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* السنة الدراسية */}
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-6 py-3 rounded-full text-lg font-bold border-2 border-emerald-300">
              <BookOpen className="w-5 h-5" />
              السنة الدراسية: {fee.academic_year}
            </span>
          </div>

          {/* الختم الإلكتروني والتوقيع - تصميم محسن */}
          <div className="mt-8 pt-6 border-t-2 border-dashed border-emerald-200 grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="relative">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center border-4 border-emerald-300">
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto" />
                    <span className="text-xs font-bold text-emerald-700 block mt-1">معتمد إلكترونياً</span>
                  </div>
                </div>
                <div className="absolute -inset-2 border-2 border-emerald-200 rounded-full animate-ping opacity-20"></div>
              </div>
              <p className="text-sm text-gray-600 mt-3">الختم الإلكتروني</p>
            </div>
            
            <div className="text-center flex flex-col justify-end">
              <div className="border-t-2 border-gray-400 w-48 mx-auto pt-3 mb-2">
                <p className="text-gray-900 font-bold text-lg">المسؤول المالي</p>
              </div>
              <p className="text-sm text-gray-600">التوقيع</p>
            </div>
          </div>

          {/* تذييل محسن */}
          <div className="mt-8 text-center border-t-2 border-emerald-200 pt-6">
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-bold text-emerald-600">هاتف</p>
                <p dir="ltr">{schoolInfo.phone}</p>
              </div>
              <div>
                <p className="font-bold text-emerald-600">بريد إلكتروني</p>
                <p>{schoolInfo.email}</p>
              </div>
              <div>
                <p className="font-bold text-emerald-600">عنوان</p>
                <p>{schoolInfo.address}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-400 bg-gray-50 p-3 rounded-lg inline-block">
              تم إنشاء هذا الإيصال إلكترونياً عبر نظام إدارتي لإدارة المدارس © {new Date().getFullYear()}
            </p>
          </div>

          {/* رمز QR للتحقق */}
          <div className="absolute bottom-4 left-4 opacity-20">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-white"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}