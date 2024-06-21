import { useState } from 'react'

import { AppVersion } from '../context/VersionContext';


export const useAppVersion = () => {
  const currentDomain = window.location.hostname;
  const currentVersion = currentDomain === 'localhost' ? AppVersion.offline : AppVersion.online;
  const [version, setVersion] = useState(currentVersion);

  const toggleVersion = () => {
    const newVersion = version === AppVersion.offline ? AppVersion.online : AppVersion.offline;
    setVersion(newVersion);

    setTimeout(() => {
      if (newVersion === AppVersion.online) {
        window.location.href = import.meta.env.VITE_APP_VERSION_ONLINE_URL;
      } else {
        window.location.href = import.meta.env.VITE_APP_VERSION_OFFLINE_URL;
      }
    }, 1500);
  }

  return { version, toggleVersion };
}