<template>
  <div class="newDir" v-show="isShow">
    <div>
      <label for="newDirName">{{label}}:</label>
      <input type="text" v-model="newName" id="newDirName" />
      <button @click="submit">{{btn}}</button>
    </div>
    <ph-triangle :size="20" color="#abacae" weight="fill" id="triangle" />
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, onMounted} from "vue"
import { useStore } from 'vuex'
export default defineComponent({
  props: [
    'label',
    'btn',
    'isShow'
  ],
  setup(props) {
    const store = useStore()
    let newName = ref('de')
    function submit() {
      store.dispatch('mkdir', {currentPath: store.state.init.profile.currentPath, newDir: newName.value})
    }
    
    return {
      submit,
      newName
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
  .newDir{
    position: absolute;
    z-index: 1;
    width: 275px;
    height: 70px;
    color: @silver7;
    border: 1px solid @silver5;
    font: 700 14px sans-serif;
    background: @silvero;
    border-radius: 4px;
    padding: 10px 0px 0px 20px;
    top: 80px;
    right: 91px;
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
      border: 1px solid darken(@lime7, 8%);
      box-shadow: 0px 0px 2px @lime5;
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
      left: 200px;
      top: -100%-17px;
    }
  }
</style>
