import { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    colors: {
      ...require("tailwindcss/colors"),
      primary_color: "#fffff5",
      secondary_color: "#78dcca",
      tertiary_color: "#c9fbac",
      // background_color: "#ecebff",
      silver_color_field: "#ecebff",
      text_color: "",
      button_border_color: "",
      button_bg_color: "#50b33d",
      button_text_color: "",
      border_color: " #8ce57a",
      //border_color: "#f70029",
      // #f70029
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
