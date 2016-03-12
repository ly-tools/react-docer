'use strict';

require('should');
const fs = require('fs');
const docer = require('../index');
const path = require('path');

describe('react-docer', () => {
  it('should work', () => {
    const content = fs.readFileSync(path.join(__dirname, 'es6.jsx')).toString();
    fs.writeFileSync(path.join(__dirname, 'es6.json'), JSON.stringify(docer.parse(content), null, 2));
  });
});
