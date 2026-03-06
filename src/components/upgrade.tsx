import { useState } from "react";
import {
  Crown,
  Sparkles,
  Check,
  Star,
  Zap,
  Shield,
  Headphones,
  Users,
  TrendingUp,
  BarChart3,
  Download,
  FileText,
  Clock,
  X,
  ChevronLeft,
  Gift,
  Award,
  Rocket,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  period: "شهري" | "سنوي" | "ربع سنوي";
  features: PlanFeature[];
  popular?: boolean;
  savings?: string;
  color: string;
  icon: any;
}

export default function UpgradePage() {
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<"شهري" | "سنوي">("سنوي");
  const [selectedPlan, setSelectedPlan] = useState<string>("pro-annual");

  // العروض والخطط المتاحة
  const plans: Plan[] = [
    {
      id: "basic-monthly",
      name: "الأساسية",
      price: billingCycle === "شهري" ? 299 : 2999,
      originalPrice: billingCycle === "شهري" ? 399 : 3999,
      period: billingCycle === "شهري" ? "شهري" : "سنوي",
      color: "#64748B",
      icon: Star,
      features: [
        { text: "حتى 50 طالب", included: true },
        { text: "حتى 10 معلمين", included: true },
        { text: "تقارير أساسية", included: true },
        { text: "دعم عبر البريد الإلكتروني", included: true },
        { text: "تحصيل المصاريف", included: true },
        { text: "إدارة المصروفات", included: true },
        { text: "تقارير الأرباح المتقدمة", included: false },
        { text: "تصدير البيانات إلى Excel", included: false },
        { text: "دعم فني 24/7", included: false },
        { text: "نسخ احتياطي يومي", included: false },
      ],
    },
    {
      id: "pro-monthly",
      name: "المتقدمة",
      price: billingCycle === "شهري" ? 499 : 4999,
      originalPrice: billingCycle === "شهري" ? 699 : 6999,
      period: billingCycle === "شهري" ? "شهري" : "سنوي",
      color: "#3B82F6",
      icon: Zap,
      popular: true,
      savings: "وفر 40%",
      features: [
        { text: "طلاب غير محدود", included: true },
        { text: "معلمين غير محدود", included: true },
        { text: "تقارير متقدمة وتحليلات", included: true },
        { text: "دعم فني 24/7 عبر الدردشة", included: true },
        { text: "تحصيل المصاريف", included: true },
        { text: "إدارة المصروفات", included: true },
        { text: "تقارير الأرباح المتقدمة", included: true },
        { text: "تصدير البيانات إلى Excel", included: true },
        { text: "نسخ احتياطي يومي", included: true },
        { text: "API للتكامل مع الأنظمة الأخرى", included: true },
      ],
    },
    {
      id: "enterprise-annual",
      name: "الشركات",
      price: 9999,
      originalPrice: 14999,
      period: "سنوي",
      color: "#8B5CF6",
      icon: Award,
      savings: "وفر 33%",
      features: [
        { text: "كل شيء في الخطة المتقدمة", included: true },
        { text: "مدير حساب مخصص", included: true },
        { text: "تدريب الموظفين", included: true },
        { text: "SLA مضمون", included: true },
        { text: "تكامل مخصص", included: true },
        { text: "خادم مخصص", included: true },
        { text: "تخصيص التطبيق", included: true },
        { text: "تقارير مخصصة", included: true },
        { text: "دعم هاتفي فوري", included: true },
        { text: "ضمان استعادة البيانات", included: true },
      ],
    },
  ];

  // العروض الخاصة
  const specialOffers = [
    {
      id: 1,
      title: "عرض رمضان",
      description: "خصم 30% على الاشتراك السنوي + شهر مجاني",
      discount: "30%",
      code: "RAMADAN2024",
      validUntil: "30 أبريل 2024",
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: 2,
      title: "عرض المؤسسات التعليمية",
      description: "خصم خاص للمدارس والجامعات + دعم فني متميز",
      discount: "خصم خاص",
      code: "EDUCATION2024",
      validUntil: "عرض دائم",
      color: "from-blue-500 to-indigo-500",
    },
  ];

  // مميزات التطبيق
  const features = [
    {
      icon: Users,
      title: "إدارة الطلاب",
      description: "إدارة كاملة لبيانات الطلاب والحضور والدرجات",
    },
    {
      icon: TrendingUp,
      title: "تقارير متقدمة",
      description: "تحليلات دقيقة للأرباح والمصروفات والأداء",
    },
    {
      icon: Shield,
      title: "أمان عالي",
      description: "حماية بياناتك بتشفير متقدم ونسخ احتياطي يومي",
    },
    {
      icon: Headphones,
      title: "دعم فني 24/7",
      description: "فريق دعم متخصص لمساعدتك في أي وقت",
    },
    {
      icon: Download,
      title: "تصدير البيانات",
      description: "تصدير التقارير إلى Excel و PDF بضغطة زر",
    },
    {
      icon: Clock,
      title: "تحديثات مستمرة",
      description: "تحديثات دورية مجانية مع ميزات جديدة",
    },
  ];

  const handleSubscribe = (planId: string) => {
    console.log("Subscribing to plan:", planId);
    // هنا يمكن إضافة منطق الدفع الفعلي
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      {/* رأس الصفحة */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* الشعار */}
            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-3 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
                <div className="relative flex items-center gap-3">
                  <img
                    src={logo}
                    alt="إدارتي"
                    className="h-16 w-auto relative z-10 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  />
                </div>
              </div>
            </div>

            {/* زر العودة للوحة التحكم */}
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>العودة للوحة التحكم</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* القسم العلوي مع العنوان والتأثيرات */}
        <div className="text-center mb-12 relative">
          {/* عناصر زخرفية متحركة */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-emerald-200/30 to-blue-200/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-40 right-1/4 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

          {/* شعار التاج */}
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl shadow-lg mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <Crown className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-l from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              طور عملك مع إدارتي
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اختر الخطة المناسبة لاحتياجاتك واستمتع بمجموعة متكاملة من الأدوات
            لإدارة مؤسستك التعليمية بكفاءة عالية
          </p>

          {/* مؤشر الثقة */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span className="text-sm text-gray-600">ضمان استعادة الأموال لمدة 30 يوم</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-600">أكثر من 1000+ مؤسسة تثق بنا</span>
            </div>
          </div>
        </div>

        {/* تبديل فترة الفوترة */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-2xl inline-flex shadow-inner">
            <button
              onClick={() => setBillingCycle("شهري")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                billingCycle === "شهري"
                  ? "bg-white text-blue-600 shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              شهري
            </button>
            <button
              onClick={() => setBillingCycle("سنوي")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 relative ${
                billingCycle === "سنوي"
                  ? "bg-white text-blue-600 shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              سنوي
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                وفر 40%
              </span>
            </button>
          </div>
        </div>

        {/* بطاقات الخطط */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative group cursor-pointer transition-all duration-500 hover:scale-105 ${
                  plan.popular ? "md:-mt-4 md:mb-4" : ""
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* شريط "الأكثر شهرة" */}
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      الأكثر شهرة
                    </div>
                  </div>
                )}

                {/* بطاقة الخطة */}
                <div
                  className={`relative bg-white rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? "border-blue-500 shadow-2xl"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  {/* خلفية متدرجة */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${plan.color}20, ${plan.color}40)`,
                    }}
                  ></div>

                  {/* المحتوى */}
                  <div className="p-8">
                    {/* أيقونة الخطة */}
                    <div
                      className="inline-flex p-3 rounded-2xl mb-4"
                      style={{ backgroundColor: `${plan.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: plan.color }} />
                    </div>

                    {/* اسم الخطة */}
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

                    {/* السعر */}
                    <div className="mb-4">
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-black">
                          {plan.price.toLocaleString("ar-EG")}
                        </span>
                        <span className="text-gray-500 mb-1">ج.م / {plan.period}</span>
                      </div>
                      {plan.originalPrice && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-400 line-through">
                            {plan.originalPrice.toLocaleString("ar-EG")} ج.م
                          </span>
                          {plan.savings && (
                            <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                              {plan.savings}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* زر الاشتراك */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubscribe(plan.id);
                      }}
                      className={`w-full py-3 rounded-xl font-bold transition-all duration-300 mb-6 ${
                        selectedPlan === plan.id
                          ? "bg-gradient-to-l from-emerald-600 to-blue-600 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {selectedPlan === plan.id ? "اختيارك ✔️" : "اختر الخطة"}
                    </button>

                    {/* المميزات */}
                    <div className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div
                            className={`p-0.5 rounded-full ${
                              feature.included
                                ? "text-emerald-500"
                                : "text-gray-300"
                            }`}
                          >
                            <Check className="w-4 h-4" />
                          </div>
                          <span
                            className={
                              feature.included ? "text-gray-700" : "text-gray-300"
                            }
                          >
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* العروض الخاصة */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">عروض خاصة</h2>
            <p className="text-gray-600">استفد من العروض الحصرية لفترة محدودة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialOffers.map((offer) => (
              <div
                key={offer.id}
                className="relative group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* خلفية متدرجة */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${offer.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Gift className="w-5 h-5 text-emerald-500" />
                        <h3 className="text-xl font-bold">{offer.title}</h3>
                      </div>
                      <p className="text-gray-600">{offer.description}</p>
                    </div>
                    <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-2xl font-black px-4 py-2 rounded-xl">
                      {offer.discount}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500">كود العرض</span>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="bg-gray-100 px-3 py-1 rounded-lg text-sm font-mono">
                          {offer.code}
                        </code>
                        <button className="text-blue-600 hover:text-blue-700 text-sm">
                          نسخ
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">صالح حتى</span>
                      <p className="text-sm font-medium">{offer.validUntil}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* مميزات التطبيق */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">كل ما تحتاجه في مكان واحد</h2>
            <p className="text-gray-600">مجموعة متكاملة من الأدوات لتحسين إدارتك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* قسم الأسئلة الشائعة */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">الأسئلة الشائعة</h2>
            <p className="text-gray-600">إجابات على أكثر الأسئلة شيوعاً</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "هل يمكنني تغيير خطتي لاحقاً؟",
                a: "نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. سيتم تطبيق التغييرات من بداية الشهر التالي.",
              },
              {
                q: "هل هناك فترة تجريبية مجانية؟",
                a: "نعم، نوفر فترة تجريبية مجانية لمدة 14 يوماً لجميع الخطط، يمكنك تجربة جميع المميزات.",
              },
              {
                q: "ما هي طرق الدفع المتاحة؟",
                a: "ندعم جميع طرق الدفع الإلكترونية: فيزا، ماستركارد، مدى، فوري، وتحويل بنكي.",
              },
              {
                q: "كيف يمكنني الحصول على الدعم الفني؟",
                a: "يمكنك التواصل مع فريق الدعم عبر الدردشة المباشرة أو البريد الإلكتروني أو الهاتف.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* قسم الدعوة لاتخاذ إجراء */}
        <div className="relative bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-12 text-center text-white overflow-hidden">
          {/* عناصر زخرفية */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <Rocket className="w-16 h-16 mx-auto mb-4 text-white/80" />
          <h2 className="text-3xl font-bold mb-4">ابدأ رحلة التطوير الآن</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            انضم إلى أكثر من 1000+ مؤسسة تعليمية تثق في إدارتي لإدارة أعمالها
          </p>
          <button
            onClick={() => handleSubscribe("pro-annual")}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            ابدأ الآن مجاناً
          </button>
          <p className="text-sm text-white/70 mt-4">لا تحتاج لبطاقة ائتمان، فترة تجريبية 14 يوم</p>
        </div>

        {/* ضمان استعادة الأموال */}
        <div className="flex items-center justify-center gap-4 mt-8 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            <span>ضمان استعادة الأموال لمدة 30 يوم</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <Lock className="w-4 h-4" />
            <span>دفع آمن 100%</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <Headphones className="w-4 h-4" />
            <span>دعم فني 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// إضافة أيقونة Lock لأنها غير مستوردة
const Lock = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);