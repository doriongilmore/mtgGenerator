export default function delay(duration = 1) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};
