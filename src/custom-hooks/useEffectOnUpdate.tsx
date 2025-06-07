import { useEffect, useRef } from 'react'

function useEffectOnUpdate(callback: () => void, dependencies: Array<any>) {
    const isFirstRender = useRef<boolean>(true);
    useEffect(() => {
        if(isFirstRender.current) {
            isFirstRender.current = false;
            return
        }
        callback()
    }, [ ...dependencies ])
}

export default useEffectOnUpdate
