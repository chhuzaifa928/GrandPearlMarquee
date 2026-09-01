import { useEffect, useMemo, useState } from "react";
import { WebsiteSettingsContext } from "../hooks/useWebsiteSettings";
import { getWebsiteSettings } from "../services/publicSettingsService";

function WebsiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadSettings = async () => {
      try {
        const data = await getWebsiteSettings();

        if (isMounted) {
          setSettings(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(() => ({ settings }), [settings]);

  return (
    <WebsiteSettingsContext.Provider value={value}>
      {children}
    </WebsiteSettingsContext.Provider>
  );
}

export default WebsiteSettingsProvider;
