import {
  type OptionsWithExtraProps,
  useSnackbar,
  VariantType,
} from "notistack";
import { useCallback, useMemo } from "react";
import {
  DEFAULT_SNACKBAR_ANCHOR_ORIGIN,
  DEFAULT_SNACKBAR_DURATION,
} from "../utils/common.ts";

const useBaseSnackbar = (
  config?: Omit<OptionsWithExtraProps<VariantType>, "variant">,
) => {
  const { enqueueSnackbar } = useSnackbar();

  const baseConfig = useMemo(
    () => ({
      anchorOrigin: DEFAULT_SNACKBAR_ANCHOR_ORIGIN,
      autoHideDuration: DEFAULT_SNACKBAR_DURATION,
      ...config,
    }),
    [config],
  );

  const createSnackbar = useCallback(
    (message: string, variant?: VariantType) => {
      enqueueSnackbar(message, {
        variant,
        ...baseConfig,
      });
    },
    [enqueueSnackbar, baseConfig],
  );

  const success = useCallback(
    (message: string) => createSnackbar(message, "success"),
    [createSnackbar],
  );

  const error = useCallback(
    (message: string) => createSnackbar(message, "error"),
    [createSnackbar],
  );

  const info = useCallback(
    (message: string) => createSnackbar(message, "info"),
    [createSnackbar],
  );

  const warning = useCallback(
    (message: string) => createSnackbar(message, "warning"),
    [createSnackbar],
  );

  return {
    success,
    error,
    info,
    warning,
    createSnackbar,
  };
};

export default useBaseSnackbar;
