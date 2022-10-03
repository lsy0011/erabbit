<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form
      class="form"
      :validation-schema="schema"
      autocomplete="off"
      v-slot="{ errors }"
      ref="formCom"
    >
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.account }"
              v-model="form.account"
              name="account"
              type="text"
              placeholder="请输入用户名或手机号"
            />
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />{{ errors.account }}
          </div>
        </div>
        <div class="form-item" v-if="!isMsgLogin">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              :class="{ error: errors.password }"
              v-model="form.password"
              name="password"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.mobile }"
              v-model="form.mobile"
              name="mobile"
              type="text"
              placeholder="请输入手机号"
            />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              :class="{ error: errors.code }"
              v-model="form.code"
              name="code"
              type="password"
              placeholder="请输入验证码"
            />
            <span class="code" @click="send()">{{
              time === 0 ? "发送验证码" : `${time}秒后发送`
            }}</span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />{{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field
            as="XtxCheckbox"
            name="isAgree"
            v-model="form.isAgree"
            :class="{ error: errors.isAgree }"
            type="isAgree"
          />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning" />{{ errors.isAgree }}
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login()" :plain="true">登录</a>
    </Form>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch, onUnmounted } from "vue";
import { Form, Field } from "vee-validate";
import veeSchema from "../../../utils/vee-validate-schema";
import {
  userAccountLogin,
  userMobileLogin,
  userMobileLoginMsg,
} from "../../../api/user";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { useIntervalFn } from "@vueuse/core";
export default {
  name: "LoginForm",
  components: { Form, Field },
  setup() {
    // 是否短信登录
    const isMsgLogin = ref(false);
    // 表单信息对象
    const form = reactive({
      isAgree: true,
      account: "ydsuper",
      password: "123123",
      mobile: null,
      code: null,
    });
    const mySchema = {
      account: veeSchema.account,
      password: veeSchema.password,
      mobile: veeSchema.mobile,
      code: veeSchema.code,
      isAgree: veeSchema.isAgree,
    };
    const formCom = ref(null);
    watch(isMsgLogin, () => {
      // 还原数据
      form.isAgree = true;
      form.account = "ydsuper";
      form.password = "123123";
      form.mobile = null;
      form.code = null;
      // 补充校验效果清除，Form组件提供resetForm()
      formCom.value.resetForm();
    });
    const login = async () => {
      // Form组件提供了一个 validate 函数作为整体表单校验，当是返回的是一个promise
      const valid = await formCom.value.validate();
      console.log(valid);
      if (valid) {
        // 发送请求
        if (!isMsgLogin.value) {
          // 帐号密码登录
          userAccountLogin(form.account, form.password)
            .then((data) => {
              // 成功
              // 1. 存储信息
              const { id, account, nickname, avatar, token, mobile } =
                data.result;
              store.commit("user/setUser", {
                id,
                account,
                nickname,
                avatar,
                token,
                mobile,
              });
              // 2. 提示
              ElMessage({
                message: "登陆成功",
                type: "success",
              });
              // 3. 跳转
              router.push(route.query.redirectUrl || "/");
            })
            .catch((e) => {
              // 失败
              ElMessage.error("登录失败");
            });
        } else {
          // 短信登录
          userMobileLogin(form.mobile)
            .then((data) => {
              // 成功
              // 1. 存储信息
              const { id, account, nickname, avatar, token, mobile } =
                data.result;
              store.commit("user/setUser", {
                id,
                account,
                nickname,
                avatar,
                token,
                mobile,
              });
              ElMessage({
                message: "登陆成功",
                type: "success",
              });
              // 3. 跳转
              router.push(route.query.redirectUrl || "/");
            })
            .catch((e) => {
              // 失败
              ElMessage.error(e.response.data.message || "登录失败");
            });
        }
      }
    };

    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const time = ref(0);
    const { pause, resume } = useIntervalFn(() => {
      // time.value--
      if (time.value <= 0) {
        pause()
      }
    }, 1000, false)
    onUnmounted(() => {
      pause()
    })

    const send = async () => {
      const valid = mySchema.mobile(form.mobile);
      // console.log("valid", valid);
      if (valid === true) {
        // 通过
        if (time.value === 0) {
          // 没有倒计时才可以发送
          await userMobileLoginMsg(form.mobile);
          ElMessage({
            message: "发送成功",
            type: "success",
          });
          time.value = 60;
          resume();
        }
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formCom.value.setFieldError("mobile", valid);
      }
    };
    return { send, time, isMsgLogin, form, schema: mySchema, formCom, login };
  },
};
</script>


<style lang="less" scoped>
@import "../../../assets/style/variables.less";
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>