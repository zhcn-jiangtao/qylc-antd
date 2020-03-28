import {Upload, Modal} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';

import React, {Component} from "react";

import config from "../config";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class UploadImage extends Component {

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };

    componentDidMount() {
        console.log('UploadImage init')
        // 初始值
        if (this.props.value && this.props.value.length > 0) {
            const list = [];
            let {value} = this.props;
            if (value instanceof Array) {
            } else {
                value = value.split(',');
            }
            value.forEach((f, index) => {
                const file = {};
                file.url = f;
                file.uid = index;
                file.name = 'image.png';
                file.status = 'done';
                list.push(file);
            })
            this.setState({fileList: list});
        }
    }


    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({fileList}) => {
        this.setState({fileList});
        console.log(this.props)
        if (this.props.onChange) {
            const file = [];
            fileList.forEach(f => {
                if (f.status === 'done' && f.url) {
                    file.push(f.url)
                }
                if (f.status === 'done' && f.response && f.response.code == 0) {
                    file.push(f.response.url)
                }
            })
            const fileValue = file.join(",");
            this.props.onChange(fileValue)
        }
    }

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <PlusCircleOutlined/>
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action={config.getRemoteUploadUrl()}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    headers={{'Authorization': config.getAuthorization()}}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}

export default UploadImage
