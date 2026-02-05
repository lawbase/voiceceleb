/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    900: '#0a0e17',
                    800: '#111625',
                    700: '#1a2035',
                },
                accent: {
                    blue: '#3b82f6',
                    violet: '#8b5cf6',
                    cyan: '#06b6d4',
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'], // Adjusted for Next.js fonts
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'bounce-slow': 'bounce 3s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
};
