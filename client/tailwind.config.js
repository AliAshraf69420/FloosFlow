export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        "ff-bg-light": "#FFFFFF",
        "ff-bg-dark": "#1E1E1E",
        "ff-input": "#2A2A2A",        
        "ff-input-hover": "#333333",
         "ff-accent": "#49EB8C",  
      },
      backgroundImage: {
        "ff-gradient":
          "linear-gradient(to right, #62A6BF, #49EB8C, #65E67F)",
      },
    },
  },
  plugins: [],
};