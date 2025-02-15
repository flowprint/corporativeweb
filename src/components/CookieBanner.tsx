import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { setCookie, getCookie } from '@/lib/cookies';
import { updateAnalyticsConsent } from '@/lib/analytics';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: number;
}

const defaultConsent: CookieConsent = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
  preferences: false,
  timestamp: 0
};

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>(defaultConsent);

  useEffect(() => {
    // Check if consent cookie exists
    const storedConsent = getCookie('cookie_consent');
    if (!storedConsent) {
      setIsVisible(true);
    } else {
      try {
        const parsedConsent = JSON.parse(storedConsent);
        setConsent(parsedConsent);
        // Update GA consent based on stored preferences
        updateAnalyticsConsent(parsedConsent.analytics);
      } catch (e) {
        setIsVisible(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const newConsent: CookieConsent = {
      ...defaultConsent,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: Date.now()
    };
    saveConsent(newConsent);
  };

  const handleSavePreferences = () => {
    const newConsent: CookieConsent = {
      ...consent,
      timestamp: Date.now()
    };
    saveConsent(newConsent);
  };

  const saveConsent = (newConsent: CookieConsent) => {
    setConsent(newConsent);
    setCookie('cookie_consent', JSON.stringify(newConsent), 365);
    updateAnalyticsConsent(newConsent.analytics);
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
      {!showPreferences ? (
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-300 text-sm">
            <p>
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => setShowPreferences(true)}
              className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
            >
              Cookie Settings
            </button>
            <button
              onClick={handleAcceptAll}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              Accept All
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Cookie Preferences</h3>
            <button
              onClick={() => setShowPreferences(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Necessary Cookies</p>
                <p className="text-xs text-gray-400">Required for the website to function properly.</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={consent.necessary}
                  disabled
                  className="appearance-none w-9 h-5 bg-gray-700 rounded-full checked:bg-indigo-600 transition-colors cursor-not-allowed"
                />
                <div className="absolute inset-y-0 left-0 w-5 h-5 bg-white rounded-full transform translate-x-0.5 checked:translate-x-4 transition-transform pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Analytics Cookies</p>
                <p className="text-xs text-gray-400">Help us improve our website by collecting anonymous usage data.</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                  className="appearance-none w-9 h-5 bg-gray-700 rounded-full checked:bg-indigo-600 transition-colors cursor-pointer"
                />
                <div className={`absolute inset-y-0 left-0 w-5 h-5 bg-white rounded-full transform transition-transform pointer-events-none ${consent.analytics ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Marketing Cookies</p>
                <p className="text-xs text-gray-400">Allow us to provide personalized content and ads.</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                  className="appearance-none w-9 h-5 bg-gray-700 rounded-full checked:bg-indigo-600 transition-colors cursor-pointer"
                />
                <div className={`absolute inset-y-0 left-0 w-5 h-5 bg-white rounded-full transform transition-transform pointer-events-none ${consent.marketing ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Preference Cookies</p>
                <p className="text-xs text-gray-400">Remember your settings and preferences.</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={consent.preferences}
                  onChange={(e) => setConsent({ ...consent, preferences: e.target.checked })}
                  className="appearance-none w-9 h-5 bg-gray-700 rounded-full checked:bg-indigo-600 transition-colors cursor-pointer"
                />
                <div className={`absolute inset-y-0 left-0 w-5 h-5 bg-white rounded-full transform transition-transform pointer-events-none ${consent.preferences ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowPreferences(false)}
              className="text-gray-400 hover:text-white text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePreferences}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}