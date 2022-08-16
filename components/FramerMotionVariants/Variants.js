const fadeOut =  {
    start: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0}
};
const preLoader =  {
    start: {scale: 0.5},
    animate: {scale: 1.1, borderRadius: 60, transition: {type: "spring", duration: 0.7, delay: 0.4}},
    exit: {opacity: 0}
};
const preLoaderIcon = {
    start: {scale: 1.2},
    animate: {rotate: 360, transition: {ease: "linear", duration: 2, repeat: Infinity}},
};
const zoomingIn = {
    start: {scale: 1},
    animate: {scale: 1.02, transition: {yoyo: 20}},
    exit: {scale: 1.5}
}
const logo = {
    start: {scale: 0.5},
    animate: {scale: 1, transition: {type: "spring", duration: 0.7, delay: 0.4}},
    exit: {opacity: 0}
}
// Register
const buttonSubmit = {
    start: {scale: 0.5},
    animate: {scale: 1, transition: {type: "spring", duration: 0.7, delay: 0.4}},
    exit: {opacity: 0}
}



export { fadeOut, preLoader, preLoaderIcon, zoomingIn, logo, buttonSubmit};