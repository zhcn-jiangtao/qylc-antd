import React from 'react';
import ProTable from 'qylc-pro-table';


const TableList = () => {
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

export default TableList;
