import { deepViewApi } from "../api/api";
import { Video } from "../pages/VideosPage";

export class StatusWatcher extends EventTarget {  
  constructor() {
    super();
  }

  startWatching(videoName: string) {
    const obj = this;
    const interval = setInterval(async function () {
      const status = await deepViewApi.checkVideoStatus(videoName);
      console.log('watching ', videoName);
      if (status !== 'processing') {
        clearInterval(interval);
        obj.dispatchEvent(new CustomEvent('statusChanged', {
          detail: status
        }));
      }
    }, 5000)
  }


}




