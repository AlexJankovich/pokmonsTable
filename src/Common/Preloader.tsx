import Spin from "antd/lib/spin";
import React from "react";
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize:'25vw'}} spin />;
export const Preloader = () => {
    return <div style={{
        width: '25vw',
        height: '25vh',
        position:'absolute',
        margin: 'auto',
        left:'0',
        top: '0',
        right: '0',
        bottom: '0'
    }}><Spin indicator={antIcon} /></div>
}