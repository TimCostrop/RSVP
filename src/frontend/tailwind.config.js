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
                "sans": ["Montserrat"],
                "regular": ["Montserrat"],
				"garton": ["Garton"],
				"chalkboy": ["Chalkboy"]
            },
            colors: {
				"green": 'var(--text-green)',
				"orange": 'var(--text-orange)'
            },
			backgroundImage: {
				'texture': 'url(/img/Background.png)',
				'header': 'url(/img/header.png)'
			}
        },
    },
    plugins: [],
}

