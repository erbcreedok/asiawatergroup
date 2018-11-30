$(document).ready(function() {
	if ($('#sitepage').val() !== 'index' ) return;
	var navItems = $('.navbar .nav-item');
	var headerHeight = $('header').innerHeight();

	$('.navbar .nav-link').bind('click', function(e) {
		var id = $(this).attr('href');
		try {
			var elementOffset = document.querySelector(id).offsetTop;
			e.preventDefault();
			$('html, body').animate({
				scrollTop: elementOffset - headerHeight
			}, '1000');
		} catch (DOMException) {
			console.log('Ignoring selector');
		}

	});
	var checkWaypoint = function( waypoint ) {
		var hash = '';
		if (!waypoint.element.dataset.waypoint) {
			hash = $(waypoint.element).attr('id');
		} else {
			hash = waypoint.element.dataset.waypoint;
		}
		if (hash === '') return;
		var noOne = true;
		$.each(navItems, function(i) {
			var b = $(this).children('a').attr('href').slice(1) === hash;
			$(this).toggleClass('active', b);
			if (b && i!==0) {
				noOne = false;
			}
		});
		$(navItems[0]).toggleClass('active', noOne);
	};

	var sections = $('section');

	sections.waypoint(function(direction) {
		if (direction === 'up') {
			checkWaypoint(this);
		}
	}, { offset: headerHeight-2 });

	sections.waypoint(function(direction) {
		if (direction === 'down') {
			checkWaypoint(this);
		}
	}, { offset: headerHeight+2 });
});