/* global svgeezy:false */

(function ($, window) {

    var $downArrows        = $('.panel-down-btn'),
        $upArrows          = $('.panel-up-btn'),
        $productImageLinks = $('.product-image-link'),
        $mainProductImage  = $('.l-product-main-image-con').find('img'),
        $productSelect     = $('#product-select'),
        $productPrice      = $('.product-details-price'),
        fancyOptions,
        fancyOptionsItems;

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

    // change product drop down to fancyselect
    $productSelect.fancySelect();

    fancyOptions      = $('.fancy-select').find('.options');
    fancyOptionsItems = fancyOptions.find('li');



    // update display price when item is changed in fancyselect
    fancyOptionsItems.on('click', function () {
        var $this = $(this),
            id = $this.data('raw-value'),
            optionItem,
            price;

        optionItem = $productSelect.find('option[value="' + id + '"]');
        price = optionItem.data('price');

        $productPrice.text(price);

    });

})(jQuery, window);
