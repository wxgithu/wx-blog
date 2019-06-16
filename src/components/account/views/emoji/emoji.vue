<template>
    <div class="EmoticonListCover" v-if="Show" @click="OpenEmotion(false)">
        <div class="EmoticonList">
            <div class="PicItem" v-for="(item,i) in EmotionList" @click="ClickEmoticon(i)" :key="i">
                <img :src=" 'http://127.0.0.1:3000/images/emoji/' + i + '.gif'">
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Emotion",
    data:function(){
      return {
        Show:false,
        EmotionList:['眯眼','微笑', '撇嘴', '色', '发呆','流泪', '害羞', '闭嘴', '睡', '大哭','尴尬', '发怒', '调皮', '呲牙', '惊讶', 
        '难过','冷汗', '抓狂', '吐', '偷笑', '可爱','白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗',
         '咒骂', '疑问', '嘘','晕', '折磨', '衰', '敲打', '再见', '擦汗', '抠鼻','糗大了', '坏笑', '左哼哼','右哼哼', '哈欠', 
         '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '拥抱', '月亮','太阳', '炸弹','骷髅','菜刀','猪头','西瓜',
         '咖啡', '饭','爱心','强', '弱','握手', '胜利', '抱拳', '勾引','OK','NO','玫瑰', '凋谢', '示爱','爱情', '飞吻' ],
      }
    },
    methods:{
      //选中表情
      ClickEmoticon:function (EmoticonNo) {
        var That = this;
        That.Show = false;
        // var params={
        //     item:'[[' + That.EmotionList[EmoticonNo] + ']]',
        //     emojiList:JSON.stringify(this.EmotionList),
        // }
        That.$emit('AppendInputValue','[[' + That.EmotionList[EmoticonNo] + ']]');
      },
      OpenEmotion:function (Value) {
        this.Show = Value;
      }
    }
  }
</script>
<style scoped lang="scss">
    .EmoticonListCover{
        width: 400px;
        height: 200px;
        position: relative;
        left: 50px;
        .EmoticonList{
           .PicItem{
               float: left;
               border: 1px solid #e8e8e8;
           }
        }
    }
</style>

