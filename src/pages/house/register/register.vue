<template>
  <view class="warp">
    <view class="main">
      <view class="header">
        <view class="left">
          <router-link to="/login"><i class="iconfont icon-iconfanhui"></i></router-link>
        </view>
        <view class="centers"><h1>注册</h1></view>
      </view>
      <view class="rmain">
        <view class="register-form">
          <view class="form-group">
           <!-- <input type="text" class="form-control yz" ref="yanzhen"  placeholder="验证码"> -->
            <view class="form-group-yz">
              <img @click="refreshpic" :src="imgSrc"  class="form-group-yz-img"/>
            </view>
          </view>
          <view class="form-group">
            <input type="text" class="form-control register-form-inp" placeholder="请输入手机号" ref="user" @keydown="btnYes">
            <view class="register-form-btn"><button ref="btn" :class="btnClassName" :disabled="btnBoolen" @click="getNoteValue">{{this.btnValue}}
			发送验证码
			</button></view>
          </view>
          <view class="form-group">
            <input type="text" class="form-control"  placeholder="请输入短信验证码" ref="note">
          </view>
          <view class="form-group">
            <input type="password" class="form-control" placeholder="密码" ref="pwd">
          </view>
		  <view class="form-group">
		    <input type="password" class="form-control" placeholder="公司名字" ref="pwd">
		  </view>
		  <view class="form-group">
		    <input type="password" class="form-control" placeholder="公司地址" ref="pwf">
		  </view>
		  <u-form-item :label-position="labelPosition" label="上传营业照" prop="license" label-width="150">
		  	<u-upload width="160" height="160" action="#"  ref="uUpload1" :auto-upload="false" max-count=1 @on-remove="deleteImgs"></u-upload>
		  	<text style="color: #999999;">最多只能上传1张图片，大小不超过1m</text>
		  </u-form-item>
		  <u-form-item :label-position="labelPosition" label="上传本人照片" prop="license" label-width="150">
		  	<u-upload width="160" height="160" action="#"  ref="uUpload1" :auto-upload="false" max-count=1 @on-remove="deleteImgs"></u-upload>
		  	<text style="color: #999999;">最多只能上传1张图片，大小不超过1m</text>
		  </u-form-item>
            <button type="button" class="btn btn-danger btn-lg btn-block" @click="navclick1">注册</button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
    export default {
        name: "Register",
        data(){
          return{
            //图片验证码
            Src:"http://vueshop.glbuys.com/api/vcode/chkcode?token=1ec949a15fb709370f&nowtime=1312423435",
            //用来发判断发送验证码
            isrefreshpic:false,
            //定时器初始值
            auth_time:0,
            //disabled的初始值
            btnBoolen:true,
            btnClassName:"btn",
            btnValue:"获取短信验证码"
          }
        },
        methods: {
			// 删除图片时触发事件
			deleteImgs(index,lists){
				console.log(index)
				console.log(lists)
			},
			Toaddress(){
				uni.chooseLocation({
						success:(res)=>{
							console.log('位置名称：' + res.name);
							console.log('详细地址：' + res.address);
							console.log('纬度：' + res.latitude);
							console.log('经度：' + res.longitude);
							let latitude = res.latitude; //纬度
							let longitude = res.longitude; //经度
							this.model.address = res.address
						}
						});
			},
				navclick(){
					console.log("===========")
					uni.navigateTo({
						url: '/pages/house/login/login'
					})
				},
				navclick(){
					console.log("===========")
					uni.navigateTo({
						url: '/pages/house/register/login/login'
					})
				},
          //图片验证码
          refreshpic: function () {
            var sj = Math.ceil(Math.random() * 100000)
            this.imgSrc = "http://vueshop.glbuys.com/api/vcode/chkcode?token=1ec949a15fb709370f&nowtime=1312423435" + sj
          },
          //zhuceyanzheng
          register: function () {
            var phone = this.$refs.user.value//手机号
            var pwd = this.$refs.pwd.value//密码
            var refreshImages = this.$refs.yanzhen.value//验证码
            if (refreshImages === "") {
              this.$toast("验证码不能为空")
              return
            } else if (phone === "") {
              this.$toast("手机号不能为空")
            } else {
              if (phone.length != 11) {
                this.$toast('请输入有效的手机号码，需是11位！');
                return;
              } else {
                var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
                if (!myreg.test(phone)) {
                  this.$toast('手机号码格式不正确');
                  return;
                } else {
                  var ifMessageOk =  this.getValue()
                  if(ifMessageOk){
                    // 匹配密码
                    if (pwd === "") {
                      this.$toast("密码不能为空")
                      return
                    } else {
                      var url = `http://vueshop.glbuys.com/api/home/user/reg?token=1ec949a15fb709370f&vcode=${refreshImages}&cellphone=${phone}&password=${pwd}`;
                      console.log(url)
                      //验证用户名是否存在
                      var urls = `http://vueshop.glbuys.com/api/home/user/isreg?token=386777c139fd9e2ac5&username=${phone}`;
                      this.$http.post(urls).then((res) => {
                        if (res.data.status == "0") {
                          this.$http.post(url).then((res) => {
                            console.log(res)
                            if (res.data.status == "0") {

                               this.$alert("注册成功")
                                location.href = `/#/login`

                            }
                          })
                        }
                      })
                  }
                  }
                }
              }
            }

          },
          //获取短信验证码的按钮禁启用
          btnYes: function () {
            //因为是从零开始所以当输入10位是其实为11位数，所以判断当输入的长度为10的时候解除按钮的禁用
            if(this.$refs.user.value.length=="10"){
              this.btnBoolen=false
              this.btnClassName="btns"
            }
          },
          //获取短信验证码
          getNoteValue: function () {
            var refreshImages = this.$refs.yanzhen.value//验证码
            console.log(this.$refs.btn)
            //验证码验证
            /*放短信轰炸
            * 思路：
            * 1.当输入完验证码的之后输入手机号进行手机号长度验证button是否禁启用，
            * 2.当点击button的时候判断验证码是否正确
            * 正确的话button出现倒计时并禁用按钮，倒计时结束启用，否则弹出输入的验证码不正确，到此来防止无限获取验证码
            * */
            //验证验证码是否为空
            if (refreshImages === "") {
              this.$toast("验证码不能为空")
              return
            } else {
              //如果不为则发送数据请求验证是否正确并将isrefreshpic 赋值为true 负责为false     （赋值可以省略不写）
              this.$http.get(`http://vueshop.glbuys.com/api/home/user/checkvcode?token=1ec949a15fb709370f&vcode=${refreshImages}`).then((res) => {
                if (res.data.code == "201") {
                  this.$toast("验证码输入正确")
                  this.isrefreshpic = true
                  //判断isrefreshpic的值是设置的值是否为true，如果为true，把button禁用显示倒计时否则不显示倒计时。
                  //如果为false则不显示倒计时。
                  if (this.isrefreshpic) {
                    var sj = Math.ceil(Math.random(10 + 1) * 100000)
                    window.localStorage.setItem("note", sj)
                    console.log(sj)
                    //定时器
                    this.auth_time = 10;
                    var timer = setInterval(()=>{
                      this.auth_time--;
                      if(this.auth_time<=0){
                        clearInterval(timer)
                        this.btnBoolen = false;
                        this.btnClassName="btns"
                        this.btnValue="获取短信验证码"
                      }else {
                        this.btnBoolen = true;
                        this.btnValue=`重新获取(${this.auth_time})S`
                        this.btnClassName="btn"
                      }
                    },1000)
                  } else {
                    this.$toast("验证码输入错误")
                  }
                } else {
                  this.$toast("验证码输入错误")
                  this.isrefreshpic = false
                }
              })
            }

          },
          //短信验证码的比对
          getValue: function () {
            var note = this.$refs.note.value//短信验证码
            var notes = window.localStorage.getItem('note')
            console.log(note)
            console.log(notes)
            if(note == "") {
              this.$alert("短信验证码不能为空")
              return  false;
            }else if(note == notes) {
              this.$alert("短信验输入正确");
              return true;
            }else{
              this.$alert("短信验输入错误")
              this.$refs.note.value=""
              return  false;
            }
          }
        }
    }
