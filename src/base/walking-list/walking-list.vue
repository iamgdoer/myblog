<template>
  <div class="walkListWrapper">
    <article v-for="item in blogList" v-show="!id">
      <div class="time">
        <div class="day">{{getDay(item.walking_blog_time)}}</div>
        <p class="month">{{getMonth(item.walking_blog_time)}}</p>
      </div>
      <div class="main">
        <div class="content">
          <img :src="item.w_img_url" v-show="item.w_img_url">
          <div class="text" v-html="item.walking_blog_content"></div>
        </div>
        <div class="tags" v-show="item.walking_blog_tags !== ''">
          <span v-for="tag in splitTags(item.walking_blog_tags)">● {{tag}}</span>
        </div>
        <div class="about">
          <span>热度({{item.walking_blog_likeNum}})</span>
          <span>评论({{item.comment_count}})</span>
          <span @click.stop="clickwalkingBlog(item.walking_blog_id)">全文链接</span>
          <span class="delete" v-show="manager.username" @click="deleteBlog(item.walking_blog_id)">删除</span>
        </div>
      </div>
    </article>
    <div class="detail">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    data () {
      return {
        // url: 'http://img5.duitang.com/uploads/item/201411/13/20141113195832_PAxSh.jpeg'
      };
    },
    props: {
      blogList: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    computed: {
      id () {
        return this.$route.params.id;
      },
      ...mapGetters([
        'manager'
      ])
    },
    methods: {
      getDay (time) {
        let myDate = new Date(time);
        return myDate.getDate();
      },
      getMonth (time) {
        let myDate = new Date(time);
        return myDate.getMonth() + 1;
      },
      splitTags (tags) {
        if (tags !== '') {
          return tags.split('/');
        } else {
          return '';
        }
      },
      clickwalkingBlog (id) {
        this.$emit('selectBlog', id);
      },
      deleteBlog (id) {
        this.$emit('deleteBlog', id);
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .walkListWrapper{
    padding: 40px 45px;
    article{
      display: flex;
      width: 640px;
      .time{
        width: 80px;
        .day{
          width: 70px;
          height: 70px;
          border: 5px solid #828d95;
          border-radius: 50%;
          font-size: 40px;
          font-family: "Rokkitt",arial,serif;
          line-height: 70px;
          text-align: center;
          color: #828d95;
          &:hover{
            color: #4d4d4d;
            border-color: #4d4d4d;
            transition: all .4s linear;
          }
        }
        .month{
          font-size: 24px;
          font-family: "Rokkitt",arial,serif;
          text-align: center;
          color: #c0c0c0;
          margin-top: 10px;
          &:hover{
            color: #4d4d4d;
            border-color: #4d4d4d;
            transition: all .4s linear;
          }
        }
      }
      .main{
        width: 100%;
        margin-left: 40px;
        background: url('./line.png') bottom repeat-x;
        padding:20px 0 48px 0;
        .content{
          font-size: 15px;
          color: #737373;
          line-height: 24px;
          img{
            width: 500px;
          }
        }
        .tags{
          font-size: 0;
          margin-top: 30px;
          span{
            display: inline-block;
            font-size: 12px;
            font-family: "Hiragino Sans GB","Microsoft YaHei";
            color: #FEFEFE;
            padding: 2px 8px;
            margin: 0 12px 10px 0;
            border-radius: 15px;
            white-space: nowrap;
            background: #828d95;
          }
        }
        .about{
          font-size: 0;
          color: #828d95;
          margin-top: 20px;
          zoom: 1;
          &:after{
            content: "\0020";
            display: block;
            height: 0;
            clear: both;
          }
          span{
            font-size: 12px;
            margin-right: 25px;
            cursor: pointer;
          }
          .delete{
            display: block;
            float: right;
            color: blue;
          }
        }
      }
    }
  }
</style>