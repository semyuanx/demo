import React,{Component} from 'react';
import { Link  } from 'react-router';
import './head.css'

//  顶部
const Top =(
    <div className="head-top">
        <div className="w980">
           <div className="head-top-left">
                公告: 欢迎来到xx娱乐，祝您游戏愉快！赚大钱~
           </div>
           <div className="head-top-right">
               <ul>
                  <li className="client"><a href="#">客户端下载</a></li>
                  <li className="help"><a href="#">在线帮助</a></li>
                  <li className="service"><a href="#">在线客服</a></li>
               </ul>
           </div>
        </div>        
    </div>
)
//  logo 及 导航
const Nav = (
    <div className="head-main">
        <div className="w980">
            <div className="logo">
                <a href="/"><img src={ require('./img/logo.png') } /></a>
            </div>
            <ul className="nav">
                <li><a>我的账户</a></li>
                <li><a>银行充提</a></li>
                <li><a>投注记录</a></li>
                <li><a>账户报表</a></li>
                <li><a>代理管理</a></li>
                <li><a>优惠活动</a></li>
                <li><a>企业文化</a></li>
            </ul>
        </div>
    </div>
) 

class Head extends Component{
    render(){
        return (
            <div>
               {Top}
               {Nav}
            </div>
        )
    }
}

export default Head;
