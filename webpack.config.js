const path = require('path');

module.exports = {
  entry: './src/popup.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};