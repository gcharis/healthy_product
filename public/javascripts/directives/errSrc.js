app.directive('errSrc', function() {
	return {
		link: function(scope, element, attrs) {
			element.bind('error', function() {
				if (attrs.src !== attrs.errSrc) attrs.$set('src', attrs.errSrc);
			});
			attrs.$observe('ngSrc', function(value) {
				if (!value && !!attrs.errSrc) attrs.$set('src', attrs.errSrc);
			});
			attrs.$observe('errSrc', function(value) {
				if (!!value && !attrs.ngSrc) attrs.$set('src', attrs.errSrc);
			});
		}
	};
});
