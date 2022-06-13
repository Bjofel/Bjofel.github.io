module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [ "light",
      {
        mytheme: {
        
"primary": "#6E85B2",
        
"secondary": "#DFF6FF",
        
"accent": "#5C527F",
        
"neutral": "#DFF6FF",
        
"base-100": "#1A374D",
        
"info": "#3ABFF8",
        
"success": "#36D399",
        
"warning": "#FBBD23",
        
"error": "#F87272",
        },
      },
    ],
  },
}
