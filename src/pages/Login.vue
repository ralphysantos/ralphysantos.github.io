<template>
    <div class="content">
        <div class="row">
            <div class="col-md-3 mx-auto mt-3">
                <form v-if="!isLoading" class="login-form" novalidate @submit.prevent="login">
                    <div class="card mb-0">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <h5 class="mb-0">Login to your account</h5>
                                <span class="d-block text-muted">Enter your credentials below</span>
                            </div>

                            <div v-if="error"  class="alert alert-danger border-0 alert-dismissible fade show">
                                <span class="fw-semibold"> {{ error }} </span>
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label">Email Address</label>
                                <div class="form-control-feedback form-control-feedback-start">
                                    <input type="email" class="form-control" placeholder="Email Address" required="" 
                                        v-model="form.email" :class="{ 'is-invalid': form.errors.email }">
                                    <div class="invalid-feedback">{{ form.errors.email }}</div>
                                    <div class="form-control-feedback-icon">
                                        <PhUserCircle size="18" class="text-muted"/>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <div class="form-control-feedback form-control-feedback-start">
                                    <input type="password" class="form-control" placeholder="Password" required="" v-model="form.password" :class="{ 'is-invalid': form.errors.password }">
                                    <div class="invalid-feedback">{{ form.errors.password }}</div>
                                    <div class="form-control-feedback-icon">
                                        <PhLock size="18" class="text-muted"/>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <button type="submit" class="btn btn-primary w-100">Sign in</button>
                            </div>

                            <!-- <div class="text-center">
                                <a href="login_password_recover.html">Forgot password?</a>
                            </div> -->
                        </div>
                    </div>
                </form>

                <div v-if="isLoading">
                    <div class="card mb-0">
                        <div class="card-body">
                            <div class="text-center">
                                <PhCircleNotch color="darkorchid" weight="duotone" size="64">
                                    <animate
                                    attributeName="opacity"
                                    values="0;1;0"
                                    dur="4s"
                                    repeatCount="indefinite"
                                    />
                                    <animateTransform
                                    attributeName="transform"
                                    attributeType="XML"
                                    type="rotate"
                                    dur="5s"
                                    from="0 0 0"
                                    to="360 0 0"
                                    repeatCount="indefinite"
                                    />
                                </PhCircleNotch>

                                <span class="d-block text-muted mt-2">Logging in...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
PhUserCircle,
PhLock,
PhCircleNotch
} from "@phosphor-icons/vue";
import { reactive, ref } from "vue";
import { useStore } from 'vuex';
import UserService from '@/services/user.service';

import { useRouter } from "vue-router";

export default {
    name: 'Login-Page',
    components: {
        PhUserCircle,
        PhLock,
        PhCircleNotch
    },
    setup(){
        const router = useRouter();
        const isLoading = ref(false);
        const error = ref(null);
        const store = useStore();
        const form = reactive({
            email: '',
            password: '',
            errors:{
                email: null,
                password: null
            }
        });
        // const passwordRegex = /^(?=(.*[A-Z]))(?=(.*[a-zA-Z0-9]))(?=(.*[\W_])).{6,}$/;

        // watch(() => form.username, (value) => {
        //         console.log(value);
        // });
        function login(){
            error.value = null;
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if(form.email === '' || !emailPattern.test(form.email)){
                form.errors.email = 'Enter a Valid Email address';
            }else{
                form.errors.email = null;
            } 
            
            if(form.password === ''){
                form.errors.password = "Enter your Password";
            }else{
                form.errors.password = null;
            }

            if(form.errors.email === null && form.errors.password === null){
                isLoading.value = true;
                UserService.login({
                    email: form.email,
                    password: form.password
                }).then((result) =>{
                    store.dispatch('user/LOGIN_USER',result.data).then(() =>{
                        router.push({ name: 'Home' });
                    });
                    isLoading.value = false;
                }).catch((err) => {
                    isLoading.value = false;
                    error.value = err.response.data.message;
                });
            }

            // if(form.username === ''){
            //     form.errors.username = 'Enter your Username';
            // }else if (form.username.length < 6){
            //     form.errors.username = 'Username must contain atleast 6 characters';
            // }else{
            //     form.errors.username = null;
            // }

            // if(form.password === ''){
            //     form.errors.password = 'Enter your Password';
            // }else if(passwordRegex.test(form.password) === false){
            //     form.errors.password = 'Password must contain atleast 6 characters and at least 1 uppercase letter, 1 number and 1 special character';
            // }else{
            //     form.errors.password = null;
            // }
        }

        return{
            form,
            login,
            isLoading,
            error
        }
    }
}
</script>

<style scoped>

</style>