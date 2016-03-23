import {
  curry,
  get
} from 'lodash';

export default node => curry(get, 2)(node);
