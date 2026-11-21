
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./OlaraPopup.module.css";

/* ==========================================
   CONFIGURACIÓN DEL POPUP OLARA
   ========================================== */

const POPUP_ENABLED = true;
const POPUP_DELAY = 10000;
const POPUP_DISMISS_DAYS = 3;

/*    const POPUP_DEVICE = "both"; se sustituye por
------- TypeScript interpreta que esa constante siempre será "both", por lo que considera imposible que sea igual a "desktop" o "mobile".
--------*/
type PopupDevice = "both" | "desktop" | "mobile";
const POPUP_DEVICE: PopupDevice =
  (process.env.NEXT_PUBLIC_OLARA_POPUP_DEVICE as PopupDevice) || "both";


const STORAGE_KEY = "st_olara_popup_until";

const OLARA_URL =
  "https://olara.sttravelshop.com/?utm_source=sttravelshop&utm_medium=popup&utm_campaign=olara";

/* ==========================================
   FUNCIONES AUXILIARES
   ========================================== */

function trackEvent(eventName: string) {
  const w = window as Window & {
    dataLayer?: Array<Record<string, unknown>>;
  };

  w.dataLayer?.push({
    event: eventName,
  });
}

function saveDismissal(days: number) {
  try {
    const expiresAt = Date.now() + days * 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, String(expiresAt));
  } catch {
    // El popup sigue funcionando aunque el navegador bloquee storage.
  }
}

/* ==========================================
   COMPONENTE PRINCIPAL
   ========================================== */

export default function OlaraPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  /* Mostrar popup después del tiempo configurado */

  useEffect(() => {
    if (!POPUP_ENABLED) return;

    const isMobile = window.innerWidth < 768;

    if (POPUP_DEVICE === "desktop" && isMobile) return;
    if (POPUP_DEVICE === "mobile" && !isMobile) return;

    try {
      const dismissedUntil = Number(
        localStorage.getItem(STORAGE_KEY) || 0
      );

      if (dismissedUntil > Date.now()) return;
    } catch {
      // Continuar si localStorage no está disponible.
    }

    const timer = window.setTimeout(() => {
      previousFocusRef.current =
        document.activeElement as HTMLElement;

      setIsOpen(true);
      trackEvent("olara_popup_view");
    }, POPUP_DELAY);

    return () => window.clearTimeout(timer);
  }, []);

  /* Control del foco, Escape y scroll */

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closePopup();
      }

      if (event.key === "Tab") {
        const focusable = Array.from(
          modalRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href]'
          ) || []
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  /* Cerrar popup y recordar decisión */

  function closePopup() {
    saveDismissal(POPUP_DISMISS_DAYS);
    trackEvent("olara_popup_close");
    setIsOpen(false);
  }

  /* Registrar clic hacia OLARA */

  function handleOlaraClick() {
    trackEvent("olara_popup_click");
    saveDismissal(7);
  }

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closePopup();
        }
      }}
    >
      <section
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="olara-popup-title"
        aria-describedby="olara-popup-description"
      >
        {/* BOTÓN CERRAR */}

        <button
          ref={closeButtonRef}
          type="button"
          className={styles.close}
          onClick={closePopup}
          aria-label="Cerrar popup de OLARA"
        >
          &times;
        </button>

        {/* FOTOGRAFÍA EDITORIAL */}

        <div
          className={styles.photo}
          role="img"
          aria-label="Mujeres disfrutando de un viaje"
        />

        {/* CONTENIDO */}

        <div className={styles.content}>
          <div className={styles.brand}>
            OLARA
          </div>

          <div className={styles.line} aria-hidden="true" />

          <h2
            id="olara-popup-title"
            className={styles.title}
          >
            Descubre el mundo
            <br />
            <em>con la libertad</em>
            <br />
            de saber elegir.
          </h2>

          <p
            id="olara-popup-description"
            className={styles.description}
          >
            Una comunidad privada para mujeres con acceso
            a conocimiento, criterio, recomendaciones y
            oportunidades creadas por ST Travel.
          </p>

          {/* BOTÓN PRINCIPAL */}

          <a
            href={OLARA_URL}
            className={styles.cta}
            onClick={handleOlaraClick}
          >
            Conoce OLARA
            <span aria-hidden="true">→</span>
          </a>

          {/* BOTÓN SECUNDARIO */}

          <button
            type="button"
            className={styles.later}
            onClick={closePopup}
          >
            Tal vez después
          </button>
        </div>
      </section>
    </div>
  );
}
