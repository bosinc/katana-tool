import { PropsWithChildren, useLayoutEffect } from "react";
import { Stack } from "@mui/material";

const MaskContainer = ({ children }: PropsWithChildren) => {
  useLayoutEffect(() => {
    (async () => {
      const currentTab = await chrome.tabs.getCurrent();
      if (currentTab?.id) {
        chrome.tabs.sendMessage(currentTab.id, {
          action: "hideWindowScrollbar",
        });
      }
    })();
  }, []);

  return (
    <Stack
      sx={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,.5)",
        }}
        onClick={async (event) => {
          event.stopPropagation();
          event.preventDefault();
          const currentTab = await chrome.tabs.getCurrent();
          if (currentTab?.id) {
            chrome.tabs.sendMessage(currentTab.id, { action: "removeIframe" });
          }

          // chrome.runtime.sendMessage({ action: "removeIframe" });
        }}
      />
      {children}
    </Stack>
  );
};

export default MaskContainer;
