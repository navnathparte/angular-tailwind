module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      keyframes: {
        bounceUp: {
          '0%': { transform: 'translateY(30px)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(80px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-80px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        bounceUp: 'bounceUp 1s ease infinite alternate',
        fadeInUp: 'fadeInUp 0.9s ease forwards',
        fadeInDown: 'fadeInDown 0.9s ease forwards',
      },
    },
  },
  plugins: [],
};
