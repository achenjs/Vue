<template>
	<el-row class="container">
		<!-- <div class="xs"></div> -->
		<v-header :User='User'></v-header>
		<el-col :span="24" class="main" ref="main">
			<aside class="leftmenu" :style="{height: menuHeight}">
				<div class="Introduction">
					<div class="avatar">
						<input type="file" name="" value="" @change="uploadFile($event)" id="up" class="uploadInput">
						<input type="hidden" name="" value="" id="url">
						<img v-if="User.avatar_url == '#'" src="../assets/images/2.gif" width="100%" height="100%" alt="图片">
						<img v-else :src="User.avatar_url" alt="图片" width="100%" height="100%">
					</div>
					<div class="name">
						<span>{{User.name}}</span>
						<!-- <i>编辑资料</i> -->
					</div>
					<div class="company">
						{{User.role_name}}
					</div>
					<!-- <div class="email">
						<img src="../assets/images/email.png" alt="图片"><span :title="User.email">{{User.email}}</span>
					</div> -->
				</div>
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo home-menu"
				  @open="handleopen" @close="handleclose" @select="handleselect"
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
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item :to="{path: item.path}" class="grid-title" v-for="(item, index) in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
          <div class="itemName"><span>{{$route.name}}</span></div>
          <el-col :span="24" class="content-wrapper">
						<router-view></router-view>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
import upload from '../assets/js/upload'
import header from '../components/header/header.vue'
import profile from '../assets/json/profile'

const URL = 'https://apl-static.oss-cn-beijing.aliyuncs.com/'
	export default {
		data() {
			return {
				sysUserName: '',
				sysUserAvatar: '',
				User: {
					email: '',
					name: '',
					role_name: '',
					avatar_url: ''
    		},
				menuHeight: ''
			}
		},
		beforeCreate() {
			if (this.$route.query.id === 1) {
				this.$router.go(0)
			}
		},
  	created() {
			if (this.$router.options.routes[0].children) {
				var currentRoute = this.$router.currentRoute.path
				var start_path = this.$router.options.routes[0].children[0].path
				if (currentRoute != start_path && currentRoute != '/') {

				} else {
					this.$router.push(start_path)
				}
			} else {
				this.$router.push('/signin')
			}

		 	this.updateUser()
			this.autoHeight()
  	},
		methods: {
			autoHeight() {
				const height = $('.main').height()
				this.menuHeight = height - 20 + 'px'
			},
			//	获取用户信息
			updateUser() {
				var _this = this
				$.ajax({
					url: '/admin/api/v1/profile',
					success: function (result) {
						var data = result.result
						_this.User.email = data.email
						_this.User.name = data.name
						_this.User.role_name = data.role_name
						if (data.avatar_url === null || data.avatar_url === '') {
							_this.User.avatar_url = '#'
						} else {
							_this.User.avatar_url = URL + data.avatar_url
						}
					}
				})
			},
			//  上传
      uploadFile(ele) {
        var _this = this
        upload(ele.target, 1, () => {
          const obj = {
						url: $("#url").val()
					}
					$.ajax({
						url: '/admin/api/v1/profile',
						type: 'post',
						contentType: 'application/json',
						data: JSON.stringify(obj),
						success: function(result) {
							_this.$message({
	              message: result.message,
	              type: 'success'
	            })
							_this.updateUser()
						}
					})
        })
      },
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
				// this.$router.push(b)
			},
		},
		mounted() {

		},
		components: { 'v-header': header }
	}
</script>