</script>
<style lang="scss" scoped>
  .h1, h1 {
    line-height: 1.5rem;
  }
  .btn-block {
    display: block;
    width: 90%;
    margin-left: 21rpx;
	background-color: #a0cfff;
  }
  .header{
    width: 100%;
    line-height: 1.5rem;
    display: flex;
    border-bottom: 1rpx solid #D6D6D6;
	// background-color: #a0cfff;
  }
  .header .left{
    flex: 1;
	// background-color: #a0cfff;
  }
  .header .centers{
    flex: 9;
    font-size: 20rpx;
    font-weight: normal;
    line-height: 1.5rem;
	// background-color: #a0cfff;
  }
  .form-control {
    display: block;
    width: 100%;
    height: 34rpx;
    padding: 6rpx 12rpx;
    font-size: 14rpx;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
	// background-color: #a0cfff;
  }
  .form-control {
    width: 90%;
    // margin-left: 5%;
    height: 45rpx;
    border-radius: 0;
	// background-color: #a0cfff;
  }
  .register-form {
    margin-top: 0.5rem;
	// background-color: #a0cfff;
  }

  .form-control {
    margin-bottom: 15rpx;
	// background-color: #a0cfff;
  }

  .register-form-inp {
    width: 63%;
    float: left;
	// background-color: #a0cfff;
  }
  .form-group {
    margin-bottom: 15rpx;
  }
  .register-form-btn {
    width: 30%;
    float: left;
    margin-left: 2%;
  }
  .register-form-btn .btn{
    background: #ccc;
    border: none;
  }
  .register-form-btn .btns{
    background: #fff;
    border: 1px solid #9e157c;
    color: #9e157c;
  }
  .form-group-yz {
    position: relative;
  }
  .form-group-yz-img {
    width: 1.4rem;
    height: 0.5rem;
    position: absolute;
    top: -48rpx;
    left: 75%;
  }
  .register-form-btn {
    width: 30%;
    float: left;
    margin-left: 2%;
	// background-color: #a0cfff;
  }
  .register-form-btn button {
    height: 45rpx;
    font-size: 0.2rem;
    color: #000000;
	// background-color: #a0cfff;
  }
</style>