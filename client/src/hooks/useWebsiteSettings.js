import { createContext, useContext } from "react";

export const WebsiteSettingsContext = createContext(null);

export function useWebsiteSettings() {
  const context = useContext(WebsiteSettingsContext);

  if (context === null) {
    throw new Error(
      "useWebsiteSettings must be used within a WebsiteSettingsProvider"
    );
  }

  return context.settings;
}

export default useWebsiteSettings;
