const path = require("path");
const bodyParser = require("body-parser");
const port = 8001;
const title = "项目实践";

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/call",
  devServer: {
    port,
    open: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://192.168.31.215:8001/`,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    },
    before: app => {
      app.use(bodyParser.json());
      app.use(
        bodyParser.urlencoded({
          extended: true
        })
      );

      app.post("/api/user/login", (req, res) => {
        const { username } = req.body;

        if (username === "admin" || username === "jerry") {
          res.json({
            code: 1,
            data: username
          });
        } else {
          res.json({
            code: 10204,
            message: "用户名或密码错误"
          });
        }
      });

      app.get("/api/user/info", (req, res) => {
        const roles = req.headers["token"] === "admin" ? ["admin"] : ["editor"];
        res.json({
          code: 1,
          data: roles
        });
      });
    }
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
