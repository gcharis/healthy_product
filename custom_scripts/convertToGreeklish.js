module.exports = function toGreeklish() {
	return this.split('')
		.map((letter) => {
			letter = letter.toLowerCase();
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
				case ' ':
					return '-';
				default:
					return letter;
			}
		})
		.join('');
};
