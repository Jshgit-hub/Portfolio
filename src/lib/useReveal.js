import { useEffect } from 'react';

// One observer for every .reveal on the page. Adds a class and forgets about
// the element — no scroll listener, no state, no re-render.
export default function useReveal() {
    useEffect(() => {
        const nodes = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            nodes.forEach((n) => n.classList.add('is-in'));
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-in');
                        io.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
        );

        nodes.forEach((n) => io.observe(n));
        return () => io.disconnect();
    }, []);
}
