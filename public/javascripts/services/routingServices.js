app.service('$hpLocation', function($location) {
	return {
		replaceWith(path) {
			$location.path(path).replace();
		}
	};
});
