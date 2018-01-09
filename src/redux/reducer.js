import { combineReducers } from 'redux';   // 合并 reducer


// 开奖页面数据
const  getAwardData = (state={award:{}},action)=>{
        switch(action.type){
            case "getAwards":
                return Object.assign({},state,{award:action.award});
            default:
                return state;
        }
    }


const rootReducer = combineReducers({
    getAwardData
})
export default rootReducer;