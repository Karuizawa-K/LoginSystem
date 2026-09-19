document.addEventListener("DOMContentLoaded", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
        return;
    }

    document.querySelectorAll('a[href]').forEach(link => {
        const target = new URL(link.href, window.location.href);

        if (target.origin !== window.location.origin || target.pathname === window.location.pathname) {
            return;
        }

        link.addEventListener("click", event => {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }

            event.preventDefault();
            document.body.classList.add("page-exit");

            window.setTimeout(() => {
                window.location.href = link.href;
            }, 280);
        });
    });
});
