<template>
  <div id="dir">
      <div id='dirTitle'>
          <div id="name">{{name}}</div>
          <ph-list-dashes :size="16" weight="bold" color="#7e8087" />
      </div>
        <ul>
            <li v-for="(item, index) in dir" @click="activeColor(index)" @mouseenter="enColor" @mouseleave="leColor" :class="{activeColor: index === isHit}"> 
                <ph-triangle class="triangle" :class="{triangle2: index === isHit}" :size="5" color="#000" weight="light" />
                <ph-folder :size="20" weight="light" color="#000" />
                <div id="filename" :class="{filenameHit: index === isHit}">{{item.name.name}}</div>
            </li>
        </ul>
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, computed} from "vue"
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
      const name = ref('我的文件夹')
      const isHit = ref(-1)
      const ycolor = ref('#f9c440')
      const scolor = ref('#fafafa')
      const store = useStore()
      let dir = reactive({})
      dir = computed(() => {
          return (store.getters.fileData as Array<object>).filter((val, index) => {
              return (val as any).isDir
        })
      })
    function activeColor(index: number) {
        isHit.value = index
    }
    const hitColor = computed((index: number) => {
        console.log(index)
        return 
    })
      return{
          name,
          isHit,
          activeColor,
          dir
      }
  }
})
</script>

<style lang="less">
    @silver1: #fafafa;
    @silver3: #d4d4d4;
    @silver5: #abacae;
    @silver7: #7e8087;
    @silver9: #555761;
    @banana5: #f9c440;
    @banana7: #d48e15;
    @straberry: #ed5353;
    @keyframes opacity {
        from{
            opacity: 50%;
        }
        to{
            opacity: 100%;
        }
    }
    @keyframes backColor{
        from{
            background: @silver1;
        }
        to{
            background: @straberry;
        }
    }
    .activeColor{
        background: @straberry;
        color: @silver1;
    }
    #dir{
        border-right: 1px solid #d4d4d4;
        background: @silver1;
        width: calc(100% - 1px);
        height: 100%;
        color: @silver7;
        font-family: sans-serif;
        font-size: 14px;
        // border: 1px #000 solid;
        #dirTitle{
            padding: 10px;
            #name{
                font-size: 16px;
                
            }
            svg{
                cursor: pointer;
                opacity: 50%;
                &:hover{
                    animation: opacity 0.7s forwards;
                }
            }
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
        }
        ul{
            padding: 0px;
            margin: 0px;
            list-style: none;
            li{
                color: @silver9;
                display: flex;
                align-items: center;
                padding: 5px 8px;
                .triangle{
                    transform: rotate(90deg);
                }
                .triangle2{
                    transform: rotate(180deg);
                }
                #filename{
                    margin-left: 5px;
                    cursor: default;
                }
                .filenameHit{
                    color: @silver1;
                }
               &:hover{
                  background: @straberry;
                  color: @silver1;
               } 
               
            }
        }
    }
</style>
