<template>
    <form v-if="beforeRead">
        <fieldset>
            <legend>Read information</legend>

            <label for="publickey">Public key</label>
            <p class="publickey">{{  publickey }}</p>

            <label for="privatekey">Private key</label>
            <input type="text" name="privatekey" id="privatekey" v-model="privatekey" autocomplete="off">

            <button type="button" @click="attemptRead">Read</button>
        </fieldset>
    </form>
    <template v-else>
        <h3> Trying to read <br/> {{ publickey }} </h3>
        <h3> With privatekey <br/> {{ privatekey }} </h3>
        <p>{{ content }}</p> <br/> <br/> <br/>

        <a v-if="failed" href="#" @click.prevent="beforeRead=true;failed=false">Try again</a>
        <a v-else href="/">Read another</a>
    </template>
</template>
<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { ref } from 'vue'
    const route = useRoute()
    const beforeRead = ref(true)
    const publickey = route.params.publickey
    const privatekey = ref('')
    const content = ref('')
    const failed = ref(false)

    const attemptRead = () => {
        beforeRead.value = false

        fetch('/read', {
            method: "POST",
            body: JSON.stringify({
                publickey,
                privatekey: privatekey.value
            })
        })
        .then((response) => response.json())
        .then((data) => {
            content.value = data.content
        })
        .catch((error) => {
            content.value = error
            failed.value = true
        })
    }
</script>