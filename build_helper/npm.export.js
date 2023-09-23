if (process.env.NODE_ENV === 'production') {
  module.exports = require('./eigen.node.min.js')
} else {
  module.exports = require('./eigen.node.js')
}
