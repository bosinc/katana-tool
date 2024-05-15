import { useCallback, useEffect, useRef, useState } from "react";
import BaseButton from "@components/common/BaseButton.tsx";
import { useFormContext } from "react-hook-form";
import { sendVerificationCode } from "@services/login.ts";
import useAutoLoading from "@hooks/useAutoLoading.ts";
import useBaseSnackbar from "@hooks/useBaseSnackbar.ts";

const VerificationCodeCTA = () => {
  const { trigger, getValues } = useFormContext();
  const { error, success } = useBaseSnackbar();

  const [sendCodeType, updateSendCodeType] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSendCode = useCallback(async () => {
    try {
      const isEmail = await trigger("email");
      if (!isEmail) return;
      const { email } = getValues();
      await sendVerificationCode(email);
      success("验证码已发送");
      updateSendCodeType(true);
    } catch {
      error("验证码发送失败");
    }
  }, [getValues, trigger, error, success, updateSendCodeType]);

  const { loading, run: sendCode } = useAutoLoading(handleSendCode);

  useEffect(() => {
    if (sendCodeType) {
      timerRef.current = setInterval(() => {
        setSeconds((prevState) => prevState - 1);
      }, 1000);
    }
  }, [sendCodeType]);

  useEffect(() => {
    if (seconds === 0) {
      updateSendCodeType(false);
      setSeconds(60);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [seconds]);

  return (
    <BaseButton
      label={sendCodeType ? `重新发送(${seconds}s)` : "获取验证码"}
      sx={{ width: 180, height: 42, p: 0 }}
      onClick={sendCode}
      loading={loading}
      disabled={loading || sendCodeType}
    />
  );
};

export default VerificationCodeCTA;
