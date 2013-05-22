(function () {
    var N = 300;
    var x = [];
    var y = [];
    var vx = [];
    var vy = [];
    var ctx = document.getElementById('canvas').getContext('2d');

    function init() {
        for (var i = 0; i < N; i++) {
            x[i] = 100 + Math.floor(Math.random() * 300);
            y[i] = 100 + Math.floor(Math.random() * 300);
            vx[i] = -1 + Math.random() * 2;
            vy[i] = -1 + Math.random() * 2;
        }
    }

    function mini(a, b) {
        if (a < b) {
            return Math.floor(a);
        } else {
            return Math.floor(b);
        }
    }

    function drawBody(ctx, x, y, size) {
        var offset = Math.floor(size / 2.0);
        ctx.fillRect(x - offset, y - offset, size, size);
    }

    function draw() {
        for (var i = 0; i < N; i++) {
            ax = 0.0;
            ay = 0.0;
            for (var j = 0; j < N; j++) {
                r2 = Math.pow((x[i] - x[j]), 2) + Math.pow((y[i] - y[j]), 2);
                if (r2 > 0.00001) {
                    ax += 0.05 * (x[j] - x[i]) / r2;
                    ay += 0.05 * (y[j] - y[i]) / r2;
                }
            }
            vx[i] += ax;
            vy[i] += ay;
        }

        ctx.clearRect(0, 0, 500, 500);
        for (i = 0; i < N; i++) {
            x[i] += vx[i];
            y[i] += vy[i];
            ctx.fillStyle = "rgba(" + mini(30 + Math.abs(vx[i] * 100), 200) + "," + mini(30 + Math.abs(vy[i] * 100), 200) + ", 0, 0.8)";
            drawBody(ctx, x[i], y[i], 2);
        }
        requestAnimationFrame(draw);
    }

    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    init();
    requestAnimationFrame(draw);
})();
