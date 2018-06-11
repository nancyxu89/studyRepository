const path = require("path")
const webpack = require("webpack")

var verdors = [
  "vue/dist/vue.esm.js",
  "vuex",
  "vue-router",
  "echarts"
]

module.exports = {
  entry: {
    vendor: verdors
  },
  output: {
    path: path.join(__dirname, "../static/js"),
    filename: "[name].dll.js",
    library: "[name]_library"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', "[name]-manifest.json"),
      name: "[name]_library",
      context: __dirname
    })
  ]
}
