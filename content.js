function isShortsPage() {
  return window.location.pathname.startsWith("/shorts");
}

function showOverlay() {
  if (document.getElementById("focusguard-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "focusguard-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "black";
  overlay.style.color = "white";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.fontSize = "32px";
  overlay.style.zIndex = "999999";
  overlay.innerText = "🚫 Shorts Blocked! Stay Focused.";

  document.body.appendChild(overlay);
}

function removeOverlay() {
  const overlay = document.getElementById("focusguard-overlay");
  if (overlay) overlay.remove();
}

function triggerIfShorts() {
  if (isShortsPage()) {
    showOverlay();
  } else {
    removeOverlay();
  }
}

triggerIfShorts();

let lastUrl = location.href;

new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    triggerIfShorts();
  }
}).observe(document, { subtree: true, childList: true });
