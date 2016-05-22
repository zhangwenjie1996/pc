~function () {
    var banner = document.getElementById("tab-scroll"), bannerInner = utils.firstChild(banner), divList = utils.children(bannerInner, "div"), bannerLeft = utils.children(banner, "a")[0], bannerRight = utils.children(banner, "a")[1];
    var step = 0,  count = divList.length;
    for (var i = 0, len = divList.length; i < len; i++) {
        var curList = divList[i];
        curList.style.width = 100 / count + "%";
    }

    var w = curList.offsetWidth * count;
    bannerInner.style.width = count * 100 + "%";
    bannerRight.onclick = function () {
        if (step >= (count - 2)) {
            utils.addClass(this, "not");
        }
        if (step >= (count - 1)) {
            return;
        }
        step++;
        zhufengAnimate(bannerInner, {left: -step * w}, 300);
        utils.removeClass(bannerLeft, "not");

    };
    bannerLeft.onclick = function () {
        if (step <= 1) {
            utils.addClass(this, "not");
        }
        if (step <= 0) {

            return;
        }
        step--;
        zhufengAnimate(bannerInner, {left: -step * w}, 300);
        utils.removeClass(bannerRight, "not");
    };


    var hotLimg = utils.getElementsByClass("hot-l-img"), hotImgIn = utils.getElementsByClass("hot-img2-in");
    for (i = 0, len = hotLimg.length; i < len; i++) {
        ~function (i) {
            hotLimg[i].onmouseover = function () {
                var hideP = utils.lastChild(this);
                zhufengAnimate(hideP, {bottom: 0}, 200)
            };
            hotLimg[i].onmouseout = function () {
                var hideP = utils.lastChild(this);
                zhufengAnimate(hideP, {bottom: -200}, 200)
            };
        }(i);
    }

    for (i = 0, len = hotImgIn.length; i < len; i++) {
        ~function (i) {
            hotImgIn[i].onmouseover = function () {
                console.log(this);
                var hideP = utils.lastChild(this);
                zhufengAnimate(hideP, {bottom: 0}, 200)
            };
            hotImgIn[i].onmouseout = function () {
                console.log(this);
                var hideP = utils.lastChild(this);
                zhufengAnimate(hideP, {bottom: -200}, 200)
            }
        }(i);
    }


    var closeWrapper = document.getElementById('closeWrapper'), wrapperBox = document.getElementById('wrapperBox'), openWrapper = document.getElementById('openWrapper'), joinInfoTitle = utils.getElementsByClass('join-info-title')[0];
    closeWrapper.onclick = function () {
        zhufengAnimate(wrapperBox, {left: 0, width: 0, height: 0}, 200, ["Quint", "easeInOut"], function () {
            openWrapper.style.display = 'block';
            closeWrapper.style.display = 'none';
            zhufengAnimate(joinInfoTitle, {bottom: 60}, 200)
        });

    };
    openWrapper.onclick = function () {
        zhufengAnimate(wrapperBox, {left: 50 + "%", width: 920, height: 260}, 200, ["Quint", "easeInOut"], function () {
            closeWrapper.style.display = 'block';
            openWrapper.style.display = 'none';
            zhufengAnimate(joinInfoTitle, {bottom: 335}, 200)
        });

    };


}();