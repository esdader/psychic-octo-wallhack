/* global svgeezy:false */

(function($, window){

    // quote selector

    var $quoteEarls     = $('.quote-earl'),
        $quoteBox       = $('.quote-box'),
        $quoteSelectors = $('.quote-selector'),
        $downArrows     = $('.panel-down-btn'),
        $upArrows       = $('.panel-up-btn'),
        $inPageNav      = $('.in-page-nav a'),
        $videosBtn      = $('.videos-btn').find('li'),
        $videos         = $('.video-box'),
        $exercisePanels = $('.l-exercise'),
        $toggleBtns     = $('.toggle-btn');


    // replace svg with png fallbacks
    svgeezy.init(false, 'png');


    // handles switching out videos

    $videosBtn.on('click', function (e) {
        e.preventDefault();

        var $this      = $(this),
            link       = $this.find('a'),
            videoIndex = $this.index(),
            currentVideo,
            currentVideoBtn,
            currentVideoIndex,
            iframe,
            player;

        if (!link.hasClass('active')) {

            currentVideoBtn = $videosBtn.find('.active');
            currentVideoIndex = currentVideoBtn.parent().index();
            currentVideoBtn.removeClass('active');

            link.addClass('active');

            currentVideo = $($videos[currentVideoIndex]);

            iframe = currentVideo.find('iframe')[0];
            player = $f(iframe);


            currentVideo.fadeOut(function () {
                currentVideo.addClass('hidden');
                player.api('unload');
                player.api('pause');
                $($videos[videoIndex])
                    .hide()
                    .removeClass('hidden')
                    .fadeIn();
            });

        }


    });

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

    // scroll down after clicking in-page-nav
    $inPageNav.on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            panel,
            link,
            offset;

        link = $this.prop('hash');

        panel = $(link);
        offset = panel.offset();

        $('html, body').animate({
            scrollTop: offset.top
        }, 500);

    });

    $toggleBtns.on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        $this
            .fadeOut(function () {
                $this.parent().removeClass('is-closed');
            })
            .parent().find('.l-content-panel-col-right').slideDown();
    });

    $quoteEarls.on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            quoteName,
            $quote;

        if (!$this.hasClass('active')) {
            quoteName = $this.data('quote');
            $quote = $('.' + quoteName);

            $quoteSelectors.find('.active').removeClass('active');
            $this.addClass('active');

            $quoteBox.find('.active-quote').fadeOut(function () {
                $(this)
                    .removeClass('active-quote')
                    .addClass('hidden');
                $quote
                    .hide()
                    .removeClass('hidden')
                    .addClass('active-quote')
                    .fadeIn();
            });
        }

    });


    function changeQuoteBox(quoteNav) {

        if (quoteNav === 'rehab') {
            quoteNav = 'facilities';
        }

        var quoteSelector  = $('.quote-selector'),
            quoteBox       = $('.quote-box'),
            activeSelector = quoteSelector.find('.active-quote-nav'),
            activeQuote    = quoteBox.find('.active-quote'),
            newSelector    = quoteSelector.find('.' + quoteNav + '-quote-nav');

        activeSelector.fadeOut(function () {
            var $this = $(this);

            $this
                .removeClass('active-quote-nav')
                .addClass('hidden');

            newSelector
                .hide()
                .removeClass('hidden')
                .addClass('active-quote-nav')
                .fadeIn(function () {
                    activeQuote
                        .removeClass('active-quote')
                        .addClass('hidden');

                    var newQuote = newSelector.find('a'),
                        quoteName = $(newQuote[0]).data('quote'),
                        quote = $('.' + quoteName);

                    newSelector.find('.active').removeClass('active');
                    $(newQuote[0]).addClass('active');
                    quote
                        .hide()
                        .removeClass('hidden')
                        .addClass('active-quote')
                        .fadeIn();
                });
        });

    }

    // rehab subnav
    var $rehabSubnav      = $('.rehab-roto-sub-nav'),
        $rehabSubEarls    = $rehabSubnav.find('a'),
        $rehabRotoContent = $('.roto-content-rehab');

    $rehabSubEarls.on('click', function (e) {
        e.preventDefault();

        var $this = $(this);

        if (!$this.hasClass('active')) {

            var subConName = $this.data('rehab-sub-content'),
                navConName  = $this.data('rehab-sub-content'),
                subCon = $rehabRotoContent.find('.rehab-sub-content-' + subConName),
                subConCur = $rehabRotoContent.find('.rehab-sub-content-active');

            changeQuoteBox(navConName);

            $rehabSubnav.find('.active').removeClass('active');

            $this.addClass('active');

            subConCur.fadeOut(function (e) {
                $(this)
                    .removeClass('rehab-sub-content-active')
                    .addClass('hidden');
                subCon
                    .hide()
                    .removeClass('hidden')
                    .addClass('rehab-sub-content-active')
                    .fadeIn();
            });
        }
    });

    // main content switcher

    var $contentSelectors  = $('.roto-content-selector'),
        $contentSelectorsEarls  = $contentSelectors.find('a'),
        $introContent      = $('.homepage-intro-content'),
        $rotoContent       = $('.homepage-roto-content'),
        $rotoImageHolder   = $('.homepage-roto-image-holder'),
        // $rotoMainContent   = $('.homepage-roto-main-content'),
        // $rotoQuoteSelector = $('.quote-selector'),
        // $rotoQuoteBox      = $('.quote-box'),
        $rotoSubhead       = $('.roto-subheading');

    $contentSelectorsEarls.on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            rotoContentName = $this.data('content-type');

        if (!$this.hasClass('active')) {
            $contentSelectors.find('.active').removeClass('active');
            $this.addClass('active');

            if (rotoContentName === 'rehab') {
                $('.rehab-roto-sub-nav').fadeIn();
            } else {
                $('.rehab-roto-sub-nav').fadeOut();
            }

            $introContent
                .find('.active-intro-content')
                .fadeOut(function () {
                    $(this)
                        .removeClass('active-intro-content')
                        .addClass('hidden');

                    var intContent = $('.roto-intro-' + rotoContentName);
                    $(intContent)
                        .hide()
                        .removeClass('hidden')
                        .addClass('active-intro-content')
                        .fadeIn();
                });

            $rotoContent
                .find('.active-content')
                .fadeOut(function () {
                    $(this)
                        .removeClass('active-content')
                        .addClass('hidden');

                    var rotoContent = $('.roto-content-' + rotoContentName);
                    $(rotoContent)
                        .hide()
                        .removeClass('hidden')
                        .addClass('active-content')
                        .fadeIn();
                });

            $rotoSubhead.text(rotoContentName);

            $rotoImageHolder
                .find('.active-image')
                .fadeOut(function () {
                    $(this)
                        .removeClass('active-image')
                        .addClass('hidden');

                    $rotoImageHolder
                        .find('.roto-image-' + rotoContentName)
                            .hide()
                            .removeClass('hidden')
                            .addClass('active-image')
                            .fadeIn();
                });

            changeQuoteBox(rotoContentName);
        }

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


    // exericse init function
    function exerciseInit () {
        // todo add in init function
        // only if exercisePanesl are present
    }

    // exericse page
    if ($exercisePanels.length > 0) {

        var $exerciseStepCount   = $('.exercise-step-count'),
            $stepCurrentCount    = $exerciseStepCount.find('.step-current-count'),
            $exerciseDotCount    = $('.exercise-step-dot-count'),
            $exerciseDotCountLis = $exerciseDotCount.find('li'),
            $maxExercises        = $exerciseDotCountLis.length,
            $exerciseDotCountA   = $exerciseDotCount.find('a'),
            $prevBtn             = $('.exercise-prev'),
            $nextBtn             = $('.exercise-next'),
            $exerciseImageViewer = $('.exercise-img-viewer'),
            $exerciseImages       = $exerciseImageViewer.find('img'),
            $currentExercise     = 0;

        // exercise functions
        function changeImage () {
            var currentImage = $exerciseImageViewer.find('.current-exercise'),
                newCurrentImage = $($exerciseImages[$currentExercise]);

            currentImage.fadeOut(function () {
                var $this = $(this);

                $this.removeClass('current-exercise');
                if (newCurrentImage.hasClass('hidden')) {
                    newCurrentImage
                        .hide()
                        .removeClass('hidden');
                }
                newCurrentImage
                    .addClass('current-exercise')
                    .fadeIn();
            });
        }

        function changeActiveDot () {
            var activeDot = $exerciseDotCount.find('.active'),
                newActiveDot = $($exerciseDotCountLis[$currentExercise]).find('a');
            activeDot.removeClass('active');
            newActiveDot.addClass('active');
        }

        function changeStepNumber () {
            var stepNumber = $currentExercise + 1;

            $stepCurrentCount.text(stepNumber);
        }

        function changeExercise () {
            changeImage();
            changeActiveDot();
            changeStepNumber();

        }

        $prevBtn.on('click', function (e) {
            e.preventDefault();

            $currentExercise -= 1;

            if ($currentExercise < 0) {
                $currentExercise = $maxExercises - 1;
            }

            changeExercise();
        });

        $nextBtn.on('click', function (e) {
            e.preventDefault();

            $currentExercise += 1;

            if ($currentExercise === $maxExercises) {
                $currentExercise = 0;
            }

            changeExercise();
        });

        $exerciseDotCountA.on('click', function (e) {
            e.preventDefault();
            var $this = $(this),
                dotIndex = $this.parent().index();

            if (!$this.hasClass('active')) {
                $currentExercise = dotIndex;
                changeExercise();
            }

        });


    }

})(jQuery, window);
