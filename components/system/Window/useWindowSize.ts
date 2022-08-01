import { useProcesses } from "contexts/process";
import { useSession } from "contexts/session";
import { useCallback } from "react";
import { useTheme } from "styled-components";
import { maxSize } from "utils/functions";

type WindowSize = {
  updateWindowSize: (height: number, width: number) => void;
};

const useWindowSize = (id: string): WindowSize => {
  const { setWindowStates } = useSession();
  const {
    processes: {
      [id]: { lockAspectRatio = false, maximized = false } = {},
    } = {},
  } = useProcesses();
  const {
    sizes: { titleBar },
  } = useTheme();

  const updateWindowSize = useCallback(
    (height: number, width: number) =>
      setWindowStates((currentWindowStates) => ({
        ...currentWindowStates,
        [id]: {
          ...currentWindowStates?.[id],
          maximized,
          size: maxSize(
            {
              height: height + titleBar.height,
              width,
            },
            lockAspectRatio
          ),
        },
      })),
    [id, lockAspectRatio, maximized, setWindowStates, titleBar.height]
  );

  return {
    updateWindowSize,
  };
};

export default useWindowSize;
