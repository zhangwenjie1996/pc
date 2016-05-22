~function () {
    var timer = null;
    var curPos, nextPos;
    var speed;
    var sideNav = document.getElementById('sideNav'), sideLis = sideNav.getElementsByTagName('li');
    var contents = utils.getElementsByClass("content");
    function sc() {
        clearInterval(timer);
        timer = null;
    }

    function moveDown(curElement) {
        var nextElement = curElement.nextElementSibling;
        if (nextElement) {
            curElement.className = curElement.className.replace('page-active', '');
            nextElement.className = nextElement.className + ' page-active';
            nextPos = utils.offset(nextElement).top;
            for (var i = 0, len = sideLis.length; i < len; i++) {
                ~function (i) {
                    i === utils.index(nextElement) ? sideLis[i].className = 'active' : sideLis[i].className = '';
                }(i);
            }
            sc();
            timer = setInterval(scrollDown, 10);
        }
    }
    function scrollDown() {
        if (curPos >= nextPos) {
            window.scrollTo(0, nextPos);
            sc();
            speed = 0;
        }
        else {
            speed = 20;
            curPos = curPos + speed;
            window.scrollTo(0, curPos);
        }
    }

    function moveUp(curElement) {
        var nextElement = curElement.previousElementSibling;//上一个节点
        if (nextElement) {
            curElement.className = curElement.className.replace('page-active', '');
            nextElement.className = nextElement.className.trim() + ' page-active';
            nextPos = utils.offset(nextElement).top;
            for (var i = 0, len = sideLis.length; i < len; i++) {
                ~function (i) {
                    i === utils.index(nextElement) ? sideLis[i].className = 'active' : sideLis[i].className = '';
                }(i);
            }
            sc();
            timer = setInterval(scrollUp, 10);
        }
    }
    function scrollUp() {
        if (curPos <= nextPos) {
            window.scrollTo(0, nextPos);
            sc();
            speed = 0;
        }
        else {
            speed = -20;
            curPos = curPos + speed;
            window.scrollTo(0, curPos);
        }
    }

    var scrollFunc = function (e) {
        e.preventDefault();
        console.log('ok')
        if (!timer) {
            console.log('timer')
            var curElement = document.getElementsByClassName('page-active')[0];
            curPos = utils.offset(curElement).top;
            if (e.wheelDelta < 0 || e.detail > 0) {
                console.log("aaa");
                moveDown(curElement);
            } else {
                moveUp(curElement);
            }
        }
    };
    document.body.addEventListener('DOMMouseScroll', scrollFunc, false);
    document.body.onmousewheel = scrollFunc;
    for (var i = 0, len = sideLis.length; i < len; i++) {

        ~function (i) {
            var curLi = sideLis[i];
            curLi.onclick = function () {
                var target = utils.offset(contents[i]).top;
                move(target);
                this.className = 'active';
                var liSib = utils.siblings(this);
                for (var k = 0, len = liSib.length; k < len; k++) {
                    utils.removeClass(liSib[k], 'active');
                }
                utils.addClass(contents[i], 'page-active');
                var siblings = utils.siblings(contents[i]);
                for (k = 0, len = siblings.length; k < len; k++) {
                    utils.removeClass(siblings[k], 'page-active');
                }
            }
        }(i);
    }
    function move(target) {
        var begin = utils.win("scrollTop"), duration = 500, interval = 10, step = Math.abs((begin - target) / duration * interval);
        _move();
        function _move() {
            window.clearTimeout(timer);
            var curT = utils.win("scrollTop");
            if (target > begin) {
                if (curT + step >= target) {
                    utils.win("scrollTop", target);
                    return;
                }
                curT += step;
                utils.win("scrollTop", curT);

            } else if (target < begin) {
                if (curT - step <= target) {
                    utils.win("scrollTop", target);
                    return;
                }
                curT -= step;
                utils.win("scrollTop", curT);
            }
             var timer2 = window.setTimeout(_move, interval);
        }
    }

}();


