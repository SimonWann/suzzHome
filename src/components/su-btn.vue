<template>
  <a
    class="btn"
    @mousedown="isHit=true" @click.right.stop @mouseup="isHit=false" :class="{active: isActive,notActive: !isActive,hit: isHit}" @mouseenter="isActive=true" @mouseleave="isActive=false"
  >
    <slot></slot>
  </a>
</template>

<script lang="ts">
import {reactive, ref, defineComponent} from "vue"
export default defineComponent({
  name:'suBtn',
  setup() {
    let isActive = ref(false)
    let isHit = ref(false)
    return{
      isActive,
      isHit
    }
  }
})
</script>

<style lang="less" >
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
@keyframes active {
  from{
    background: @black3;
  }
  to{
    background: @black1;
  }
}
@keyframes notActive {
  from{
    background: @black1;
  }
  to{
    background: @black3;
  }
}
@keyframes click {
  from{
    background: @black1;
  }
  to{
    background: @black7;
  }
}
@keyframes clickout {
  from{
    background: @black7;
  }
  to{
    background: @black3;
  }
}
.btn{
  background: @black3;
  border-radius: 5px;
  border: 1px solid @black7;
  padding: 5px 10px;
  box-shadow: 0px 0px 2px @black7;
  svg{
      position: relative;
      top: 0%;
      background: @silver1;
      border-radius: 2px;
    }
}
  .active{
    animation: active 0.25s ease-out forwards;
  }
  .notActive{
    animation: notActive 0.25s ease-in forwards;
  }
  .hit{
    animation: click 0.25s ease-out forwards;
  }
  .nothit{
    animation: clickout 0.25s ease-in forwards;
  }
</style>
