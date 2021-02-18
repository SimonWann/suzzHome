<template>
  <div id="container" @click="init()">
    <su-aside></su-aside>
    <su-main></su-main>
  </div>
  <div id="transform">
    <su-transform></su-transform>
  </div>
  <div id="dplayer">
    <su-player></su-player>
  </div>
  <div id="alert">
    <su-alert></su-alert>
  </div>
</template>
<script>
import { defineComponent, onMounted, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import suAside from './components/su-aside'
import suMain from './components/su-main'
import suTransform from './components/su-transform'
import suPlayer from './components/su-player'
import suAlert from './components/su-alert'
import './assets/css/base.css'


export default defineComponent({
  name: 'App',
  components: {
    suAside,
    suMain,
    suTransform,
    suPlayer,
    suAlert
  },
  setup() {
    const store = useStore()
    onBeforeMount(() => {
      // console.log(store.state.init)
      store.dispatch('readDirAll')
      //加载用户云盘信息
    })
    function init() {
      store.commit('closeMenu')
    }
    return {
      init
    }
  }
})
</script>
<style lang="less">
@silver9: #555761;
@silver7: #7e8087;
@silver1: #fafafa;
@silver3: #d4d4d4;
@silver5: #abacae;
  #container{
    display: flex;
    height: 100vh;
    overflow: hidden;
  }
  *::-webkit-scrollbar{
    width: 10px;
    height: 10px;
  }
  *::-webkit-scrollbar-thumb{
    border: 1px solid #7e8087;
    background: #d4d4d4;
    border-radius: 4px;
  }
</style>
