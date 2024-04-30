import { startTransition, useCallback, useState } from "react";

export type Callback<T extends unknown> =
  | undefined
  | ((data: T, ...args: unknown[]) => Promise<void | undefined | T>);

const useAutoLoading = <T extends unknown>(callback?: Callback<T>) => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const run = useCallback(
    async (data: T, ...args: (T | unknown)[]) => {
      if (callback) {
        startTransition(() => {
          setIsLoading(true);
        });
        try {
          return await callback(data, ...args);
        } finally {
          startTransition(() => {
            setIsLoading(false);
          });
        }
      }
    },
    [callback],
  );
  return { loading, run };
};

export default useAutoLoading;
