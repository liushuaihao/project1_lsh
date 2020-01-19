<template>
	<div id="login">
		<div id="login_box">
			<div class="top">
				信息维护系统{{index==0?'登陆':'注册'}}
			</div>
			<el-row class="content">

				<el-col v-if="index==0" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="input">
					账号<el-input v-model="login_in.user" placeholder="请输入账号"></el-input>
					密码<el-input placeholder="请输入密码" v-model="login_in.pass" show-password></el-input>
				</el-col>

				<el-col v-if="index==1" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="input">
					<label for="file" style="margin-left: 50%;transform: translate(-50%, 0)">
						<div class="imgurl">
							<img v-if='login_up.imgurl' :src="'http://localhost:3000/'+login_up.imgurl" class="image_box">
							<input v-show="false" type="file" ref="file" id="file" @change='fileimg' accept="image/gif, image/jpeg">

						</div>
					</label>
					昵称<el-input v-model="login_up.user" placeholder="请输入昵称"></el-input>
					密码<el-input placeholder="请输入密码" v-model="login_up.pass" show-password></el-input>
				</el-col>

				<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
					<el-button :type="index==0?'primary':''" @click="tab(0)">登录</el-button>
				</el-col>
				<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
					<el-button :type="index==1?'primary':''" @click="tab(1)">注册</el-button>
				</el-col>
			</el-row>
		</div>

	</div>
</template>

<script>
	import Axios from "axios"
	export default {
		data() {
			return {
				index: 0,
				login_in: {
					user: "1001",
					pass: "666"
				},
				login_up: {
					user: "",
					pass: "",
					"imgurl": ""
				},
				get_img: "",
				imgurl: ""
			}
		},
		methods: {
			fileimg() {
				var f = this.$refs.file.files[0];
				var d = new FormData;
				console.log(f);
				d.append('img', f);
				Axios.post('api/file', d, {
						emulateJSON: true
					})
					.then(data => {
						console.log(data)
						this.imgurl = data.data.data;
						this.login_up.imgurl = this.imgurl;
						
					})
			},
			tab(i) {
				if (i == this.index) {
					if (i == 0) {
						console.log("dl")
						Axios.post('api/in',this.login_in).then(res => {
							if (res.data.type == 0) {
								alert("信息不全")
							}else(
								console.log(res.data)
							)
						})
					} else {
						console.log("zc")
						Axios.post('api/up',this.login_up).then(res => {	
							if (res.data.type == 0) {
								alert("信息不全")
							}else(
								console.log(res.data)
							)
						})
					}
				} else {
					this.index = i
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#login {
		width: 100%;
		height: 100vh;
		position: relative;
		background: #00B7FF;

		#login_box {
			width: 400px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.imgurl {
		width: 100px;
		height: 100px;
		background: #000000;
		overflow: hidden;
		border-radius: 50%;
		margin: 0 auto;
		position: relative;

		.image_box {
			width: 200%;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}


	.top {
		height: 117px;
		background-color: #0371d1;
		border-radius: 12px 12px 0 0;
		font-size: 30px;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0;
		color: #fff;
		line-height: 117px;
		text-align: center;
		overflow: hidden;
		position: relative;

		&:after {
			content: "";
			display: inline-block;
			width: 74px;
			height: 74px;
			background: #fff;
			opacity: .1;
			border-radius: 0 0 74px 0;
			position: absolute;
			left: 0;
			top: 0;
		}

		&:before {
			content: "";
			display: inline-block;
			width: 74px;
			height: 74px;
			background: #fff;
			opacity: .1;
			border-radius: 0 0 0 74px;
			position: absolute;
			right: 0;
		}
	}

	.content {
		background: #fff;
		border-radius: 0 0 10px 10px;
		.input {
			width: 300px;
			margin: 0 50px;
			padding-top: 40px;
			padding-bottom: 40px;

			.el-input {
				margin-bottom: 10px;
			}
		}

		.el-button {
			width: 100%
		}
	}
</style>
