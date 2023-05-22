const path = require('path');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './pos-build/server.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'src'),
  },
};
