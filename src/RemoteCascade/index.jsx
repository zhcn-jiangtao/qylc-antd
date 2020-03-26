import {message, TreeSelect, Cascader} from 'antd';

import React from "react";
import config from "../config";

/**
 * props : url
 */
class Index extends React.Component {


  state = {
    data: [],
    value: [],
    fetching: false,
    key: this.props.id,
  };

  componentDidMount() {
    // 下载默认值的label
    this.fetchUser();
  }

  fetchUser = () => {
    const {url} = this.props;
    console.log(url)
    this.setState({fetching: true});
    let request = config.getRequest();
    request.get(url).then(rs => {
      if (rs.error) {
        message.error(rs.msg);
        this.setState({fetching: false});
        return;
      }
      let list = rs;

      if (!(list instanceof Array)) {
        message.error('返回结果应该为数组');
        this.setState({fetching: false});
        return;
      }
      this.setState({data: list, fetching: false});
    })
  };

  render() {
    const {data} = this.state;
    return (
      <Cascader
        style={{ width: '100%' }}
        allowClear={true}
        options={data}
        placeholder="请选择"
        {...this.props}
      />
    );
  }
}

export default Index
