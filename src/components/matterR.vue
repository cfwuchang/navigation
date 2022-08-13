<template>
  <div class="contens">
    <el-carousel
      trigger="click"
      height="402px"
      indicator-position="none"
      :autoplay="false"
      arrow="never"
       ref="img"
    >
      <el-carousel-item v-for="(item, i) in news" :key="i">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <img :src="item.url_icon" alt="icon" />
            <span>{{item.txt}} <a :href="item.url">更多</a></span>

            <div>
              <img :src="require('../assets/zuo.png')" alt="左" @click="zuoHandler" />
              <img :src="require('../assets/you.png')" alt="右" @click="youHandler" />
            </div>
          </div>
          <div v-for="(o, i) in item.list" :key="i" class="item">
            <a v-if="o.link" :href="o.link">
              <div class="num">{{ i }}</div>
              <div class="img">
                <img :src="o.picInfo[0].url" alt="图片"  v-if="o.picInfo[0].url" />
                <img :src="o.face" alt="图片"  v-if="o.face" />
              </div>
              <div class="txt">
                <div v-if="o.title">{{ o.title }}</div>
                <div v-if="o.digest">{{ o.digest }}</div>
              </div>
            </a>
            <a v-if="o.short_link" :href="o.short_link">
              <div class="num">{{ i }}</div>
              <div class="img">
                <img :src="o.first_frame" alt="图片"  v-if="o.first_frame" referrerpolicy='no-referrer'/>
              </div>
              <div class="txt">
                <div v-if="o.title">{{ o.title }}</div>
                <div v-if="o.tname">{{ o.tname }}</div>

              </div>
            </a>
            <a v-if="o.url" :href="o.url">
              <div class="num">{{ i }}</div>
              <div class="txt2">
                <div v-if="o.name">{{ o.name }}</div>
              </div>
            </a>
          </div>
        </el-card>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "middleR",
  props: {
    msg: String,
  },
  created() {
    var aa = [];
    this.$jsonp(
      "http://3g.163.com/touch/jsonp/sy/recommend/0-9.html?hasad=1&miss=48&refresh=B02&offset=0&size=10",
      {}
    ).then((r) => {
      // console.log(r);
      aa.push({
        txt: "163资讯",
        list: r.news,
        url_icon: "https://163.com/favicon.ico",
        url: "https://163.com",
      });
      aa.push({
        txt: "163新闻",
        list: r.list,
        url_icon: "https://war.163.com/favicon.ico",
        url: "https://war.163.com/",
      });

      // this.list=r.focus.list
    });
    this.$axios("https://tenapi.cn/resou/", {}).then((r)=>{
    aa.push({
      txt:'微博热搜',
      list:r.data.list,
      url_icon:'https://baidu.com/favicon.ico',
      url: "https://baidu.com",
    })
    })
    this.$jsonp(
      "https://api.bilibili.com/archive_rank/getarchiverankbypartion?&type=jsonp&tid=95&pn=1&_=1506153545368",
      {}
    ).then((r) => {
      console.log(r);
      aa.push({
        txt: "bilibili",
        list: r.data.archives,
        url_icon: "https://bilibili.com/favicon.ico",
        url: "https://bilibili.com",
      })
    })
    this.news = aa;

    console.log(this.news);
  },
  data() {
    return {
      news: [],
      // list: [],
    };
  },
  methods:{
    zuoHandler(){
        this.$refs.img.prev();
    },
    youHandler(){
      this.$refs.img.next();
    }
  }
};
</script>
<style lang="less">
.contens {
  height: 402px;
  border-radius: 5px;
  overflow: auto;
  .el-carousel__item{
    overflow: auto;
  }

  .el-card__header {
    padding: 8px 10px;
    border: none;
    text-align: left;
    .clearfix {
      position: relative;
      img {
        padding-right: 10px;
        width: 15px;
      }
      span {
        position: absolute;
        top: -4px;
        a {
          font-size: 12px;
          color: #000;
          text-decoration: none;
        }
      }

      div {
        position: absolute;
        top: -3px;
        right: 5px;
        height: 20px;
        img {
          height: 100%;
        }
      }
    }
  }
  .el-card__body {
    padding: 5px;
    .item:hover {
      box-shadow: 3px 3px 6px #888888;
    }
    .item {
      height: 60px;
      margin: 10px 0;
      border-radius: 4px;
      box-shadow: 1px 1px 4px #888888;
      a {
        width: 100%;
        height: 100%;
        margin: auto;
        text-decoration: none;
        color: #000;
        display: flex;
        .num {
          flex: 0.1;
          margin: auto;
          line-height: 60px;
        }
        .img {
          flex: 0.3;
          margin: 5px;
          img {
            height: 40px;
            margin-top: 5px;
          }
        }
        .txt {
          flex: 0.6;
          div {
            height: 30px;
            overflow: hidden;
            font-size: 12px;
            // white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .txt2{
          flex: 0.96;
           div {
            height: 60px;
            overflow: hidden;
            font-size: 12px;
            line-height: 60px;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>