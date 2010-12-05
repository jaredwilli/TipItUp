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
			title: '',
			removeHref: true,
			removeTitle: true,
			offset: 10,
			offsety: 10,
			offsetx: 2,
			fadeIn: 200,
			fadeOut: 200,
			delay: 10,
			style: {
				backgroundColor: '#CCC',
				border: '1px solid #999',
				color: '#333',
				padding: '10px'
			}
		};

		var settings = $.extend( {}, defaults, options );					
		
		var $imgTip = $('<div class="tip"></div>').hide().prependTo('body'),
			$win = $(window),
			showTip;

		var tip = {
			href: '',
			title: settings.title,
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
				$imgTip.css({ 
					top: positions.y + settings.offsety, 
					left: positions.x + settings.offsetx,
					'position': 'absolute', 'zIndex': 1000
				});
				$imgTip.css( settings.style );
			}
		};
		
		/* Create the tooltip and it's events */
		$(this).delegate('a', 'mouseover mouseout mousemove', function(event) {
			
			var link = this,
				$link = $(this);

			/* If MouseOver */
			if (event.type == 'mouseover') {
				// set the href and title attributes
				tip.link = link.href;
				
				// If settings.title is not set use the link title if it exists
				if (settings.title == '') {
					tip.title = link.title;
				} else {
					tip.title = settings.title;
				}
				
				/* Show the tooltip */
				showTip = setTimeout(function() {
					$link.data('active', true);
					tip.position(event);

					$imgTip.html('<img src="' + tip.link + '" alt="' + tip.title + '" /><br />' + tip.title).fadeOut( settings.fadeOut ).fadeIn( settings.fadeIn );
	
					/**
					 * Make the href and title of the link blank if set to true
					 * in settings.removeHref and settings.removeTitle
					 */
					if (settings.removeHref) {
						$link.attr('href', '');
					}
					if (settings.removeTitle) {
						$link.attr('title', '');
					}

				}, settings.delay );
			} // end MouseOver

			/* If MouseOut */
			if (event.type == 'mouseout') {
				/**
				 * If the href and title were removed
				 * add them back to the link
				 */
				if (settings.removeHref) {
					link.href = tip.link;
				}
				if (settings.removeTitle) {
					link.title = tip.title;
				}
				
				if ($link.data('active')) {
					$link.removeData('active');
					$imgTip.hide();
				} else {
					clearTimeout(showTip);
				}
			} // end MouseOut
			
			/* If MouseOver */
			if (event.type == 'mousemove' && $link.data('active')) {
				tip.position(event);	
			} // end MouseOver
			
		});
	};
})(jQuery);