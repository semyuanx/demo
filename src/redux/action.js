import ajax from 'superagent';
import jsonp from 'superagent-jsonp';

const api = {
    getAward:"http://f.apiplus.net/cqssc.json"
}

// 获取数据
export function getAwardData(){
    return function(dispatch){

        // 读取数据
        ajax    
            .get(api.getAward)
            .use(jsonp({
                timeout: 3000,
                callbackName: 'someOtherName'
            }))
            .end((err, response) => {
                dispatch({
                    type:"getAwards",
                    award:response.body.data
                })
              })
    }
}