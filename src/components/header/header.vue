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
import header from './header'
export default header
</script>

<style lang="scss">
@import "./header"
</style>
