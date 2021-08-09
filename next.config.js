const nodeExternals = require('webpack-node-externals')

module.exports = {
  webpack5: false,

  externals: [nodeExternals()],

  webpack: (config) => {
    config.node = {
      fs: 'empty',
      child_process: 'empty',
      net: 'empty',
      dns: 'empty',
      tls: 'empty',
    }
    return config
  },
}
