/**********************************************************
 * A Simple JQuery plugin for quicksand
 * Author :             Team LogicHunt
 * Author URI :         logichunt.com
 * Author Contact :     logichunt.info@gmail.com
 ***********************************************************/

(function($) {
    "use strict";

    $( document ).ready( function() {

    jQuery.fn.lgxQuickSand = function (options) {
        var elem        = this, //dom object element
            $elem       = jQuery( this ), //jQuery dom object element
            tagArchive   = {},
            qDefaults   = {};

        qDefaults = jQuery.extend( true, {}, qDefaults, options );

        jQuery.each( $elem.children() , function(i) {
            var $singleItem = jQuery( this ),
                tagHolder = $singleItem.data( 'cat' ).split( ' ');

            $singleItem.attr( 'data-id', i );
            //console.log(tagHolder)
            jQuery.each( tagHolder, function(key, item) {
                item = jQuery.trim( item );
                if ( !( item in tagArchive ) ) {
                    tagArchive[item] = [];
                }
                tagArchive[item].push( $singleItem );
            } );

            if ( !('all' in tagArchive ) ) {
                tagArchive['all'] = [];
            }
            tagArchive['all'].push( $singleItem );
        } );

        jQuery.each( tagArchive, function(tag, taggedItem) {
            var ul = jQuery( '<ul>', {'class' : 'lgx-clone lgx-filtered'} );
            jQuery.each( taggedItem, function() {
                jQuery( this ).clone().appendTo( ul );
            } );
            jQuery( '.lgx-quicksand-filter' ).find( 'a[data-filter="' + tag + '"]').data( 'list', ul );
        } );

        jQuery('.lgx-quicksand-filter' ).on( 'click', 'a.lgx-single-filter', function(e) {
            e.preventDefault();
            var link = jQuery( this );
            //link.addClass( 'active' ).siblings().removeClass( 'active' );

            $(".lgx-quicksand-filter").find(".active").removeClass("active");
            link.parent().addClass("active");
            $elem.quicksand( link.data( 'list' ).find( 'li' ) );
            return false;
        } );
    };

    });
})(jQuery);