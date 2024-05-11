const iframe = document.createElement("iframe");

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "insertIframe") {
    iframe.src = chrome.runtime.getURL("index.html");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.position = "fixed";
    iframe.style.top = "50%";
    iframe.style.left = "50%";
    iframe.style.transform = "translate(-50%, -50%)";
    iframe.style.zIndex = "999999";
    iframe.style.outline = "none";
    iframe.style.border = "none";

    iframe.id = "pear-search-iframe";

    document.body.appendChild(iframe);
  }

  if (message.action === "hideWindowScrollbar") {
    document.body.style.overflow = "hidden";
  }

  if (message.action === "removeIframe") {
    document.body.style.overflow = "unset";
    document.body.removeChild(iframe);
  }
});
