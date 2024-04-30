chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "insertIframe") {
    const iframe = document.createElement("iframe");
    iframe.src = chrome.runtime.getURL("index.html");
    iframe.style.width = "1280px";
    iframe.style.height = "960px";
    iframe.style.position = "fixed";
    iframe.style.top = "50%";
    iframe.style.left = "50%";
    iframe.style.transform = "translate(-50%, -50%)";
    iframe.style.zIndex = "999999";
    iframe.style.outline = "none";
    iframe.style.border = "none";
    iframe.style.boxShadow = "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px";
    iframe.style.borderRadius = "16px";

    document.body.appendChild(iframe);
  }
});
