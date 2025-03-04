import postService from "@/services/post.service";

// import PostService from '../services/post.service';
const PostModule = {
    namespaced: true,
    state() {
      return {
        list:JSON.parse(localStorage.getItem('vuex'))?.post.list || null,
        errors:{
            list:null
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
        setError(state,props){
            state.errors = props
        },
        clear(state){
            state.list = null;
            state.errors = {
                list:null
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
            })
        },
        DELETE_POST({commit},props) {
            postService.delete(props).then(() => {
                commit('delete',props);
            })
        },
        CLEAR_POSTS({commit}){
            commit('clear');
        }
    },
    getters: {
        list: (state) => state.list,
    },

  };
  
  export default PostModule;