<template>
  <div class="hello">
    <div class="div" ref="prending">
      <div>
        <p ref="hitstart" class="tag" v-show="hit1show">
          <inlineLoading></inlineLoading>
          正在加载......
        </p>
        <slot name="content"></slot>
        <p ref="hitend" v-show="hit2show" class="tag">
          <inlineLoading></inlineLoading>
          正在加载......
        </p>
        <div class="blank" ref="blank"></div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { InlineLoading } from 'vux'
export default {
  props:{
    finishFlag:{
      type:Boolean,
      required:true
    },
    refreshFlag:{
      type:Boolean,
      default:false
    },
    loadFlag:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      scrollFlag:true,
      hit1show:false,
      hit2show:false
    }
  },
  components:{
    InlineLoading
  },
  methods:{
    initScroll () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.prending, {
            probeType:3,
            pullDownRefresh:{
              threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
              stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
            },
            pullUpLoad:{
              threshold: -20, // 在上拉到超过底部 20px 时，触发 pullingUp 事件
            }
          })
          this.scroll.on('pullingDown', () => 
          {
            // 刷新数据的过程中，回弹停留在距离顶部还有20px的位置
            this.hit1show = true
            this.$nextTick(()=>{
              this.calBlank ()
              this.scroll.refresh()
              console.log("tick")
            })
            this.$emit('refreshData')
          })
          this.scroll.on('scroll',(pos)=>{
            if(pos.y<0 && pos.y < (this.scroll.maxScrollY + 30) && this.scrollFlag){
              this.scrollFlag = false
              this.hit2show =true
              this.$nextTick(()=>{
                this.calBlank ()
                this.scroll.refresh()
              })
              if(this.finishFlag){
                this.$refs.hitend.innerHTML = "没有数据了"
              } else{
                this.$emit('loadmoreData')
              }
            }
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    returnRefresh () {
      this.hit1show = false
      this.$nextTick(()=>{
        this.calBlank ()
        this.scroll.refresh()
      })
      this.scroll.finishPullDown()
    },
    returnLoadmore () {
      this.hit2show =false
      this.$nextTick(()=>{
        this.calBlank ()
        this.scroll.refresh()
        this.scrollFlag = true
      })
    },
    calBlank () {
      var obj = this.$refs.blank
      obj.style.display = "none"
      obj.style.height = "0px"
      var content = obj.parentNode
      var container =  content.parentNode
      var h1 = parseInt(window.getComputedStyle(container,null).height.split("px")[0])
      var h2 = parseInt(window.getComputedStyle(content,null).height.split("px")[0])
      if(h1>=h2){
        obj.style.height = (h1-h2+20)+'px'
        obj.style.display = "block"
      } else{
        obj.style.display = "none"
        obj.style.height = "0px"
      }
    }
  },
  mounted(){
    this.initScroll()
    this.calBlank()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.tag{
  /*position: relative;*/
  /*top:-20px;*/
  padding: 10px 0;
  /*box-sizing: border-box;*/
}
.div{
  height: 100px;
  overflow: hidden;
  border:1px solid red;
}
/*li{
  height: 103px;
}*/
ul {
  list-style-type: none;
  padding: 0;
}

li {
  /*height: 200px;*/
}

a {
  color: #42b983;
}
</style>
