<template>
    <form v-if="beforeRead">
        <fieldset>
            <legend>Read information</legend>

            <label for="publickey">Public key</label>
            <input type="text" name="publickey" id="publickey" v-model="publickey" autocomplete="off">

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
        <a v-else href="#" @click.prevent="readAnother">Read another</a>
    </template>
</template>
<script setup lang="ts">
    import { ref } from 'vue'
    const beforeRead = ref(true)
    const publickey = ref('')
    const privatekey = ref('')
    const content = ref('')
    const failed = ref(false)

    const attemptRead = () => {
        beforeRead.value = false

        fetch('/read', {
            method: "POST",
            body: JSON.stringify({
                publickey: publickey.value,
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

    const readAnother = () => {
        publickey.value = ''
        privatekey.value = ''
        content.value = ''
        beforeRead.value = true
    }
</script>