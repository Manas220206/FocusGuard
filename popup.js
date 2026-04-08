const toggleBtn = document.getElementById("toggle");
const statusText = document.getElementById("status");

function updateUI(isOn) {
  if (isOn) {
    statusText.textContent = "Mode: ON";
    toggleBtn.textContent = "Stop Study Mode";
  } else {
    statusText.textContent = "Mode: OFF";
    toggleBtn.textContent = "Start Study Mode";
  }
}

chrome.storage.local.get(["studyMode"], (result) => {
  updateUI(result.studyMode);
});

toggleBtn.addEventListener("click", () => {
  chrome.storage.local.get(["studyMode"], (result) => {
    const newState = !result.studyMode;
    chrome.storage.local.set({ studyMode: newState });
    updateUI(newState);
  });
});
