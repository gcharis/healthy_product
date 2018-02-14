module.exports = {
	apps: [
		{
			name: 'myapp',
			script: './server.js',
			watch: true,
			env: {
				SECRET_KEY: 'super-secret',
				PORT: 4000,
				REGISTER_KEY: 'super-secret-register',
				CAPTCHA_KEY: '6LceaEYUAAAAAEYCEAq6H9kWPh6dN0Ui5kjsBh-s'
			}
		}
	]
};
