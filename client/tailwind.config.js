export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#62A6BF',
        secondary: '#49EB8C',
        accent: '#65E67F',
        footerBg: '#1E1E1E', // Dark footer background
        footerText: '#B0B0B0', // Light gray footer text
      },
    },
  },
  plugins: [],
}