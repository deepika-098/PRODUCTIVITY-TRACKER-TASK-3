let currentTab = "";
let startTime = null;

// When you switch tabs
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  switchTab(tab);
});

// When page finishes loading in the current tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    switchTab(tab);
  }
});

// Function to handle site switching
function switchTab(tab) {
  try {
    const url = new URL(tab.url || "");
    const hostname = url.hostname;

    const now = Date.now();
    if (currentTab && startTime) {
      const duration = Math.floor((now - startTime) / 1000); // seconds
      saveTime(currentTab, duration);
    }

    currentTab = hostname;
    startTime = now;
  } catch (err) {
    // Ignore errors for internal pages
  }
}

// Save time spent on a site into storage
function saveTime(site, seconds) {
  chrome.storage.local.get(["usage"], (res) => {
    const usage = res.usage || {};
    usage[site] = (usage[site] || 0) + seconds;
    chrome.storage.local.set({ usage });
  });
}
