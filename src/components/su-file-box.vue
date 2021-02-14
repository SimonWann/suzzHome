<template>
    <div class="fileBox" @mouseleave.stop="showHoverName(false)" @mouseover.stop="showHoverName(true, $event)" @click="openFolder({fileData, fileInd, depth})">
        <div class="fileLogo">
          <ph-image v-if="isPhoto()" :size="90" />
          <ph-book v-if="isBook()" :size="90" />
          <ph-video-camera v-if="isVideo()" :size="90" />
          <ph-music-notes-simple v-if="isMusic()" :size="90" />
          <ph-folder v-if="props.fileData?.data instanceof Array" :size="90" />
          <ph-archive v-if="isAchive()" :size="90" />
        </div>
        <div class="filename" >
          <span>{{showName}}</span>
          <a @click.stop="toggleMenu(fileInd)" class="more"><ph-dots-three-outline :size="20" /></a>
        </div>
        <div @click.stop class="filenameHover" :style="{left:hoverPosition.x + 'px', top:hoverPosition.y + 'px'}" v-show="hoverName">
          {{fileData?.name.name}}
        </div>
        <su-more-menu  :playVideo="isVideo()" :here="here" :file="fileData" :index="fileInd" ></su-more-menu>
    </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, computed, watch} from "vue"
import { useStore } from 'vuex'
import suMoreMenu from './su-more-menu.vue'

export default defineComponent({
  props: {
    fileData: Object,
    fileInd: Number,
    depth: Number
  },
  components: {
    suMoreMenu
  },
  setup(props) {
    const store = useStore()
    let currentPath = ref(store.state.init.profile.currentPath)
    const nextDir = reactive({
      name: Object,
      index: Number,
      depth: Number
    })
    let here = ref(-1)
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
    function openFolder(dir: Object) {
      if((props.fileData as any).data instanceof Array) {
        //console.log('go')
        currentPath.value += '/' + props.fileData?.name.name
        store.commit('changeDir', dir)
      }
    }
    const isShow = computed(() => {
      return store.state.moreMenu.isShow
    })
    function toggleMenu(index: number) {
      store.commit("toggleMenu")
      if(index === props.fileInd){
        store.commit('curMenu', index)
      }
    }
    let hoverName = ref(false)
    let timer: any
    let hoverPosition = reactive({x:0,y:0})
    function showHoverName(val: boolean, e: MouseEvent){
      //console.log('here')
      clearTimeout(timer)
       timer = setTimeout(()=> {
         hoverName.value = val
         if(e){
           hoverPosition.x = e.offsetX
           hoverPosition.y = e.offsetY
         }
      }, 1000)
    }
    //打开或关闭被点击菜单
    const showName = computed(() => {
      let name = props.fileData?.name.name
      if(name.length >= 5){
        name = name.slice(0,5) + '……'
      }
      return name
    })
    return{
      props,
      isPhoto,
      isBook,
      isVideo,
      isMusic,
      isAchive,
      openFolder,
      showName,
      toggleMenu,
      here,
      showHoverName,
      hoverName,
      hoverPosition
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
    @keyframes moreHover{
      from{
        background: lighten(@silver3, 11%);
      }
      to{
        background: lighten(@silver1, 11%);
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
        .filenameHover{
          position: absolute;
          padding: 5px;
          border-radius: 3px;
          background: @silver9;
          color: @silver1;
          font: 400 12px sans-serfi;
          z-index: 3;
          left: 0px;
          right: 0px;
        }
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
          span{
            position: relative;
            left: 10px;
            display: inline-block;
            width: 30%;
            height: 100%;
            overflow: hidden;
          }
          .more{
            position: relative;
            right: -45px;
            top: -9px;
            border: 1px solid @silver5;
            background: lighten(@silver3, 11%);
            border-radius: 3px;
            box-shadow: 0px 0px 2px @silver5;
            width: 40px;
            height: 30px;
            padding: 0px 3px;
            svg{
              position: relative;
              top: 5px;
            }
            &:hover{
              animation: moreHover 0.5s forwards;
            }
          }
        }
    }
    @media screen and (max-width: 580px) {
        .fileBox{
          margin: 0px auto;
          margin-top: 25px;
          &:last-child{
            margin-bottom: 25px;
          }
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
    }
</style>
