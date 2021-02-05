<template>
  <div :class="{searchBox: isShow, searchBoxFocus: !isShow}" @click.stop="focus">
    <input type="text" placeholder="云盘" v-model="searchCha" @blur="blur">
    <span>云盘</span>
    <ph-magnifying-glass :size="14" color="#fff" weight="bold" />
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent} from "vue"

export default defineComponent({

  setup() {
    const isShow = ref(true)
    const searchCha = ref('')
    function focus() {
      isShow.value = false
    }
    function blur() {
      isShow.value = true
    }
    return{
      isShow,
      focus,
      blur
    }
  }
})
</script>

<style lang="less" scoped>
@Strawberry: #c6262e;
@keyframes searchScala {
  from{
    opacity: 0%;
  }
  100%{
    opacity: 100%;
  }
}
.baseSearchBox{
  width: 100%;
  height: 38px;
  background: @Strawberry;
  line-height: 38px;
  text-align: center;
  cursor: pointer;
}
  .searchBoxFocus{
    .baseSearchBox;
    span{
      display: none;
    }
    input{
      width: 80%;
      background: @Strawberry;
      border: @Strawberry;
      outline: none;
      color: #fff;
      &::placeholder{
        color: #fff;
        opacity: 40%;
        font-size: 14px;
      }
    }
  }
  .searchBox{
    .baseSearchBox;
    input{
      display: none;
    }
    span{
      display: inline-block;
      color: #fff;
      font: 17px sans-serif;
      margin-left: 30px;
      
    }
    svg{
      float: right;
      margin: 12px 10px 0px;
      opacity: 0%;
      &:hover{
        animation: searchScala 1s forwards;
      }
    }
  }
</style>
