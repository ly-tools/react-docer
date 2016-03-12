'use strict';

module.exports = str => str.replace(/\*\s+/g, '').split('\n').map(v => v.trim()).join('\n').trim();
