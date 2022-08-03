import { useRef, useEffect } from 'react';

export const useCustomHook = (callback: any, depends: any): void => {
    const didMount = useRef(false);

    useEffect(() => {
        if (!didMount.current) {
            callback();
        } else {
            didMount.current = true;
        }
    }, []);
};
