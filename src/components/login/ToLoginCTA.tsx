import BaseButton from "@components/common/BaseButton.tsx";
import { useCallback } from "react";
import { Dialog, Stack } from "@mui/material";
import { useBoolean } from "ahooks";
import useBaseSnackbar from "@hooks/useBaseSnackbar.ts";
import { codeLoginSchema } from "@utils/scheme.ts";
import LoginFormContent from "@components/common/LoginFormContent.tsx";

const ToLoginCTA = ({
  type = "drawer",
  width,
}: {
  type?: "link" | "drawer";
  width?: number;
}) => {
  const [drawerOpen, { setTrue: openDrawer, setFalse: closeDrawer }] =
    useBoolean(false);
  const { success, error } = useBaseSnackbar();

  const handleSubmit = useCallback(
    (isSuccess: boolean) => {
      if (isSuccess) {
        success("登录成功");
        closeDrawer();
      } else {
        error("账号或密码不正确，请重新登录");
      }
    },
    [error, success, closeDrawer],
  );

  const toLogin = useCallback(() => {
    if (type === "drawer") {
      openDrawer();
    } else {
      const loginPath = chrome.runtime.getURL("/login/index.html");
      window.open(loginPath, "_blank");
    }
  }, [openDrawer, type]);

  return (
    <Stack sx={{ width: "100%", alignItems: "flex-end" }}>
      <BaseButton
        onClick={toLogin}
        label={"去登录"}
        sx={{
          width: width ?? "100%",
          textTransform: "unset",
          height: 42,
        }}
      />
      {drawerOpen && (
        <Dialog open={drawerOpen} onClose={closeDrawer}>
          <Stack sx={{ p: 2 }}>
            <LoginFormContent
              scheme={codeLoginSchema}
              onFinished={handleSubmit}
              type={"code"}
              direction={"column"}
            />
          </Stack>
        </Dialog>
      )}
    </Stack>
  );
};

export default ToLoginCTA;
