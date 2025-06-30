chrome.storage.local.get(["usage"], (res) => {
  const usage = res.usage || {};
  const list = document.getElementById("stats");
  const entries = Object.entries(usage).sort((a, b) => b[1] - a[1]);

  entries.forEach(([site, time]) => {
    const li = document.createElement("li");
    const minutes = Math.round(time / 60); // convert seconds to minutes
    li.textContent = `${site}: ${minutes} min`;
    list.appendChild(li);
  });
});
