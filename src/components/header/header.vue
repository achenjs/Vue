<template>
    <el-col :span="24" class="header">
        <el-col :span="14" class="logo">
            <img src="../../assets/images/logo.png" />
            <!-- <span><i class="line"></i>首页</span> -->
        </el-col>
        <el-col :span="10" class="userinfo">
            <span>{{User.email}}</span><i class="line"></i>
            <!-- <span>个人中心</span><i class="line"></i> -->
            <span @click="logout">退出</span>
        </el-col>
    </el-col>
</template>

<script>
export default{
    data () {
        return {

        }
    },
    props: {
        User: {
            type: Object
        }
    },
    methods: {
        //退出登录
        logout: function () {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {
            }).then(() => {
              $.ajax({
                url: '/admin/api/v1/logout',
                success: function(result) {
                  _this.$router.push('/admin/signin')
                }
              })
            }).catch(() => {
              console.log('错误!')
            });
        }
    }
}
</script>

<style lang="scss">
.header {
    height: 60px;
    line-height: 60px;
    background: #000;
    font-size: 12px;
    color: #ffffff;
    .line {
        display: inline-block;
        height: 30px;
        vertical-align: top;
        margin-top: 15px;
        border-left: 1px solid #ffffff;
        color: #ffffff;
    }
    .userinfo {
        color: #ffffff;
        text-align: right;
        padding-right: 35px;
        span {
            margin: 0 15px;
            cursor: pointer;
            &:nth-of-type(1) {
                cursor: inherit;
            }
        }
    }
    .logo {
        font-size: 22px;
        img {
            width: 110px;
            vertical-align: middle;
            margin: 0 60px;
        }
        span {
            font-size: 16px;
            .line {
                display: inline-block;
                height: 30px;
                vertical-align: top;
                margin-top: 15px;
                border-left: 1px solid #ffffff;
                color: #ffffff;
                margin-right: 30px;
            }
        }
    }
}
</style>
