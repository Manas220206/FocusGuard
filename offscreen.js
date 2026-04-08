let alarmAudio = null;

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "startAlarm") {
    if (!alarmAudio) {
      alarmAudio = new Audio(chrome.runtime.getURL("alarm.mp3"));
      alarmAudio.loop = true;
      alarmAudio.volume = 1.0;
      alarmAudio.play();
    }
  }

  if (message.action === "stopAlarm") {
    if (alarmAudio) {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
      alarmAudio = null;
    }
  }
});
