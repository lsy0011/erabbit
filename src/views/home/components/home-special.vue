<template>
  <el-card class="box-card container" shadow="never">
    <template #header>
      <div class="card-header">
        <div class="txt">
          <span>最新专题</span>
        </div>
        <el-button class="button" text>查看全部 ></el-button>
      </div>
    </template>
    <div class="special-list" ref="homeSpecial">
      <div class="special-item" v-for="val in list" :key="val.id">
        <RouterLink to="/">
          <img
            :src="val.cover"
            alt
          />
          <div class="meta">
            <p class="title">
              <span class="top ellipsis">{{val.title}}</span>
              <span class="sub ellipsis">{{val.summary}}</span>
            </p>
            <span class="price">&yen;{{val.lowestPrice}}起</span>
          </div>
        </RouterLink>
        <div class="foot">
          <span class="like"><i class="iconfont icon-hart1"></i>{{val.collectNum}}</span>
          <span class="view"><i class="iconfont icon-see"></i>{{val.viewNum}}</span>
          <span class="reply"><i class="iconfont icon-message"></i>{{val.replyNum}}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { ref } from 'vue';
import { findSpecial } from '../../../api/home'
export default {
  name: "HomeSpecial",
  setup(){
      const list = ref([])
      findSpecial().then( data => {
          list.value = data.result
      })
      return { list }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/mixins.less";
@import "../../../assets/style/variables.less";
.box-card {
  width: 100%;
  border: none;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .txt {
      display: flex;
      justify-content: space-between;
      :first-child {
        margin-left: 30px;
        font-size: 30px;
        color: #333333;
      }
    }
    .button {
      font-size: 16px;
      color: #999999;
      line-height: 47px;
    }
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .special-list {
    height: 380px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .special-item {
      width: 404px;
      background: #fff;
      margin-left: 10px;
      .hoverShadow();
      a {
        display: block;
        width: 100%;
        height: 288px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .meta {
          background-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8),
            transparent 50%
          );
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 288px;
          .title {
            position: absolute;
            bottom: 0px;
            left: 0;
            padding-left: 16px;
            width: 70%;
            height: 70px;
            .top {
              color: #fff;
              font-size: 22px;
              display: block;
            }
            .sub {
              display: block;
              font-size: 19px;
              color: #999;
            }
          }
          .price {
            position: absolute;
            bottom: 25px;
            right: 16px;
            line-height: 1;
            padding: 4px 8px 4px 7px;
            color: @priceColor;
            font-size: 17px;
            background-color: #fff;
            border-radius: 2px;
          }
        }
      }
      .foot {
        height: 72px;
        line-height: 72px;
        padding: 0 20px;
        font-size: 16px;


        i {
          display: inline-block;
          width: 15px;
          height: 14px;
          margin-right: 5px;
          color: #999;
        }
        .like,
        .view {
          float: left;
          margin-right: 25px;
          vertical-align: middle;
        }
        .reply {
          float: right;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>