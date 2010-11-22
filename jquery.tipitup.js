/**
 * Name: TipItUp v1.0 - Tipping it up...
 * Author: Jared Williams - http://new2wp.com
 * URI: http://new2jquery.com/plugins/tipitup-jquery-image-tooltip
 * Copyright (c) 2010 jaredwilli
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($) {
	$.fn.TipItUp = function(options) {

		var defaults = {
			speed: 200,
			fadeIn: 0,
			fadeOut: 0,
			follow: true,
			offset: {
				offSetY: -10,
				offSetX: 1
			},
			style: {
				/* Example styles
				border: "1px solid gray",
				background: "#edeef0",
				color: "#000",
				padding: "10px",
				zIndex: "1000",
				textAlign: "left"
				*/				
			},
			className: null,
			delay: 40,
			timeout: 0
		};

		var options = $.extend( {}, defaults, options );
		
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
					if ( !follow || (( dimensions[axis][0] < dimensions[axis][1] + positions[axis] + options.offsetX) {
						positions[axis] -= dimensions[axis][1] + options.offset.offSetY;
					} else {
						positions[axis] += options.offsetX;
					}
				}
				
				$imgTip.css({ top: positions.y, left: positions.x, width: '200px', height: '200px', position: 'absolute' });
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

					$imgTip.html('<img src="' + tip.link + '" alt="' + tip.title + '" />')
						.fadeOut(options.fadeOut).fadeIn( options.fadeIn );
				}, options.delay );
			}

			if (event.type == 'mouseout') {
				link.href = tip.href || link.href;
				link.title = tip.title || link.title;				
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


$(function() {
	$('.mini-thumbs').TipItUp();
});
