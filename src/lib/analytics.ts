// src/lib/analytics.ts

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'consent',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      // Add default parameters
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

export const trackPageView = (page_title: string, page_location: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title,
      page_location,
      content_group1: document.documentElement.lang, // Track language
    });
  }
};

// Common event tracking functions
export const trackButtonClick = (buttonText: string, location: string) => {
  trackEvent('button_click', {
    button_text: buttonText,
    click_location: location,
  });
};

export const trackNavigationClick = (linkText: string, destination: string) => {
  trackEvent('navigation_click', {
    link_text: linkText,
    destination,
  });
};

export const trackLanguageChange = (fromLanguage: string, toLanguage: string) => {
  trackEvent('language_change', {
    from_language: fromLanguage,
    to_language: toLanguage,
  });
};

export const trackEmailClick = (email: string) => {
  trackEvent('contact_email_click', {
    email,
    contact_method: 'email',
  });
};

export const trackSocialClick = (platform: string) => {
  trackEvent('social_media_click', {
    platform,
  });
};