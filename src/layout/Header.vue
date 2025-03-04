<template>
 <div class="navbar navbar-dark">
    <div class="container-fluid">

            <!-- Mobile togglers -->
            <div class="d-flex d-lg-none me-2">
				...
			</div>
			<!-- /mobile togglers -->


			<!-- Navbar brand -->
			<div class="d-inline-flex flex-1 flex-lg-0">
        <router-link to="/" class="navbar-brand d-inline-flex align-items-center">
            <img :src="logo" alt="Ralph" class="me-2" style="height: 2rem;">
        </router-link>
			</div>
			<!-- /navbar brand -->


			<!-- Left content -->
			<div class="flex-row">
        <ul class="navbar-nav flex-row order-1 order-xl-2 ms-auto">
          <li class="nav-item">
            <router-link to="/postit" class="navbar-nav-link rounded">POSTIT</router-link>
          </li>
          <!-- <li class="nav-item">
            <a href="#" class="navbar-nav-link rounded">LINK</a>
          </li> -->
        </ul>
			</div>
			<!-- /left content -->
      
      <!-- Right content -->
      <div class="flex-row justify-content-end order-1 order-lg-2">
        <ul class="navbar-nav flex-row order-1 order-xl-2 ms-auto">
          <li class="nav-item">
            <span class="d-none d-xl-inline-block mx-xl-2">{{ name }}</span>
          </li>
          <li class="nav-item">
            <PhSignOut size="24" @click="userLogout" class="cursor-pointer"/>
          </li>
        </ul>
      </div>
      <!-- /right content -->
    </div>
  </div>
</template>
<script>
import {PhSignOut} from "@phosphor-icons/vue";
import { useStore } from "vuex";
import logo from "@/assets/images/R.png";
import { useRouter } from "vue-router";
export default {
  name: "HeaderLayout",
  components: {
      PhSignOut
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const name = store.state.user.user.name || null;

    function userLogout() {
      store.dispatch("user/LOGOUT_USER").then(() => {
        store.dispatch("post/CLEAR_POSTS");
      });

      localStorage.clear();
      router.push({ name: "Login" });
    }


    return {
      logo,
      name,
      userLogout
    };
  }
};
</script>