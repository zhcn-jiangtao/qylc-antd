import {message, TreeSelect} from 'antd';

import React from "react";
import {post, get} from '../utils/request'
/**
 * props : url
 */
class Index extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);
  }
  state = {
    data: [],
    value: [],
    fetching: false,
    key: this.props.id,
  };

  componentDidMount() {
    // 下载默认值的label
    this.fetchData();
  }

  fetchData = () => {
    const {url} = this.props;
    this.setState({fetching: true});


    get(url).then(rs => {
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
      <TreeSelect
        style={{ width: '100%' }}
        allowClear={true}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={data}
        placeholder="请选择"
        treeDefaultExpandAll={false}
        {...this.props}
      />
    );
  }
}

export default Index
