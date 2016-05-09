# react-docer

[![Test coverage](https://img.shields.io/coveralls/ly-tools/react-docer.svg?style=flat-square)](https://coveralls.io/r/ly-tools/react-docer?branch=master)
[![Build Status](https://travis-ci.org/ly-tools/react-docer.png)](https://travis-ci.org/ly-tools/react-docer)
[![Dependency Status](https://david-dm.org/ly-tools/react-docer.svg)](https://david-dm.org/ly-tools/react-docer)
[![devDependency Status](https://david-dm.org/ly-tools/react-docer/dev-status.svg)](https://david-dm.org/ly-tools/react-docer#info=devDependencies)
[![NPM version](http://img.shields.io/npm/v/react-docer.svg?style=flat-square)](http://npmjs.org/package/react-docer)
[![node](https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square)](http://nodejs.org/download/)
[![License](http://img.shields.io/npm/l/react-docer.svg?style=flat-square)](LICENSE)
[![npm download](https://img.shields.io/npm/dm/react-docer.svg?style=flat-square)](https://npmjs.org/package/react-docer)

A tool to parse doc from jsx source file

## Installation

```bash
$ npm install --save react-docer
```

## Usage

```js
const docer = require('react-docer');
docer(content);
```

```js
const React = require('react');
import babel from 'babel';
/**
 * class description
 */
class Component extends React.Component {
  /**
   * static prop description
   */
  static someProps = 'qwerty'
  /**
   * constructor description
   */
  constructor() {
    super();
  }
  /**
   * get value
   */
  getValue() {}
  /**
   * set value
   */
  setValue(value) {}
  /**
   * render description
   */
  render() {
    return (
      <div></div>
    );
  }
}

Component.propTypes = {
  /**
   * Description of someProp.
   */
  someProp: React.PropTypes.string
};
Component.displayName = 'Component';
Component.defaultProps = {
  someProp: ''
};
```

Then the result will be:

```json
{
  "dependencies": [
    "react",
    "babel"
  ],
  "classes": [
    {
      "name": "Component",
      "superClass": "React.Component",
      "description": "class description",
      "methods": [
        {
          "description": "constructor description",
          "name": "constructor",
          "params": []
        },
        {
          "description": "get value",
          "name": "getValue",
          "params": []
        },
        {
          "description": "set value",
          "name": "setValue",
          "params": [
            "value"
          ]
        },
        {
          "description": "render description",
          "name": "render",
          "params": []
        }
      ],
      "properties": [
        {
          "description": "static prop description",
          "name": "someProps",
          "value": "'qwerty'",
          "static": true
        }
      ],
      "propTypes": [
        {
          "name": "someProp",
          "required": false,
          "type": {
            "name": "string"
          },
          "description": "Description of someProp.",
          "defaultValue": "''"
        }
      ],
      "displayName": "Component"
    }
  ]
}
```

## Test

```bash
$ npm run test # running unit tests
$ npm run dev # watching files change and building automaticly
```

## License

The MIT License (MIT)

Copyright (c) 2015 ly-tools

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
