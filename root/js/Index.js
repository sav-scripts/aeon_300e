(function ()
{

    var _p = window.Index = {};

    var $doms = {};

    var _tlTextLoop;

    _p.init = function ()
    {
        $doms.container = $("#index_block");
        $doms.background = Helper.$extract("#index_block .background");
        $doms.bike = Helper.$extract(".index_bike");
        $doms.text_0 = Helper.$extract(".index_text_0");
        $doms.text_1 = Helper.$extract(".index_text_1");
        $doms.text_2 = Helper.$extract(".index_text_2");

        Helper.getInitValue($doms.background[0]);
        Helper.getInitValue($doms.bike[0]);
    };

    _p.beforeStageIn = function()
    {
        TweenMax.killTweensOf($doms.bike);
        TweenMax.killTweensOf($doms.text_0[0]);
        TweenMax.killTweensOf($doms.text_1[0]);
        TweenMax.killTweensOf($doms.text_2[0]);

        TweenMax.set($doms.bike, {autoAlpha:0, x:100});
        TweenMax.set($doms.text_0[0], {autoAlpha:0, marginTop:$doms.text_0[0].geom.mt, y:-50});
        TweenMax.set($doms.text_1[0], {autoAlpha:0});
        TweenMax.set($doms.text_2[0], {transformPerspective:500, autoAlpha:0, rotationY:-180});
    };

    _p.afterStageIn = function()
    {
        var tl = new TimelineMax();

        tl.add(function()
        {
            TweenMax.to($doms.bike,1, {ease:Back.easeInOut, autoAlpha:1, x:0});
            TweenMax.to($doms.text_0,.5,{ease:Power1.easeOut, delay:.0, autoAlpha:1, y:0});
        }, 0);

        tl.add(function()
        {
            TweenMax.to($doms.text_0,1,{marginTop: $doms.text_1[0].geom.mt, ease:Back.easeInOut, onComplete:function()
            {
                TweenMax.set($doms.text_0[0], {autoAlpha:0});
                TweenMax.set($doms.text_1[0], {autoAlpha:1});
            }});
            TweenMax.to($doms.text_2,1,{transformPerspective:500, ease:Power1.easeInOut, autoAlpha:1, rotationY:0, delay:.8});
        }, 1.1);
    };

    _p.beforeStageOut = function()
    {

    };

    _p.afterStageOut = function(cb)
    {
    };

    _p.onResize = function (width, height)
    {
        var bgDom = $doms.background[0];
        var bound = Helper.getSize_cover(width, height, bgDom.init.w, bgDom.init.h);

        $(bgDom).css("width", bound.width).css("height", bound.height).css("left", (width - bound.width) *.5).css("top", (height - bound.height) *.5);
        Helper.applyTransform($doms.bike[0], bound.ratio, ["w", "h", "ml", "mt"]);
        Helper.applyTransform($doms.text_0[0], bound.ratio, ["w", "h", "ml", "mt"]);
        Helper.applyTransform($doms.text_1[0], bound.ratio, ["w", "h", "ml", "mt"]);
        Helper.applyTransform($doms.text_2[0], bound.ratio, ["w", "h", "ml", "mt"]);

    };

}());