import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			mono: [
  				'Ubuntu Mono',
  				'sans-serif'
  			]
  		},
  		boxShadow: {
  			bsh53: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
  			bsh64b: 'rgba(17, 17, 26, 0.1) 0px 1px 0px',
  			bsh64t: 'rgba(17, 17, 26, 0.1) 0px -1px 0px',
  			bsh64l: 'rgba(17, 17, 26, 0.1) -1px 0px 0px',
  			bsh64r: 'rgba(17, 17, 26, 0.1) 1px 0px 0px',
  			bsh64tb: 'rgba(17, 17, 26, 0.1) 0px -1px 0px, rgba(17, 17, 26, 0.1) 0px 1px 0px',
  			bsh64lr: 'rgba(17, 17, 26, 0.1) -1px 0px 0px, rgba(17, 17, 26, 0.1) 1px 0px 0px',
  			bsh33: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
  			bsh08: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
  			bsh01: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
  			bsh19: '`rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;`'
  		},
  		screens: {
  			'max-mq-1000': {
  				max: '1000px'
  			},
  			'min-mq-1000': {
  				min: '1000px'
  			},
  			'max-mq-450': {
  				max: '450px'
  			},
  			'min-mq-450': {
  				min: '450px'
  			},
  			'max-mq-800': {
  				min: '800px'
  			},
  			'min-mq-800': {
  				max: '800px'
  			},
  			'max-mq-600': {
  				max: '600px'
  			},
  			'min-mq-600': {
  				min: '600px'
  			}
  		},
  		colors: {
  			mainColor: '#3B5D50',
  			secondColor: '#f7951e',
  			thirdColor: '#f7951e',
  			bgColor: '#f0f2f5',
  			mainLite: '#DCE5E4',
  			mainOrange: '#F9BF29',
  			whiteLite: '#f0f1f6',
  			blackDark: '#181824',
  			navy: '#142c54',
  			B_grey: '#2d333b',
  			greenBlue: '#6f94a9',
  			green: '#33c92d',
  			white: '#ffffff',
  			darkBlue: '#03305D',
  			blue: '#2C4C6E',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
