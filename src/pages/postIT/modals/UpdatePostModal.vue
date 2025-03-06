<template>
        <div v-if="openModal" class="modal show" tabindex="-1" aria-modal="true" role="dialog" :style="{ display: openModal ? 'block' : 'none'}">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <!-- <div class="card"> -->
                        <div v-if="!isLoading" class="py-3 px-3">
                            <span>What's on your mind?</span>
                            <textarea rows="3" cols="3" class="form-control" placeholder="Type something..." style="height: 100px;" v-model="postForm.message"></textarea>
                            <img v-if="ImagePreview" class="card-img img-fluid mt-2" :src="ImagePreview" alt="">
                            <div class="d-flex align-items-center mt-2">
                                <div>
                                    <input type="file" ref="postFileInput" @change="handleFileUpload" style="display: none;">
                                    <button type="button" class="btn btn-link p-0" @click="fileUpload"><PhUploadSimple size="1.5em"/></button>
                                    <button type="button" class="btn btn-link" @click="removePhoto" v-if="ImagePreview">remove</button>
                                </div>
                                 <div class="ms-auto">
                                    <button type="button" class="btn btn-link" data-bs-dismiss="modal" @click.stop="this.$emit('close-modal')">Discard Changes</button>
                                    <button  type="button" class="btn btn-primary" @click.prevent="savePost" :disabled="checkPostChange()">Save</button>
                                 </div>

                            </div>
                        </div>
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

                                        <span class="d-block text-muted mt-2">Updating Post...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <!-- </div> -->
                </div>
            </div>
        </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import {
    PhUploadSimple,
    PhCircleNotch
} from "@phosphor-icons/vue";
export default {
    name: 'UpdatePostModal',
    emits: ['close-modal'],
    components: {
        PhUploadSimple,
        PhCircleNotch
    },
    props:{
        isOpen: Boolean,
        post_id: Number
    },

    setup(props,ctx){
        const store = useStore();
        const postFileInput = ref(null);
        const ImagePreview = ref(null);
        const isLoading = ref(false);


        const openModal = computed(() => props.isOpen);
        const postData = computed(() => store.state.post.list.find(post => post.id == props.post_id));

        ImagePreview.value = postData.value.image || null;

        const postForm = reactive({
            message: postData.value.message || '',
            image: null
        });

        function fileUpload(){
            postFileInput.value?.click();
        }
        function handleFileUpload(e){
            const file = e.target.files[0];
            if(file){
                postForm.image = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.ImagePreview = e.target.result;
                }
                reader.readAsDataURL(file);         
            }
        }

        function removePhoto(){
            postForm.image = null;
            ImagePreview.value = null;
        }
        function savePost(){
            isLoading.value = true;
            postForm.post = postData.value.id;
            
            store.dispatch("post/UPDATE_POST",postForm).then(() => {
                isLoading.value = false;                
            });

            ctx.emit('close-modal');
        }

        function checkPostChange(){
            const flag = ref(true);
            const postMessage = postData.value.message || '';

            if(postForm.message !== postMessage){
                flag.value = false;
            }

            if(ImagePreview.value !== postData.value.image){
                flag.value = false;
            }

            return !postForm.message && !ImagePreview.value ? true : flag.value;
        }

        return {
            postForm,
            postFileInput,
            ImagePreview,
            fileUpload,
            handleFileUpload,
            close,
            openModal,
            postData,
            savePost,
            removePhoto,
            isLoading,
            checkPostChange
        }
    }
}
</script>