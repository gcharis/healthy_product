import app from 'angularApp';

app.service('$uiHandler', function () {
	return {
		openModalById(modalId) {
			const modal = document.getElementById(modalId);
			modal.classList.add('show');
			modal.setAttribute('style', 'display:block;');
			modal.removeAttribute('aria-hidden');

			document.body.classList.add('modal-open');

			const backdrop = document.createElement('div');
			backdrop.classList.add('modal-backdrop');
			backdrop.classList.add('fade');
			backdrop.classList.add('show');
			document.body.appendChild(backdrop);
		},
		hideModalById(modalId) {
			const modal = document.getElementById(modalId);
			modal.classList.remove('show');
			modal.setAttribute('style', 'display:none;');
			modal.setAttribute('aria-hidden', 'true');

			document.body.classList.remove('modal-open');

			const backdrop = document.getElementsByClassName('modal-backdrop fade show')[0];

			backdrop.classList.remove('show');
			document.body.removeChild(backdrop);
		}
	};
});
