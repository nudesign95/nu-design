export const GA_MEASUREMENT_ID =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!;

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set' | 'consent',
      ...args: unknown[]
    ) => void;
  }
}

export const pageView = (url: string) => {
    window.gtag?.('config', GA_MEASUREMENT_ID, {
        page_path: url,
    });
};

export const event = (
    action: string,
    category: string,
    label?: string,
    value?: number
) => {
    window.gtag?.('event', action, {
        event_category: category,
        event_label: label,
        value,
    });
};