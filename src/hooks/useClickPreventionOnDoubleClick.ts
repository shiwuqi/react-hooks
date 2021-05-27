import React, { useState, useRef } from 'react';
// 延迟
export const delay = (n: number) => new Promise(resolve => setTimeout(resolve, n));

// promise执行及取消
const cancellablePromise = (promise: any) => {
    let isCanceled = false;
  
    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(
        (value: any) => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
        (error: any) => reject({ isCanceled, error }),
      );
    });
  
    return {
      promise: wrappedPromise,
      cancel: () => (isCanceled = true),
    };
};

// promise队列
const useCancellablePromises = () => {
    const pendingPromises = useRef<any[]>([]);

    const appendPendingPromise = (promise: any) =>
        pendingPromises.current = [...pendingPromises.current, promise];

    const removePendingPromise = (promise: any) =>
        pendingPromises.current = pendingPromises.current.filter((p: any) => p !== promise);

    const clearPendingPromises = () => pendingPromises.current.map((p: any) => p.cancel());

    const api = {
        appendPendingPromise,
        removePendingPromise,
        clearPendingPromises,
    };

    return api;
};

// 单双击
const useClickPreventionOnDoubleClick = (onClick: Function, onDoubleClick: Function) => {
    const api = useCancellablePromises();

    const handleClick = () => {
        api.clearPendingPromises();
        const waitForClick = cancellablePromise(delay(300));
        api.appendPendingPromise(waitForClick);

        return waitForClick.promise
            .then(() => {
                api.removePendingPromise(waitForClick);
                onClick();
            })
            .catch(errorInfo => {
                api.removePendingPromise(waitForClick);
                if (!errorInfo.isCanceled) {
                    throw errorInfo.error;
                }
            });
    };

    const handleDoubleClick = () => {
        api.clearPendingPromises();
        onDoubleClick();
    };

    return [handleClick, handleDoubleClick];
};

export default useClickPreventionOnDoubleClick;
