<template>
  <div id="app">
    <div class="div_img" >
      <img class="img" :src="listBg[bg].url" alt="" />
      <a :href="listBg[bg].url">{{ listBg[bg].copyright }} </a>
    </div>

    <div class="centen">
      <inputApp />
      <div class="weather">
        <img :src="require('./assets/bobao.png')" alt="" />
        <div>
          {{ weather.city }}: {{ weather.list[0].date }}天气：{{
            weather.list[0].weather
          }}{{ weather.list[0].temp }},{{ weather.list[0].wind }}
        </div>
      </div>
      <div class="content">
        <el-row :gutter="20">
          <el-col :span="18"><middleL></middleL></el-col>
          <el-col :span="6"><middleR></middleR></el-col>
        </el-row>
      </div>
      <div>
        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" v-for="(j,index) in list" :key="index">
            <li v-for="(i,indexs) in j.data" :key="indexs" class="infinite-list-item">
              <a :href="i.url">{{i.title}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import inputApp from "./components/inputApp.vue";
import middleR from "./components/matterR.vue";
import middleL from "./components/matterL.vue";

export default {
  name: "App",
  components: {
    inputApp,
    middleR,
    middleL,
  },
  created() {
    this.$axios('https://api.vvhan.com/api/hotlist?type=itInfo',{}).then((rrr)=>{
      this.list.push(rrr.data)
      console.log(rrr.data);
    })
    this.$axios('https://api.vvhan.com/api/hotlist?type=huPu',{}).then((r)=>{
      this.list.push(r.data)
      console.log(r.data);
    })
    this.$axios('https://api.vvhan.com/api/hotlist?type=zhihuHot',{}).then((r)=>{
      this.list.push(r.data)
    })
    this.$jsonp("https://api.asilu.com/bg/", {}).then((r) => {
      console.log(r);
      this.listBg = r.images;
    });
    this.start();
    this.$jsonp("http://whois.pconline.com.cn/ipJson.jsp", {}).then((r1) => {
      // console.log(r1.proCode);
      this.$jsonp("https://query.asilu.com/weather/weather/", {
        id: r1.proCode || "北京",
      }).then((r2) => {
        this.weather = r2;
        // console.log(r2);
      });
    });
    this.height=document.documentElement.clientHeight
  },
  data() {
    return {
      bg: 0,
      listBg: [{}],
      timer: "",
      weather: {
        id: "",
        city: "",
        update_time: "",
        date: "",
        list: [{}],
        height:0,
      },
      list:[]
    };
  },

  methods: {
    //设置定时器
    start() {
      this.timer = setInterval(this.valChange, 10000); // 注意: 第一个参数为方法名的时候不要加括号;
    },
    valChange() {
      if (this.bg < this.listBg.length - 1) {
        this.bg++;
      } else {
        this.bg = 0;
      }
      console.log(this.list);
    },
    over() {
      clearInterval(this.timer);
    },
  },
};
</script>

<style lang="less">
@media screen and (min-width: 1080px) {
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    .centen {
      width: 80%;
      margin: auto;
    }
    .weather {
      display: flex;
      margin: 20px auto;
      background: #eee;
      font-size: 14px;
      line-height: 32px;
      width: 50%;
      border-radius: 5px;

      img {
        margin: 0 10px 0 10px;
       
      }
    }
    .div_img {
      position: absolute;
      top: -60px;
      left: 0;
      width: 100%;
      height: 750px;
      z-index: -11;
      .img {
        width: 100%;
        height: 750px;
      }
      a {
        font-size: 12px;
        position: absolute;
        right: 5%;
        bottom: -15%;
        text-decoration: none;
        color: #000;
      }
    }
  }
}
@media screen and (min-width: 479px) and (max-width: 1080px) {
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    .centen {
      width: 960px;
      margin: auto;
    }
    .weather {
      display: flex;
      margin: 20px auto;
      background: #eee;
      font-size: 14px;
      line-height: 32px;
      width: 50%;
      border-radius: 5px;

      img {
        margin: 0 10px 0 10px;
      }
    }
    .div_img {
      position: absolute;
      top: -60px;
      left: 0;
      width: 100%;
      z-index: -11;
      .img {
        width: 960px;
      }
      a {
        font-size: 12px;
        position: absolute;
        right: 5%;
        bottom: 5%;
        text-decoration: none;
        color: #000;
      }
    }
  }
}
@media screen and (max-width: 479px) {
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
    .centen {
      width: 100%;
    }
  }
}
</style>
