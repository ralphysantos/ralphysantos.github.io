import UserService from '../services/user.service';
const UserModule = {
    namespaced: true,
    state() {
      return {
        isAuthenticated: JSON.parse(localStorage.getItem('vuex'))?.user.isAuthenticated || false,
        bearerToken:JSON.parse(localStorage.getItem('vuex'))?.user.bearerToken || null,
        user: JSON.parse(localStorage.getItem('vuex'))?.user.user ||null,
      };
    },
    mutations: {

        login(state,props){
            state.isAuthenticated = true;
            state.bearerToken = props.token;
            state.user = props.user;
        },
        logout(state){
            state.isAuthenticated = false;
            state.bearerToken = null;
            state.user = null
        }
    },
    actions: {
        LOGIN_USER({ commit }, props) {
        // You can make an API call here for user login if needed
        commit('login', props); // Commit the mutation with user data
      },
      LOGOUT_USER({ commit }) {
        UserService.logout().then(() =>{
          commit('logout');
        });
      }
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        user: (state) => state.user,
        bearerToken: (state) => state.bearerToken
    },

  };
  
  export default UserModule;