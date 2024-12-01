import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontSize: {
				clamp20: 'clamp(12px, 2vw, 20px)', // 최소 10px, 최대 20px
				clamp25: 'clamp(13px, 4vw, 25px)', // 최소 20px, 최대 25px
				clamp30: 'clamp(15px, 4vw, 30px)', // 최소 25px, 최대 30px
				clamp50: 'clamp(18px, 4vw, 50px)', // 최소 30px, 최대 50px
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: false, // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root', // The element that receives theme color CSS variables
	},
};
