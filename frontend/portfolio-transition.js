(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
        return;
    }

    document.querySelectorAll('a[href]').forEach(link => {
        const target = new URL(link.href, window.location.href);

        if (target.protocol !== window.location.protocol || target.pathname === window.location.pathname) {
            return;
        }

        link.addEventListener("click", event => {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }

            event.preventDefault();
            document.body.classList.add("portfolio-page-exit");

            window.setTimeout(() => {
                window.location.assign(target.href);
            }, 500);
        });
    });
})();
