const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    plugins: [new MiniCssExtractPlugin({filename: "main.css"})],
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "public")
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
		        test: /\.css$/i,
		        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            }
        ]
    },
    devServer: {
	    static: path.resolve(__dirname, "public"),
	    compress: true,
	    port: 3000,
	    historyApiFallback: true
  	},
    devtool: "source-map"
};
