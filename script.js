/* =============================================================
   YTSYS コーポレートサイト スクリプト
   ============================================================= */

'use strict';

/* ---------- スクロール時にヘッダーに影を付ける ---------- */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* ---------- ハンバーガーメニュー ---------- */
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('drawer');

hamburger.addEventListener('click', () => {
  const isOpen = drawer.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
});

// ドロワーのリンクをタップしたら閉じる
drawer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    drawer.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-label', 'メニューを開く');
  });
});

/* ---------- フェードイン（Intersection Observer） ---------- */
const fadeTargets = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // 複数要素が同時に入ったときに少しずつずらす
      const delay = index * 80;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target); // 一度表示したら監視解除
    }
  });
}, {
  threshold: 0.15, // 要素が15%見えたらトリガー
});

fadeTargets.forEach(el => observer.observe(el));

/* ---------- スムーススクロール（ヘッダー高さ分オフセット） ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return; // トップリンクはそのまま

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const headerHeight = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---------- ヒーローセクションだけ初期表示でフェードイン ---------- */
// ページ読み込み完了後にヒーローをすぐ表示する
window.addEventListener('DOMContentLoaded', () => {
  const heroFade = document.querySelector('#hero .fade-in');
  if (heroFade) {
    setTimeout(() => heroFade.classList.add('visible'), 100);
  }
});
