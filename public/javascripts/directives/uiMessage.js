app.directive('uiMessage', function($timeout) {
	return {
		restrict: 'EA',
		transclude: true,
		scope: {
			message: '='
		},
		link: function(scope, element, attrs, controller, transcludeFn) {
			scope.$watch('message', function(newValue, oldValue) {
				if (!newValue) return;
				element[0].innerHTML = newValue;
				$timeout(() => {
					scope.message = '';
					element[0].innerHTML = '';
				}, 2500);
			});
		}
	};
});
