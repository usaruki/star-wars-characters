module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = "Star Wars Characters Records";
      return args;
    })
  }
};