<template>
    <div class="base">
        <table>
            <tbody class="base-content">
                <tr>
                    <td class="top-line">
                        <div class="avatar">
                            <img :src="user.user_profile_photo" id="imgContent">
                        </div>
                    </td>
                    <td class="top-line">
                        <a class="btn btn-hollow">
                            <input @change="getFile($event)" @click="uploadImg()" id="file" type="file" class="hide" >
                             更改头像
                        </a>
                    </td>
                </tr>
                <tr>
                    <td class="setting-title">
                        昵称
                    </td>
                    <td>
                        <input type="text" placeholder="请输入昵称" v-model="name">
                    </td>
                </tr>
                <tr>
                    <td class="setting-title">电子邮件</td>
                    <td>
                        <Button @click="modal12 = true" class="btn btn-hollow">点击绑定</Button>
                        <Modal v-model="modal12" :mask-closable="false" title="绑定邮箱">
                            <div class="modal">
                                <form>
                                    <div>
                                        <div class="input-wrap">
                                            <input type="email" placeholder="请输入你的常用邮箱">
                                        </div>
                                    </div>
                                    <div class="form-item">
                                        <button type="button" class="auth-code-btn">
                                            发送验证码
                                        </button>
                                        <div class="input-wrap">
                                            <input type="text" placeholder="验证码">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Modal>
                    </td>
                </tr>
                <tr>
                    <td class="setting-title">手机</td>
                    <td class="setted">
                        <div>186****8589</div>
                        <Icon type="md-checkmark" />
                        <span>已验证</span>
                        <a class="cancel-bind">更换绑定的手机号</a>
                    </td>
                </tr>
                <tr>
                    <td class="setting-title setting-editor">常用编辑器</td>
                    <td>
                        <div class="col-xs-8 fl">
                            <input type="radio" name="tool" value="plain">
                            <span>富文本</span>
                        </div>
                        <div class="col-xs-16 fl">
                            <input type="radio" name="tool" value="markdown" checked>
                            <span>Markdown</span>
                        </div>
                        <p>切换后对新建文章生效</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <input type="submit" class="btn btn-success setting-save" @click="updateAvatar($event)" value="保存">
    </div>
</template>
<script>
import docAPI from '../../api/api';
export default {
    data() {
        return {
            modal12: false,
             user: {},
             name:"",
             file:"",
        }
    },
     mounted() {
        this.getUserInfo();
    },
    methods:{
        getUserInfo() {
            docAPI.getInfo({ params: { uid: localStorage.uid } }).then((res) => {
                if (this.user == undefined) return {};
                this.user = res.data.user[0];
                this.name = res.data.user[0].user_name;
                // console.log(this.user);
            })
        },
        getFile(event) {
            this.file = event.target.files[0];
            console.log(this.file);
        },
        //上传图像
        uploadImg(){
            //获取文件
            var file=document.getElementById("file").files[0];
            //创建读取文件的对象
            var reader = new FileReader();
            //创建文件读取相关的变量
            var imgFile;
            //为文件读取成功设置事件
            reader.onload=e=> {
                this.$Message.info('头像上传成功');
                imgFile = e.target.result;
                document.getElementById('imgContent').setAttribute('src', imgFile);
                // console.log(imgFile);
            };
            
            //正式读取文件
            if (file) {
                reader.readAsDataURL(file);
            }
        },
        //修改昵称、头像
        updateAvatar(event){
            event.preventDefault();//取消默认行为
             //创建 formData 对象
            // let formData = new FormData();
            // // 向 formData 对象中添加文件
            // formData.append('file',this.file.name);
            // formData.append('username',this.name);
            var params = {
                username:this.name,
                file:this.file,
            }
            console.log(params.file);
            // console.log(document.getElementById("file").files[0]);
            this.axios.post("http://127.0.0.1:3000/users/updateAvatar",params).then((res)=>{
                console.log(res);
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .ivu-modal-body{
        .modal{
            padding: 20px 20px 20px 20px;
            font-size: 15px;
            color: #333;
            button{
                background:red;
            }
            form {
                border: 1px solid #c8c8c8;
                border-radius: 4px;
                background-color: rgba(181, 181, 181, 0.1);
                overflow: hidden;
                .input-wrap{
                    overflow: hidden;
                input {
                    width: 100%;
                    line-height: 50px;
                    border: none;
                    background-color: transparent;
                    padding-left: 0;
                }
                }
                 .form-item {
                border-top: 1px solid #c8c8c8;
            }
           
            }
            .auth-code-btn {
                float: right;
                margin: 7px;
                height: 36px;
                line-height: 19px;
                border-radius: 18px;
                width: 120px;
            }
            .auth-code-btn {
                padding: 9px 18px;
                text-align: center;
                border: none;
                color: #fff;
                background: #3194d0;
                cursor: pointer;
                outline: none;
                display: block;
            }
        }
    }
</style>
<style lang="scss" scoped src="./base.scss"></style>