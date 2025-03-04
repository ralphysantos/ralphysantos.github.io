<template>
    <HeaderLayout />
    <!-- <AsideLayout /> -->
      <main>
        <router-view></router-view>
      </main>
    <!-- <FooterLayout /> -->
</template>
<script>
import HeaderLayout from "@/layout/Header.vue";
// import AsideLayout from "@/layout/Aside.vue";
// import FooterLayout from "@/layout/Footer.vue";

export default {
  name: "MasterLayout",
  components: {
    HeaderLayout,
    // AsideLayout,
    // FooterLayout,
  },
};
</script>