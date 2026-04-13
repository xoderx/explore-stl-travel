/**
 * Lightweight analytics tracking that leverages the existing client-errors endpoint
 */
export async function trackEvent(name: string, properties: Record<string, any> = {}) {
  try {
    const payload = {
      message: `Analytics: ${name}`,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      type: 'analytics',
      eventName: name,
      ...properties
    };
    await fetch('/api/client-errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    // Fail silently for analytics to prevent disrupting user experience
    console.warn('[TRACKING FAILED]', error);
  }
}