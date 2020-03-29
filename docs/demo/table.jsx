import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, message, Modal} from 'antd';
import React, {useRef, useState} from 'react';
import {ProTable,  get, post} from 'qylc-antd';



async function queryRule(params) {
    return get('/api/sys/user/list', params)
}

async function removeRule(params) {
    return post('/api/sys/user/delete', params);
}

async function addRule(params) {
    return post('/api/sys/user/add', params)
}

async function updateRule(params) {
    return post('/api/sys/user/edit', params)
}


/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {
    const hide = message.loading('正在添加');

    try {
        await addRule({...fields});
        hide();
        message.success('添加成功');
        return true;
    } catch (error) {
        hide();
        message.error('添加失败请重试！');
        return false;
    }
};
/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async fields => {
    const hide = message.loading('正在配置');

    try {
        await updateRule(fields);
        hide();
        message.success('配置成功');
        return true;
    } catch (error) {
        hide();
        message.error('配置失败请重试！');
        return false;
    }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;

    try {
        let ids = selectedRows.map(row => row.id);
        await removeRule(ids);
        hide();
        message.success('删除成功，即将刷新');
        return true;
    } catch (error) {
        hide();
        message.error('删除失败，请重试');
        return false;
    }
};

const TableList = () => {
    const [createModalVisible, handleModalVisible] = useState(false);
    const [updateModalVisible, handleUpdateModalVisible] = useState(false);
    const [formValues, setFormValues] = useState({});
    const actionRef = useRef();
    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            sorter: true,
            rules: [
                {
                    required: true,
                    message: '规则名称为必填项',
                },
            ],

            
        },
        {
            title: '性别',
            dataIndex: 'sex',
            sorter: true,
            valueEnum:{MALE:'男', FEMALE:'女'}
        },
        {
            title: '等级',
            dataIndex: 'level',
            sorter: true,
        },
        {
            title: '禁用',
            dataIndex: 'disabled',
            valueType: 'boolean'
        },
        {
            title: '图片',
            dataIndex: 'iconUrl',
            valueType: 'image'
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
                <>
                    <a onClick={() => {
                        setFormValues(record);
                        handleUpdateModalVisible(true);
                    }}> 修改 </a>
                    <Divider type="vertical"/>
                    <a onClick={async () => {
                        await handleRemove([record])
                        // action.reload();
                        actionRef.current.reload();
                    }}>删除</a>
                </>
            ),
        },
    ];
    return (
        <>
            <ProTable
                actionRef={actionRef}
                toolBarRender={(action, {selectedRows}) => [
                    <Button type="primary" onClick={() => handleModalVisible(true)}>
                        <PlusOutlined/> 新建
                    </Button>,

                    selectedRows && selectedRows.length > 0 && (
                        <Button onClick={async () => {
                            await handleRemove(selectedRows);
                            action.reload();
                        }}> 批量删除 </Button>
                    ),
                ]}
                request={params => queryRule(params)}
                columns={columns}
                rowSelection={{}}
            />


            <Modal
                maskClosable={false}
                destroyOnClose
                title="添加规则"
                visible={createModalVisible}
                onCancel={() => handleModalVisible(false)}
                footer={null}
            >
                <ProTable
                    onSubmit={async value => {
                        const success = await handleAdd(value);

                        if (success) {
                            handleModalVisible(false);
                            actionRef.current.reload();
                        }
                    }}
                    type="form"
                    columns={columns}
                    rowSelection={{}}
                />
            </Modal>


            <Modal
                maskClosable={false}
                destroyOnClose
                title="修改规则"
                visible={updateModalVisible}
                onCancel={() => handleUpdateModalVisible(false)}
                footer={null}
            >
                <ProTable
                    onSubmit={async value => {
                        const success = await handleUpdate({...formValues, ...value});
                        if (success) {
                            handleUpdateModalVisible(false);
                            actionRef.current.reload();
                        }
                    }}
                    form={{initialValues: formValues}}
                    type="form"
                    columns={columns}
                    rowSelection={{}}
                />
            </Modal>
        </>
    );
};

export default TableList;
