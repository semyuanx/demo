import React, { Component } from 'react';
import { Link } from 'react-router';
import { getAwardData } from '../../redux/action';
import { connect } from 'react-redux';  //连接
import './index.css';

//  倒计时
class CountDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countTime: 0,
            timer: null
        }
    }
    render() {
        var { time, date, timer } = this.props;    // 上期的时间戳
        this.state.countTime = (time + 600) - parseInt(new Date().getTime() / 1000, 10); // 假设每10分钟开一次
        var hour = this.state.countTime < 0 ? 0 : parseInt(this.state.countTime / 60 / 60, 10),
            min = this.state.countTime < 0 ? 0 : parseInt(this.state.countTime / 60, 10),
            sec = this.state.countTime < 0 ? 0 : parseInt(this.state.countTime % 60, 10);
        if (!this.state.timer && this.state.countTime > 0) {
            this.countFn();
        }
        return (
            <div className="conunt-down">
                <p>第<b>{date ? date['expect'] : ''}</b>期&nbsp;离截止时间</p>
                {
                    this.state.countTime > 0 ? (
                        <div className="conunt-time">
                            <span>{hour < 10 ? '0' + hour : hour}</span><b>:</b>
                            <span>{min < 10 ? '0' + min : min}</span><b>:</b>
                            <span>{sec < 10 ? '0' + sec : sec}</span>
                        </div>
                    ) : (
                            <div className="conunt-time">
                                <p>马上开奖</p>
                            </div>
                        )
                }
            </div>
        )
    }
    componentDidMount() {
        this.countFn();
    }
    countFn() {  // 倒计时
        var self = this;
        this.state.timer = setInterval(function () {
            if (self.state.countTime > 0) {
                self.setState({
                    countTime: self.state.countTime--
                })
                self.props.closeResetData();    // 关闭父组件循环读取数据
            } else {
                clearInterval(self.state.timer);
                self.setState({
                    timer: null,
                    countTime: 0
                })

                self.props.openResetData(true); //开启父组件循环读取数据
                return false;
            }

        }, 1000)
    }
    componentWillUnmount(){ //组件销毁时 移除定时器
        if(this.state.timer){
            clearInterval(this.state.timer);
        }       
    }

}

// 开奖号码
class WinNumber extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var { award } = this.props,
            periods = award ? award['expect'] : "",
            num = award ? award['opencode'].split(',') : '';
        return (
            <div className="win-num">
                <p>11选5&nbsp;&nbsp;第<b>{periods}</b>期号码</p>
                <ul>
                    {
                        num ? num.map(function (key, val) {
                            return (
                                <li key={val}>{num[val].length < 2 ? '0' + num[val] : num[val]}</li>
                            )
                        }) : <p>加载中...</p>

                    }
                </ul>
                <div className="border-left"></div>
                <div className="border-right"></div>
            </div>
        )
    }
}

//  往期记录
class Record extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var { list } = this.props;
        return (
            <div className="record">
                <div className="record-title">
                    <p className="record-left">期次</p>
                    <p className="record-right">开奖号码</p>
                    <div className="clear"></div>
                </div>

                {
                    list.length > 0 ? list.map(function (key, i) {
                        if (i < 3) {
                            return (
                                <div className="record-list" key={i}>
                                    <div className="record-left">{key.opentimestamp}</div>
                                    <div className="record-right">
                                        {
                                            list[i]['opencode'].split(',').map(function (key, val) {
                                                return (
                                                    <span key={val}>{key.length < 2 ? '0' + key : key}</span>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            )
                        }
                    }) : <p>数据加载中</p>
                }
            </div>
        )
    }
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            resetDataTimer: '',
            openResetTimer: false,
            awardNum: {},
            awardList: [],
            _isMounted:true
        }
    }
    render() {
        var { award } = this.props;
        this.state.time = award[0] ? award[0]['opentimestamp'] : 0;
        this.state.awardNum = award[0];
        this.state.awardList = award;
        return (
            <div className="index">
                <div className="w980 h130">
                    <div className="index-left fl">
                        <CountDown closeResetData={this.closeResetData.bind(this)}
                            openResetData={this.openResetData.bind(this)}
                            date={award ? award[0] : ''}
                            time={this.state.time} />
                    </div>
                    <div className="index-main fl">
                        <WinNumber award={this.state.awardNum} />
                    </div>
                    <div className="index-right fl">
                        <Record list={this.state.awardList} />
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.resetData();
    }
    resetData() { // 获取数据
        if(this._isMounted){
            return false;
        }
        var { dispatch } = this.props;
        dispatch(getAwardData());   // 页面初始化数据
    }
    closeResetData() {   // 子组件回调方法，关闭轮询获取数据
        if (this.state.resetDataTimer) {
            clearInterval(this.state.resetDataTimer);
            this.setState({
                resetDataTimer: null
            })
        }
    }
    openResetData(val) { // 子组件回调方法，打开轮询获取数据
        this.loopResetData();
    }
    loopResetData() {   // 轮询获取数据
        var self = this;
        this.state.resetDataTimer = setInterval(function () {
            self.resetData();
        }, 6000)
    }
      
    componentWillUnmount(){ //组件将被卸载时移除定时器
        this.closeResetData()
    }
}
var store2props = function (store) {
    return {
        award: store.getAwardData.award
    }
}
var M = connect(store2props)(Index)

export default M;