<template>
  <div id="constructc">
    施工中～
  </div>
</template>

<script lang="ts">
import {reactive, toRefs, defineComponent} from "vue"
export default defineComponent({
  setup() {

  }
})
</script>

<style lang="less" scoped>
@silver9: #555761;
@silver7: #7e8087;
@silver1: #fafafa;
@silver3: #d4d4d4;
@silver5: #abacae;
  #constructc{
    color: @silver7;
    display: inline-block;
    width: 300px;
    height: 100px;
    position: relative;
    left: 50%;
    top: 10%;
    font: 700 30px sans-serif;
  }
</style>
