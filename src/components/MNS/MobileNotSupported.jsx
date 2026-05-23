import React, { useState } from "react";
import "./scss/main.scss"; 

const FEATURES = [
  {
    icon: "🖥",
    title: "Оптимизировано для ПК",
    desc: "Для корректного отображения требуется ширина экрана от 1024px",
  },
  {
    icon: "🪄",
    title: "Современный интерфейс",
    desc: "Эффекты матового стекла, глубокого размытия и плавные анимации",
  },
  {
    icon: "⚡",
    title: "Полная функциональность",
    desc: "Управление окнами, интерактивный Док и живой Терминал",
  },
];

export default function MobileNotSupported() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    // Копируем текущий URL сайта в буфер обмена
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    
    // Возвращаем текст кнопки обратно через 2.5 секунды
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <div className="mns-backdrop">
      {/* Современный абстрактный фон macOS */}
      <div className="mns-desktop-bg" />

      {/* Окно теперь полностью заблокировано, его нельзя случайно закрыть */}
      <div className="mns-window" role="dialog" aria-modal="true">

        {/* ── Единая панель заголовка (Кнопки теперь просто декорация) ── */}
        <div className="mns-titlebar">
          <div className="mns-traffic">
            <div className="tl tl-close" title="Доступно только на ПК" />
            <div className="tl tl-min" />
            <div className="tl tl-max" />
          </div>
          <span className="mns-titlebar-label">hackintosh.web</span>
          <div className="mns-titlebar-spacer" />
        </div>

        {/* ── Основной контент ── */}
        <div className="mns-body">

          {/* Главный блок */}
          <div className="mns-hero">
            <div className="mns-app-icon" aria-hidden="true">
              <span className="mns-app-icon-inner">🖥</span>
            </div>
            <div className="mns-hero-text">
              <h1 className="mns-title">Пересядьте за компьютер</h1>
              <p className="mns-subtitle">Desktop Only Environment</p>
              <p className="mns-description">
                Этот проект полностью воссоздает систему macOS. На экранах телефонов она физически не помещается. 
                Скопируйте ссылку и откройте её на компьютере.
              </p>
            </div>
          </div>

          {/* Список системных требований */}
          <div className="mns-features-box">
            <div className="mns-features" role="list">
              {FEATURES.map((f) => (
                <div className="mns-feature-row" role="listitem" key={f.title}>
                  <div className="mns-feature-icon" aria-hidden="true">
                    {f.icon}
                  </div>
                  <div className="mns-feature-text">
                    <span className="mns-feature-title">{f.title}</span>
                    <span className="mns-feature-desc">{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Новая умная панель действий */}
          <div className="mns-actions">
            <button
              className={`mns-btn ${copied ? "mns-btn--success" : "mns-btn--primary"}`}
              onClick={handleCopyLink}
            >
              {copied ? "Ссылка скопирована! 📋 Отправьте её себе" : "Скопировать ссылку для ПК"}
            </button>
          </div>

          <p className="mns-footer">© 2026 gaminghackintosh</p>
        </div>
      </div>
    </div>
  );
}