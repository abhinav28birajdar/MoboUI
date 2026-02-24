// src/lib/utils/motionConfig.ts
export const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

export const staggerContainer = {
    animate: { transition: { staggerChildren: 0.08 } }
}

export const fadeUpItem = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export const cardHover = {
    whileHover: { y: -4, transition: { duration: 0.2 } }
}

export const glowPulse = {
    animate: {
        boxShadow: ['0 0 20px rgba(132,204,22,0.3)', '0 0 40px rgba(132,204,22,0.7)', '0 0 20px rgba(132,204,22,0.3)'],
        transition: { duration: 2, repeat: Infinity }
    }
}
