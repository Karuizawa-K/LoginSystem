const samePath = (firstUrl, secondUrl) =>
    new URL(firstUrl, location.href).pathname === new URL(secondUrl, location.href).pathname;

const findHero = () => document.querySelector("[data-hero]");

const findThumb = url =>
    [...document.querySelectorAll("a img")].find(image => {
        const link = image.closest("a");
        return link && samePath(link.href, url);
    });

const nameHero = element => {
    if (element) {
        element.style.viewTransitionName = "hero";
    }
};

window.addEventListener("pageswap", event => {
    if (!event.viewTransition) {
        return;
    }

    const destination = event.activation?.entry?.url;
    nameHero(findHero() || (destination && findThumb(destination)));
});

window.addEventListener("pagereveal", async event => {
    if (!event.viewTransition) {
        return;
    }

    const source = window.navigation?.activation?.from?.url;
    const element = findHero() || (source && findThumb(source));
    nameHero(element);

    try {
        await event.viewTransition.finished;
    } finally {
        if (element) {
            element.style.viewTransitionName = "";
        }
    }
});
