import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ChevronLeft,
  Star,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Award,
  CheckCircle,
  ArrowLeft,
  BarChart3,
  GraduationCap,
  DollarSign,
  FileText,
  HeadphonesIcon,
  PlayCircle
} from 'lucide-react';
import logo from '../assets/logo.png';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
              <span className="text-2xl font-bold bg-gradient-to-l from-blue-600 to-purple-600 bg-clip-text text-transparent">
                إدارتــي
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                المميزات
              </button>
              <button onClick={() => scrollToSection('benefits')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                الفوائد
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                الأسعار
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                آراء العملاء
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                الأسئلة الشائعة
              </button>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button className="px-6 py-2.5 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                تسجيل الدخول
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-600/25 transition-all transform hover:scale-105">
                ابدأ تجربة مجانية
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4">
            <nav className="flex flex-col gap-3">
              <button onClick={() => scrollToSection('features')} className="py-2 text-gray-600 hover:text-blue-600 transition-colors text-right">
                المميزات
              </button>
              <button onClick={() => scrollToSection('benefits')} className="py-2 text-gray-600 hover:text-blue-600 transition-colors text-right">
                الفوائد
              </button>
              <button onClick={() => scrollToSection('pricing')} className="py-2 text-gray-600 hover:text-blue-600 transition-colors text-right">
                الأسعار
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="py-2 text-gray-600 hover:text-blue-600 transition-colors text-right">
                آراء العملاء
              </button>
              <button onClick={() => scrollToSection('faq')} className="py-2 text-gray-600 hover:text-blue-600 transition-colors text-right">
                الأسئلة الشائعة
              </button>
              <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
                <button className="py-2 text-gray-700 font-medium">
                  تسجيل الدخول
                </button>
                <button className="py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium">
                  ابدأ تجربة مجانية
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute left-0 top-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-right">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-6">
                <Star className="w-4 h-4 fill-blue-600" />
                <span className="text-sm font-medium">نظام إدارة متكامل للمدارس</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-l from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  إدارتــي
                </span>
                <br />
                <span className="text-gray-900">طريقة ذكية لإدارة مؤسستك التعليمية</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                منصة متكاملة لإدارة الطلاب والمعلمين والمصاريف والتقارير المالية. 
                وفر وقتك وجهدك مع نظام إدارة متطور وسهل الاستخدام.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-blue-600/30 transition-all transform hover:scale-105 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  ابدأ التجربة المجانية الآن
                </button>
                <button className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-bold text-lg border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-2">
                  <ChevronLeft className="w-5 h-5" />
                  شاهد العرض التوضيحي
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900">+500</div>
                  <div className="text-gray-600">مدرسة تثق بنا</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">+50,000</div>
                  <div className="text-gray-600">طالب مسجل</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">98%</div>
                  <div className="text-gray-600">رضا العملاء</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Dashboard Preview"
                  className="rounded-2xl w-full"
                />
              </div>
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">زيادة في الإيرادات</div>
                    <div className="text-xl font-bold text-green-600">+45%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              مميزات متطورة لإدارة مؤسستك
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              كل ما تحتاجه لإدارة مدرستك في مكان واحد. وفر الوقت والجهد مع مميزاتنا المتكاملة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'إدارة الطلاب',
                description: 'تتبع بيانات الطلاب، الحضور، والغياب بكل سهولة',
                color: 'blue'
              },
              {
                icon: GraduationCap,
                title: 'إدارة المعلمين',
                description: 'إدارة بيانات المعلمين، الرواتب، وجداول الحصص',
                color: 'purple'
              },
              {
                icon: DollarSign,
                title: 'تحصيل المصاريف',
                description: 'تتبع المدفوعات وإصدار الفواتير تلقائياً',
                color: 'green'
              },
              {
                icon: FileText,
                title: 'إدارة التكاليف',
                description: 'تسجيل جميع المصروفات والنفقات بدقة',
                color: 'orange'
              },
              {
                icon: BarChart3,
                title: 'تقارير متقدمة',
                description: 'تحليلات وتقارير دقيقة لأداء مؤسستك',
                color: 'red'
              },
              {
                icon: Shield,
                title: 'أمان متكامل',
                description: 'حماية بياناتك بأعلى معايير الأمان',
                color: 'indigo'
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition-all hover:-translate-y-2">
                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                لماذا تختار إدارتــي؟
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Clock, text: 'وفر 80% من وقت الإدارة اليومية' },
                  { icon: TrendingUp, text: 'زيادة الإيرادات بنسبة 45% في المتوسط' },
                  { icon: Users, text: 'إدارة أكثر من 1000 طالب بسهولة' },
                  { icon: Award, text: 'نظام معتمد من وزارة التعليم' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-lg text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-lg transition-all transform hover:scale-105">
                ابدأ تجربتك المجانية
              </button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Benefits"
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              خطط مرنة تناسب جميع المؤسسات
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اختر الخطة المناسبة لمدرستك. جميع الخطط تتضمن 14 يوم تجربة مجانية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'الأساسية',
                price: '299',
                features: ['100 طالب', '10 معلمين', 'تقارير أساسية', 'دعم عبر البريد']
              },
              {
                name: 'المتقدمة',
                price: '599',
                features: ['500 طالب', '30 معلم', 'تقارير متقدمة', 'دعم فني 24/7', 'API مفتوح'],
                popular: true
              },
              {
                name: 'الاحترافية',
                price: '999',
                features: ['غير محدود طلاب', 'غير محدود معلمين', 'تقارير مخصصة', 'مدير حساب مخصص', 'تدريب مجاني']
              }
            ].map((plan, index) => (
              <div key={index} className={`relative rounded-3xl p-8 ${plan.popular ? 'bg-gradient-to-b from-blue-600 to-purple-600 text-white shadow-2xl scale-105' : 'bg-gray-50'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                      الأكثر طلباً
                    </span>
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-4 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`mr-2 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                    ريال / شهرياً
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-green-600'}`} />
                      <span className={plan.popular ? 'text-blue-50' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                  plan.popular 
                    ? 'bg-white text-blue-600 hover:bg-gray-100' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                }`}>
                  ابدأ تجربة مجانية
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ماذا يقول عملاؤنا؟
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اكتشف تجارب المدارس التي تثق في إدارتــي
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "منذ استخدامنا لإدارتــي، أصبحت عملية إدارة المدرسة أكثر سهولة وفعالية. 
                  وفرنا الكثير من الوقت والجهد في متابعة الطلاب والمصاريف."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-gray-900">أحمد محمد</h4>
                    <p className="text-sm text-gray-600">مدير مدرسة النجاح</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-xl text-gray-600">
              إجابات على أكثر الأسئلة شيوعاً
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'ما هي مدة التجربة المجانية؟',
                a: 'نقدم 14 يوم تجربة مجانية كاملة مع جميع المميزات'
              },
              {
                q: 'هل يمكنني تغيير خطتي لاحقاً؟',
                a: 'نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت'
              },
              {
                q: 'هل تدعمون المدارس الكبيرة؟',
                a: 'نعم، نظامنا مصمم ليدعم المدارس بجميع أحجامها'
              },
              {
                q: 'كيف يمكنني الحصول على الدعم؟',
                a: 'نقدم دعماً فنياً على مدار الساعة عبر البريد والهاتف'
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl font-bold text-white mb-6">
            ابدأ رحلة التميز مع إدارتــي اليوم
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            انضم إلى أكثر من 500 مدرسة تثق في نظامنا. جرب مجاناً لمدة 14 يوماً
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105">
              ابدأ التجربة المجانية
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
              تواصل مع المبيعات
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src={logo} alt="Logo" className="h-10 w-auto" />
                <span className="text-2xl font-bold">إدارتــي</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                نظام متكامل لإدارة المؤسسات التعليمية
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-white transition-colors">المميزات</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">الأسعار</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">آراء العملاء</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">الأسئلة الشائعة</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">الدعم</h4>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-white transition-colors">مركز المساعدة</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">تواصل معنا</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">الشروط والأحكام</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">سياسة الخصوصية</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">تواصل معنا</h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="sr-only">تويتر</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="sr-only">فيسبوك</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="sr-only">انستغرام</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 إدارتــي. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
      `}</style>
    </div>
  );
}