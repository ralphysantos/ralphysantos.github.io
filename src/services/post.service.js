import HttpService from './http.service';
import store from '@/store'
class PostService extends HttpService{

    constructor() {
        super();
    }

    list(){
        return this.get('/post/list',{
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

    create (data){
        return this.post('/post/create',data,{
            headers: {
              'Authorization': `Bearer ${store.state.user.bearerToken}`,
              'Content-Type': 'multipart/form-data',
            }
          }).then(
            (result) => {
                return result
            }).catch((error) =>{
                throw error
            });
    }

    update(data){
        return this.post('/post/update/'+ data.post_id,data,{
            headers: {
              'Authorization': `Bearer ${store.state.user.bearerToken}`,
              'Content-Type': 'multipart/form-data',
            }
          }).then(
            (result) => {
                return result
            }).catch((error) =>{
                throw error
            });
    }

    delete (id){
        return this.post('/post/delete/'+id,{},{
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

export default new PostService();