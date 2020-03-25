import React, {useRef} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import ProTable, {ActionType, TableDropdown} from 'qylc-pro-table';
import request from 'umi-request';

const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    ellipsis: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 200,
    hideInSearch: true,
  },

  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInForm: true,
  },
  {
    title: 'option',
    valueType: 'option',
    render: (text, row, _, action) => [
      <a href={row.html_url} target="_blank" rel="noopener noreferrer">
        查看
      </a>,
      <TableDropdown
        onSelect={() => action.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => {
          const data = await request('http://127.0.0.1:8080/api/sys/postLevel/list', { params });
          return data;
        }}
        rowKey="id"
        dateFormatter="string"
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
    </>
  );
};
