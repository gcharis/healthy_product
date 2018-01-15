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

	return;
});
