( function( $ ) {
	"use strict";

	// Modified Isotope methods for gutters in masonry
$.Isotope.prototype._getMasonryGutterColumns = function() {
	var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
	var containerWidth = this.element.width();
 
	this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
	// Or use the size of the first item
	this.$filteredAtoms.outerWidth(true) ||
	// If there's no items, use size of container
	containerWidth;
 
	this.masonry.columnWidth += gutter;
 
	this.masonry.cols = Math.floor((containerWidth + gutter) / this.masonry.columnWidth);
	this.masonry.cols = Math.max(this.masonry.cols, 1);
};
 
$.Isotope.prototype._masonryReset = function() {
	// Layout-specific props
	this.masonry = {};
	// FIXME shouldn't have to call this again
	this._getMasonryGutterColumns();
	var i = this.masonry.cols;
	this.masonry.colYs = [];
	while (i--) {
		this.masonry.colYs.push(0);
	}
};
 
$.Isotope.prototype._masonryResizeChanged = function() {
	var prevSegments = this.masonry.cols;
	// Update cols/rows
	this._getMasonryGutterColumns();
	// Return if updated cols/rows is not equal to previous
	return (this.masonry.cols !== prevSegments);
};

	$(document).ready(function(){
		var $container = $('.wc-shortcodes-posts');
		var columnWidth = 0;
		var gutterWidth = 0;

		var calculateGrid = function() {
			var columns = parseInt( $container.data('postsGridColumns') );
			var containerWidth = $container.width();
			var marginBottom = 0;

			if ( containerWidth < 568 ) { columns = 1; }
			else if ( containerWidth < 768 ) { columns = 2; }
			else if ( containerWidth < 991 ) { columns = 3; }

			gutterWidth = Math.floor( containerWidth * .02 );

			var allGutters = gutterWidth * ( columns - 1 );
			var contentWidth = containerWidth - allGutters;

			columnWidth = Math.floor( contentWidth / columns );

			marginBottom = gutterWidth;
			if ( 1 == columns ) {
				marginBottom = 20;
			}
			$container.children('.wc-shortcodes-post-box').css({'width':columnWidth+'px', 'marginBottom':marginBottom+'px'});
		}

		calculateGrid();


		$container.isotope({
			itemSelector : '.wc-shortcodes-post-box',
			resizable: false,
			masonry: {
				columnWidth: columnWidth,
				gutterWidth: gutterWidth
			}
		});
		$(window).smartresize(function(){
			calculateGrid();
			$container.isotope({
				masonry: {
					columnWidth: columnWidth,
					gutterWidth: gutterWidth
				}
			});
		});
	});
} )( jQuery );
