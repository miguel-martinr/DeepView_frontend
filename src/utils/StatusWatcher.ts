import { AxiosResponse } from "axios";
import { deepViewApi } from "../api/api";
import { VideoStatus } from "../types/Video";

export interface StatusWatcherConfig {
  autoClear: boolean,
  currentStatus: VideoStatus,
  seconds: number,
  onResponse?: (res: {status: VideoStatus, percentage?: number}) => void
}

const defaultConfig: StatusWatcherConfig = {
  autoClear: true,
  currentStatus: 'processing',
  seconds: 15,  
}
export class StatusWatcher extends EventTarget {
  private interval: NodeJS.Timer | null = null;
  private config: StatusWatcherConfig;  

  constructor(config: Partial<StatusWatcherConfig> = defaultConfig) {
    super();
    this.config = {...defaultConfig, ...config};
  }

  startWatching(videoName: string) {
    const obj = this;
    const interval = setInterval(async function () {
      const {message: status, percentage} = await deepViewApi.checkVideoStatus(videoName);      

      if (obj.config.onResponse) {
        obj.config.onResponse({status, percentage});
      }

      console.log('watching ', videoName);

      if (status !== obj.config.currentStatus) {
        
        obj.dispatchEvent(new CustomEvent('statusChanged', {
          detail: status
        }));

        if (obj.config.autoClear)
          clearInterval(interval);
          
      }
    }, obj.config.seconds * 1000)

    this.interval = interval;
  }

  clear() {
    if (this.interval) {
      clearInterval(this.interval);
      console.log("Cleared")
    }
  }

  setCurrentStatus(newStatus: VideoStatus) {
    this.config.currentStatus = newStatus;
  }


}




