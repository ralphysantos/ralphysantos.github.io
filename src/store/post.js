import postService from "@/services/post.service";

// import PostService from '../services/post.service';
const PostModule = {
    namespaced: true,
    state() {
      return {
        list:JSON.parse(localStorage.getItem('vuex'))?.post.list || null,
        errors:{
            list:null,
            update:null,
            delete:null
        }
      };
    },
    mutations: {
        setList(state,props){
            state.list = props.posts
        },
        addPost(state,props){
            state.list=[props,...state.list];
        },

        delete(state,id){
            const index = state.list.findIndex(item => item.id === id);
            state.list.splice(index,1);
        },
        update(state,props){
            const index = state.list.findIndex(item => item.id === props.id);
            state.list.splice(index,1,props);
        },
        setError(state,props){
            state.errors = {...state.errors,...props};
        },
        clear(state){
            state.list = null;
            state.errors = {
                list:null,
                update:null,
                delete:null
            };
        }
    },
    actions: {
        GET_POSTS({ commit }) {
            postService.list().then((result) => {
                commit('setList', result.data);
            }).catch((error) => commit('setError', error)); // Commit the mutation with user data
        },
        ADD_POST({commit},props) {
            postService.create(props).then((result) => {
                commit('addPost', result.data.post);
            }).catch((error) => commit('setError', error));
        },
        DELETE_POST({commit},props) {
            postService.delete(props).then(() => {
                commit('delete',props);
            }).catch((error) => commit('setError', error));
        },
        UPDATE_POST({commit},props) {
            postService.update(props).then((result) => {
                commit('setError', {update:null});
                commit('update', result.data.post);
            }).catch((err) => {
                commit('setError', {update:err.response.data.error});
            });
        },
        CLEAR_POSTS({commit}){
            commit('clear');
        }
    },
    getters: {
        list: (state) => state.list,
        errors: (state) => state.errors
    },

  };
  
  export default PostModule;