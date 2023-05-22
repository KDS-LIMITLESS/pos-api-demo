const path = require('path');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './rm-build/server.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'src'),
  },
};
