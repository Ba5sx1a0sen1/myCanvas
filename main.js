var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5;

autoSetCanvasSize(yyy)//设置画布大小

listenToUser(yyy)//设置绘画事件

//橡皮擦与画笔切换操作
var eraserEnabled = false
// eraser.onclick = function () {
//     eraserEnabled = true
//     actions.className = 'actions x'

// }
// brush.onclick = function () {
//     eraserEnabled = false
//     actions.className = 'actions'
// }
pen.onclick = function () {
    eraserEnabled = false;
    pen.classList.add('active')
    eraser.classList.remove('active')
}

eraser.onclick = function () {
    eraserEnabled = true;
    eraser.classList.add('active')
    pen.classList.remove('active')

}

black.onclick = function () {
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}

red.onclick = function () {
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}

green.onclick = function () {
    context.strokeStyle = 'green'
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}

blue.onclick = function () {
    context.strokeStyle = 'blue'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
    black.classList.remove('active')
}

thin.onclick = function(){
    lineWidth = 5
}

thick.onclick = function(){
    lineWidth = 10
}

clear.onclick = function(){
    context.clearRect(0,0,yyy.width,yyy.height)
}

download.onclick = function(){
    var url =  yyy.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画'
    a.targer = '_blank'
    a.click()
}

/******/
//工具函数
function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x, y, radius) {
    context.beginPath()
    // context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    // context.strokeStyle = 'black'
    context.moveTo(x1, y1) // 起点
    context.lineWidth = lineWidth // 线的粗细大小
    context.lineTo(x2, y2) // 终点
    context.stroke()
    context.closePath()
}

function listenToUser(canvas) {


    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }

    if (document.body.ontouchstart !== undefined) {
        //触屏设备,进行特性检测
        canvas.ontouchstart = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.ontouchmove = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY

            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function () {
            using = false
            console.log('不摸了')
        }
    } else {
        //非触屏设备
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }

        }
        canvas.onmouseup = function (aaa) {
            using = false
        }
    }
}