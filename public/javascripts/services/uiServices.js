app.service('$uiHandler', function() {
	return {
		hideModalById(modalId) {
			const modal = document.getElementById(modalId);
			modal.classList.remove('show');
			modal.setAttribute('style', 'display:none;');
			modal.setAttribute('aria-hidden', 'true');

			document.body.removeChild(document.getElementsByClassName('modal-backdrop fade show')[0]);
		}
	};
});
