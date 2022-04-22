import { RefObject, useEffect, useState } from 'react';

const useIsWindow = () => {
  const [isWindow, setIsWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWindow(true);
    }
  });

  return isWindow;
};

export default useIsWindow;
