<template>
	<el-row class="container">
		<v-header :User='User'></v-header>
		<el-col :span="24" class="main">
			<aside>
				<div class="Introduction">
					<div class="avatar">
						<img :src="this.sysUserAvatar" alt="图片" width="100%" height="100%">
					</div>
					<div class="name">
						<span>{{this.sysUserName}}</span><i>编辑资料</i>
					</div>
					<div class="company">
						北京天投科技信息....
					</div>
					<div class="email">
						<img src="../assets/images/email.png" alt="图片"><span :title="User.email">{{User.email}}</span>
					</div>
				</div>
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo home-menu" @open="handleopen" @close="handleclose" @select="handleselect"
					theme="dark" unique-opened router>
					<template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" v-if="!child.hidden" :key="child.path"><i :class="child.iconCls"></i>{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf && item.children.length > 0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
					</el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<el-breadcrumb separator="->" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition>
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
import axios from 'axios'
import header from '../components/header/header.vue'
	export default {
		data() {
			return {
				sysUserName: '',
				sysUserAvatar: '',
				User: {
				  email: '',
          name: ''
        },
			}
		},
    created() {
		  $.get('http://172.16.46.53:5000/admin/api/v1/profile', (result) => {
		    console.log(result)
      })
//		  axios.get('http://172.16.46.53:5000/admin/api/v1/profile')
//        .then((result) => {
//		        var data = result.data.result
//            this.User.email = data.email
//        })
    },
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this
				this.$confirm('确认退出吗?', '提示', {

				}).then(() => {
					sessionStorage.removeItem('user')
					_this.$router.push('/signin')
				}).catch(() => {
					console.log('退出异常!')
				})
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user')
			if (user) {
				user = JSON.parse(user)
				this.User = user
				this.sysUserName = user.name || ''
				this.sysUserAvatar = user.avatar || ''
			}
		},
		components: { 'v-header': header }
	}
</script>

<style lang="scss">
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: #000;
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
					font-size: 20px;
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
		.main {
			background-color: rgb(239, 239, 239);
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				width: 230px;
				margin-top: 20px;
				background-color: #ffffff;
				.Introduction {
					width: 100%;
					padding: 20px 20px 0;
					.avatar {
						width: 80px;
						height: 80px;
						margin: 20px auto;
						border-radius: 50%;
					}
					.name {
						margin-bottom: 20px;
						span {
							font-size: 20px;
						}
						i {
							float: right;
							cursor: pointer;
							display: inlien-block;
							width: 80px;
							height: 24px;
							font-size: 12px;
							line-height: 24px;
							text-align: center;
							color: rgb(181, 181, 181);
							border: 1px solid rgb(181, 181, 181);
							border-radius: 10px;
						}
					}
					.company {
						fonts-size: 16px;
						margin-bottom: 20px;
					}
					.email {
						margin-bottom: 30px;
						img {
							width: 34px;
							height: 28px;
							margin-right: 10px;
							vertical-align: middle;
						}
						span {
              display: inline-block;
							font-size: 14px;
              width: 145px;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
						}
					}
				}
				.home-menu {
					background-color: #ffffff;
					color: #807f8a;
					.el-submenu {
						[class^=icon-] {
							display: inline-block;
							width: 26px;
							height: 24px;
							vertical-align: middle;
    						margin-right: 10px;
							background-repeat: no-repeat;
							background-size: 100% 100%;
						}
						.el-menu {
							background-color: #ffffff;
						}
						.icon-user {
							background-image: url('../assets/images/icon/APL-04.png');
						}
						.icon-project {
							background-image: url('../assets/images/icon/APL-08.png');
						}
						.icon-server {
							background-image: url('../assets/images/icon/APL-12.png');
						}
						.icon-custom {
							background-image: url('../assets/images/icon/APL-16.png');
						}
						.icon-examine {
							background-image: url('../assets/images/icon/APL-18.png');
						}
						.icon-serverList {
							background-image: url('../assets/images/icon/APL-20.png');
						}
						.icon-system {
							background-image: url('../assets/images/icon/APL-24.png');
						}
						.icon-BP {
							background-image: url('../assets/images/icon/APL-27.png');
						}
						.icon-page1 {
							background-image: url('../assets/images/icon/APL-05.png');
						}
						.icon-page2 {
							background-image: url('../assets/images/icon/APL-06.png');
						}
						.icon-page3 {
							background-image: url('../assets/images/icon/APL-07.png');
						}
						.icon-page4 {
							background-image: url('../assets/images/icon/APL-09.png');
						}
						.icon-page5 {
							background-image: url('../assets/images/icon/APL-10.png');
						}
						.icon-page6 {
							background-image: url('../assets/images/icon/APL-11.png');
						}
						.icon-page7 {
							background-image: url('../assets/images/icon/APL-14.png');
						}
						.icon-page8 {
							background-image: url('../assets/images/icon/APL-15.png');
						}
						.icon-page9 {
							background-image: url('../assets/images/icon/APL-17.png');
						}
						.icon-page10 {
							background-image: url('../assets/images/icon/APL-19.png');
						}
						.icon-page11 {
							background-image: url('../assets/images/icon/APL-21.png');
						}
						.icon-page12 {
							background-image: url('../assets/images/icon/APL-23.png');
						}
						.icon-page13 {
							background-image: url('../assets/images/icon/APL-25.png');
						}
						.icon-page14 {
							background-image: url('../assets/images/icon/APL-26.png');
						}
						.is-active {
							color: #ffffff;
							background-color: rgb(2, 126, 229);
						}
					}
				}
			}
			.content-container {
				position: absolute;
				right: 0px;
				top: 0px;
				bottom: 0px;
				left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					height: 50px;
					line-height: 50px;
					margin-bottom: 15px;
					background-color: #ffffff;
					.breadcrumb-inner {

					}
				}
				.content-wrapper {
					background-color: #ffffff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
