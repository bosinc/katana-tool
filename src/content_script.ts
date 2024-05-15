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

document.addEventListener("contextmenu", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const currentElements = document.elementsFromPoint(mouseX, mouseY);
  console.log(currentElements);
  for (const element of currentElements) {
    if (element.tagName.toLowerCase() === "img") {
      console.log("img ===> ", (element as HTMLImageElement).currentSrc);
    }
  }
});
