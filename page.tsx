"use client";

import React, { useState, useEffect } from "react";
import { 
  PhoneCall, 
  Menu, 
  X, 
  Thermometer, 
  ShieldCheck, 
  Droplet, 
  Layers, 
  Send, 
  CheckCircle, 
  HelpCircle, 
  Sparkles,
  Gauge,
  Clock,
  Package,
  Check,
  ChevronRight,
  Tv,
  ArrowRight
} from "lucide-react";

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"coating" | "primer">("coating");
  
  // Lead inputs
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [surfaceType, setSurfaceType] = useState("Mái tôn");
  const [area, setArea] = useState("100");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Outdoor temperature state simulator
  const [outdoorTemp, setOutdoorTemp] = useState<number>(41);

  // Slide value for the split-screen image slider under Hero banner
  const [splitPercent, setSplitPercent] = useState(50);
  const [isResizing, setIsResizing] = useState(false);

  const handleSliderMove = (clientX: number, containerWidth: number, containerLeft: number) => {
    const offset = clientX - containerLeft;
    const percentage = Math.max(0, Math.min(100, (offset / containerWidth) * 100));
    setSplitPercent(percentage);
  };

  const handlePointerDown = () => {
    setIsResizing(true);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isResizing) return;
      const container = document.getElementById("hero-compare-container");
      if (!container) return;
      const rect = container.getBoundingClientRect();
      handleSliderMove(e.clientX, rect.width, rect.left);
    };

    const handlePointerUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isResizing]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      setSubmitStatus("error");
      setStatusMessage("Vui lòng điền đầy đủ Họ tên và Số điện thoại.");
      return;
    }

    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          phone: phone,
          surface: `${surfaceType} (${area}m²)`,
          area: parseFloat(area) || 0,
          audience: "Gia chủ / Chủ đầu tư",
          location: "Hà Nội & Bắc Bộ",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        setFullName("");
        setPhone("");
        setStatusMessage(data.warning || "Đăng ký thành công! Chuyên gia Sơn Thăng Long sẽ liên hệ lại ngay.");
      } else {
        setSubmitStatus("error");
        setStatusMessage(data.message || "Gặp sự cố khi gửi thông tin. Vui lòng thử lại sau.");
      }
    } catch (err) {
      console.error("Lỗi gửi form:", err);
      setSubmitStatus("error");
      setStatusMessage("Lỗi kết nối máy chủ. Vui lòng thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-brand-blue selection:text-white flex flex-col font-sans" id="home">
      
      {/* HEADER SECTION */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-150 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo with strict requested image and clean typography */}
          <a href="#home" className="flex items-center gap-3 group" id="brand-logo">
            <div className="relative w-11 h-11 bg-white rounded-lg overflow-hidden flex items-center justify-center shadow-md border border-slate-200 shrink-0">
              <img 
                src="https://i.pinimg.com/280x280_RS/31/61/2b/31612b1a9f090690ae4aeea1cc28aa7e.jpg" 
                alt="Logo Sơn Thăng Long" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </a>

          {/* Navigation with exact requested wording: "Kiểm chứng" replacing "Thực tế độ nhiệt" */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-600">
            <a href="#pain-points" className="hover:text-brand-blue transition-colors">Thực Trạng</a>
            <a href="#tech-solution" className="hover:text-brand-blue transition-colors">Giải Pháp</a>
            <a href="#proof-experiment" className="hover:text-brand-blue transition-colors hover:font-black">Kiểm chứng</a>
            <a href="#product-specs" className="hover:text-brand-blue transition-colors">Thông Số</a>
            <a href="#faq" className="hover:text-brand-blue transition-colors">FAQ</a>
            <a href="#lead-form" className="hover:text-brand-blue transition-colors text-brand-red font-black">Nhận Ưu Đãi</a>
          </nav>

          {/* Hotline contact line (Highlighted with brand-blue identification color) */}
          <div className="hidden sm:flex items-center gap-4">
            <a href="tel:0904696551" className="flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark py-2.5 px-5 rounded-xl text-xs font-black text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md shadow-brand-blue/20">
              <PhoneCall className="w-4 h-4 text-white animate-pulse" />
              <span>0904.696.551</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="lg:hidden p-2 text-slate-700 hover:text-brand-blue focus:outline-none"
            aria-label="Toggle Menu"
            id="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 absolute top-20 left-0 w-full shadow-lg z-40 transition-all duration-300">
            <a href="#pain-points" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-850 font-bold text-xs uppercase tracking-wider hover:text-brand-blue">Thực Trạng</a>
            <a href="#tech-solution" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-850 font-bold text-xs uppercase tracking-wider hover:text-brand-blue">Giải Pháp</a>
            <a href="#proof-experiment" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-850 font-bold text-xs uppercase tracking-wider hover:text-brand-blue font-black">Kiểm chứng</a>
            <a href="#product-specs" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-850 font-bold text-xs uppercase tracking-wider hover:text-brand-blue">Hệ Sinh Thái</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-850 font-bold text-xs uppercase tracking-wider hover:text-brand-blue">Hỏi Đáp</a>
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-3">
              <a href="tel:0904696551" className="flex items-center justify-center gap-2 bg-brand-blue py-3 rounded-xl text-xs font-black text-white active:bg-brand-blue-dark">
                <PhoneCall className="w-4 h-4 text-white animate-pulse" />
                <span>0904.696.551</span>
              </a>
              <a href="#lead-form" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center bg-orange-500 text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider">
                Nhận Báo Giá Ngay
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-white pt-10 pb-20 overflow-hidden border-b border-slate-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Section: Copywriting details based on Sheet STT 1 */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6">
              <span className="inline-block self-start bg-orange-100 text-orange-700 px-4 py-1.5 rounded-md text-xs font-black uppercase tracking-widest">
                Chiến dịch giảm nhiệt hè 2026
              </span>
              
              {/* Headline & Sub-headline specified exactly in Google Sheet */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase font-display" id="hero-title">
                Sơn Chống Nóng Gold Rober – Hạ Nhiệt Mái Tôn 5-25°C, Chống Thấm Dột Toàn Diện
              </h1>
              
              <h2 className="text-base sm:text-lg font-bold text-slate-700 leading-relaxed font-sans">
                Giải pháp &ldquo;xanh&rdquo; bảo vệ sức khỏe gia đình và tối ưu chi phí điện năng cho kho xưởng.
              </h2>
              
              {/* Extended Copywriting of Hero Section detail column */}
              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                Giải pháp sơn phủ phản nhiệt công nghệ cao chống bức xạ từ **Sơn Thăng Long**. Bảo vệ mái tôn khỏi rỉ sét ăn mòn, giảm chi phí điện năng tiêu thụ và làm mát nhà xưởng, không gian sống và bồn nước nhà bạn.
              </p>
              
              {/* Real benefits layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex gap-3 bg-slate-50 border border-slate-150 p-3.5 rounded-xl">
                  <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 mt-0.5">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-tight">Độ bền cao</h4>
                    <p className="text-2xs text-slate-500 mt-0.5">Bảo vệ cấu trúc công trình kịch độ trước bão nắng dầm sương.</p>
                  </div>
                </div>

                <div className="flex gap-3 bg-slate-50 border border-slate-150 p-3.5 rounded-xl">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-tight font-sans">Thi công cực dễ dàng</h4>
                    <p className="text-2xs text-slate-500 mt-0.5">Thợ thi công lăn quét nhanh gọn đảm bảo không gian sạch bóng.</p>
                  </div>
                </div>
              </div>

              {/* Exact CTA labels required */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <a 
                  href="#lead-form" 
                  className="w-full sm:w-auto text-center bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-8 rounded-xl text-sm shadow-xl shadow-orange-100 uppercase tracking-wider transition-all duration-300"
                >
                  Nhận Báo Giá &amp; Ưu Đãi Tháng 6
                </a>
                <a 
                  href="#proof-experiment" 
                  className="w-full sm:w-auto text-center border-2 border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-900 font-extrabold py-4 px-8 rounded-xl text-xs uppercase tracking-wider transition-all"
                >
                  Xem kiểm chứng thực nghiệm
                </a>
              </div>
            </div>

            {/* Right Section: Core Hero Banner Image */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 group">
                <img 
                  src="/api/pin-image?url=https://pin.it/51nRMIOQy" 
                  alt="Sơn chống nóng Thăng Long Gold Rober" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual badge highlight */}
                <div className="absolute right-6 top-6 bg-brand-blue/90 text-white font-black text-2xs uppercase tracking-widest px-3.5 py-2 rounded-md backdrop-blur-xs flex items-center gap-1.5 shadow-lg">
                  <ShieldCheck className="w-4 h-4 text-brand-yellow animate-pulse" />
                  <span>Sơn Gold Rober Thăng Long</span>
                </div>
              </div>
              
              <div className="w-full text-center mt-3 text-2xs font-bold uppercase text-slate-500 px-2">
                Hạ nhiệt mái tôn 5-25°C, chống thấm dột toàn diện
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 FEATURED BLOCKS SUB-BANNER */}
      <section className="bg-brand-blue text-white py-8 border-b border-brand-blue-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 w-full divide-y md:divide-y-0 md:divide-x divide-white/20 gap-6 md:gap-0">
            
            <div className="px-6 flex items-center gap-4 py-3 md:py-0">
              <div className="text-3xl font-black text-brand-yellow font-display">01</div>
              <div className="text-xs sm:text-sm font-black uppercase tracking-wide text-white">
                Giảm nhiệt tức thì tại bề mặt tôn
              </div>
            </div>

            <div className="px-6 flex items-center gap-4 py-3 md:py-0">
              <div className="text-3xl font-black text-brand-yellow font-display">02</div>
              <div className="text-xs sm:text-sm font-black uppercase tracking-wide text-white">
                Thi công dễ dàng
              </div>
            </div>

            <div className="px-6 flex items-center gap-4 py-3 md:py-0">
              <div className="text-3xl font-black text-brand-yellow font-display">03</div>
              <div className="text-xs sm:text-sm font-black uppercase tracking-wide text-white">
                Bảo hành chính hãng
              </div>
            </div>

            <div className="px-6 flex items-center gap-4 py-3 md:py-0">
              <div className="text-3xl font-black text-brand-yellow font-display">04</div>
              <div className="text-xs sm:text-sm font-black uppercase tracking-wide text-white">
                Tăng khả năng chống thấm, dột mái
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROBLEM & PAIN POINTS SECTION - STT 2 */}
      <section className="py-20 bg-slate-50 border-b border-slate-205" id="pain-points">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-brand-red font-black text-xs uppercase tracking-widest bg-red-100 py-1.5 px-4 rounded-md inline-block">
              Nắng Nóng Đỉnh Điểm Tại Việt Nam
            </span>
            
            {/* Title exact wordings as requested */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight uppercase font-display">
              Ng Ngôi nhà &amp; Kho xưởng có khiến bạn cảm giác như đang trong &ldquo;Lò bát quái&rdquo;?
            </h3>
            
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              Nhiệt độ ngày hè ngoài trời chạm mức 38–40°C khiến tôn hấp thụ dội ngược tăng vọt hơn 65°C. Đừng để gia đình và thiết bị phải gánh chịu những tổn thất nghiêm hại:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pain Point 1 with requested image */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col">
              <div className="h-44 w-full overflow-hidden bg-slate-100 relative">
                <img 
                  src="https://phuonglinh.vn/Uploads/images/tin-tuc/z4967349494372_3b39cee8440b572d28f6a29fa55a8871.jpg" 
                  alt="Kho xưởng oi bức, mệt mỏi" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-2 py-1 rounded">
                  Khắp Kho Hầm Hập
                </span>
              </div>
              <div className="p-5 flex-grow space-y-2 text-left">
                <h4 className="font-extrabold text-slate-850 text-sm uppercase tracking-tight">Kho xưởng oi bức, mệt mỏi</h4>
                <p className="text-2xs text-slate-500 leading-relaxed font-semibold">
                  Nhân viên mất năng suất, kiệt sức đổ mồ hôi, dễ dẫn tới nguy hại cháy nổ và hỏng hóc các mạch linh kiện bã kho.
                </p>
              </div>
            </div>

            {/* Pain Point 2 with requested image resolved via URL resolver */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col">
              <div className="h-44 w-full overflow-hidden bg-slate-100 relative">
                <img 
                  src="/api/pin-image?url=https://pin.it/fhi90Rab0" 
                  alt="Tường hướng tây nung lửa" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-2 py-1 rounded">
                  Phát Nhiệt Ban Đêm
                </span>
              </div>
              <div className="p-5 flex-grow space-y-2 text-left">
                <h4 className="font-extrabold text-slate-850 text-sm uppercase tracking-tight">Tường hướng tây nung lửa</h4>
                <p className="text-2xs text-slate-500 leading-relaxed font-semibold">
                  Bức tường hấp nhiệt nguyên ngày tỏa hơi bí bách hầm hập lúc về đêm. Tốn gấp đôi hóa đơn dùng máy lạnh điều hòa.
                </p>
              </div>
            </div>

            {/* Pain Point 3 with requested image */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col">
              <div className="h-44 w-full overflow-hidden bg-slate-100 relative">
                <img 
                  src="https://munichgroup.vn/wp-content/uploads/2025/07/chong-nong-bon-nuoc-inox-1.webp" 
                  alt="Bồn nước lộ thiên xông khói" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-2 py-1 rounded">
                  Nước Nóng Như Sôi
                </span>
              </div>
              <div className="p-5 flex-grow space-y-2 text-left">
                <h4 className="font-extrabold text-slate-850 text-sm uppercase tracking-tight">Bồn nước lộ thiên xông khói</h4>
                <p className="text-2xs text-slate-500 leading-relaxed font-semibold">
                  Téc inox xông nắng bừng bừng làm toàn bộ nguồn nước nóng ran, gây bỏng rát không thể tắm rửa sinh hoạt ngày nắng gắt.
                </p>
              </div>
            </div>

            {/* Pain Point 4 with requested image resolved via URL resolver */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col">
              <div className="h-44 w-full overflow-hidden bg-slate-100 relative">
                <img 
                  src="/api/pin-image?url=https://pin.it/1fWQvmIDj" 
                  alt="Sân thượng nứt nẻ, dột thấm" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-2 py-1 rounded">
                  Co Giãn Phát Nứt
                </span>
              </div>
              <div className="p-5 flex-grow space-y-2 text-left">
                <h4 className="font-extrabold text-slate-850 text-sm uppercase tracking-tight">Sân thượng nứt nẻ, dột thấm</h4>
                <p className="text-2xs text-slate-500 leading-relaxed font-semibold">
                  Do nhiệt biến chuyển co nở đột ngột ngày đêm gây nứt rạn rò rỉ bê tông sàn mái, dột thấm dầm làm rêu dơ bám bẩn.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REVOLUTIONARY TECHNOLOGY SECTION - STT 3 */}
      <section className="py-20 bg-white" id="tech-solution">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual illustration box */}
            <div className="space-y-6 relative">
              <div className="bg-radial from-slate-50 to-slate-100 border border-slate-200 rounded-3xl p-8 shadow-inner flex flex-col items-center justify-center space-y-6 min-h-[350px]">
                <div className="w-16 h-16 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center shadow-md">
                  <Layers className="w-8 h-8" />
                </div>
                <div className="text-center space-y-2 max-w-sm">
                  <h4 className="font-black text-slate-800 text-base uppercase tracking-tight">Màng Phủ Phản Xạ Bức Xạ UV Thăng Long</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Nhựa Acrylic liên kết chéo thông minh ngăn chặn dội ngược tia cực tím, bít lấp mọi rãnh gỉ giúp mái tôn gia tăng tuổi thọ và mát sâu ổn định dài lâu.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 justify-center">
                  <span className="text-[10px] font-black bg-brand-blue/10 text-brand-blue py-1 px-3.5 rounded-full uppercase">Phản xạ UV 95%</span>
                  <span className="text-[10px] font-black bg-orange-100 text-orange-600 py-1 px-3.5 rounded-full uppercase">Acrylic Đàn Hồi</span>
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-600 py-1 px-3.5 rounded-full uppercase">Thương Hiệu 20 Năm</span>
                </div>
              </div>
            </div>

            {/* Left Description area */}
            <div className="space-y-6 text-left">
              <span className="text-brand-blue font-black text-xs uppercase tracking-widest bg-blue-50 py-1.5 px-4 rounded-md inline-block">
                Giải Pháp Cán Đích Công Nghệ
              </span>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight uppercase font-display">
                Sứ mệnh: Không chỉ làm mát, mà là bảo vệ tuổi thọ công trình.
              </h3>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Áp dụng công nghệ nano phản nhiệt khúc xạ cấu trúc cao, Sơn Thăng Long không chỉ tạo lớp màng bạc ngăn chặn dòng nhiệt hấp thụ trực tiếp mà còn bảo vệ kết cấu tôn, sắt thép và bồn nước an tâm tuyệt đối qua thời gian.
              </p>

              {/* Only 2 main core technologies kept as self-washing section has been removed */}
              <div className="space-y-4 pt-4 divide-y divide-slate-100">
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-5 h-5 text-brand-blue shrink-0" />
                    <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-tight">Cơ chế phản xạ bức xạ nhiệt (tia UV)</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 pl-7 leading-relaxed">
                    Sử dụng hạt cầu rỗng bọc silica cao cấp tạo rào cản bức xạ tuyệt vời giúp phản hồi tức thì 95% tổng năng lượng mặt trời trở lại khí quyển.
                  </p>
                </div>

                <div className="space-y-2 pt-4 text-left">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-5 h-5 text-brand-blue shrink-0" />
                    <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-tight">Vá nứt đàn hồi &amp; chống ẩm dột dầm rêu toàn diện</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 pl-7 leading-relaxed">
                    Màng keo dẻo dai liên kết chịu lực co giãn co nở kịch nhiệt cực kỳ xuất sắc, khóa chặt dột nước lấm mốc trên bề mặt ngói rỉ sét.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / EXPERIMENT VIDEOS SECTION - STT 4 */}
      <section className="py-20 bg-gradient-to-b from-brand-blue-dark to-brand-blue text-white relative overflow-hidden" id="proof-experiment">
        
        {/* Subtle decorative mesh or light rays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-slate-900 font-extrabold text-xs uppercase tracking-widest bg-brand-yellow py-1.5 px-4 rounded-md inline-block font-sans">
              Kiểm Chứng Thực Tế Mắt Thấy Tai Nghe
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight uppercase font-display">
              Hạ Nhiệt Đo Đo Lường Bằng Súng Hồng Ngoại &amp; Kỹ Sư Thực Địa
            </h3>
            <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Sơn Thăng Long cam kết thông tin trung thực, thực tế đối chứng rạch ròi bằng các thiết bị thử độ nóng hồng ngoại chuẩn nhất.
            </p>
          </div>

          {/* HIGH-FIDELITY TEMPERATURE COMPARISON INTERACTIVE CALCULATOR (Screenshot 3 style) */}
          <div className="bg-slate-950/70 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-orange-400 to-sky-400" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: Slider and Outdoor temperature selection */}
              <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between bg-slate-900/60 p-6 rounded-2xl border border-white/5 space-y-6">
                <div>
                  <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-slate-400">
                    <span>Bức xạ nắng mặt trời</span>
                    <span className="text-brand-yellow">Độ ẩm/Nắng gắt</span>
                  </div>
                  
                  <div className="flex justify-between items-baseline mt-4">
                    <span className="text-xs font-bold text-slate-300 font-sans">Nhiệt độ ngoài trời:</span>
                    <span className="text-xl font-black text-brand-yellow font-mono bg-brand-yellow/10 px-3 py-1 rounded-lg border border-brand-yellow/20">
                      {outdoorTemp}°C
                    </span>
                  </div>

                  {/* Range slider styled matching screen 3 */}
                  <div className="mt-5 relative pb-4">
                    <input 
                      type="range"
                      min={28}
                      max={48}
                      value={outdoorTemp}
                      onChange={(e) => setOutdoorTemp(parseInt(e.target.value))}
                      className="w-full accent-brand-blue cursor-ew-resize h-2 bg-slate-800 rounded-lg appearance-none border border-white/5"
                    />
                    <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-3 uppercase tracking-tighter leading-snug">
                      <span className="text-left">28°C<br/><span className="text-slate-500 font-medium font-sans">Mát mẻ</span></span>
                      <span className="text-center">35°C<br/><span className="text-slate-500 font-medium font-sans">Thường</span></span>
                      <span className="text-center">42°C<br/><span className="text-slate-500 font-medium font-sans">Gay gắt</span></span>
                      <span className="text-right">48°C<br/><span className="text-slate-500 font-medium font-sans">Đặc biệt</span></span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3.5 border-t border-white/10 pt-4 text-left">
                  <div className="flex gap-2 text-2xs font-semibold leading-relaxed text-slate-300">
                    <div className="shrink-0 text-red-500 mt-0.5 font-sans">📍</div>
                    <p>
                      Tại Việt Nam, súng nhiệt bắn thực tế hồng ngoại chứng minh: Mái tôn thông thường hấp thụ nhiệt cực mạnh, bị sấy nóng lên tới <strong className="text-red-400 font-black font-display font-mono">{Math.round(2 * outdoorTemp - 12)}°C</strong>.
                    </p>
                  </div>
                  <div className="flex gap-2 text-2xs font-semibold leading-relaxed text-slate-300">
                    <div className="shrink-0 text-sky-400 mt-0.5 font-sans">🛡️</div>
                    <p>
                      Khi được phủ Sơn Cực Mát Gold Rober GCN-10 Thăng Long, bề mặt phản quang tuyệt vời giúp giữ nhiệt mái ở mức chỉ <strong className="text-sky-400 font-black font-display font-mono">{Math.round(outdoorTemp + 7)}°C</strong> (Giảm chênh lệch tới <strong className="text-brand-yellow font-black font-display font-mono">{Math.round(2 * outdoorTemp - 12) - Math.round(outdoorTemp + 7)}°C!</strong>).
                    </p>
                  </div>
                </div>
              </div>

              {/* Middle Column: Normal Temperature Box (Red accent) */}
              <div className="lg:col-span-6 xl:col-span-3 bg-red-950/25 border border-red-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group">
                <div className="absolute -inset-10 bg-red-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-red-500/10 transition-colors duration-500" />
                <div className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center text-red-400 mb-3 relative z-10">
                  <Thermometer className="w-5 h-5 animate-pulse" />
                </div>
                <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest relative z-10 leading-none">
                  Nhiệt độ mái tôn thường
                </span>
                <span className="text-[44px] font-black text-rose-500 font-display mt-2.5 relative z-10 leading-none tracking-tight font-mono">
                  {Math.round(2 * outdoorTemp - 12)}°C
                </span>
                <p className="text-[10px] text-slate-300 mt-4 leading-relaxed font-semibold relative z-10">
                  Sắt hấp thụ 85-90% năng lượng mặt trời truyền bức xạ nhiệt xuống đáy tôn, làm nung rát trần hầm hập.
                </p>
              </div>

              {/* Right Column: Protected Temperature Box (Blue accent) */}
              <div className="lg:col-span-6 xl:col-span-4 bg-blue-950/30 border border-blue-500/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group pt-10">
                <div className="absolute top-3 bg-blue-500/30 border border-blue-400/30 text-sky-200 font-black text-[8px] uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 z-10">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>ĐÃ PHỦ GOLD ROBER</span>
                </div>
                
                <div className="absolute -inset-10 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-500" />
                <span className="text-slate-300 font-medium text-[10px] uppercase tracking-widest relative z-10 leading-none">
                  Sau khi sơn chống nóng
                </span>
                <span className="text-[44px] font-black text-sky-400 font-display mt-2.5 relative z-10 leading-none tracking-tight font-mono">
                  {Math.round(outdoorTemp + 7)}°C
                </span>
                <p className="text-[10px] text-slate-300 mt-4 leading-relaxed font-semibold relative z-10">
                  Màng phản quang ngăn hấp nhiệt tối ưu, cách âm chống ồn tuyệt đối kể cả khi trời mưa to gió lớn.
                </p>
              </div>

            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-xs tracking-wider uppercase font-extrabold text-blue-100">Xem video thực tế kiểm nghiệm sản phẩm:</p>
            </div>

            {/* Grid display 2 YouTube Short embed side-by-side as requested */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* Short 1 */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                <div className="aspect-[9/16] w-full max-h-[500px] relative overflow-hidden bg-black flex items-center justify-center">
                  <iframe 
                    className="absolute inset-0 w-full h-full border-0"
                    src="https://www.youtube.com/embed/APuuUHSRu6E" 
                    title="Kiểm chứng chống nóng mái tôn thực tế"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  />
                </div>
                <div className="p-5 bg-slate-900 border-t border-slate-800 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-2">
                    <span className="text-[10px] text-orange-400 font-mono tracking-widest font-bold uppercase">KIỂM CHỨNG SỐ 01</span>
                    <h4 className="text-sm font-black text-white font-display uppercase tracking-tight">
                      Súng đo nhiệt trên mái tôn trước - sau sơn
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Kỹ thuật viên bọc dột sút nhiệt trước nắng cực gắt, đo bắn hồng ngoại nhiệt bề mặt giảm rõ từ 60°C xuống 35°C ngay sau thời điểm quét màng bọc.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 mt-4 text-[10px] text-slate-500 font-mono flex justify-between">
                    <span>Nguồn: Thăng Long Team</span>
                    <span>Thực tế 100%</span>
                  </div>
                </div>
              </div>

              {/* Short 2 */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                <div className="aspect-[9/16] w-full max-h-[500px] relative overflow-hidden bg-black flex items-center justify-center">
                  <iframe 
                    className="absolute inset-0 w-full h-full border-0"
                    src="https://www.youtube.com/embed/6TBJFZteqpw" 
                    title="Đo lường hiệu quả giảm nhiệt thực tế"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  />
                </div>
                <div className="p-5 bg-slate-900 border-t border-slate-800 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-2">
                    <span className="text-[10px] text-orange-400 font-mono tracking-widest font-bold uppercase">KIỂM CHỨNG SỐ 02</span>
                    <h4 className="text-sm font-black text-white font-display uppercase tracking-tight">
                      Trải nghiệm thi công đo bồn nước và vách đứng
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Sức bọc dai cứng, ngăn rêu bám rạng kẽ tôn, duy trì chống rỉ ăn mòn muối biển, đem lại trải nghiệm nước mát lịm sảng khoái suốt mùa hè bức.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 mt-4 text-[10px] text-slate-500 font-mono flex justify-between">
                    <span>Nguồn: Thăng Long Project</span>
                    <span>Thực nghiệm 100%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* PRODUCTS & TECHNICAL SPECS SECTION - STT 5 */}
      <section className="py-20 bg-white border-b border-slate-200" id="product-specs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-brand-blue font-black text-xs uppercase tracking-widest bg-blue-50 py-1.5 px-4 rounded-md inline-block font-sans">
              Hệ Sinh Thái Sản Phẩm Thăng Long
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight uppercase font-display">
              Sơn Lót &amp; Sơn Phủ Chống Nóng Chuyên Dụng Gold Rober
            </h3>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
              Hệ thống màng bọc 2 lớp bảo vệ vững vàng. Đủ thông số, thi công đơn giản nhất cho gia chủ và nhà thầu xây dựng.
            </p>
          </div>

          {/* Clean product selector Tab strip */}
          <div className="flex justify-center">
            <div className="bg-slate-100 p-1.5 rounded-2xl inline-flex border border-slate-200 shadow-sm max-w-md w-full">
              <button 
                onClick={() => setActiveTab("coating")}
                className={`flex-1 py-3 px-6 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all duration-300 ${activeTab === 'coating' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Sơn phủ ngoài (GCN-10)
              </button>
              <button 
                onClick={() => setActiveTab("primer")}
                className={`flex-1 py-3 px-6 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all duration-300 ${activeTab === 'primer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Sơn Lót Kháng Kiềm (GCN-08)
              </button>
            </div>
          </div>

          {/* Product details display card */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Product realistic image dynamically linked based on instructions */}
              <div className="md:col-span-4 flex flex-col items-center">
                <div className="relative w-52 h-52 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-2 group bg-gradient-to-b from-white to-slate-50 font-sans">
                  <img 
                    src={activeTab === 'coating' 
                      ? 'https://sonthanglong.com.vn/wp-content/uploads/2025/06/SUPER-NO.1-SON-CHUYEN-DUNG-Son-chong-nong-phu-ngoai-600x600.jpg' 
                      : 'https://sonthanglong.com.vn/wp-content/uploads/2025/06/SUPER-NO.1-SON-CHUYEN-DUNG-Son-lot-chong-nong-600x600.jpg'}
                    alt={activeTab === 'coating' ? 'Sơn phủ ngoài' : 'Sơn lót'}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 animate-fade-in"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-brand-blue text-white text-[8px] font-black px-2 py-0.5 rounded shadow">
                    CHÍNH HÃNG
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 mt-3 bg-slate-100 py-1 px-3 rounded-full uppercase tracking-wider">
                  Sơn Thăng Long chính hiệu
                </span>
              </div>

              {/* Text specs */}
              <div className="md:col-span-8 space-y-6 text-left">
                <div className="space-y-1">
                  <span className="text-3xs uppercase font-extrabold text-brand-blue tracking-wider block">Thông số tiêu chuẩn từ cẩm nang kỹ thuật:</span>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 font-display uppercase">
                    {activeTab === 'coating' 
                      ? 'Sơn phủ chống nóng Gold Rober GCN-10' 
                      : 'Sơn lót chống nóng cao cấp Gold Rober GCN-08'}
                  </h4>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {activeTab === 'coating' 
                    ? 'Nhựa gốc Acrylic, các loại hạt khoáng chuyên dụng tán xạ tối ưu, chất phụ gia và nước. Màng bọc ngăn 95% dòng nhiệt bức xạ truyền trực tiếp xuống bề mặt mái tôn và tường hướng tây.' 
                    : 'Nhựa gốc Acrylic, bột khoáng, chất phụ gia đặc dụng màng bọc đóng vai trò làm lớp liên kết siêu bám dính bít kín rỉ sắt tôn cũ, kháng kiềm mặn tuyệt đối cho tường đứng và bê tông.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {(activeTab === 'coating' ? [
                    { icon: <Layers className="w-4 h-4 text-brand-blue" />, label: "Thành phần cấu tạo", value: "Nhựa gốc Acrylic, các hạt khoáng chuyên dụng giúp tán xạ tối ưu, chất phụ gia và nước." },
                    { icon: <Gauge className="w-4 h-4 text-brand-blue" />, label: "Định mức lý thuyết (2 lớp)", value: "Mái tôn: 2.1 - 3.8 m²/Lít • Tường nhà: 4.5 - 6 m²/Lít" },
                    { icon: <Thermometer className="w-4 h-4 text-brand-blue" />, label: "Độ dày màng khi khô (2 lớp)", value: "Mái tôn: 150 - 300 micron • Tường nhà: 100 - 120 micron" },
                    { icon: <ShieldCheck className="w-4 h-4 text-brand-blue" />, label: "Màu sắc & Quy cách", value: "Quy cách: Hộp 1L, Lon 5L, Thùng 18L • Màu bạc chuyên dụng (tối ưu nhất)" }
                  ] : [
                    { icon: <Layers className="w-4 h-4 text-brand-blue" />, label: "Thành phần cấu tạo", value: "Nhựa gốc Acrylic, bột khoáng, chất phụ gia đặc biệt và nước." },
                    { icon: <Gauge className="w-4 h-4 text-brand-blue" />, label: "Định mức lý thuyết (2 lớp)", value: "Mái tôn: 1.4 - 2.5 m²/Lít • Tường nhà: 3 - 4 m²/Lít" },
                    { icon: <Thermometer className="w-4 h-4 text-brand-blue" />, label: "Độ dày màng khi khô (2 lớp)", value: "Mái tôn: 300 - 600 micron • Tường nhà: 200 - 240 micron" },
                    { icon: <ShieldCheck className="w-4 h-4 text-brand-blue" />, label: "Màu sắc & Quy cách", value: "Quy cách: Hộp 1L, Lon 5L, Thùng 18L • Màu trắng sữa mịn kháng kiềm" }
                  ]).map((spec, i) => (
                    <div key={i} className="flex gap-2.5 bg-white p-3 rounded-xl border border-slate-150">
                      <div className="shrink-0 mt-0.5">{spec.icon}</div>
                      <div>
                        <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{spec.label}</span>
                        <span className="text-2xs sm:text-xs font-black text-slate-705 block mt-0.5 leading-snug">{spec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <a href={activeTab === 'coating' ? 'https://sonthanglong.com.vn/rober-gold-son-phu-chong-nong/' : 'https://sonthanglong.com.vn/rober-gold-son-lot-chong-nong/'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-black text-brand-blue hover:underline uppercase tracking-wider">
                    <span>Xem đầy đủ thông số kỹ thuật chi tiết của nhà máy</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

              </div>

            </div>
          </div>

          {/* 3 simple steps of application */}
          <div className="pt-6 space-y-6">
            <h4 className="text-center text-xs font-extrabold uppercase tracking-widest text-slate-400">Quy trình 3 bước thi công đơn giản:</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "Bước 01", title: "Chuẩn bị bề mặt sạch bóng", desc: "Dùng vòi rửa cao áp hoặc chổi cọ quét sạch bụi bẩn, cạo gột vảy rỉ sắt tôn cũ, vá vết nứt." },
                { step: "Bước 02", title: "Lăn sơn lót bám dính GCN-08", desc: "Sử dụng con lăn rulo quét đều 1 lớp lót Thăng Long GCN-08 màng lấp dột, lót nền kháng muối kiềm bền bỉ." },
                { step: "Bước 03", title: "Phủ sơn chống nóng GCN-10", desc: "Chờ khô tầm 30-45 phút rồi lăn đều 2 lớp sơn phủ GCN-10 cách nhiệt phản UV. Mái tôn bọc bạc lạnh rượi lập tức." }
              ].map((stepItem, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute right-4 top-4 text-3xl font-black text-slate-200/60 font-display">0{idx+1}</div>
                  <div className="space-y-2 mt-2">
                    <span className="text-3xs uppercase font-extrabold text-blue-500 font-mono tracking-widest block">{stepItem.step}</span>
                    <h5 className="font-extrabold text-slate-800 text-sm uppercase tracking-tight">{stepItem.title}</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">{stepItem.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION - STT 6 */}
      <section className="py-20 bg-slate-100 border-b border-slate-200" id="faq">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-brand-blue font-black text-xs uppercase tracking-widest bg-blue-100/60 py-1.5 px-4 rounded-md inline-block font-sans">
              Câu Hỏi Thường Gặp
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight uppercase font-display">
              Giải Đáp Những Mối Lăn Tăn Cuối Cùng
            </h3>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
              Chuyên gia của Sơn Thăng Long trực tiếp xử lý các thắc mắc thông dụng để bạn hoàn toàn an tâm trao gửi tin tưởng.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Tôi tự mua về tự lăn / tự quét được không?",
                a: "Hoàn toàn ĐƯỢC! Quy trình thi công của Sơn Thăng Long đơn giản như quét vôi nước. Không đòi hỏi thợ lành thạo có khí cụ phun sơn cầu kỳ; bạn chỉ cần rulo chuyên dụng hoặc chổi sơn chổi cọ thông dụng là tự phủ mái bồn thoải mái bảnh mát."
              },
              {
                q: "Màu sơn nào bọc hạ chênh lệch nhiệt tốt nhất?",
                a: "Các màu sắc có hạt phản quang sáng cao như màu bạc hoặc trắng đục của Gold Rober phản hồi ngược tia UV xuất sắc nhất. Sơn phủ xong giữ bề mặt bóng nhẵn, tránh bám rêu rác nên giữ độ mát dẻo dính kiên cố ngót 10 năm trời gắt."
              },
              {
                q: "Màng phủ kéo dài bảo hộ công trình qua bao nhiêu năm?",
                a: "Lớp lót bít gỉ cộng màng phủ chính Acrylic có độ dẻo đàn hồi cao kháng mặn muối tuyệt vời, duy trì bám dính chắc khỏe thách thức nắng mưa giông bão lên tới hơn 10 năm bảo hành tiêu chuẩn từ nhà máy Thăng Long JV."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-left space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug">{faq.q}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed pl-9">{faq.a}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* REGISTER FORM & OFFER SECTION - STT 7 */}
      <section className="py-20 bg-white" id="lead-form">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left side: Premium Offer Details card layout (Modified from STT 7 per list) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white p-8 sm:p-10 flex flex-col justify-between">
              <div className="space-y-6">
                
                {/* Wording changed per requested sheet notes */}
                <span className="bg-brand-yellow text-slate-900 font-extrabold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full inline-block">
                  Ưu đãi đặc biệt Tháng 6
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight font-display uppercase tracking-tight">
                  Giảm Ngay 10% Cho 50 Chủ Nhà Đăng Ký Sớm Nhất!
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                  Chuyên gia Sơn Thăng Long trực tiếp đo đạc tính toán liều lượng chuẩn cho diện tích của bạn. Đăng ký thông tin họ tên, SĐT dưới đây để giữ Voucher ưu đãi 10% ngay ngày hôm nay!
                </p>

                <div className="space-y-3.5 pt-4">
                  <div className="flex items-center gap-2.5 text-xs text-slate-100 font-bold">
                    <Check className="w-4 h-4 text-brand-yellow" />
                    <span>Hạ nhiệt lập tức sâu tới 25°C</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-100 font-bold">
                    <Check className="w-4 h-4 text-brand-yellow" />
                    <span>Tăng cường chống dột bong tróc gỉ mái</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-100 font-bold">
                    <Check className="w-4 h-4 text-brand-yellow" />
                    <span>Cung cấp hồ sơ bảo hành nhà máy 10 năm</span>
                  </div>
                </div>
              </div>

              {/* Secure Trust badges bottom */}
              <div className="pt-6 border-t border-white/10 text-center mt-6">
                <span className="text-[10px] text-yellow-100 font-bold tracking-wide uppercase">🛡️ cam kết bảo mật thông tin SĐT 100%</span>
              </div>
            </div>

            {/* Right side: Clean interactive register form. Synced to google sheets! */}
            <div className="lg:col-span-7 p-8 sm:p-10 text-left space-y-6">
              <div className="space-y-1">
                <span className="text-[9px] font-black text-brand-blue uppercase tracking-widest block">Tính toán liều lượng cho công trình</span>
                <h4 className="text-lg sm:text-xl font-black text-slate-900 font-display uppercase">
                  Diện tích nhà bạn bao nhiêu? Để chuyên gia Sơn Thăng Long tính toán giúp bạn!
                </h4>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullname-input" className="block text-[10px] font-black text-slate-600 uppercase tracking-wider">Họ và tên *</label>
                  <input 
                    id="fullname-input"
                    type="text" 
                    required 
                    placeholder="Ví dụ: Nguyễn Văn A" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-brand-blue focus:bg-white text-slate-800"
                  />
                </div>

                {/* SĐT */}
                <div className="space-y-1.5">
                  <label htmlFor="phone-input" className="block text-[10px] font-black text-slate-600 uppercase tracking-wider">Số điện thoại *</label>
                  <input 
                    id="phone-input"
                    type="tel" 
                    required 
                    placeholder="Ví dụ: 0904 696 551" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-brand-blue focus:bg-white text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Select Surface / Vật liệu cần phủ mát */}
                  <div className="space-y-1.5">
                    <label htmlFor="surface-select" className="block text-[10px] font-black text-slate-600 uppercase tracking-wider">Cần chống nóng cho</label>
                    <select 
                      id="surface-select"
                      value={surfaceType}
                      onChange={(e) => setSurfaceType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-2xs font-extrabold text-slate-700 focus:ring-2 focus:ring-brand-blue focus:bg-white"
                    >
                      <option value="Mái tôn">Mái tôn dột rỉ</option>
                      <option value="Tường đứng">Tường hướng Tây nung</option>
                      <option value="Bồn nước Inox">Bồn chứa téc nước lộ thiên</option>
                      <option value="Sân thượng">Sân thượng bê tông nứt rêu</option>
                    </select>
                  </div>

                  {/* Surface Area in m2 */}
                  <div className="space-y-1.5">
                    <label htmlFor="area-input" className="block text-[10px] font-black text-slate-600 uppercase tracking-wider">Diện tích ước tính (m²)</label>
                    <input 
                      id="area-input"
                      type="number" 
                      min="5"
                      max="10000"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-brand-blue focus:bg-white text-slate-800"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 hover:scale-[1.01] active:scale-[0.99] font-black text-white py-4 rounded-xl text-xs sm:text-sm uppercase tracking-widest shadow-xl shadow-orange-100 transition-all duration-200 flex items-center justify-center gap-2 pt-4"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Đang gửi thông tin..." : "Nhận Voucher 10% & Tư Vấn Miễn Phí"}</span>
                </button>
              </form>

              {/* Success/Error alert blocks */}
              {submitStatus === 'success' && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs space-y-1">
                  <div className="flex items-center gap-2 font-black uppercase">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Gửi đăng ký thành công!</span>
                  </div>
                  <p className="font-medium text-slate-600 leading-normal">{statusMessage}</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl text-xs font-medium">
                  <p>{statusMessage}</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER SECTION - Masterfully redesigned to have exactly 3 columns based on exact links */}
      <footer className="bg-brand-blue-dark text-white py-16 border-t border-white/10 relative overflow-hidden">
        
        {/* Subtle bottom graphic accent */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-brand-yellow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm relative z-10">
          
          {/* Column 1: Logo, Name, Sub-introduction */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 bg-white rounded-lg overflow-hidden flex items-center justify-center shadow-md border border-white/15 shrink-0">
                <img 
                  src="https://i.pinimg.com/280x280_RS/31/61/2b/31612b1a9f090690ae4aeea1cc28aa7e.jpg" 
                  alt="Sơn Thăng Long Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <p className="text-xs text-blue-100 leading-relaxed font-semibold">
              Chuyên gia điều chế phân phối sơn phủ phản xạ nhiệt cao cấp bám dính siêu hạng trên kim loại, tường đứng nhà xưởng lớn hàng đầu miền Bắc.
            </p>
          </div>

          {/* Column 2: Requested "Giới thiệu tóm tắt" column replacing "dòng sp tiêu biểu" */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-black uppercase text-brand-yellow tracking-widest font-mono">Giới thiệu tóm tắt</h4>
            <p className="text-blue-100 text-xs leading-relaxed font-sans font-medium font-semibold">
              Chiến dịch Sơn chống nóng mái tôn Thăng Long Gold Rober đem lại bước hạ nhiệt sâu và tức thì từ 5-25°C cho hàng loạt các mái tôn nhà xưởng, ngôi nhà hướng Tây và các bồn téc chứa nước inox lộ thiên đỉnh điểm Việt Nam.
            </p>
          </div>

          {/* Column 3: "Thông tin liên hệ" as requested * (Col 2: dòng sp, Col 3: kênh thông tin website/facebook removed!) */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-black uppercase text-brand-yellow tracking-widest font-mono">THÔNG TIN LIÊN HỆ</h4>
            <div className="space-y-2.5 text-xs text-blue-100 font-semibold font-mono leading-relaxed">
              <p>Hotline: 0904.696.551</p>
              <p>Email: info@sonthanglong.com.vn</p>
              <p>Công ty: CÔNG TY CP TM &amp; SX SƠN THĂNG LONG JV</p>
              <p className="text-[10px] text-blue-200 leading-normal font-sans pt-1 font-semibold">Địa chỉ nhà máy và văn phòng phân phối sơn phủ lớn nhất miền Bắc.</p>
            </div>
          </div>

        </div>

        {/* Bottom slogans and copyright */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 text-center text-xs text-blue-200 space-y-2 relative z-10">
          <p>© 2026 CÔNG TY CP TM &amp; SX SƠN THĂNG LONG. Tất cả quyền được bảo lưu.</p>
          <p className="flex items-center gap-1.5 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
            
            {/* Replaced with exact slogan required text */}
            <span className="font-semibold text-white">Chuyên gia với tinh thần Phụng sự</span>
          </p>
        </div>
      </footer>

    </div>
  );
}
