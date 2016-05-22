~function () {
    function AutoBanner(curEleId, interval) {
        this.banner = document.getElementById(curEleId);
        this.bannerInner = utils.firstChild(this.banner);
        this.bannerTip = utils.children(this.banner, "div")[1];
        this.aList = this.bannerInner.getElementsByTagName("a");
        this.oLis = this.bannerTip.getElementsByTagName("li");
        this.interval = interval || 3000;
        this.autoTimer = null;
        this.step = 0;
        return this.init();
    }

    AutoBanner.prototype = {
        constructor: AutoBanner,
        //lazyImg: function () {
        //    var _this = this;
        //    for (var i = 0, len = this.aList.length; i < len; i++) {
        //        ~function (i) {
        //            var curA = _this.aList[i];
        //            var oImg = new Image;
        //            oImg.src = curA.getAttribute("aBgUrL");
        //
        //            oImg.onload = function () {
        //                //var oBg=curA.getAttribute("style");
        //                //curA.url=this.src;
        //                //utils.css(curA,{backgroundImage:"url+"+(this.src)+""});
        //                //  console.log(curA.src);
        //                if (i === 0) {
        //                    curA.style.zIndex = 1;
        //                    zhufengAnimate(curA, {opacity: 1}, 500);
        //                }
        //                oImg = null;
        //            }
        //        }(i);
        //    }
        //},
        autoMove: function () {
            if (this.step === 2) {
                this.step = -1;
            }
            this.step++;
            this.setBanner();
        },
        setBanner: function () {
            for (var i = 0, len = this.aList.length; i < len; i++) {
                var curA = this.aList[i];

                if (i === this.step) {
                    utils.css(curA, "zIndex", 1);
                    zhufengAnimate(curA, {opacity: 1}, 500, function () {
                        var curASib = utils.siblings(this);
                        for (var k = 0, len = curASib.length; k < len; k++) {
                            utils.css(curASib[k], "opacity", 0);
                        }
                    });
                    continue;
                }
                utils.css(curA, "zIndex", 0);
            }
            for (i = 0, len = this.oLis.length; i < len; i++) {
                var curLi = this.oLis[i];
                i === this.step ? utils.addClass(curLi, "t") : utils.removeClass(curLi, "t");
            }
        },
        tipEvent: function () {
            var _this = this;
            for (var i = 0, len = this.oLis.length; i < len; i++) {
                var curLi = this.oLis[i];
                curLi.index = i;
                curLi.onmouseover = function () {
                    _this.step = this.index;
                    _this.setBanner();
                    window.clearInterval(_this.autoTimer);

                };
                curLi.onmouseout = function () {
                    _this.autoTimer = window.setInterval(function () {
                        _this.autoMove();
                    }, _this.interval);

                }
            }
        },
        init: function () {
            var _this = this;
            //window.setTimeout(function () {
            //    _this.lazyImg();
            //}, 100);

            this.autoTimer = window.setInterval(function () {
                _this.autoMove();
            }, this.interval);

            //this.mouseEvent();
            this.tipEvent();


            return this;
        }
    };
    window.AutoBanner = AutoBanner;
}();