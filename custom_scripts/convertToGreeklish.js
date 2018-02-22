module.exports = function toGreeklish() {
	const goodDigits = 'abcdefghijklmnopqrstuvwxyz123456789'.split('');
	return this.split('')
		.map((letter) => {
			letter = letter.toLowerCase();
			if (goodDigits.includes(letter)) return letter;
			switch (letter) {
				case 'α':
					return 'a';
				case 'ά':
					return 'a';
				case 'β':
					return 'v';
				case 'γ':
					return 'g';
				case 'δ':
					return 'd';
				case 'ε':
					return 'e';
				case 'έ':
					return 'e';
				case 'ζ':
					return 'z';
				case 'η':
					return 'i';
				case 'ή':
					return 'i';
				case 'θ':
					return 'th';
				case 'ι':
					return 'i';
				case 'ί':
					return 'i';
				case 'ϊ':
					return 'i';
				case 'κ':
					return 'k';
				case 'λ':
					return 'l';
				case 'μ':
					return 'm';
				case 'ν':
					return 'n';
				case 'ξ':
					return 'ks';
				case 'ο':
					return 'o';
				case 'ό':
					return 'o';
				case 'π':
					return 'p';
				case 'ρ':
					return 'r';
				case 'σ':
					return 's';
				case 'ς':
					return 's';
				case 'τ':
					return 't';
				case 'υ':
					return 'y';
				case 'ύ':
					return 'y';
				case 'φ':
					return 'f';
				case 'χ':
					return 'ch';
				case 'ψ':
					return 'ps';
				case 'ω':
					return 'w';
				case 'ώ':
					return 'w';
				case '0':
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
					return letter;
				default:
					return '-';
			}
		})
		.join('');
};
