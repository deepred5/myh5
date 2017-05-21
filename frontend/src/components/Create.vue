<template>
  <div class="create-modal">
    <div class="content">
      <input type="text" placeholder="请输入作品标题" v-model.trim="title" @keyup.enter="confirm">
      <p class="error">{{errorInfo}}</p>
    </div>
    <div class="footer">
      <span @click="confirm">确定</span>
      <span @click="cancel">取消</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean
      }
    },
    data() {
      return {
        title: '',
        errorInfo: ''
      }
    },
    methods: {
      cancel() {
        // 关闭遮罩
        this.$emit('input', false);
        this.title = '';
        this.errorInfo = '';
      },
      confirm() {
        if (!this.title) {
          this.errorInfo = '标题不能为空';
          return;
        }
        this.$http.post('/apis/work/create', {
          title: this.title
        }).then(res => {
          if (res.data.code === 0) {
            var id = res.data.id;
            this.$router.push({name: 'edit', params: {id: id}});
          } else {
            this.errorInfo = res.data.message;
          }
        });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .create-modal {
    .content {
      border-bottom: 1px solid #ccc;
      padding: 50px 80px;
      position: relative;
      input {
        width: 100%;
        height: 36px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding-left: 15px;
      }
      .error {
        position: absolute;
        bottom: 15px;
        left: 80px;
        color: #e67571;
        font-size: 14px;
      }
    }
    .footer {
      overflow: hidden;
      padding: 10px;
      span {
        cursor: pointer;
        color: #fff;
        float: right;
        padding: 5px 10px;
        background: #ada0e6;
        border-radius: 8px;
        margin-right: 8px;
        transition: .5s;
        &:hover {
          background: #6859aa;
        }
      }
      span:last-child {
        background: #e67571;
        &:hover {
          background: #d52e28;
        }
      }
    }
  }
</style>
