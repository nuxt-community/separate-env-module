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
    const env = {
      ONLY_CLIENT: process.env.ONLY_CLIENT || 'undefined',
      ONLY_SERVER: process.env.ONLY_SERVER || 'undefined',
      DIFFERENT: process.env.DIFFERENT || 'undefined',
      TYPE: process.env.TYPE || 'undefined',
      normal: process.env.normal || 'undefined'
    }
    return { type, env }
  }
}
</script>
