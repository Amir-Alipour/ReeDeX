export const leftToRightAnimate = {
    hidden: {
        x: 100,
        opacity: 0,
    },
    visible: (delay = 0) => ({
        x: 0,
        opacity: 1,
        transition: {
            delay,
            type: "spring",
            duration: "0.3s",
            stiffness: 120,
            damping: 30,
        },
    }),
    exit: {
        x: 100,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 30,
        },
    },
};

export const rightToLeftAnimate = {
    hidden: {
        x: -100,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 30,
        },
    },
    exit: {
        x: -100,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
        },
    },
};
