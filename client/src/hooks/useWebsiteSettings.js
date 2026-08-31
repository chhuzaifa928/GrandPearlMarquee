import { useEffect, useState } from "react";
import { getWebsiteSettings } from "../services/publicSettingsService";

function useWebsiteSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getWebsiteSettings();
        setSettings(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadSettings();
  }, []);

  return settings;
}

export default useWebsiteSettings;