/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/primereact/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			fontFamily: {
				"sans": ["Merriweather"],
				"regular": ["Merriweather"],
				"garton": ["Garton"],
				// "milkshake": [""]
			},
			colors: {
				"green": 'var(--text-green)',
				"orange": 'var(--text-orange)',
				"red": 'var(--text-red)'
			},
			backgroundImage: {
				'texture': 'url(/img/Background.png)',
				'header': 'url(/img/header.png)'
			}
		},
	},
	plugins: [],
}

