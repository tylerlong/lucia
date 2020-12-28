import React from 'react';
import {Upload} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class Uploader extends React.Component<any, any> {
  render() {
    return <>
      <Upload listType="picture-card" accept="image/*" beforeUpload={()=>false}>
        <div>
          <PlusOutlined />
          <div>Upload</div>
        </div>
      </Upload>
    </>;
  }
}

export default Uploader;
