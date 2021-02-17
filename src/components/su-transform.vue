<template>
  <div class="transform" @dragstart="drag($event)" draggable="true" :style="{left: position.x + 'px', top: position.y + 'px'}" @dragover.prevent @dragend="drop($event)"  v-show="isShow">
    <div id="close" @click="close">
      <ph-x :size="9" color="#555761" />
    </div>
    <div id="downList">
       <li v-for="(val, index) in task">
        <div class="downname">{{val.file.name.name}}</div>
        <progress :value="parseInt(val.file.curSize/val.file.size*100)" max="100"></progress>
        <span>下载速度: {{Math.round(val.file.curSize/1024/(downSpeed(parseInt(val.file.curSize/val.file.size*100))/1000)/1024*100)/100}}MiB/s, 进度: {{parseInt(val.file.curSize/val.file.size*100)}}%</span>
      </li>
    </div>
    <div id="uploadList">
      <li v-for="(val, index) in queue">
        <div class="loadname">{{val.fileInfo.name}}</div>
        <progress></progress>
        <span>上传中～</span>
      </li>
    </div>
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, computed, watch} from "vue"
import { useStore } from 'vuex'
export default defineComponent({
  
  setup() {
    const file = reactive({
        name: 'asdsaf12312312',
        speed: 3,
        time: 99
      })
    let isShow = computed(() => {
      return store.state.uiSetting.isTranClose
    })
    const position = reactive({x:100, y:100})
    const offset = reactive({x: 0, y: 0})
    let store = useStore()
    function close() {
      store.commit('tranClose')
    }
    function drop(e: any) {
      position.x = position.x + e.x - offset.x
      position.y = position.y + e.y - offset.y
    }
    function drag(e: any) {
      offset.x = e.x
      offset.y = e.y
    }
    let isDone = ref(false)
    watch(() => store.state.moreMenu.downloadingTask.length, (val, p) => {
      console.log('download!',val,p)
      if(val< p || (val === 1 && p === 0)) {
        console.log('down!')
        store.dispatch('download')
      }
    })
    watch(() => store.state.moreMenu.finished, (val, p) => {
      if(val) {
        let durl = URL.createObjectURL(store.state.moreMenu.downloadedTask[0])
        const download = document.createElement('a')
        ;download.href = durl 
        ;download.download = downloadingFile.value.file.name.name
        ;(document.getElementById('downList') as HTMLElement).appendChild(download)
        ;download.click()
        ;(document.getElementById('downList') as HTMLElement).removeChild(download)
        window.URL.revokeObjectURL(durl)
        store.commit('clearDone')
        //一个完整的下载过程结束，并完成了清理工作
        //a标签必须动态创建与添加，否者前后两个人物的下载人物重叠，click不了
      }
    })
    const task = computed(() => {
      return store.state.moreMenu.downloadingTask
    })
    const queue = computed(() => {
      return store.state.itemSet.uploadQueue
    })
    const downloadingFile = computed(() => {
      return store.state.moreMenu.downloadingFile
    })
    const startTime = ref(0)
    const downSpeed = computed(() => {
      return function(c: number) {
        if(c  < 1 ){
          startTime.value = (new Date()).getTime()
        }
        return (new Date()).getTime() - startTime.value
      }
    })
    // watch(() => store.state.moreMenu.finished, (val, p) => {
    //   if(val){
    //     const allBlog = store.state.moreMenu.downloadedTask[0]
    //     let durl = URL.createObjectURL(allBlog)
    //     // console.log(download)
    //     ;(download.value as any).href = durl 
    //     ;(download.value as any).download = downloadingFile.value.file.name.name
    //     val = false
    //   }
    // })
    return {
      file,
      isShow,
      close,
      drag,
      drop,
      offset,
      position,
      task,
      downloadingFile,
      isDone,
      downSpeed,
      queue
    }
  }
})
</script>
<style lang="less" scoped>
@silver1: #fafafa;
@silver3: #d4d4d4;
@silver5: #abacae;
@silver7: #7e8087;
@silver9: #555761;
@banana5: #f9c440;
@banana7: #d48e15;
@straberry: #ed5353;
@keyframes tranHover {
  from{
    box-shadow: 1px 1px 4px @silver5;
  }
  to{
    box-shadow: 1px 1px 9px @silver5;
  }
}
@keyframes closeHover {
  from{
    background: @silver1;
  }
  to{
    background: @silver3;
  }
}
  .transform{
    position: absolute;
    left: 100px;
    top: 100px;
    width: 300px;
    height: 400px;
    border: 1px solid @silver5;
    border-radius: 5px;
    background: @silver3;
    box-shadow: 1px 1px 4px @silver5;
    padding: 30px;
    z-index: 2;
    overflow: auto;
    
    #downList,#uploadList{
      li{
        overflow: hidden;
      }
      // height: 92%;
      overflow: auto;
      &::-webkit-scrollbar{
        width: 10px;
        height: 10px;
      }
      &::-webkit-scrollbar-track{
        border: 1px solid @silver3;
      }
      &::-webkit-scrollbar-thumb{
        border: 1px solid @silver9;
        background: @silver5;
        border-radius: 5px;
        box-shadow: 0px 0px 5px @silver7;
      }
    }
    font: 300 11px sans-serif;
    &:hover{
      animation: tranHover 0.3s forwards ease-out;
    }
    #close{
      width: 11px;
      height: 11px;
      padding: 2px;
      position: relative;
      top: -23px;
      left: -22.5px;
      border: 1px solid @silver5;
      background: @silver1;
      border-radius: 5px;
      &:hover{
        animation: closeHover 0.3s forwards ease-out;
      }
      &:active{
        background: @silver7;
      }
      svg{
        position: relative;
        left: 1px;
        top: 0.5px;
      }
    }
    li{
      progress{
        width: 95%;
      }
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      padding: 10px 10px 10px 20px;
      list-style: none;
      width: 250px;
      height: 60px;
      background: @silver1;
      border: 1px solid @silver5;
      border-radius: 5px;
      margin-bottom: 10px;
    }
  }
</style>
