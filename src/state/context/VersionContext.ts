import { createContext } from 'react';


export enum AppVersion {
  offline = 'offline',
  online = 'online',
}

export type VersionContextType = {
  version: AppVersion;
  toggleVersion: () => void;
}

export const VersionContext = createContext<VersionContextType>({
  version: AppVersion.offline,
  toggleVersion: () => { },
});