function myMove() {
    const elem = document.getElementById("animate");
    const container = document.getElementById("container");
    let pos = 0;

    // Stop any previous intervals to prevent multiple moves
    clearInterval(elem.interval);

    elem.interval = setInterval(frame, 1); // move 1px every 1ms

    function frame() {
        const containerWidth = container.clientWidth;
        const elemWidth = elem.offsetWidth;

        if (pos >= containerWidth - elemWidth) {
            clearInterval(elem.interval); // stop animation when reaching the right edge
        } else {
            pos++;
            elem.style.left = pos + "px";
        }
    }
}
