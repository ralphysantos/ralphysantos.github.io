import HttpService from './http.service';
import store from '@/store'
class UserService extends HttpService{

    constructor() {
        super();
    }
    login (data) {
        return this.post('/login',data).then(
            (result) => {
                return result
            }).catch((error) =>{
                throw error
            });
    }

    logout (){
        return this.post('/user/logout',{},{
            headers: {
              'Authorization': `Bearer ${store.state.user.bearerToken}`,
              'Content-Type': 'application/json',
            }
          }).then(
            (result) => {
                return result
            }).catch((error) =>{
                throw error
            });
    }
}

export default new UserService();