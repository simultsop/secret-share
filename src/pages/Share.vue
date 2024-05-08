<template>
    <form v-if="beforeShare">
        <fieldset>
            <legend>Share information</legend>

            <label for="publickey">Public key</label>
            <p class="publickey">{{  publickey }}</p>

            <label for="privatekey">Private key</label>
            <input type="text" name="privatekey" id="privatekey" v-model="privatekey">

            <label for="content">Content</label>
            <textarea name="content" id="content" placeholder="Write some content" rows="8" v-model="content"></textarea>

            <button type="button" @click="attemptShare">Share</button>
        </fieldset>
    </form>
    <template v-else>
        <h3> Stored successfully <br/> <a :href="`https://secret-share.pages.dev/${publickey}`" target="_blank">{{ publickey }}</a></h3>
        <h3> With privatekey <br/> <span>{{ privatekey }}</span></h3>
        <p>
            Copy and store the keys above.<br/><br/>
            To share this information with others, <br/>
            pass them URL/Public key and Private key <br/>
            so they can reveal your secret at their end. <br/><br/><br/>

            <i>PS: It's the last time you see this page.</i><br/><br/>
        </p>

        <a href="#" @click.prevent="shareAnother">Share another</a>
    </template>
</template>
<script setup lang="ts">
    import { ref, computed } from 'vue'
    const beforeShare = ref(true)
    const publickey = ref(self.crypto.randomUUID());
    const privatekey = ref('')
    const btoaPrivateKey = computed(() => btoa(privatekey.value))
    const content = ref('')

    const attemptShare = () => {
        beforeShare.value = false

        fetch('/share', {
            method: "POST",
            body: JSON.stringify({
                publickey: publickey.value,
                privatekey: btoaPrivateKey.value,
                content: content.value
            })
        })
    }

    const shareAnother = () => {
        publickey.value = self.crypto.randomUUID();
        privatekey.value = ''
        content.value = ''
        beforeShare.value = true
    }
</script>
