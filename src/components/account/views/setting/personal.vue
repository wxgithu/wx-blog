<template>
    <div class="personal">
        <table>
        <tbody class="information">
            <tr>
                <td class="top-line setting-title setting-verticle">
                    昵称:
                </td>
                <td class="col2">
                    {{user.user_name}}
                </td>
            </tr>
             <tr>
                <td class="top-line setting-title setting-verticle">
                    真实姓名:
                </td>
                <td class="col2">
                    <span>{{user.user_nickname}}</span>
                </td>
            </tr>
            <tr>
                <td class="top-line setting-title setting-verticle">
                    性别:
                </td>
                <td class="col2">
                    <span>{{user.user_sex}}</span>
                </td>
            </tr>
            <tr>
                <td class="top-line setting-title setting-verticle">
                    生日:
                </td>
                <td class="col2">
                    <span>{{user.user_birthday}}</span>
                </td>
            </tr>
            <tr>
                <td class="top-line setting-title setting-verticle">
                    地区:
                </td>
                <td class="col2">
                    <span>{{user.user_address}}</span>
                </td>
            </tr>
            <tr>
                <td class="top-line setting-title setting-verticle">
                    行业:
                </td>
                <td class="col2">
                    <span>{{user.user_work}}</span>
                </td>
            </tr>
            <tr>
                <td class="top-line setting-title setting-verticle">
                    职位:
                </td>
                <td class="col2">
                    <span>{{user.user_profess}}</span>
                </td>
            </tr>
            <tr>
                <td class="top-line setting-title setting-verticle">
                    简介:
                </td>
                <td class="col2">
                    <span>{{user.user_intro}}</span>
                </td>
            </tr>
            </tbody>
        </table>
        <Button type="primary" @click="modal1 = true" class="update">修改资料</Button>
        <Modal
            :mask-closable="false"
            v-model="modal1"
            title="修改资料"
            @on-ok="ok"
            @on-cancel="cancel"
            :style="mystyle"
           >
            姓名:<input type="text" class="modal">
            <br/>
            职位:<input type="text" class="modal">
            <br/>
            性别:<RadioGroup v-model="sex" class="sex">
                <Radio label="1">
                    <Icon type="ios-man" />
                    <span>男</span>
                </Radio>
                <Radio label="0">
                    <Icon type="ios-woman" />
                    <span>女</span>
                </Radio>
            </RadioGroup>
            <br/>
            生日:<DatePicker type="date" placeholder="选择日期" style="width: 170px" class="birthday"></DatePicker>
            <br/>
            地区:
            <Select
                placeholder="请选择省份"
                class="area"
                v-model="province"
                @change="city=0;district=0"
            >
                <Option v-for="(obj,index) in dsy" :value="index" :key="index">{{obj.name}}</Option>
            </Select>
            <Select
                placeholder="请选择城市"
                class="area"
                v-model="city"
                @change="district=0"
            >
                <Option v-for="(obj,index) in cityObj.city" :value="index" :key="index">{{obj.name}}</Option>
            </Select>
            <Select
                placeholder="请选择区域"
                class="area"
                v-model="district"
            >
                <Option v-for="(name,index) in districtObj.district" :value="index"  :key="index">{{name}}</Option>
            </Select>
            <br/>
            行业:<Cascader :data="data" v-model="value" class="work"></Cascader>
            简介:<textarea class="intro" placeholder="100字以内" cols="70" rows="5" maxlength="100"></textarea>
        </Modal>
    </div>
</template>
<script>
import docAPI from '../../api/api';
 export default {
        data () {
            return {
                mystyle:{
                    color:'#4d4d4d',
                },
               dsy:[
                    { name:"北京市", city: [
                        { name:"北京全市", district: ["东城区","西城区","崇文区","宣武区","朝阳区","丰台区"] }
                    ]},
                    { name:"河北省", city: [
                        { name: "石家庄市", district: ["长安区","桥东区","桥西区"] },
                        { name: "张家口市", district: ["下花园区","宣化县"] },
                        { name: "承德市", district: ["双桥区","双滦区","鹰手营子矿区","承德县"] }
                    ]}
                ],
                value:[],
                province: 0,
                city: 0,
                district: 0, 
                modal1: false,
                sex:'',
                user:{},
                data: [
                        {
                            value: '1',
                            label: '电子·微电子',
                        }, 
                        {
                            value: '2',
                            label: '通信(设备·运营·增值服务)',
                        },
                        {
                            value: '3',
                            label: '批发·零售',
                        },
                        {
                            value: '4',
                            label: '贸易·进出口',
                        },
                        {
                            value: '5',
                            label: '广告·会展·公关',
                        },
                        {
                            value: '6',
                            label: '家居·室内设计·装潢',
                        },
                        {
                            value: '7',
                            label: '医疗设备·器械',
                        },
                ],
            }
        },
        methods: {
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('取消修改');
            },
            getUserInfo() {
            docAPI.getInfo({ params: { uid: localStorage.uid } }).then((res) => {
                if (this.user == undefined) return {};
                this.user = res.data.user[0];
                res.data.user.forEach(element => {
                    element.user_birthday = element.user_birthday.slice(0, 10);
                });
                // console.log(res.data);
            })
        },
        },
        mounted(){
            this.getUserInfo();
        },
        computed: {
        cityObj: function () {
            return this.dsy[this.province];
        },
        districtObj: function () {
            return this.cityObj.city[this.city];
        },
    }
    }
</script>
<style lang="scss" scoped src="./personal.scss"></style>