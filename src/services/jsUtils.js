import app from 'angularApp';

app.service('$jsUtils', function() {
	Object.defineProperties(Array.prototype, {
		includesElem: {
			enumerable: true,
			writable: true,
			value: function(callback) {
				for (let i = 0; i < this.length; i++) {
					if (callback.apply(this, [ this[i], i ])) return true;
				}
				return false;
			}
		}
	});

	return {
		resizeImage(image) {
			const img = document.createElement('img');
			img.src = image;

			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			const maxWidth = 800;
			const maxHeight = 800;

			if (img.width > img.height) {
				if (img.width > maxWidth) {
					img.height *= maxWidth / img.width;
					img.width = maxWidth;
				}
			} else {
				if (img.height > maxHeight) {
					img.width *= maxHeight / img.height;
					img.height = maxHeight;
				}
			}

			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0, img.width, img.height);

			return canvas.toDataURL('image/jpeg', 0.6);
		}
	};
});
