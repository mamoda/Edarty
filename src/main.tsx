import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// حفظ حالة التمرير قبل إعادة التحميل
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    // حفظ الموضع قبل تحديث HMR
    sessionStorage.setItem('vite_scroll_before_reload', window.scrollY.toString());
  });

  import.meta.hot.accept(() => {
    // استعادة الموضع بعد تحديث HMR
    const savedPos = sessionStorage.getItem('vite_scroll_before_reload');
    if (savedPos) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPos));
        sessionStorage.removeItem('vite_scroll_before_reload');
      }, 100);
    }
  });
}

// استعادة الموضع عند التحميل العادي
const savedScroll = sessionStorage.getItem('vite_scroll_position');
if (savedScroll) {
  setTimeout(() => {
    window.scrollTo(0, parseInt(savedScroll));
  }, 100);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
