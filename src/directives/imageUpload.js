import app from 'angularApp';

app.directive('imageUpload', function() {
	return {
		restrict: 'EA',
		transclude: true,
		scope: {
			images: '='
		},
		link: function(scope, element, attrs, controller, transcludeFn) {
			scope.images = [];
			element.bind('change', function() {
				let file = element[0].files[0];
				let fileReader = new FileReader();

				if (file) fileReader.readAsDataURL(file);

				fileReader.addEventListener(
					'load',
					() => {
						if (scope.images.length < 5) scope.$apply(() => scope.images.push(fileReader.result));
						element[0].value = '';
					},
					false
				);
			});
		}
	};
});
