import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';

export const useOnResize = (callback: (size: number) => void) => {
  // eslint-disable-next-line
  const handleResize = useCallback(
    debounce(() => {
      callback(window.innerWidth);
    }, 200),
    [],
  );
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line
  }, []);
};
