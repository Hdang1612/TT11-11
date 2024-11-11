/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Đảm bảo rằng Tailwind CSS sẽ áp dụng cho tất cả các file trong thư mục src
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Sử dụng Poppins làm font mặc định
      },
    },
  },
  plugins: [],
}

