const path = require('path');

module.exports = function override(config, env) {
    if (env === 'development') {
      config.devtool = 'source-map';
    }
    return config;
  };



module.exports = function override(config, env) {
  // find HtmlWebpackPlugin and change the template location
  const HtmlWebpackPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin'
  );
  if (HtmlWebpackPlugin) {
    HtmlWebpackPlugin.options.template = path.resolve(
      __dirname,
      'client/public/index.html'
    );
  }

  return config;
};
