import { useStore } from 'vuex';

function isAuthenticated() {
  const store = useStore();
    return store.state.user.bearerToken !== null; // Replace with actual auth check
}

export function authMiddleware(to, from, next) {
    if (!isAuthenticated()) {
      next({ name: 'Login' });
    } else {
      next();
    }
  }