<template>
  <div class="dirItem" @click="changeDir({data:dirList ,path:thisPath})" :style="{paddingLeft: 8*depth + 'px' }" :class="{isHit: dirList.hit}">
    <ph-triangle class="triangle" :size="5" weight="fill" />
    <ph-folder :size="20" weight="bold" />
    <div id="filename" >{{filename}}</div>
  </div>
  <su-dir-item :dirPath="thisPath" :depth="dep+1" :dirList=val v-for="(val, index) in stop"></su-dir-item>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, computed} from "vue"
import { useStore } from 'vuex'
export default defineComponent({
  props:[
      'dirList',
      'depth',
      'dirPath'
  ],
  name: 'suDirItem',
  setup(props) {
    const store = useStore()
    const stop = computed(() => {
      if(props.dirList.data instanceof Array){
        return props.dirList.data.filter((val: any, index: number) => {
          if(val.hit){
            console.log(val)
          }
          return val.data instanceof Array
        })
        //只要data为数组的元素,即文件夹元素
      }else {
        return undefined
      }
    })
    let dep = ref(props.depth)
    let lastPath = ref(props.dirPath)
    //父组件的路径
    // console.log(lastPath)
    let thisPath = ref(props.dirList.name.name)
    thisPath.value = lastPath.value + '/' + thisPath.value
    //当前组件的路径
    const filename = computed(() => {
      let name = props.dirList.name.name
      if(name.length >= 8){
        name = name.slice(0,8) + '……'
      }
      return name
    })
    //文字的长度处理
    function changeDir(dir: any) {
      store.commit('dirChangeDir', dir)
    }
    //路径跳转函数
    return{
      stop,
      filename,
      dep,
      changeDir,
      lastPath,
      thisPath
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
  .dirItem{
    color: @silver9;
    display: flex;
    align-items: center;
    padding: 5px 8px;
    position: relative;
    .triangle{
        transform: rotate(90deg);
    }
    
    #filename{
        margin-left: 5px;
        cursor: default;
        width: 100px;
        overflow: hidden;
        white-space: nowrap;
    }
    .filenameHit{
        color: @silver1;
    }
    &:hover{
        background: @straberry;
        color: @silver1;
    } 
  }
  .isHit{
    background: @straberry;
    color: @silver1;
    .triangle{
        transform: rotate(180deg);
    }
  }
</style>
