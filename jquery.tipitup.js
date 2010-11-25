/**
 * Name: TipItUp v1.0.3 - Tipping it up...
 * Author: Jared Williams - http://new2wp.com
 * URI: http://new2jquery.com/plugins/tipitup-jquery-image-tooltip
 * Demo: http://www.jsfiddle.net/jaredwilli/gyVkB/7/
 * Copyright (c) 2010 jaredwilli
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 */

(function($) {
    $.fn.TipItUp = function(options) {

        var defaults = {
            offset: 10,
            speed: 200,
            delay: 40
        };

        var settings = $.extend( {}, defaults, options );
        
        var $imgTip = $('<div class="tip"></div>').hide().prependTo('body'),
            $win = $(window),
            showTip;

        var tip = {
            title: '',
            href: '',
            position: function(event) {
                var positions = { x: event.pageX, y: event.pageY },
                    dimensions = {
                        x: [
                            $win.width(),
                            $imgTip.outerHeight()
                        ],
                        y: [
                            $win.scrollTop() + $win.height(),
                            $imgTip.outerHeight()
                        ]
                    };
                
                for (var axis in dimensions ) {
                    if (dimensions[axis][0] < dimensions[axis][1] + positions[axis] + settings.offset) {
                        positions[axis] -= dimensions[axis][1] - settings.offset;
                    } else {
                        positions[axis] += settings.offset;
                    }
                }
                
                $imgTip.css({ top: positions.y, left: positions.x });
            }
        };
        
        $(this).delegate('a', 'mouseover mouseout mousemove', function(event) {
            
            var link = this,
                $link = $(this);

            if (event.type == 'mouseover') {
                tip.link = link.href;
                tip.title = link.title;
                
                showTip = setTimeout(function() {
                    $link.data('active', true);
                    tip.position(event);

                    $imgTip.html('<img src="' + tip.link + '" alt="' + tip.title + '" /><br />' + tip.title)
                    	.fadeOut( 'fast' ).fadeIn( settings.speed );
	            // tip.link = link.href;
        	    $link.attr('href', '');
        	    $link.attr('title', '');
                    
                }, settings.delay );
            }

            if (event.type == 'mouseout') {
                link.href = tip.link;
                link.title = tip.title;
                if ($link.data('active')) {
                    $link.removeData('active');
                    $imgTip.hide();
                } else {
                    clearTimeout(showTip);
                }
            }
            
            if (event.type == 'mousemove' && $link.data('active')) {
                tip.position(event);    
            }
        });
    };
})(jQuery);