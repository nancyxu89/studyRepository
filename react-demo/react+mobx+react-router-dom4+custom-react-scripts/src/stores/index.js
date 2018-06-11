import {observable, action, configure, runInAction} from "mobx";
import http from "../api/request";
/**开启严格模式**/
configure({enforceActions: true})
class Store {
    @observable token = ''
    @observable number = 0;
    @action add = () => {
        this.number++;
    }
    @action login = async(params) => {
        const rst = await http.post('http://192.168.4.20:8007/riskquery_api/login', params);
        runInAction(() => {
            console.info(rst)
            this.token = rst.data.token;
        });
    }
}
const stores = new Store();
stores.add();

function startCount() {
    let count = 0
    let interval
    interval = setInterval(()=> {
        stores.add()
        count++
        if (count > 10) {
            clearInterval(interval)
        }
    }, 2000)

}
startCount()
export default stores