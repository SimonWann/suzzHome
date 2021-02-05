<template>
    <div class="fileBox" @click="openFolder(currentPath)">
        <div class="fileLogo">
          <ph-image v-if="isPhoto()" :size="90" />
          <ph-book v-if="isBook()" :size="90" />
          <ph-video-camera v-if="isVideo()" :size="90" />
          <ph-music-notes-simple v-if="isMusic()" :size="90" />
          <ph-folder v-if="props.fileData?.isDir" :size="90" />
          <ph-archive v-if="isAchive()" :size="90" />
        </div>
        <div class="filename">{{props.fileData.name.name}}</div>
    </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent} from "vue"
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    fileData: Object,
    filename: String
  },
  setup(props) {
    const store = useStore()
    let currentPath = ref(store.state.init.profile.currentPath)
    
    function isPhoto() {
      if(new RegExp(/\.(png|jpe?g|gif)$/i).test(props.fileData?.name.name as string)) {
        return true
      }
    }
    function isBook() {
      if(new RegExp(/\.(txt|epub|pdf)$/i).test(props.fileData?.name.name as string)) {
        return true
      }
    }
    function isVideo() {
      if(new RegExp(/\.(mp4|mkv)$/i).test(props.fileData?.name.name as string)) {
        return true
      }
    }
    function isMusic() {
      if(new RegExp(/\.(mp3)$/i).test(props.fileData?.name.name as string)) {
        return true
      }
    }
    function isAchive() {
      if(new RegExp(/\.(rar|zip|tar\.gz)$/i).test(props.fileData?.name.name as string)) {
        return true
      }
    }
    function openFolder(name: string) {
      if((props.fileData as any).isDir) {
        console.log('go')
        currentPath.value = '/' + props.fileData?.name.name
        store.dispatch('readDir', currentPath.value)
      }
    }
    return{
      props,
      isPhoto,
      isBook,
      isVideo,
      isMusic,
      isAchive,
      openFolder
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
    @keyframes boxHover {
      from{
        box-shadow: 1px 1px 2px @silver3;
        top: 0px;
      }
      to{
        box-shadow: 1px 1px 4px @silver5;
        top: -4px;
      }
    }
    @keyframes boxLeave {
      from{
        box-shadow: 1px 1px 4px @silver5;
        top: -4px;
      }
      to{
        box-shadow: 1px 1px 2px @silver3;
        top: 0px;
      }
    }
    .fileBox{
        cursor: pointer;
        width: 180px;
        height: 200px;
        border: 1px solid @silver3;
        margin: 20px 0px 10px 20px;
        border-radius: 5px;
        background: #fff;
        box-shadow: 1px 1px 2px @silver3;
        display: flex;
        flex-direction: column;
        position: relative;
        color: @silver9;
        animation: boxLeave 0.2s forwards ease-out;
        &:hover{
          animation: boxHover 0.5s forwards ease-out;
        }
        font: bold 14px sans-serif;
        .fileLogo{
          height: 85%;
          width: 100%;
          line-height: 240px;
          text-align: center;
        }
        .filename{
          height: 15%;
          background: darken(@silver1, 8%);
          width: 100%;
          text-align: center;
          line-height: calc(200px * 0.15);
          overflow: hidden;
        }
    }
</style>
