<template>
  <div id="result">
    <h1>{{ type }}</h1>
    <pre>{{ JSON.stringify(env) }}</pre>
    <nuxt-link to="/">
      Index
    </nuxt-link>
  </div>
</template>

<script>
export default {
  asyncData() {
    const type = process.client ? 'client' : 'server'
    const env = {
      ONLY_CLIENT: process.env.ONLY_CLIENT || 'undefined',
      ONLY_SERVER: process.env.ONLY_SERVER || 'undefined',
      DIFFERENT: process.env.DIFFERENT || 'undefined'
    }
    return { type, env }
  }
}
</script>
