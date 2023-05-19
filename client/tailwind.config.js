/** @type {import('tailwindcss').Config} */
module.exports = {
   purge: ['./src/**/*.{html,js,tsx,jsx}'],
   theme: {
      extend: {}
   },
   plugins: [],
   corePlugins: {
      preflight: false
   },
   prefix: 'tw-'
};