<style lang="scss">
.el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title {
	color: #807f8a;
}
.el-menu .el-submenu.is-opened .el-submenu__title {
	color: #ffffff;
}
.el-menu-item, .el-submenu__title {
	height: 40px;
	line-height: 40px;
}
.el-submenu .el-menu-item {
	height: 40px;
	line-height: 40px;
}
.container {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
	.main {
		background-color: rgb(239, 239, 239);
		position: absolute;
		top: 60px;
		bottom: 0px;
		overflow-y: auto;
		aside {
			width: 230px;
			height: 600px;
			max-height: 700px;
			margin-top: 20px;
			background-color: #ffffff;
			position: fixed;
			overflow-y: scroll;
			left: 0;
			top: 60px;
			.Introduction {
				padding: 20px 20px 0;
				.avatar {
					width: 80px;
					height: 80px;
					margin: 20px auto;
					position: relative;
					.uploadInput {
						position: absolute;
						left: 0;
						top: 0;
						height: 80px;
						opacity: 0;
						cursor: pointer;
						width: 80px;
					}
					img {
						border: none;
						border-radius: 50%;
					}
				}
				.name {
					margin-bottom: 20px;
					span {
						font-size: 20px;
						letter-spacing: 2px;
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
					font-size: 14px;
					margin-bottom: 20px;
				}
				.email {
					margin-bottom: 10px;
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
						vertical-align: top;
						margin-top: 9px;
						color: #807f8a;
					}
				}
			}
			.home-menu {
				background-color: #ffffff;
				.el-submenu {
					&.is-opened {
						background-color: #027ee5;
						.icon-user {
							background-image: url('../assets/images/icon/APL-29.png');
						}
						.icon-project {
							background-image: url('../assets/images/icon/APL-33.png');
						}
						.icon-server {
							background-image: url('../assets/images/icon/APL-37.png');
						}
						.icon-custom {
							background-image: url('../assets/images/icon/APL-40.png');
						}
						.icon-examine {
							background-image: url('../assets/images/icon/APL-42.png');
						}
						.icon-serverList {
							background-image: url('../assets/images/icon/APL-44.png');
						}
						.icon-system {
							background-image: url('../assets/images/icon/APL-48.png');
						}
						.icon-BP {
							background-image: url('../assets/images/icon/APL-51.png');
						}
					}
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
						background-color: #42A5F5;
						.icon-user {
							background-image: url('../assets/images/icon/APL-29.png');
						}
						.icon-project {
							background-image: url('../assets/images/icon/APL-33.png');
						}
						.icon-server {
							background-image: url('../assets/images/icon/APL-37.png');
						}
						.icon-custom {
							background-image: url('../assets/images/icon/APL-40.png');
						}
						.icon-examine {
							background-image: url('../assets/images/icon/APL-42.png');
						}
						.icon-serverList {
							background-image: url('../assets/images/icon/APL-44.png');
						}
						.icon-system {
							background-image: url('../assets/images/icon/APL-48.png');
						}
						.icon-BP {
							background-image: url('../assets/images/icon/APL-51.png');
						}
						.icon-page1 {
							background-image: url('../assets/images/icon/APL-30.png');
						}
						.icon-page2 {
							background-image: url('../assets/images/icon/APL-31.png');
						}
						.icon-page3 {
							background-image: url('../assets/images/icon/APL-32.png');
						}
						.icon-page4 {
							background-image: url('../assets/images/icon/APL-34.png');
						}
						.icon-page5 {
							background-image: url('../assets/images/icon/APL-35.png');
						}
						.icon-page6 {
							background-image: url('../assets/images/icon/APL-36.png');
						}
						.icon-page7 {
							background-image: url('../assets/images/icon/APL-38.png');
						}
						.icon-page8 {
							background-image: url('../assets/images/icon/APL-39.png');
						}
						.icon-page9 {
							background-image: url('../assets/images/icon/APL-41.png');
						}
						.icon-page10 {
							background-image: url('../assets/images/icon/APL-43.png');
						}
						.icon-page11 {
							background-image: url('../assets/images/icon/APL-45.png');
						}
						.icon-page12 {
							background-image: url('../assets/images/icon/APL-47.png');
						}
						.icon-page13 {
							background-image: url('../assets/images/icon/APL-49.png');
						}
						.icon-page14 {
							background-image: url('../assets/images/icon/APL-50.png');
						}
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
			// overflow-y: scroll;
			padding: 20px;
			height: 100%;
			.grid-content {
				.breadcrumb-container {
					height: 50px;
					line-height: 50px;
					margin-bottom: 15px;
					background-color: #ffffff;
					.breadcrumb-inner {
						line-height: 50px;
						padding-left: 30px;
					}
				}
				.itemName {
					clear: both;
					padding: 20px 30px;
					background-color: #ffffff;
					color: #027ee5;
					font-size: 20px;
					height: 30px;
					line-height: 30px;
					span {
						display: inline-block;
						width: 100%;
						border-bottom: 1px solid #b9b9ba;
					}
				}
				.content-wrapper {
					padding: 0 30px 30px 30px;
					background-color: #ffffff;
					box-sizing: border-box;
					min-height: 535px;
				}
			}
		}
	}
}
</style>
