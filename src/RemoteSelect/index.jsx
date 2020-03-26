import {Select, Spin, message, Divider} from 'antd';
import {VerticalAlignBottomOutlined} from '@ant-design/icons'
import React from "react";

const {Option} = Select;
import config from "../config";



/**
 * props : url
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.state = {
      url: props.url,
      data: [],
      value: [],
      fetching: false,
      pageNumber: 1,
      last: false,
      searchText: null,
    };
  }

  componentDidMount() {
    // 下载默认值的label
    if (this.props.value && this.props.value.length > 0) {
      this.fetchData({loadMore: false, selected: this.props.value})
    } else {
      this.fetchData({loadMore: false});
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.url !== this.props.url){
      this.setState({url: nextProps.url},()=>{
        this.fetchData({loadMore: false});
      })
    }
  }

  handleSearch = searchText => {
    this.setState({searchText, pageNumber: 1})
    this.fetchData({loadMore: false, searchText: searchText});
  }

  fetchData = ({loadMore, selected, searchText}) => {
    const {url} = this.state;
    let {pageNumber} = this.state;
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({fetching: true});

    if (loadMore) {
      pageNumber = pageNumber + 1;
      this.setState({pageNumber})
    }
    const request = config.getRequest();

    request.get(url, {params: {searchText, selected: selected, pageNumber: pageNumber}}).then(rs => {
      if (fetchId !== this.lastFetchId) {
        // for fetch callback order
        return;
      }
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

      function contains(list,item) {
        var arr = list.filter(t=>t.value == item.value)
        return arr != null && arr.length > 0;
      }

      let data = [];
      if (loadMore) {
        let newData = list.filter(item=>!contains(this.state.data, item))
        data = this.state.data.concat(newData)
      } else {
        data = list;
      }

      this.setState({data: data, fetching: false, last: list.length == 0});
    })
  };

  loadMore = () => {
    if (this.state.last) {
      message.warning("没有更多数据了")
      return
    }
    this.fetchData({loadMore: true})
  }

  handleChange = value => {
    this.setState({value, fetching: false});
    if(this.props.onChange) {
      this.props.onChange(value)
    }
  };

  render() {
    const {fetching, data, value} = this.state;

    return (
      <Select
          style={this.props.style || {width:120}}
        value={this.state.value}
        notFoundContent={fetching ? <Spin size="small"/> : null}
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{margin: '4px 0'}}/>
            <div
              style={{padding: '4px 8px'}}
              onMouseDown={e => e.preventDefault()}
            >
              <span style={{float: "right"}}>

              {this.state.last ? '已加载全部数据' : <a style={{cursor: 'pointer'}} onClick={this.loadMore}>
                更多 <VerticalAlignBottomOutlined />
              </a>}
              </span>
            </div>
          </div>
        )}

        {...this.props}

      >
        {data.map(d => (
          <Option key={d.value}>{d.text}</Option>
        ))}
      </Select>
    );
  }
}

export default Index
