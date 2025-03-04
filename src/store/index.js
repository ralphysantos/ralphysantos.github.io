import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import UserModule from './user';
import PostModule from './post';
// import SecureLS from "secure-ls";
// var ls = new SecureLS({ isCompression: false });

const store = createStore({
    modules:{
        user: UserModule,
        post: PostModule
    },
    plugins: [
        createPersistedState({
            storage: window.localStorage,
        })
    ]
})


export default store;

// createPersistedState({
//     storage: {
//         getItem: (key) => ls.get(key),
//         setItem: (key, value) => ls.set(key, value),
//         removeItem: (key) => ls.remove(key),
//       }
// })