import app from 'angularApp';

app.directive('uiMessage', function($timeout) {
	return {
		restrict: 'EA',
		transclude: true,
		scope: {
			message: '=',
			dur: '='
		},
		link: function(scope, element, attrs, controller, transcludeFn) {
			scope.$watch('message', function(newValue, oldValue) {
				if (!newValue) return;
				element[0].innerHTML = newValue;
				scope.dur = parseInt(scope.dur);
				$timeout(() => {
					scope.message = '';
					element[0].innerHTML = '';
				}, scope.dur);
			});
		}
	};
});
