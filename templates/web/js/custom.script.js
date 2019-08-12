(function($) {
    "use strict";

    $(document).ready(function() {

        /*=========================================================================
         ===  SMOOTH SCROLL - REQUIRES JQUERY EASING PLUGIN
         ========================================================================== */

        $( 'a.lgx-scroll' ).on( 'click', function(event) {
            var $anchor = $(this);
            var topTo   = $( $anchor.attr('href') ).offset().top;

            if ( window.innerWidth < 768 ) {
                topTo = ( topTo - 90 );
            }

            $( 'html, body' ).stop().animate({
                scrollTop: topTo
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
            return false;
        } );

        /*=========================================================================
         ===  //SMOOTH SCROLL END
         ========================================================================== */

        /*=========================================================================
         ===  SKILL PROGRESS BAR START
         ========================================================================== */

        $( '.lgx-skill-progress-bar', '#lgx-skills' ).each( function(i, elem) {
            var	$elem = $(this),
                percent = $elem.attr('data-lgx-progress-bar-percent'),
                delay = $elem.attr('data-lgx-progress-bar-delay');

            if (!$elem.hasClass('animated'))
                $elem.css({ 'width' : '0%' });

            $(elem).appear(function () {
                setTimeout(function() {
                    $elem.animate({ 'width' : percent + '%' }, 2000, 'easeInOutExpo').addClass('animated');
                }, delay);
            });
          
        });

        /*=========================================================================
         ===  //.SKILL PROGRESS BAR END
         ========================================================================== */

        /*=========================================================================
         ===  PORTFOLIO & DYNAMIC MODAL
         ========================================================================== */

        $( '#lgx-quicksand-gallery').lgxQuickSand();

        $( '#lgx-quicksand-gallery' ).on( 'click', '.lgx-expand', function(ev) {
            var $modalInfo      = $( this );
            var title           = $modalInfo.data( 'title' );
            var description     = $modalInfo.data( 'description' );
            var tagCloud        = $modalInfo.data( 'tag-cloud' );
            var client          = $modalInfo.data( 'client' );
            var service         = $modalInfo.data( 'service' );
            var highlightText   = $modalInfo.data( 'highlight-text' );
            var imageUrl        = $modalInfo.data( 'image-url' );

            //console.log($modalInfo);

            $( '#portfolio-modal' ).on( 'show.bs.modal', function(e) {
                var $modal      = $( this );
                $modal.find( '.lgx-modal-title' ).text( title );
                $modal.find( '.lgx-modal-text' ).text( description );
                $modal.find( '.lgx-tag-list' ).text( tagCloud );
                $modal.find( '.lgx-service-list' ).text( service );
                $modal.find( '.blockquote-brand' ).children().text( highlightText );
                $modal.find( '.lgx-modal-img' ).attr( 'src', imageUrl );
                $modal.find( '.lgx-client-list' ).empty();
                var clientName = '';
                for( var i = 0; i < client.length; i++ ) {
                    clientName = client[i];
                    if( i > 0 ) {
                        $modal.find( '.lgx-client-list' ).append( ', <a href="javascript:void(0);">' + clientName + '</a>' );
                    } else {
                        $modal.find( '.lgx-client-list' ).append( '<a href="javascript:void(0);">' + clientName + '</a>' );
                    }
                }
            } );
        } );

        /*=========================================================================
         ===  //PORTFOLIO & DYNAMIC MODAL END
         ========================================================================== */


        /*=========================================================================
         ===  // AWARD COUNTER and WOW
         ========================================================================== */

        $('.lgx-counter').counterUp({
            delay: 25,
            time: 1000
        });

        //new WOW().init();

        var wow = new WOW(
            {
                boxClass:     'wow',      // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset:       0,          // distance to the element when triggering the animation (default is 0)
                mobile:       true,       // trigger animations on mobile devices (default is true)
                live:         true,       // act on asynchronously loaded content (default is true)
                callback:     function(box) {
                    // the callback is fired every time an animation is started
                    // the argument that is passed in is the DOM node being animated
                }
            }
        );
        wow.init();

        /*=========================================================================
         ===  //AWARD COUNTER END
         ========================================================================== */

        /*=========================================================================
         ===  DYNAMIC SITE PATH
         ========================================================================== */

        var lgx_path = window.location.protocol + '//' + window.location.host;
        var pathArray = window.location.pathname.split( '/' );
        for (var i = 1; i < (pathArray.length - 1); i++) {
            lgx_path += '/';
            lgx_path += pathArray[i];
        }

        /*=========================================================================
         ===  // SITE PATH END
         ========================================================================== */

        /*=========================================================================
         ===  OWL SLIDER
         ========================================================================== */

        /** EXPERIENCE SECTION**/

        $("#lgx-owlexperience").owlCarousel({
            slideSpeed:500,
            rewindSpeed:0,
            autoPlay: 4000, //Set AutoPlay to 3 seconds
            pagination : false,
            navigation:true,
            navigationText : ['<i class="fa fa-arrow-circle-o-left"></i>','<i class="fa fa-arrow-circle-o-right"></i>'],
            items : 3,
            itemsDesktop : [1199,3],
            itemsDesktopSmall : [979,3]

        });

        /** EDUCATION SECTION**/

        $("#lgx-owleducation").owlCarousel({
            slideSpeed:500,
            rewindSpeed:0,
            autoPlay: 6000, //Set AutoPlay to 3 seconds
            // autoPlay: false, //Set AutoPlay to 3 seconds
            pagination : false,
            navigation:true,
            navigationText : ['<i class="fa fa-arrow-circle-o-left"></i>','<i class="fa fa-arrow-circle-o-right"></i>'],
            items : 3,
            itemsDesktop : [1199,3],
            itemsDesktopSmall : [979,2],
            itemsTablet: [767,1] //2 items between 600 and 0

        });


        /** BLOG SECTION**/

        $("#lgx-owlblog").owlCarousel({
            slideSpeed:500,
            rewindSpeed:500,
            autoPlay: 5000, //Set AutoPlay to 3 seconds
            //autoPlay: false, //Set AutoPlay to 3 seconds
            pagination : true,
            navigation:false,
            items : 4,
            itemsDesktop : [1299,3],
            itemsDesktopSmall : [979,2],
            itemsTablet: [767,2]

        });

        /*=========================================================================
         ===  //OWL SLIDER END
         ========================================================================== */


        /*=========================================================================
         ===  Start Contact Form Validation And Ajax Submission
         ========================================================================== */

        var alertInterval;//store the timeout interval ID

        //clear interval for alert message window
        $( '#lgx-form-modal' ).on( 'hide.bs.modal', function(ev) {
            clearInterval(alertInterval);
        } );

        var $contactForm = $( 'form.lgx-contactform' );
        $contactForm.validate({
            submitHandler: function(form) {
                //console.log(form);
                var $form = $(form);
                //console.log($form.serialize());
                $.ajax({
                    url: lgx_path + '/php/contact.php',
                    type: 'post',
                    data: $form.serialize(),
                    beforeSubmit: function (argument) {
                        //ajax loading icon
                    },
                    success: function (ajaxResponse) {
                        try {
                            var ajaxResponse = $.parseJSON(ajaxResponse);
                            if( ajaxResponse.error ) {
                                //for field error
                                //console.log(ajaxResponse.error_field);
                                for( var i = 0; i < ajaxResponse.error_field.length; i++ ) {
                                    if( $( 'p#' + ajaxResponse.error_field[i] + '-error' ).length ) {
                                        $( 'p#' + ajaxResponse.error_field[i] + '-error' ).text( ajaxResponse.message[ajaxResponse.error_field[i]] );
                                    } else {
                                        $( '#' + ajaxResponse.error_field[i] ).after( '<p id="' + ajaxResponse.error_field[i] + '-error" class="help-block">' + ajaxResponse.message[ajaxResponse.error_field[i]] + '</p>' );
                                    }
                                }

                            } else {
                                $( '.lgx-form-msg' ).removeClass( 'alert-danger' ).addClass( 'alert-success' ).text( ajaxResponse.message );
                                $( '#lgx-form-modal' ).modal( 'show' );
                                alertInterval = setInterval( function() { $( '#lgx-form-modal' ).modal( 'hide' ); }, 5000 );
                                $form[0].reset();
                            }
                        } catch (e) {
                            $( '.lgx-form-msg' ).removeClass( 'alert-success' ).addClass( 'alert-danger' ).text( 'Sorry, we are failed to contact with you. Please reload the page and try again.' );
                            $( '#lgx-form-modal' ).modal( 'show' );
                            alertInterval = setInterval( function() { $( '#lgx-form-modal' ).modal( 'hide' ); }, 5000 );
                        }
                    },
                    error: function (argument) {
                        $( '.lgx-form-msg' ).removeClass( 'alert-success' ).addClass( 'alert-danger' ).text( 'Sorry, we can not communicate with you. Please make sure you are connected with internet.' );
                        $( '#lgx-form-modal' ).modal( 'show' );
                        alertInterval = setInterval( function() { $( '#lgx-form-modal' ).modal( 'hide' ); }, 5000 );
                    },
                    complete: function() {

                    }
                });

                return false;
            },
            errorElement: 'p',
            errorClass: 'help-block',
            rules: {
                'lgxname': {
                    required: true,
                    minlength: 3
                },

                'lgxemail': {
                    required: true,
                    email: true
                },

                'lgxsubject': {
                    required: true,
                    minlength: 5
                },

                'lgxmessage': {
                    required: true,
                    minlength: 5
                }
            }
        });


        /*=========================================================================
         ===   //End Contact Form Validation And Ajax Submission
         ========================================================================== */


        /*=========================================================================
         ===  TOP NAVIGATION
         ========================================================================== */

        if ( $( '#lgx-navbar-nav').length ) {

            var window_w = $(window).width(); //window width
            var s = $(".lgx-navbar");
            var pos = s.position();

            var windowpos = $(window).scrollTop();
            if (windowpos - pos.top > 1) {
                s.addClass("lgx-fixednav");
            } else {
                s.removeClass("lgx-fixednav");
            }

            $(window).scroll(function() {

                var window_w = $(window).width(); //window width

                var windowpos = $(window).scrollTop();

                if (windowpos - pos.top > 1) {
                    s.addClass("lgx-fixednav");
                } else {
                    s.removeClass("lgx-fixednav");
                }
            });

            $('#lgx-navbar-nav ul li a').on('click',function(e){
                $( "#lgx-navbar-nav" ).slideUp( 400, function() {
                    $( this ).removeAttr( 'style' ).removeClass( "in" );
                } );
                return false;
            });
        }


        /*=========================================================================
         ===  //TOP NAVIGATION END
         ========================================================================== */

        /*=========================================================================
         === FUNCTION FOR LEFT MENU
         ========================================================================== */

        function toggleMenu(){
            if(menuIsOpen){
                $menuToggle.removeClass('lgx-menu-open');
                closeMenu();
            }else{
                $menuToggle.addClass('lgx-menu-open');
                openMenu();
            }
        }

        function updateTimescale(){
            TweenMax.globalTimeScale(timeScale.v);
        }

        function openMenu(){
            menuIsOpen=true;

            TweenMax.to($menu,0.55,{
                x:menuWidth,
                force3D:false,
                ease:Elastic.easeOut,
                easeParams:[1.01,0.8]
            });

            TweenMax.to($menuBg,0.55,{
                skewX:0,
                force3D:false,
                ease:Elastic.easeOut,
                easeParams:[1.01,0.8]
            });

            $menuItem.each(function(i){
                TweenMax.to($(this),0.7+(i*0.05),{
                    delay:0.02*i,
                    x:0,
                    force3D:false,
                    // ease:Quint.easeOut
                    ease:Elastic.easeOut,
                    easeParams:[1.1,0.6]
                });
            });
        }

        function closeMenu(){
            menuIsOpen=false;
            TweenMax.to($menu,0.2,{
                x:-100,
                ease:Quad.easeIn,
                force3D:false
            });
            TweenMax.set($menuBg,{
                delay:0.2,
                skewX:menuBgSkew,
                force3D:false
            });
            $menuItem.each(function(i){
                TweenMax.to($(this),0.3+(0.05*i),{
                    x:-menuItemOffset,
                    ease:Quad.easeIn,
                    force3D:false
                });
            });

        }

        function setTimescale(v){
            TweenMax.to(timeScale,0.5,{
                v:v,
                ease:Quad.easeInOut,
                onUpdate:updateTimescale,
                onComplete:updateTimescale
            });
        }


        /*=========================================================================
         === //FUNCTION FOR LEFT MENU
         ========================================================================== */

        /*=========================================================================
         ===  LEFT MENU
         ========================================================================== */

        if ( $( '.lgx-leftnav').length ) {
            var menuIsOpen=false,
                $menu=$(".lgx-leftnav"),
                $menuItem=$(".lgx-leftmenu-item"),
                $menuBg=$(".lgx-menu-bg"),
                $menuToggle=$(".lgx-menu-toggle"),
                menuWidth=300,
                menuItemOffset=150,
                menuBgSkew=-10,
                timeScale={v:1};
            TweenMax.globalTimeScale(timeScale.v);

            TweenMax.set($menuItem,{
                x:-menuItemOffset
            });
            TweenMax.set($menuBg,{
                skewX:menuBgSkew
            })

            $menuToggle.on('click',function(e){
                toggleMenu();
            });
        }
        /*=========================================================================
         ===  //LEFT MENU END
         ========================================================================== */

        /*=========================================================================
         ===  RIGHT MENU
         ========================================================================== */


        if ( $( '#lgx-rightmenu').length ) {

            $('.lgx-rightmenu-in').css({
                height: $(window).height()+'px'
            });

            $(window).on('resize',function(e){
                $('.lgx-rightmenu-in').css({
                    height: $(window).height()+'px'
                });
            });

            $( '.lgx-rightmenu-btn' ).on('click',function(e){
                e.preventDefault();
                var $rightMenu = $( '.lgx-rightmenu-in' );
                $rightMenu.animate( {
                    right: parseInt( $rightMenu.css( 'right' ), 10 ) < 0 ? 0 : -$rightMenu.outerWidth()
                }, 'fast' );
                return false;
            });

            $('#lgx-toogle-inner').on('click',function(e){
                e.preventDefault();
                var $lefty = $(this).parent('.lgx-rightmenu');

                $lefty.animate(
                    {
                        left: parseInt($lefty.css('left'),10) == 0 ?-$lefty.outerWidth() : 0
                    },
                    "fast",
                    function(){
                    }
                );
                return false;
            });

        }
        /*=========================================================================
         ===  //RIGHR  MENU  END
         ========================================================================== */

        /*=========================================================================
         ===  GOOGLE MAP
         ========================================================================== */
        if ( typeof google != 'undefined' ) {
            //for Default  map
            if ( $( '.map-canvas-default').length ) {
                $(".map-canvas-default").googleMap({
                    zoom: 8, // Initial zoom level (optiona
                    coords: [55.749792, 37.632495], // Map center (optional)
                    type: "ROADMAP", // Map type (optional),
                    mouseZoom: false
                });

                //for marker
                $(".map-canvas-default").addMarker({
                    coords: [55.749792, 37.632495], // GPS coords
                    title: 'Название',
                    text: 'Ваше описание',
                    icon: lgx_path + '/img/map/map-icon.png'
                });
            }

            // FOR DARK MAP
            if ( $( '.map-canvas-dark').length ) {
                $(".map-canvas-dark").googleMap({
                    zoom: 8, // Initial zoom level (optional)
                    coords: [55.749792, 37.632495], // Map center (optional)
                    type: "HYBRID", // Map type (optional),
                    mouseZoom: false
                });

                //for marker
                $(".map-canvas-dark").addMarker({
                    coords: [55.749792, 37.632495], // GPS coords
                    title: 'Название',
                    text: 'Описание',
                    icon: lgx_path + '/img/map/map-dark-icon.png'
                });
            }
        }

        /*=========================================================================
         ===  //GOOGLE MAP END
         ========================================================================== */


        //****DOM READY END****
    });
})(jQuery);