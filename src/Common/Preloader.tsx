import Spin from "antd/lib/spin";
import React from "react";
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize:'25vw'}} spin />;
export const Preloader = () => {
    return <div style={{
        position:'absolute',
        left:'37vw',
        top: '40vh'
    }}><Spin indicator={antIcon} /></div>
}