import React, { useEffect, useRef } from 'react';

const InfiniteScroller = ({ fetchMore, hasNextPage, children }) => {
    const loader = useRef(null);

    useEffect(() => {
        const elementRef = loader.current;
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting && hasNextPage) {
                fetchMore();
            }
        });

        if (elementRef) observer.observe(elementRef);

        return () => observer.unobserve(elementRef);
    }, [fetchMore, hasNextPage]);

    return (
        <>
            {children}
            <div
                ref={loader}
                className="h-2"
            ></div>
        </>
    );
}
export default InfiniteScroller;