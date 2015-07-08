(function ()
{

    var _p = window.Index = {};

    var $doms = {};

    _p.init = function ()
    {
        $doms.container = $("#index_block");
        $doms.background = Helper.$extract("#index_block .background");


        var wgImage = WireGraphic.getData("/Index").image;

        //wgImage.className = ".index_bike";

        var $oldBike = $(".index_bike");
        $oldBike.parent().append(wgImage);
        $oldBike.detach();

        wgImage.className = "index_bike";

        $doms.bike = Helper.$extract(".index_bike");

        $doms.text_0 = Helper.$extract(".index_text_0");
        $doms.text_1 = Helper.$extract(".index_text_1");
        $doms.text_2 = Helper.$extract(".index_text_2");

        Helper.getInitValue($doms.background[0]);
        Helper.getInitValue($doms.bike[0]);
    };

    _p.beforeStageIn = function(options)
    {

        if(options && options.isFirstIn)
        {

            //TweenMax.killTweensOf($doms.bike);
            TweenMax.killTweensOf($doms.text_0[0]);
            TweenMax.killTweensOf($doms.text_1[0]);
            TweenMax.killTweensOf($doms.text_2[0]);

            //TweenMax.set($doms.bike, {autoAlpha:0, x:100});
            TweenMax.set($doms.text_0[0], {autoAlpha:0, marginTop:$doms.text_0[0].geom.mt, y:-50});
            TweenMax.set($doms.text_1[0], {autoAlpha:0});
            TweenMax.set($doms.text_2[0], {transformPerspective:500, autoAlpha:0, rotationY:-180});
        }
        else
        {
            TweenMax.set($doms.bike, {autoAlpha:0});
            TweenMax.set($doms.text_0[0], {autoAlpha:0});
            TweenMax.set($doms.text_1[0], {autoAlpha:1});
            TweenMax.set($doms.text_2,{autoAlpha:1, rotationY:0});
            //$doms.bike[0].offset = $doms.bike.offset();
        }
    };

    _p.afterStageIn = function(options)
    {
        if(options.isFirstIn)
        {

            TweenMax.to($doms.bike,.6, {autoAlpha:1});

            var tl = new TimelineMax();

            tl.add(function()
            {
                TweenMax.to($doms.text_0,.5,{ease:Power1.easeOut, delay:.0, autoAlpha:1, y:0});
            }, 0);

            tl.add(function()
            {
                TweenMax.to($doms.text_0,1,{marginTop: $doms.text_1[0].geom.mt, ease:Back.easeInOut, onComplete:function()
                {
                    TweenMax.set($doms.text_0[0], {autoAlpha:0});
                    TweenMax.set($doms.text_1[0], {autoAlpha:1});
                }});
                TweenMax.to($doms.text_2,1,{transformPerspective:500, ease:Power1.easeInOut, autoAlpha:1, rotationY:0, delay:.8, onComplete:options.onComplete});
            }, 1.1);
        }
        else
        {
            TweenMax.to($doms.bike,.6, {autoAlpha:1, onComplete:options.onComplete});
        }



    };

    _p.beforeStageOut = function()
    {
        TweenMax.to($doms.bike,.6, {autoAlpha:0});
    };

    _p.afterStageOut = function()
    {
    };

    _p.getWgData = function()
    {
        var offset = $doms.bike.offset();
        var containerOffset = $doms.container.offset();

        var id = "/Index";
        var gData = WireGraphic.getData(id);

        var rawWidth = gData.rawWidth;
        var rawHeight = gData.rawHeight;

        var obj = {};
        obj.left = offset.left;
        obj.top = offset.top - containerOffset.top;
        obj.scaleX = $doms.bike.width() / rawWidth;
        obj.scaleY = $doms.bike.height() / rawHeight;

        obj.id = id;

        return obj;
    };

    _p.onResize = function (width, height, bgBound)
    {
        var bgDom = $doms.background[0];
        var bound = bgBound;

        $(bgDom).css("width", bound.width).css("height", bound.height).css("left", (width - bound.width) *.5).css("top", (height - bound.height) *.5);
        Helper.applyTransform($doms.bike[0], bound.ratio, ["w", "h", "ml", "mt"]);
        Helper.applyTransform($doms.text_0[0], bound.ratio, ["w", "h", "ml", "mt"]);
        Helper.applyTransform($doms.text_1[0], bound.ratio, ["w", "h", "ml", "mt"]);
        Helper.applyTransform($doms.text_2[0], bound.ratio, ["w", "h", "ml", "mt"]);

        //$doms.bike[0].offset = $doms.bike.position();



        //var offset = $doms.bike.offset();
        //var containerOffset = $doms.container.offset();
        //WireGraphic.updateDataGeom("/Index", offset.left, offset.top - containerOffset.top, $doms.bike.width(), $doms.bike.height());

    };

}());