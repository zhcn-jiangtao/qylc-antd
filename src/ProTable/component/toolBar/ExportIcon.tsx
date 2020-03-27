import React from 'react';
import {Menu, Dropdown} from 'antd';
import {DownloadOutlined} from "@ant-design/icons";

// @ts-ignore
const ExportIcon = (props) => {

    const menu = (
        <Menu onClick={e => props.onClick(e.key)}>
            <Menu.Item key="table"> 导出当前 </Menu.Item>
            <Menu.Item key="all"> 导出所有 </Menu.Item>
        </Menu>
    );


    return <Dropdown overlay={menu}>
        <DownloadOutlined/>
    </Dropdown>;
};

export default ExportIcon;
