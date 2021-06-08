
export function InitializeIframeless(intElementId) {
    var canvas = document.getElementById("canvas_"+intElementId);
    var c = canvas.getContext("2d");

    function drawClock() {
        // clear the background
        c.fillStyle = 'lightgray';
        c.fillRect(0, 0, canvas.width, canvas.height);

        // Get the current time
        var todayDate = new Date(),
            h = todayDate.getHours(),
            m = todayDate.getMinutes(),
            s = todayDate.getSeconds(),
            ampm = (h < 12 ? 'AM' : 'PM');

        // Make the hour between 0 and 12 (not 24)
        h = (h % 12);

        // Make values like '5' into '05'
        h = addLeadingZeroWhenNecessary(h);
        m = addLeadingZeroWhenNecessary(m);
        s = addLeadingZeroWhenNecessary(s);

        // Assemble the text
        var clockText = h + ':' + m + ':' + s + ' ' + ampm,
            x = 10,
            y = 60;

        c.fillStyle = '#AB2567'; // purple color

        // Draw the text
        c.font = '50pt Arial';
        c.strokeStyle = 'black';
        c.fillText(clockText, x, y);
        c.strokeText(clockText, x, y);
    }

    function addLeadingZeroWhenNecessary(s) {
        return (s < 10 ? '0' : '') + s;
    }

    // Draw the clock right away
    drawClock();

    // Then draw the clock every subsequent second
    setInterval(drawClock, 1000);
}