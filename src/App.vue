<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <section>
      <h1>
        Secret Share
      </h1>

      <nav>
        <RouterLink to="/">Read</RouterLink>
        —
        <RouterLink to="/share">Share</RouterLink>
      </nav>
    </section>

    <section>
      <RouterView />
    </section>
  </main>
</template>