<template>
  <div id="container">
    <su-aside></su-aside>
    <su-main></su-main>
  </div>
</template>
<script>
import { defineComponent, onMounted, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import suAside from './components/su-aside'
import suMain from './components/su-main'
import './assets/css/base.css'

export default defineComponent({
  name: 'App',
  components: {
    suAside,
    suMain
  },
  setup() {
    const store = useStore()
    onBeforeMount(() => {
      console.log(store.state.init)
      store.dispatch('loadProfile')
      store.dispatch('readDirAll')
      //加载用户云盘信息
    })
    return {

    }
  }
})
</script>
<style lang="less">
  #container{
    display: flex;
    height: 100vh;
    overflow: hidden;
  }
</style>
