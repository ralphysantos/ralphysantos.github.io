<template>
    <div class="content">
        <div class="row">
            <div class="col-md-5 mx-auto mt-3">
                <div class="card">
                    <div class="py-3 px-3">
                        <span>What's on your mind?</span>
                        <textarea rows="3" cols="3" class="form-control" placeholder="Type something..." style="height: 100px;" v-model="postForm.message"></textarea>
                        <img v-if="ImagePreview" class="card-img img-fluid mt-2" :src="ImagePreview" alt="">
                        <div class="d-flex align-items-center mt-2">
                            <div>
                                <input type="file" ref="postFileInput" @change="handleFileUpload" style="display: none;">
                                <button type="button" class="btn btn-link p-0" @click="fileUpload"><PhUploadSimple size="1.5em"/></button>
                            </div>
                            <button type="button" class="btn btn-primary ms-auto" @click="postSave">Post</button>
                        </div>
                    </div>
                </div>

                <!-- Start of Post List -->
                <div v-for="post in postList" :key="post.id">
                    <div class="card">
                        <div class="card-header d-sm-flex py-2">
                            <div class="me-lg-3 mb-lg-0">
                                <a href="#" v-if="post.user.avatar"><img :src="post.user.avatar" class="rounded-circle" width="30" height="30" alt=""></a>
                                {{ post.user.name }}
                            </div>
                            <div class="d-flex d-sm-block mt-1 mt-sm-0 ms-sm-auto">
                                <span class="fs-sm">{{ timeAgo(post.created_at) }}</span>
                                <div class="d-inline-flex ms-auto ms-sm-3">
                                    <div class="dropdown">
                                        <!-- <a href="#" class="text-body" data-bs-toggle="dropdown" aria-expanded="false"> -->
                                            <PhGear size="18" @click="post.showMenu = !post.showMenu" class="cursor-pointer"/>
                                        <!-- </a> -->

                                        <!-- button menu -->
                                        <div v-if="post.showMenu" class="dropdown-menu dropdown-menu-end right-0" :style="{display: post.showMenu ? 'block' : 'none'}">
                                            <button class="dropdown-item" @click="postDelete(post.id)">
                                                <PhTrash size="18" class="me-2"/>
                                                Delete Post
                                            </button>
                                        </div>
                                        <!-- /button menu -->
                                    </div>
                                </div>
                            </div>        
                        </div>

                        <div class="card-body">
                            <p class="mb-3">{{ post.message }}</p>
                            <div v-if="post.image" class="card-img-actions mb-3">
                                <img class="card-img img-fluid" :src="post.image" alt="">
                                <div class="card-img-actions-overlay card-img">
                                    <a :href="post.image" class="btn btn-outline-white btn-icon rounded-pill" target="_blank">
                                        <PhLink size="18"/>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="card-body d-flex justify-content-between align-items-center pt-0">
                            <ul class="list-inline mb-0">
                                <li class="list-inline-item"><a href="#" class="text-body"><PhThumbsUp size="18"/> {{ post.likes }}</a></li>
                                <li class="list-inline-item"><PhChats size="18" class="me-2 cursor-pointer" @click="post.showComment = !post.showComment" /><a href="#" class="text-body"> {{ post.comments.total }}</a></li>
                            </ul>
                        </div> -->

                        <!-- comment section -->
                        <div v-if="post.showComment" class="card-body border-top">
                            <div>
                                <input type="text" class="form-control"  placeholder="Add a comment...">
                                <div class="d-flex align-items-center mt-2">
                                    <PhPaperPlaneTilt size="24" class="ms-auto"/>   
                                </div>
                            </div>

                            <div class="mt-3">
                                <div class="d-flex flex-column flex-lg-row mb-3">
                                    <div class="me-lg-3 mb-2 mb-lg-0">
                                        <a href="#"><img src="../../assets/images/demo/users/face2.jpg" class="rounded-circle" width="40" height="40" alt=""></a>
                                    </div>

                                    <div class="flex-fill">
                                        <div class="d-flex">
                                            <a href="#" class="fw-semibold">William Jennings</a>
                                            <span class="fs-sm text-muted ms-3">Just now</span>
                                            <PhTrash size="18" class="ms-auto"/>
                                        </div>

                                        <p class="fs-xs">He moonlight difficult engrossed an it sportsmen. Interested has all devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to.</p>

                                        <ul class="list-inline mb-0">
                                            <li class="list-inline-item d-inline-flex align-items-center">
                                                <a href="#" class="lh-1 me-2"><PhThumbsUp size="18" class="text-success" /></a>
                                                114
                                            </li>
                                            <li class="list-inline-item ms-2">
                                                <a href="#">Reply</a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="#">Edit</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- / comment section -->
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import {
    PhUploadSimple,
    // PhCheckCircle,
    PhGear,
    PhThumbsUp,
    // PhChats,
    PhPaperPlaneTilt,
    PhTrash,
    PhLink
} from "@phosphor-icons/vue";
import { computed, reactive,ref } from "vue";
import { formatDistanceToNow } from 'date-fns';

import { useStore } from 'vuex';

// import UserService from '@/services/user.service';

export default {
    name: 'postIT',
    components: {
        PhUploadSimple,
        // PhCheckCircle,
        PhGear,
        PhThumbsUp,
        // PhChats,
        PhPaperPlaneTilt,
        PhTrash,
        PhLink
    },
    setup(){
        const store = useStore();
        store.dispatch("post/GET_POSTS");

        const newPostList = store.state.post.list;
        const postList = computed(() => store.state.post.list);

        const postForm = reactive({
            message: '',
            image: null
        })



        const postFileInput = ref(null);
        const ImagePreview = ref(null);
        function fileUpload(){
            postFileInput.value?.click();
        }

        function handleFileUpload(e){
            const file = e.target.files[0];
            if(file){
                postForm.image = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    console.log(e.target.result);
                    this.ImagePreview = e.target.result;
                }
                reader.readAsDataURL(file);         
            }
        }

        function postSave(){
            store.dispatch("post/ADD_POST",postForm);

            postForm.message = '';
            postForm.file = null;
            ImagePreview.value = null;
        }

        function postDelete(postId){
            store.dispatch("post/DELETE_POST",postId);
        }
        function timeAgo(date){
            return formatDistanceToNow(new Date(date), { addSuffix: true });
        }


        return {
            postForm,
            postFileInput,
            ImagePreview,
            fileUpload,
            handleFileUpload,
            postSave,
            postList,
            timeAgo,
            newPostList,
            postDelete
        }
    }
}
</script>

<style scoped>
    .right-0{
        right:0;
    }

</style>