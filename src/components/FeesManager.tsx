import { useState, useEffect } from 'react';
import { DollarSign, Plus, Edit2, Trash2, Search, X, Printer } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Fee, Student } from '../types/database';

interface FeesManagerProps {
  onUpdate: () => void;
}

export default function FeesManager({ onUpdate }: FeesManagerProps) {
  const { user } = useAuth();
  const [fees, setFees] = useState<Fee[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFee, setEditingFee] = useState<Fee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    student_id: '',
    amount: '',
    payment_type: '',
    payment_date: new Date().toISOString().split('T')[0],
    academic_year: new Date().getFullYear().toString(),
    notes: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const [feesRes, studentsRes] = await Promise.all([
        supabase
          .from('fees')
          .select('*, student:students(*)')
          .eq('user_id', user.id)
          .order('payment_date', { ascending: false }),
        supabase
          .from('students')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .order('full_name'),
      ]);

      if (feesRes.error) throw feesRes.error;
      if (studentsRes.error) throw studentsRes.error;

      setFees(feesRes.data || []);
      setStudents(studentsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const feeData = {
        ...formData,
        amount: parseFloat(formData.amount),
        user_id: user.id,
      };

      if (editingFee) {
        const { error } = await supabase
          .from('fees')
          .update(feeData)
          .eq('id', editingFee.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('fees')
          .insert([feeData]);

        if (error) throw error;
      }

      resetForm();
      loadData();
      onUpdate();
    } catch (error) {
      console.error('Error saving fee:', error);
      alert('حدث خطأ أثناء حفظ البيانات');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الدفعة؟')) return;

    try {
      const { error } = await supabase
        .from('fees')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadData();
      onUpdate();
    } catch (error) {
      console.error('Error deleting fee:', error);
      alert('حدث خطأ أثناء حذف الدفعة');
    }
  };

  const handleEdit = (fee: Fee) => {
    setEditingFee(fee);
    setFormData({
      student_id: fee.student_id,
      amount: fee.amount.toString(),
      payment_type: fee.payment_type,
      payment_date: fee.payment_date,
      academic_year: fee.academic_year,
      notes: fee.notes || '',
    });
    setShowForm(true);
  };

  const handlePrintReceipt = (fee: Fee) => {
    // الحصول على بيانات الطالب المرتبط بالدفعة
    const student = students.find(s => s.id === fee.student_id) || fee.student;
    
    if (!student) {
      alert('لم يتم العثور على بيانات الطالب');
      return;
    }

    // فتح نافذة طباعة جديدة
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('الرجاء السماح بفتح النوافذ المنبثقة لطباعة الإيصال');
      return;
    }

    // تنسيق التاريخ
    const formatDate = (dateString: string) => {
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      } catch {
        return dateString;
      }
    };

    // محتوى صفحة الطباعة
    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <meta charset="UTF-8">
        <title>إيصال سداد - ${student.full_name}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', 'Tahoma', sans-serif;
            background: #f3f4f6;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          
          .receipt {
            max-width: 700px;
            width: 100%;
            background: white;
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            position: relative;
            overflow: hidden;
          }
          
          .receipt::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 150px;
            height: 150px;
            background: linear-gradient(135deg, #22c55e20 0%, transparent 100%);
            border-radius: 0 0 0 150px;
          }
          
          .receipt::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 150px;
            height: 150px;
            background: linear-gradient(225deg, #22c55e20 0%, transparent 100%);
            border-radius: 0 150px 0 0;
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px dashed #e5e7eb;
            position: relative;
          }
          
          .logo {
            width: 90px;
            height: 90px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            box-shadow: 0 10px 15px -3px rgba(34, 197, 94, 0.3);
          }
          
          .school-name {
            font-size: 32px;
            font-weight: bold;
            color: #111827;
            margin-bottom: 5px;
          }
          
          .receipt-title {
            font-size: 20px;
            color: #22c55e;
            font-weight: 600;
            letter-spacing: 1px;
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            background: #f8fafc;
            padding: 20px;
            border-radius: 16px;
            margin-bottom: 25px;
            border: 1px solid #e5e7eb;
          }
          
          .info-item {
            display: flex;
            flex-direction: column;
          }
          
          .info-label {
            font-size: 13px;
            color: #6b7280;
            margin-bottom: 5px;
          }
          
          .info-value {
            font-size: 16px;
            font-weight: bold;
            color: #111827;
          }
          
          .student-card {
            background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 30px;
            border: 1px solid #22c55e30;
            position: relative;
            overflow: hidden;
          }
          
          .student-card::before {
            content: '📚';
            position: absolute;
            bottom: -10px;
            left: -10px;
            font-size: 80px;
            opacity: 0.1;
            transform: rotate(-15deg);
          }
          
          .student-name {
            font-size: 24px;
            font-weight: bold;
            color: #111827;
            margin-bottom: 15px;
          }
          
          .student-details {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
          }
          
          .detail-box {
            background: white;
            padding: 12px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }
          
          .detail-label {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 5px;
          }
          
          .detail-value {
            font-size: 16px;
            font-weight: bold;
            color: #22c55e;
          }
          
          .payment-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          
          .payment-table th {
            background: #22c55e;
            color: white;
            padding: 15px;
            font-weight: 600;
            font-size: 14px;
          }
          
          .payment-table td {
            padding: 15px;
            border-bottom: 1px solid #e5e7eb;
            color: #374151;
          }
          
          .payment-table tr:last-child td {
            border-bottom: none;
          }
          
          .payment-table .total-row {
            background: #f8fafc;
            font-weight: bold;
          }
          
          .total-amount {
            font-size: 20px;
            color: #22c55e;
            font-weight: bold;
          }
          
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px dashed #e5e7eb;
          }
          
          .stamp {
            width: 120px;
            height: 120px;
            border: 3px solid #22c55e;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotate(-15deg);
            opacity: 0.8;
            background: #f0fdf4;
          }
          
          .stamp-content {
            text-align: center;
            transform: rotate(15deg);
          }
          
          .stamp-text {
            color: #22c55e;
            font-weight: bold;
            font-size: 16px;
            border-top: 2px solid #22c55e;
            border-bottom: 2px solid #22c55e;
            padding: 5px 0;
          }
          
          .signature {
            text-align: center;
          }
          
          .signature-line {
            width: 200px;
            height: 2px;
            background: #9ca3af;
            margin: 10px 0;
          }
          
          .signature-title {
            font-size: 14px;
            color: #6b7280;
          }
          
          .notes {
            background: #fef9c3;
            padding: 15px;
            border-radius: 12px;
            margin: 20px 0;
            font-size: 14px;
            color: #854d0e;
            border-right: 4px solid #eab308;
          }
          
          .watermark {
            position: absolute;
            bottom: 20px;
            right: 20px;
            font-size: 12px;
            color: #9ca3af;
            opacity: 0.5;
          }
          
          @media print {
            body {
              background: white;
              padding: 0;
            }
            
            .receipt {
              box-shadow: none;
              padding: 20px;
            }
            
            .stamp {
              opacity: 0.5;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <!-- الهيدر مع الشعار -->
          <div class="header">
            <div class="logo">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="white">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <h1 class="school-name">مدرسة النور</h1>
            <div class="receipt-title">إيصال سداد المصاريف الدراسية</div>
          </div>

          <!-- رقم الإيصال والتاريخ -->
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">رقم الإيصال</span>
              <span class="info-value">#${fee.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <div class="info-item">
              <span class="info-label">تاريخ الإصدار</span>
              <span class="info-value">${formatDate(fee.payment_date)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">وقت الطباعة</span>
              <span class="info-value">${new Date().toLocaleTimeString('ar-EG')}</span>
            </div>
            <div class="info-item">
              <span class="info-label">السنة الدراسية</span>
              <span class="info-value">${fee.academic_year}</span>
            </div>
          </div>

          <!-- بيانات الطالب -->
          <div class="student-card">
            <div class="student-name">${student.full_name}</div>
            <div class="student-details">
              <div class="detail-box">
                <div class="detail-label">الصف الدراسي</div>
                <div class="detail-value">${student.grade}</div>
              </div>
              ${student.parent_name ? `
              <div class="detail-box">
                <div class="detail-label">وليّ الأمر</div>
                <div class="detail-value">${student.parent_name}</div>
              </div>
              ` : ''}
              ${student.parent_phone ? `
              <div class="detail-box">
                <div class="detail-label">رقم الهاتف</div>
                <div class="detail-value" dir="ltr">${student.parent_phone}</div>
              </div>
              ` : ''}
            </div>
          </div>

          <!-- جدول تفاصيل الدفع -->
          <table class="payment-table">
            <thead>
              <tr>
                <th>البيان</th>
                <th>المبلغ</th>
                <th>ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>${fee.payment_type}</strong>
                  ${fee.notes ? `<br><small style="color: #6b7280;">${fee.notes}</small>` : ''}
                </td>
                <td style="color: #22c55e; font-weight: bold; font-size: 18px;">
                  ${fee.amount.toFixed(2)} ج.م
                </td>
                <td>نقداً</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="total-row">
                <td colspan="2" style="text-align: left;">
                  <span style="font-size: 16px;">الإجمالي</span>
                </td>
                <td>
                  <span class="total-amount">${fee.amount.toFixed(2)} ج.م</span>
                </td>
              </tr>
            </tfoot>
          </table>

          <!-- الملاحظات الإضافية -->
          ${fee.notes ? `
          <div class="notes">
            <strong>📝 ملاحظات إضافية:</strong> ${fee.notes}
          </div>
          ` : ''}

          <!-- الختم الإلكتروني والتوقيع -->
          <div class="footer">
            <div class="stamp">
              <div class="stamp-content">
                <div style="font-size: 24px; margin-bottom: 5px;">✅</div>
                <div class="stamp-text">معتمد</div>
                <div style="font-size: 10px; margin-top: 5px;">إلكترونياً</div>
              </div>
            </div>
            
            <div class="signature">
              <div style="font-size: 24px; margin-bottom: 10px;">🖊️</div>
              <div style="width: 200px; height: 2px; background: #9ca3af; margin: 10px 0;"></div>
              <div class="signature-title">المسؤول المالي</div>
            </div>
          </div>

          <!-- تذييل -->
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>تم إنشاء هذا الإيصال إلكترونياً وهو معتمد بدون توقيع</p>
            <p style="margin-top: 5px;">للاستفسار: info@school.com | 0123456789</p>
          </div>

          <!-- علامة مائية -->
          <div class="watermark">نظام إدارتي لإدارة المدارس</div>
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    
    // تأخير الطباعة قليلاً للتأكد من تحميل المحتوى
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const resetForm = () => {
    setFormData({
      student_id: '',
      amount: '',
      payment_type: '',
      payment_date: new Date().toISOString().split('T')[0],
      academic_year: new Date().getFullYear().toString(),
      notes: '',
    });
    setEditingFee(null);
    setShowForm(false);
  };

  const filteredFees = fees.filter(fee =>
    fee.student?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.payment_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.academic_year.includes(searchTerm)
  );

  const paymentTypes = [
    'رسوم دراسية',
    'رسوم الكتب',
    'رسوم الأنشطة',
    'رسوم الزي المدرسي',
    'رسوم الباص',
    'أخرى',
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">تحصيل المصاريف</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة دفعة</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {editingFee ? 'تعديل الدفعة' : 'إضافة دفعة جديدة'}
              </h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الطالب</label>
                <select
                  value={formData.student_id}
                  onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">اختر الطالب</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.full_name} - {student.grade}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع الدفعة</label>
                <select
                  value={formData.payment_type}
                  onChange={(e) => setFormData({ ...formData, payment_type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">اختر نوع الدفعة</option>
                  {paymentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المبلغ (ج.م)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الدفع</label>
                <input
                  type="date"
                  value={formData.payment_date}
                  onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">السنة الدراسية</label>
                <input
                  type="text"
                  value={formData.academic_year}
                  onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="2024"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-all"
                >
                  {editingFee ? 'حفظ التعديلات' : 'إضافة الدفعة'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-all"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="البحث في الدفعات..."
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredFees.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد دفعات</h3>
          <p className="text-gray-600 mb-6">لم يتم تسجيل أي دفعات بعد</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all"
          >
            إضافة أول دفعة
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredFees.map((fee) => (
            <div key={fee.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-r-4 border-green-500">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {fee.student?.full_name}
                    </h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {fee.payment_type}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600 block text-xs">المبلغ</span>
                      <span className="font-bold text-green-600 text-lg">{fee.amount.toFixed(2)} ج.م</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600 block text-xs">التاريخ</span>
                      <span className="font-medium text-gray-900">{fee.payment_date}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600 block text-xs">السنة</span>
                      <span className="font-medium text-gray-900">{fee.academic_year}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600 block text-xs">الصف</span>
                      <span className="font-medium text-gray-900">{fee.student?.grade}</span>
                    </div>
                  </div>
                  {fee.notes && (
                    <p className="mt-3 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                      <span className="font-medium text-gray-700">📝 ملاحظات:</span> {fee.notes}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 mr-4">
                  <button
                    onClick={() => handlePrintReceipt(fee)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all"
                    title="طباعة الإيصال"
                  >
                    <Printer className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(fee)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="تعديل"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(fee.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="حذف"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}