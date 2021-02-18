<template>
  <div id="photoContainer" @click.prevent :class="{fullscreen: isFull}" v-if="isClose">
    <div id="widget">
      <div id="zoom">
        <su-btn id="zoom-out"
          @click="zoomOut"
          ><ph-plus :size="10" weight="bold" /></su-btn>
        <div id="info"><span>{{parseInt(scale*100)}}%</span></div>
        <su-btn id="zoom-in"
          @click="zoomIn"
        ><ph-minus :size="11" weight="bold" /></su-btn>
      </div>
      <div id="photoSet">
        <su-btn id="fullscreen"
          @click="fullScreen()"
        >
          <ph-arrows-out-simple :size="11" weight="bold" />
        </su-btn>
        <su-btn
          @click="close()"
        >
          <ph-x :size="11" weight="bold" />
        </su-btn>
      </div>
      
    </div>
    <div id="imgP">
      <img
      @drag="changePosition($event)"
      @dragstart="getPosition($event)"
      @dragend="changePosition($event)"
      :style="{transform: `scale(${scale})`, left: thisLocation.x, top: thisLocation.y}"
      :src="url"
      alt="test"
      >
    </div>
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, computed} from "vue"
import { useStore } from 'vuex'
import suBtn from './su-btn.vue'

export default defineComponent({
  name: 'suPhoto',
  components: {
    suBtn
  },
  setup() {
    let store = useStore()
    let scale = ref(1)
    let isFull = ref(false)
    let lastLocation = reactive({
      x: 0,
      y: 0
    })
    let thisLocation = reactive({
      x: 0 + 'px',
      y: 0 + 'px'
    })
    let mousePosition = reactive({
      x: 0,
      y: 0
    })
    let isClose = computed(() => {
      return store.state.moreMenu.photoShow
    })
    let url = computed(() => {
      return store.state.moreMenu.photo.curPhoto
    })
    function close() {
      store.commit('closePhoto')
    }
    function fullScreen() {
      isFull.value = !isFull.value
    }
    function zoomIn() {
      scale.value = scale.value - 0.1
    }
    function zoomOut() {
      scale.value = scale.value + 0.1
    }
    function changePosition(e) {
      let offsetX = e.x - lastLocation.x
      let offsetY = e.y - lastLocation.y
      thisLocation.x = offsetX + lastLocation.x - mousePosition.x + 'px'
      thisLocation.y = offsetY + lastLocation.y - mousePosition.y + 'px'
      lastLocation.x = lastLocation.x + offsetX
      lastLocation.y = lastLocation.y + offsetY
    }
    function getPosition(e) {
      mousePosition.x = e.x
      mousePosition.y = e.y
      lastLocation.x = e.x
      lastLocation.y = e.y
    }
    return {
      zoomIn,
      zoomOut,
      scale,
      isFull,
      fullScreen,
      changePosition,
      getPosition,
      lastLocation,
      thisLocation,
      mousePosition,
      isClose,
      close,
      url
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
@black1: #666666;
@black3: #4d4d4d;
@black5: #333333;
@black7: #1a1a1a;
@black9: #000000;
#photoContainer{
  #widget{
    display: flex;
    border: 1px solid @black3;
    border-bottom: 1px solid @black7;
    padding: 10px;
    user-select: none;
    justify-content: space-between;
    #zoom{
      display: flex;
      #zoom-in{
        background: @silver1;
      }
      #info{
        color: #fff;
        border: 1px solid @black7;
        span{
          position: relative;
          top: 28%;
        }
        background: @black7;
        font: 400 12px sans-serif;
        padding: 0px 15px 0px 10px;
      }
    }
    #photoSet{
      width: 75px;
      display: flex;
      justify-content: space-between;
    }
    
  }
  #imgP{
    overflow: auto;
    max-height: 80vh;
    padding: 0px;
    user-select: none;
    background: @black9;
    img{
      position: relative;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
    }
  }
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  box-shadow: 0px 0px 2px @black3;
  background: @black5;
  border-radius: 3px;
  min-width: 400px;
  min-height: 300px;
  max-height: 100%;
  max-width: 100%;
}
.fullscreen{
  max-width: 100vw;    
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
}
</style>
