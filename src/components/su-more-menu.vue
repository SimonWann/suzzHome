<template>
  <ul class="moreMenu" v-show="isShow">
    <li v-if="playVideo" @click="playNow()">播放视频</li>
    <li v-for="(val, key) in list" @click.stop="moreEv(key, $event)" >{{val}}</li>
  </ul>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, computed, watch} from "vue"
import { useStore } from 'vuex'
export default defineComponent({
  props: [
    'file',
    'index',
    'here',
    'playVideo'
  ],
  emits: ['info'],
  setup(props, ctx) {
    const list = reactive({
      download: '下载',
      copy: '复制',
      delete: '删除',
      rename: '重命名'
    })
    
    const store = useStore()
    const curMenu = computed(() => {
      return store.state.moreMenu.currentMenu
    })
    const isShow = computed(() => {
      if(store.state.moreMenu.isShow && store.state.moreMenu.currentMenu === props.index){
        return true
      } else {
        return false
      }
    })
    let downloadHref = ref('')
    function moreEv(key: any, e: MouseEvent,newName: string){
      if(key === 'download'){
        // console.log(key)
        store.dispatch('addDownload', props.file)
      }
      if(key === 'delete') {
        store.dispatch('delete', props.file)
      }
      if(key === 'rename') {
        let tmp = JSON.parse(JSON.stringify(props.file))
        tmp.new = newName
        store.commit('delieverRenameInfo', props.file)
        store.commit('mousePosition', e)
      }
      if(key === 'copy') {

        store.commit('copy', {file: props.file, path: store.state.init.profile.currentPath})
      }
      store.commit('closeMenu')
    }
    function playNow() {
      store.dispatch('playVideo', props.file)
    }
    
    return {
      list,
      isShow,
      open,
      curMenu,
      moreEv,
      downloadHref,
      playNow
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
  .moreMenu{
    position: absolute;
    width: 70px;
    padding-bottom: 5px;
    border: 1px solid @silver5;
    background: @silver7;
    border: 1px solid @silver9;
    border-radius: 6px;
    left: 100px;
    top: 60px;
    z-index: 1;
    flex-direction: column;
    justify-content: center;
    display: flex;
    li{
      text-align: left;
      padding: 0px 5px;
      position: relative;
      left: -20px;
      padding: 2px;
      list-style: none;
      color: @silver1;
      font: 400 14px sans-serif; 
      width: 90%;
      border-radius: 3px;
      border: 1px solid @silver7;
      &:hover{
        border: 1px solid @silver1;
        background: @silver1;
        color: @silver9;
      }
    }
  }
  .menuClose{
    display: flex;
  }
</style>
