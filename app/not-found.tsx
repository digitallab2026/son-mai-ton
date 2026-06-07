import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div id="not-found-container" className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
      <div id="not-found-content" className="max-w-md bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
        <h1 id="not-found-code" className="text-6xl font-black text-brand-blue mb-4">404</h1>
        <h2 id="not-found-title" className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-wide">
          Không tìm thấy trang
        </h2>
        <p id="not-found-desc" className="text-slate-600 text-sm mb-6">
          Đường dẫn không tồn tại hoặc đã được thay đổi. Vui lòng quay trở lại trang chủ.
        </p>
        <Link 
          id="not-found-home-btn"
          href="/" 
          className="inline-block bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-black px-6 py-3 rounded-full transition-transform hover:scale-105 uppercase tracking-wider"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
