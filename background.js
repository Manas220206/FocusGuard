let offscreenCreated = false;

async function createOffscreen() {
  if (offscreenCreated) return;

  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["AUDIO_PLAYBACK"],
    justification: "Play alarm sound"
  });

  offscreenCreated = true;
}

async function startAlarm() {
  await createOffscreen();
  chrome.runtime.sendMessage({ action: "startAlarm" });
}

function stopAlarm() {
  chrome.runtime.sendMessage({ action: "stopAlarm" });
}

function isShorts(url) {
  try {
    const u = new URL(url);
    return u.pathname.startsWith("/shorts");
  } catch {
    return false;
  }
}

function handleTab(tabId, url) {
  if (!url || !url.includes("youtube.com")) return;

  if (isShorts(url)) {
    chrome.tabs.update(tabId, { muted: true });
    startAlarm();
  } else {
    chrome.tabs.update(tabId, { muted: false });
    stopAlarm();
  }
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    handleTab(tab.id, tab.url);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    handleTab(tabId, changeInfo.url);
  }
});
