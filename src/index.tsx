import './index.css'

import ReactDOM from 'react-dom';
import React from 'react';
import {Button} from 'antd';

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<Button type="primary">Hello world</Button>, container);
