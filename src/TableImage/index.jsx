import React from "react";
import {Modal} from 'antd';


class TableImage extends React.Component {
    state = {
        imageList: [],
        visible: false,
        imgUrl: '',
        transform: 0,
    };

    imgModal = null;

    componentDidMount() {
        this.parseImageList(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.parseImageList(newProps)
    }

    parseImageList = (props) => {
        const {value} = props;
        if (value && value instanceof Array) {
            this.setState({imageList: value})
        } else if (typeof value === "string") {
            this.setState({imageList: value.split(",")})
        }
    }


    handleOk = () => {
        const {transform} = this.state;
        this.setState({
            transform: transform + 90,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    viewImage(url) {
        this.setState({
            visible: true,
            imgUrl: url,
        });
    }


    render() {
        const {imageList} = this.state;
        return (
            <>
                {imageList.map((url, index) => {
                    return <span href="#" key={`image${index}`} onClick={() => this.viewImage(url)}>
          <img src={url} alt="" style={{
              width: '35px',
              height: '35px',
              borderRadius: '5%',
              marginLeft: '10px'
          }}/></span>
                })}

                <Modal
                    title="图片查看"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onRef={ref => this.imgModal = ref}
                    onCancel={this.handleCancel}
                    centered
                    width={800}
                    style={{textAlign: 'center'}}
                    cancelText='关 闭'
                    okText='旋 转'
                >
                    <div>
                        <img src={this.state.imgUrl} alt="" style={{
                            transform: `rotate(${this.state.transform}deg)`,
                            maxWidth: '600px',
                            height: '600px',
                            borderRadius: '1%',
                            marginLeft: '10px'
                        }}/>
                    </div>
                </Modal>

            </>
        );
    }
}

export default TableImage
