import React from 'react';
import {ProTable} from 'qylc-antd';


const TableFormDemo = () => {
    const columns = [
        {
            title: '规则名称',
            dataIndex: 'name',
            sorter: true
        }
    ];
    return (
        <ProTable
            type="form"
            columns={columns}
            rowSelection={{}}
        />
    );
};

export default TableFormDemo;
