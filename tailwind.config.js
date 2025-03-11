const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#F7F7F7',   // Very Light Gray for background/containers
          200: '#6E6E6E',   // Dark Gray for summary text
          300: '#333333',   // Very Dark Gray for H1 (Main Headings)
          400: '#444444',   // Dark Gray for H2 (Sub Headings)
          500: '#555555',   // Medium Dark Gray for H3 (Lesser Headings)
          600: '#666666',   // Medium Gray for H4 (Subtle Headings)
          700: '#4A4A4A',   // Medium Dark Gray for Body Text
          800: '#2C2C2C',   // Charcoal Gray for container text
        },
      },
      screens: {
        'xs': '480px', // For screens 480px and up
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
});
