<template>
  <div id="playContainer" v-show="isPlay">
    <button class="closePlayer" @click="destroy()">
        <ph-x :size="6" weight="bold" color="#555761" />
    </button>
    <video ref="video" class="player" controls="controls" >

    </video>
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, computed, watch, onMounted} from "vue"
import { useStore} from 'vuex'
const DPlayer = require('dplayer');
import Hls from 'hls.js'
import flvjs from 'flv.js'

export default defineComponent({
  setup() {
    const store = useStore()
    const isPlay = ref(false)
    const playUrl = computed(() => {
      return store.state.moreMenu.play
    })
    let dp = reactive({})
    let video = ref(null)
    onMounted(() => {
    })
    function destroy() {
      isPlay.value = false
      store.commit('closeVide')
      ;(video.value as any).pause()
    }
    
    watch(() => store.state.moreMenu.play.isReady, (val, p) => {
      console.log(val)
      if(val){
        if (Hls.isSupported()) {
          let hls = new Hls()
          console.log(playUrl.value.url)
          hls.loadSource(playUrl.value.url)
          hls.attachMedia(video.value)
          isPlay.value = true
        }
      }
    })
    return {
      playUrl,
      destroy,
      isPlay,
      video
    }
  }

})
</script>

<style lang="less" scoped>
@silver9: #555761;
@silver7: #7e8087;
@silver1: #fafafa;
@silver3: #d4d4d4;
@silver5: #abacae;
@keyframes hover {
  from{
    background: #efefef;
  }
  to{
    background: @silver1;
  }
}
#playContainer{
  width: 70%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid @silver5;
  padding-top: 5px;
  background: @silver3;
  border-radius: 5px;
  box-shadow: 0px 0px 10px @silver7;
  .player{
    width: 100%;
    border: 0px;
    outline: none;
  }
  .closePlayer{
    position: relative;
    left: 5px;
    top: 0px;
    padding: 0px 2px;
    height: 14px;
    display: inline-block;
    border: 1px solid @silver7;
    border-radius: 4px;
    outline: none;
    box-shadow: 0px 0px 1px @silver7;
    svg{
      transform: translate(0%, -20%);
      position: relative;
      top: -4px;
    }
    &:hover{
      // animation: hover 0.3s forwards;
      background: @silver1;
    }
    &:active{
      background: @silver5;
    }
  }
}
</style>
