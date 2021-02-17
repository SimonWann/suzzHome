<template>
  <div @click.stop="" class="rename" ref="renameBox" v-show="isShow" :style="{left: `${position.x - 100 + offset.x}px`, top: `${position.y + 50 + offset.y}px`}">  
    <div class="box">
      <label for="newname">新文件名:</label>
      <input type="text" v-model="newName" id="newname" />
      <button @click="submit()">重命名</button>
    </div>
    <ph-triangle :size="20" color="#abacae" weight="fill" id="triangle" />
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, computed, onMounted} from "vue"
import { useStore } from 'vuex'
export default defineComponent({
  setup(props) {
    const store = useStore()
    const position = computed(() => {
      return store.state.moreMenu.fileRename.mouse
    })
    const isShow = computed(() => {
      return store.state.moreMenu.fileRename.showRename
    })
    const renameBox = ref()
    const options = reactive({
      threshold: 0.0
    })
    const offset = reactive({
      x: 0,
      y: 0
    })
    function submit() {
      const file =  info.value
      file.newName = newName.value
      // console.log(file)
      store.dispatch('rename', file)
    }
    const info = computed(() => {
      return store.state.moreMenu.fileRename.fileInfo
    })
    let newName = ref('default')
    onMounted(() => {
      const observer = new IntersectionObserver((entries) => {
        if(entries[0].intersectionRatio < 1 && entries[0].intersectionRatio > 0) {
          offset.x = -90
          offset.y = -100
        }
      }, options)
      observer.observe(renameBox.value)
      // console.log(renameBox)
      document.onclick = function() {
        store.commit('closeRename')
      }
    })
    return {
      position,
      isShow,
      renameBox,
      offset,
      info,
      newName,
      submit
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
@silvero: #F6F6F6;
@banana5: #f9c440;
@lime1: #d1ff82;
@lime3: #9bdb4d;
@lime5: #82BF8C;
@lime7: #3a9104;
@lime9: #206b00;
  .rename{
    position: absolute;
    z-index: 1;
    width: 250px;
    height: 70px;
    color: @silver7;
    border: 1px solid @silver5;
    font: 700 14px sans-serif;
    background: @silvero;
    border-radius: 4px;
    padding: 10px 0px 0px 20px;
    label{
      display: block;
      margin-bottom: 6px;
    }
    input{
      width: 60%;
      border-radius: 4px;
      border: 1px solid @silver5;
      outline: none;
      padding: 5px 3px;
      &:focus{
        border: 1px solid @banana5;
      }
    }
    button{
      margin-left: 10px;
      position: relative;
      top: 0px;
      background: @lime5;
      border: 1px solid darken(@lime5, 8%);
      outline: none;
      padding: 3px 10px 4px 10px;
      border-radius: 4px;
      font: 400 12px sans-serif;
      &:active{
        background: darken(@lime5, 8%);
      }
    }
    #triangle{
      position: relative;
      left: 0px;
      top: -100%-17px;
    }
  }
</style>
