'use strict';

const _ = require('lodash');

module.exports = node => _.curry(_.get, 2)(node);
