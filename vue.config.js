const path = require("path");
const port = 8001;
const title = "项目实践";

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/call",
  devServer: {
    port,
    open: true
  },
  configureWebpack: {
    name: title
  },
  chainWebpack(config) {
    // svg规则配置一下，排除icons目录
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    // 新增icons规则， 设置 svg-sprite-loader
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" }) // 将来使用图标名称
      .end();
  }
};
