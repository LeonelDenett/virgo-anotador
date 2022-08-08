const fadeOut =  {
    start: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0}
};
const preLoader =  {
    start: {scale: 0.5},
    animate: {scale: 1, borderRadius: 60, transition: {type: "tween", duration: 0.7, delay: 0.7}},
    exit: {scale: 2, borderRadius: 200}
};
const preLoaderIcon = {
    start: {scale: 1.2},
    animate: {rotate: 360, transition: {ease: "linear", duration: 2, repeat: Infinity}},
};



export { fadeOut, preLoader, preLoaderIcon};