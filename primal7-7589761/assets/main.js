/* global svgeezy:false */

(function($, window){
    
    var $downArrows        = $('.panel-down-btn'),
        $upArrows          = $('.panel-up-btn'),
        $productImageLinks = $('.product-image-link'),
        $mainProductImage  = $('.l-product-main-image-con').find('img');

    // replace svg with png fallbacks
    svgeezy.init(false, 'png');

    // scroll panel down after clicking button
    $downArrows.on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            offset = $this.parent().offset();

        $('html, body').animate({
            scrollTop: offset.top
        }, 500);

    });


    // scroll panel up after clicking button
    $upArrows.on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            offset = $this.parent().offset();

        $('html, body').animate({
            scrollTop: offset.top
        }, 500);

    });

    // panel scroll top btn
    var $scrollTopBtn = $('.down-panel');

    $scrollTopBtn.on('click', function (e) {
        e.preventDefault();

        var offset = $('.homepage-roto-content').offset();

        $('html, body').animate({
            scrollTop: offset.top
        });
    });

    $productImageLinks.on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            newImageEarl,
            newImageAlt;

        newImageEarl = $this.attr('href');
        newImageAlt = $this.find('img').attr('alt');

        $mainProductImage.attr({
            'src' : newImageEarl,
            'alt' : newImageAlt
        });

    });

    $('#product-select').fancySelect();

})(jQuery, window);
