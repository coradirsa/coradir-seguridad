// Utilidad para tracking de eventos en Google Analytics 4 y Google Tag Manager

// Tipos de eventos
export type EventName =
  | 'form_submit'
  | 'form_submit_success'
  | 'form_submit_error'
  | 'whatsapp_click'
  | 'phone_click'
  | 'pdf_download'
  | 'video_play'
  | 'video_pause'
  | 'scroll_depth'
  | 'cta_click'
  | 'link_click';

export interface EventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  form_name?: string;
  error_message?: string;
  button_location?: string;
  phone_number?: string;
  file_name?: string;
  video_title?: string;
  scroll_percentage?: number;
  link_url?: string;
  link_text?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Envía un evento a Google Analytics 4 y Google Tag Manager
 * @param eventName - Nombre del evento
 * @param eventParams - Parámetros adicionales del evento
 */
export const trackEvent = (eventName: EventName, eventParams?: EventParams): void => {
  // Verificar que gtag esté disponible (Google Analytics)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  // Verificar que dataLayer esté disponible (Google Tag Manager)
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }

  // Log en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event]', eventName, eventParams);
  }
};

/**
 * Eventos específicos pre-configurados
 */

// Formulario de contacto
export const trackFormSubmit = (formName: string = 'contact_form') => {
  trackEvent('form_submit', {
    event_category: 'form',
    event_label: formName,
    form_name: formName,
  });
};

export const trackFormSuccess = (formName: string = 'contact_form') => {
  trackEvent('form_submit_success', {
    event_category: 'form',
    event_label: `${formName}_success`,
    form_name: formName,
    value: 1, // Valor para conversiones
  });
};

export const trackFormError = (formName: string = 'contact_form', errorMessage: string) => {
  trackEvent('form_submit_error', {
    event_category: 'form',
    event_label: `${formName}_error`,
    form_name: formName,
    error_message: errorMessage,
  });
};

// WhatsApp
export const trackWhatsAppClick = (buttonLocation: string = 'unknown') => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: `whatsapp_${buttonLocation}`,
    button_location: buttonLocation,
    value: 1,
  });
};

// Teléfono
export const trackPhoneClick = (phoneNumber: string, buttonLocation: string = 'unknown') => {
  trackEvent('phone_click', {
    event_category: 'engagement',
    event_label: `phone_${buttonLocation}`,
    button_location: buttonLocation,
    phone_number: phoneNumber,
    value: 1,
  });
};

// Descarga de PDF
export const trackPDFDownload = (fileName: string, buttonLocation: string = 'unknown') => {
  trackEvent('pdf_download', {
    event_category: 'download',
    event_label: fileName,
    file_name: fileName,
    button_location: buttonLocation,
    value: 1,
  });
};

// Video
export const trackVideoPlay = (videoTitle: string = 'security_video') => {
  trackEvent('video_play', {
    event_category: 'video',
    event_label: videoTitle,
    video_title: videoTitle,
  });
};

export const trackVideoPause = (videoTitle: string = 'security_video') => {
  trackEvent('video_pause', {
    event_category: 'video',
    event_label: videoTitle,
    video_title: videoTitle,
  });
};

// Scroll depth
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `scroll_${percentage}%`,
    scroll_percentage: percentage,
  });
};

// CTA clicks
export const trackCTAClick = (ctaText: string, ctaLocation: string = 'unknown') => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: `${ctaLocation}_${ctaText}`,
    button_location: ctaLocation,
    link_text: ctaText,
    value: 1,
  });
};

// Link clicks
export const trackLinkClick = (linkUrl: string, linkText: string, linkLocation: string = 'unknown') => {
  trackEvent('link_click', {
    event_category: 'navigation',
    event_label: linkText,
    link_url: linkUrl,
    link_text: linkText,
    button_location: linkLocation,
  });
};

/**
 * Declaración de tipos para window
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
