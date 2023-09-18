/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#ffb238",
                    "primary-content": "#ffffff",
                    "secondary": "#ff773d",
                    "secondary-content": "#ffffff",
                    "accent": "#a4ed8e",
                    "neutral": "#777472",
                    "base-100": "#ffffff",
                    "base-200": "#F2F1F0",
                    "info": "#5fc6ff",
                    "success": "#B1E052",
                    "warning": "#ffe74c",
                    "error": "#e8425a",
                },
            },
        ],
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("daisyui")
    ],
}
