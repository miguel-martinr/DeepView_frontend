import { deepViewApi } from "../api/api";
import { Video, VideoStatus } from "../pages/VideosPage";

export interface StatusWatcherConfig {
  autoClear: boolean,
  currentStatus: VideoStatus,
  seconds: number,
}

const defaultConfig: StatusWatcherConfig = {
  autoClear: true,
  currentStatus: 'processing',
  seconds: 5,
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
      const status = await deepViewApi.checkVideoStatus(videoName);      
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




