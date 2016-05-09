import 'babel-polyfill';
import fs from 'fs';
import docer from '../lib/parse';
import path from 'path';

describe('react-docer', () => {
  it('Class should work', () => {
    docer(fs.readFileSync(path.join(__dirname, 'normal', 'normal.jsx'), 'utf-8')).should.be.eql(require(path.join(__dirname, 'normal', 'normal.json')));
  });
  it('Class with static properties should work', () => {
    docer(fs.readFileSync(path.join(__dirname, 'static', 'static.jsx'), 'utf-8')).should.be.eql(require(path.join(__dirname, 'static', 'static.json')));
  });
  it('Class with static properties should work', () => {
    docer(fs.readFileSync(path.join(__dirname, 'sample', 'sample.jsx'), 'utf-8')).should.be.eql(require(path.join(__dirname, 'sample', 'sample.json')));
  });
});
