<template>
  <footer class="app-footer">
    <span>{{appName}}</span>
    <span>{{record}}</span>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      appName: window.appShortName,
      record: window.publicRecord
    }
  }
}
</script>
<style scoped>
.app-footer {
  width: 100%;
  height: 61px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  font-size: 12px;
}
</style>
