
var $smallNavBoxs = $(".small-nav-box");
var o = null;
$('body').on("mouseover", function (e) {
    var $tar = $(e.target);
    if ($tar.hasClass("one")) {
        o = $tar.offset().left + 36;
        $('.nav-item>li').removeClass('active');
        $tar.addClass('active');
        $(".nav-index").stop().animate({width: o}, 200);
        var $index = $tar.index();
        if ($tar.parents().hasClass("item-right")) {
            $index = $index + $('.item-left').find('li').length;
        }
        if ($tar.parents().hasClass("item-three")) {
            $index = $index + ($('.item-left').find('li').length + $('.item-right').find('li').length);
        }
        $smallNavBoxs.eq($index).stop().animate({height: 44}, 200);
        return;
    }
    if ($tar.hasClass("small-nav-box")) {
        return;
    }
    var $tarPars = $tar.parents();
    var $navLi = null, flag = false;
    $tarPars.each(function (index, item) {
        if ($(item).hasClass("one")) {
            flag = true;
            $navLi = $(item);
        }
    });
    if (flag) {
        $index = $navLi.index();
        o = $navLi.offset().left + 36;
        $(".nav-index").stop().animate({width: o}, 200);
        $('.nav-item>li').removeClass('active');
        $navLi.addClass('active');
        if ($tar.parents().hasClass("item-right")) {
            $index = $index + $('.item-left').find('li').length;
        }
        if ($tar.parents().hasClass("item-three")) {
            $index = $index + ($('.item-left').find('li').length + $('.item-right').find('li').length);
        }
        $smallNavBoxs.eq($index).stop().animate({height: 44}, 200);
        return;
    }
    flag = false;
    $tarPars.each(function (index, item) {
        if ($(item).hasClass("small-nav-box")) {
            flag = true;
        }
    });
    if (flag) {
        return;
    }

    $smallNavBoxs.css('height', '0');
}).on('mouseout', function () {
    //var a =$('.nav-item>li:first-child').offset().left+36;
    //$(".nav-index").stop().animate({width: a}, 200);
    //$('.nav-index li').removeClass('active');
    //$('.spe-fir').addClass('active');
});
var nextArrow = utils.getElementsByClass('next-arrow'), prevArrow = utils.getElementsByClass('prev-arrow'), itemLeft = utils.getElementsByClass('item-left'), itemRight = utils.getElementsByClass('item-right'), itemThree = utils.getElementsByClass('item-three');

nextArrow[0].onclick = function () {
    this.flag = 1;
    var _this = this;
    zhufengAnimate(itemLeft[0], {right: 100 + "%"}, 500);
    zhufengAnimate(itemRight[0], {left: 165}, 500);
    zhufengAnimate(itemThree[0], {left: 50 + "%"}, 500, 1, function () {
        prevArrow[0].style.display = 'inline-block';
        _this.style.display = 'none';
    });

};
prevArrow[0].onclick = function () {
        this.flag = 0;
        var _this = this;
        zhufengAnimate(itemLeft[0], {right: 56 + "%"}, 500);
        zhufengAnimate(itemRight[0], {left: 50 + "%"}, 500);
        zhufengAnimate(itemThree[0], {left: -100 + "%"}, 500, 1, function () {
            _this.style.display = 'none';
            nextArrow[0].style.display = 'inline-block';
        });

    }
