import { startTransition, useCallback, useState } from "react";

export type Callback<T extends RecordAny | void> =
  | undefined
  | ((data: T, ...args: (T | undefined)[]) => Promise<void | T>);

const useAutoLoading = <T extends RecordAny | void>(callback?: Callback<T>) => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const run = useCallback(
    async (data: T, ...args: T[]) => {
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
