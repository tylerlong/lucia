import './index.css'

import ReactDOM from 'react-dom';
import React from 'react';

import Uploader from './uploader';

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<Uploader />, container);
