export const easing = [0.6, -0.05, 0.01, 0.99];

export const animate = {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.6,
        ease: easing,
        delay: 0.16,
    },
};

export const fadeInUp = {
    initial: {
        y: 60,
        opacity: 0,
        transition: {duration: 0.6, ease: easing},
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easing,
        },
    },
};