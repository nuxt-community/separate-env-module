<template>
  <div id="result">
    <h1>{{ type }}</h1>
    <pre>{{ JSON.stringify(env) }}</pre>
  </div>
</template>

<script>
export default {
  asyncData() {
    const type = process.client ? 'client' : 'server'
    // eslint-disable-next-line no-unused-vars
    const mySecret = process.env.SECRET
    const env = {
      ONLY_CLIENT: process.env.ONLY_CLIENT || 'undefined',
      ONLY_SERVER: process.env.ONLY_SERVER || 'undefined',
      DIFFERENT: process.env.DIFFERENT || 'undefined',
      normal: process.env.normal || 'undefined',
      number: process.env.number || 'undefined'
    }
    return { type, env }
  }
}
</script>
