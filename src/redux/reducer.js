import { combineReducers } from 'redux';   // 合并 reducer


// 获取页面数字
const  getData = (state={data:null},action)=>{
        switch(action.type){
            case "loading":
                return Object.assign({},state,{data:action.data});
            default:
                return state;
        }
    }


const rootReducer = combineReducers({
    getData
})
export default rootReducer;