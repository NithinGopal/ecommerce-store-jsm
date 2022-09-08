export const moveFromLeft ={
    hidden: {
        x: '-100vw',
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 2,
        }
    },
}

export const moveFromRight ={
    hidden: {
        x: '100vw',
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 2,
        }
    },
    hover: {
        scale: 1.2,
        x: [-2,2],
        y: [0, -3],
        transition: {
            x: {
                yoyo: Infinity,
                duration: 0.1,
            },
            y: {
                yoyo: Infinity,
                duration: 0.1,
                ease: 'easeOut'
            },
        }
    }
}

export const navVariants ={
    hidden: {
        y: '-100vw',
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 2,
        }
    },
    hover: {
        scale: 1.5,
        color: 'blue'
    }
}

export const logoVariants = {
    hover: {
        scale: 1.5,
        x: [-2,2],
        y: [0, -3],
        transition: {
            x: {
                yoyo: Infinity,
                duration: 0.1,
            },
            y: {
                yoyo: Infinity,
                duration: 0.1,
                ease: 'easeOut'
            },
        }
    }
}

export const btnVariants = {
    hover: {
        scale: 1.2,
    },
    click: {
        scale: 0.8,
    }
}
