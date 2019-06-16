/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 10.1.25-MariaDB : Database - blog
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`blog` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `blog`;

/*Table structure for table `article` */

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `article_id` bigint(255) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `title` text NOT NULL,
  `summary` varchar(100) NOT NULL,
  `detail` longtext NOT NULL,
  `article_views` bigint(20) NOT NULL,
  `article_comment_count` bigint(20) NOT NULL,
  `article_date` datetime NOT NULL,
  `article_like_count` bigint(20) NOT NULL,
  `article_author` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `article` */

insert  into `article`(`article_id`,`user_id`,`title`,`summary`,`detail`,`article_views`,`article_comment_count`,`article_date`,`article_like_count`,`article_author`) values (1,1,'一个神器倒下后，果不其然，又一个神器崛起','大家好，我是尚古。 如今的社会，几乎人人都离不开手机，我们早就习惯了用手机拍照、拍视频、发邮件、看新闻以及运行各种各样的应用。 为了获得一个最佳','::: hljs-center\n\n目前“**歌词适配**”的功能相对简单一些，没有杂七杂八的功能模块。\n\n:::\n# 权限管理实现\n## 1.角色列表页\n*1.1 完成roles组件静态布局*\nElemenet组件 Table 表格 展开行:\n通过设置 type=\"expand\" 和 Scoped slot 可以开启展开行功能，el-table-column 的模板会被渲染成为展开行的内容，展开行可访问的属性与使用自定义列模板时的 Scoped slot 相同。\n传送门:\n```&lt;template&gt;\n  <div>\n    \n    &lt;el-row&gt;\n      &lt;el-col :span=\"24\"&gt;\n        &lt;breadcrumb :level2=\"level2\" :level3=\"level3\"&gt;&lt;/breadcrumb&gt;\n      &lt;/el-col&gt;\n    &lt;/el-row&gt;\n    \n    &lt;el-row class=\"operate\"&gt;\n      &lt;el-col :span=\"24\"&gt;\n        &lt;el-button type=\"primary\" plain @click=\"visible=true\"&gt;添加角色&lt;/el-button&gt;\n      &lt;/el-col&gt;\n    &lt;/el-row&gt;\n    \n    &lt;el-row&gt;\n      &lt;el-col :sapn=\"24\"&gt;\n        &lt;el-table :data=\"userList\" style=\"width: 100%\" border&gt;\n          \n          &lt;el-table-column type=\"expand\"&gt;\n            \n            &lt;template slot-scope=\"props\"&gt;\n              \n              \n              \n\n              \n              &lt;el-row v-for=\"item in props.row.children\" :key=\"item.id\"&gt;\n                &lt;el-col :span=\"4\"&gt;\n                  &lt;el-tag closable&gt;{{item.authName}}&lt;/el-tag&gt;\n                  \n                  <i></i>\n                &lt;/el-col&gt;\n                &lt;el-col :span=\"20\"&gt;\n                  \n                  &lt;el-row v-for=\"level2 in item.children\" :key=\"level2.id\"&gt;\n                    &lt;el-col :span=\"4\"&gt;\n                      &lt;el-tag closable type=\"success\"&gt;{{level2.authName}}&lt;/el-tag&gt;\n                      \n                      <i></i>\n                    &lt;/el-col&gt;\n                    &lt;el-col :span=\"20\"&gt;\n                      &lt;el-tag closable  v-for=\"level3 in level2.children\" :key=\"level3.id\" type=\"warning\"&gt;{{level3.authName}}&lt;/el-tag&gt;\n                      \n                      <i></i>\n                    &lt;/el-col&gt;\n                  &lt;/el-row&gt;\n                &lt;/el-col&gt;\n              &lt;/el-row&gt;\n              &lt;el-row v-if=\"props.row.children.length==0\"&gt;\n                &lt;el-col :span=\"24\"&gt;没有分配权限&lt;/el-col&gt;\n              &lt;/el-row&gt;\n            &lt;/template&gt;\n          &lt;/el-table-column&gt;\n          \n          \n          &lt;el-table-column label=\"#\" width=\"30\" type=\"index\"&gt;&lt;/el-table-column&gt;\n          &lt;el-table-column prop=\"roleName\" label=\"角色名称\" width=\"180\"&gt;&lt;/el-table-column&gt;\n          &lt;el-table-column prop=\"roleDesc\" label=\"角色描述\" width=\"300\"&gt;&lt;/el-table-column&gt;\n          &lt;el-table-column label=\"操作\"&gt;\n            &lt;template slot-scope=\"scope\"&gt;\n              &lt;el-button type=\"primary\" plain size=\"mini\" icon=\"el-icon-edit\"&gt;&lt;/el-button&gt;\n              &lt;el-button type=\"danger\" plain size=\"mini\" icon=\"el-icon-check\"&gt;&lt;/el-button&gt;\n              &lt;el-button type=\"warning\" plain size=\"mini\" icon=\"el-icon-delete\"&gt;&lt;/el-button&gt;\n            &lt;/template&gt;\n          &lt;/el-table-column&gt;\n        &lt;/el-table&gt;\n      &lt;/el-col&gt;\n    &lt;/el-row&gt;\n  </div>\n&lt;/template&gt;\n&lt;script&gt;\nexport default {\n  //写了name方便在Vue Devtools谷歌插件应用内找到对应的组件\n  name: \"user\",\n  data() {\n    return {\n      level2: \"权限管理\",\n      level3: \"角色列表\",\n      //用户的数据\n      userList: []\n    };\n  },\n  methods: {},\n  //生命周期函数，回调函数\n  async created() {\n    let res = await this.$axios.get(\"roles\");\n    console.log(res);\n    this.userList = res.data.data;\n  }\n};\n&lt;/script&gt;\n&lt;style lang=\"scss\"&gt;\n#user {\n  .operate {\n    background-color: #e8edf3;\n  }\n  .el-dialog {\n    width: 30%;\n  }\n}\n&lt;/style&gt;\n\n```\n',234,231,'2019-05-07 04:57:00',90,'wenxue'),(2,1,'八款你听都没有听过，但超级好用的Wind','哈喽，大家好丫，今天给大家分享八个不为人知，但却十分好用的Windows神器，这八个软件五花八门，什么类型的都有，我最满意、最对我有用的就是多功','&gt; 哈喽，大家好丫，今天给大家分享八个不为人知，但却十分好用的Windows神器，这八个软件五花八门，什么类型的都有，我最满意、最对我有用的就是多功能OCR以及文档排版软件，其它的软件也许对你们有用。\n**1**\n#### 文件分类小工具\n&gt;你是否平时在学校用电脑处理完各种乱七八糟文件，随手丢在桌面上或某个文件夹内呢？你是否在网上收集和下载完各类素材后，随手将软件乱丢在杂乱的桌面上呢？你是否想将保存在电脑内的资料，不用手动逐一添加整理，想快速分类并能更快速的找到相应文件呢？这款软件就可以实现如上功能。\n- 磁盘空间占用分析\n- winsnap截图神器\n- dis++系统优化神器\n==科技，专注于电脑实用工具，手机软件，壁纸头像，一个让小伙伴们更会玩手机电脑的地方。==',34,45,'2019-05-01 21:09:00',23,'wenxue'),(3,2,'“我喜欢简单的民谣﻿，喜欢它悠扬的旋律﻿','我喜欢简单的民谣 喜欢它悠扬的旋律 欢快的像一个傻瓜 你说喜欢民谣的我 绿色是干净的 不过染上了情 我在昨天的梦里又看到了你 醒来之后才明白又是','::: hljs-center\n\n我喜欢简单的民谣\n\n喜欢它悠扬的旋律\n\n欢快的像一个傻瓜\n\n你说喜欢民谣的我\n:::\n|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n::: hljs-left\n\n它就是——恋爱话术官方版本竟然还需要充值VIP!这就相当于给很多男生设置了门槛不过它的确是个神器至少阿枫觉得我也很需要它...当然阿枫不会给大家分享付费的资源毕竟这是阿枫一贯的作风今天给大家分享的版本已经去掉了VIP并且还去掉了更新,大家可以畅快的使用(现在很多网上的版本都无法使用了，就是因为被迫更新)下面给大家介绍一下它可以做什么首页有很多的菜单比如“开场白”点进去就会有很多例子较你如何与妹子来一个完美的开场\n\n\n:::\n\n\n',667,68,'2019-05-20 16:23:06',45,'东侯春初dd'),(4,3,'那些曾让你溃不成军的话','1.向着阳光，野蛮生长。 2.星河滚烫 你是人间理想。 3.每一次的跌倒后重新站起来，都会让人变得愈发坚强。 4.生活，一半是回忆，一半是继续。','![bg](https://upload-images.jianshu.io/upload_images/12685383-a1c56d66d96c1d3b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/474/format/webp)\n1. 向着阳光，野蛮生长。\n2. 星河滚烫 你是人间理想。\n3. *每一次的跌倒后重新站起来，都会让人变得愈发坚强。*\n4. **人为什么要结婚？当你老的时候，或是需要被照顾的时候，那个人可以理直气壮的一直陪在你身边**\n![heart](https://upload-images.jianshu.io/upload_images/12685383-e4add53cb5015015.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/800/format/webp)',1345,243,'2019-05-14 09:00:00',678,'穿着parada'),(5,4,'起点再高，不努力仍然过不好一生','今天看到一个非常有气质的贫困申请，让我不免好奇起来。 一看他的照片，发现挺期文的一个人，戴着一副眼镜，很像是一个教师，里面的申请有一张放弃继承的','**一、什么是起点？什么是高起点？**\n起点就是最开始的那一点。在我的定义里，起点不是积累出来的，至少对于你我而言，我们的起点可以是父辈祖辈积累的，但不是我们能决定的，就像出身一样无法决定，所以才说父母决定了孩子的起跑线。一旦开始积累，其实就已经不在起点了，每个人最开始的起点也就是出生的那一刻。所谓的高起点，就是在家庭环境、先天特质、初始资源等方面具备优势。所以富裕家庭出身的人比一般人起点高、身体素质好的人比普通人起点高。当然，高起点也是相对的，有的人在特殊方面就具备一般人不具备的优势，比如先天身材高大的人，在打篮球上就具备高起点；《雨人》中患自闭症的雷蒙·巴比特在记忆方面就具有特殊优势；先天颜值高的人，那优势就更不用说了……或许每开始学习一个新的知识，一项新的技能，也算是一个新的起点，但这个起点严格上来说已经不是最初的起点了，而是在此之前已经积累过后的新起点，这不是我这篇文章的所指的起点，这篇文章的起点特指最开始的点。\n**二、为什么高起点的人更容易承受不了挫折？**\n&gt; 承受挫折的能力是在不断受挫的过程中磨练出来的，而高起点的人遭遇挫折的经历相对较少，所以一旦遇到挫折的时候，就容易出现耐受不良。假设在一个技能领域，专家的标准是100分，而高起点的人在家庭、资源、资质方面具备优势，所以很容易就能达到70分，也就是在开始阶段很容易跨越，但最后面的30分也是最艰难的，更容易出现大的瓶颈，而以往的一帆风顺使高起点的人缺乏克服挫折的经历，所以在遇到大的瓶颈时容易气馁，所以高起点的人容易有所小成，但很难耐下性子达到大成。比如仙侠小说里，大家族、大门派出生的人比散修具备很大优势，根骨优异的人比根骨差的人具备很大优势，所以，在修真之路上，这些具备初始优势的人，很容易跨越筑基、金丹等小境界，但正因为开始太容易了，而修真除了靠这些资源和资质，还需要靠心性，没有经过心性的打磨，后面的大境界就容易出现心魔，遇到无法跨越的瓶颈。反而是资质平平的主角，通过脚踏实地的一步步积累，在不断受挫中前进，在后面阶段更容易跨越瓶颈。龟兔赛跑可以说是解释高起点的人更容易不耐的绝佳例子。相比于大长腿的兔子，小短腿的乌龟在天赋上肯定是远远不如的，但为什么最后是乌龟获得了胜利呢？因为乌龟能够耐住性子，心无旁骛，心中只有一个目标。而兔子自恃天赋，一路上不断分心，最后反而与胜利失之交臂。很多天赋出色的人就是这样的，他们的起点很高，随便做做就可以做得很好，所以就不会死磕自己。他们很容易在一个领域入门并小有所成，不过一旦遇到瓶颈就容易丧失兴趣，然后注意力就转到了另一个新的领域，不断这样跳动，最后的结局就是没有在任何领域成为顶级高手。所以，开始太容易取得进展，不见得就是好事。起点高只是在开始的时候对你的进步有所加成，但到了后期，还是要比拼耐性，无法在一个方面深耕细作，不断打磨，就难以达到顶尖。',233,45,'2019-05-05 20:04:55',122,'冬后春初xa');

/*Table structure for table `carousel` */

DROP TABLE IF EXISTS `carousel`;

CREATE TABLE `carousel` (
  `img_id` int(11) NOT NULL,
  `img_url` varchar(64) DEFAULT NULL,
  `title` varchar(20) NOT NULL,
  `intro` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `carousel` */

insert  into `carousel`(`img_id`,`img_url`,`title`,`intro`) values (1,'http://127.0.0.1:3000/images/banner1.jpg','我在爱尔兰','爱尔兰（爱尔兰语：Poblacht na hÉireann；英语：Republic of Ireland）, 是一个西欧的议会共和制国家，西临大西洋，东靠爱尔兰海，与英国隔海相望，\r\n                        是北美通向欧洲的通道爱尔兰自然'),(2,'http://127.0.0.1:3000/images/banner2.jpg','一个人的东京','东京(Tokyo)是日本国的首都，是亚洲第一大城市，世界第二大城市。全球最大的经济中心之一。东京的著名观光景点有东京铁塔、皇居、国会议事堂、浅草寺、\r\n                浜离宫、上野公园与动物园'),(3,'http://127.0.0.1:3000/images/banner3.jpg','普罗旺斯的梦','普罗旺斯(Provence)位于法国东南部，毗邻地中海和意大利，从地中海沿岸延伸到内陆的丘陵地区，中间有大河“Rhone”流过。\r\n                    自古就以靓丽的阳光和蔚蓝的天空，迷人的地中海和心醉'),(4,'http://127.0.0.1:3000/images/banner4.jpg','相约夏威夷之夏','夏威夷州位于北太平洋中，距离美国本土3,700公里，总面积16,633平方公里，属于太平洋沿岸地区。\r\n                首府为檀香山。在1778至1898年间，夏威夷也被称为“三明治群岛”(Sandwich Islands)');

/*Table structure for table `chat` */

DROP TABLE IF EXISTS `chat`;

CREATE TABLE `chat` (
  `chat_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `chat_content` varchar(100) NOT NULL,
  `from_user_id` bigint(20) NOT NULL,
  `to_user_id` bigint(20) NOT NULL,
  `chat_time` datetime NOT NULL,
  PRIMARY KEY (`chat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8;

/*Data for the table `chat` */

insert  into `chat`(`chat_id`,`chat_content`,`from_user_id`,`to_user_id`,`chat_time`) values (75,'111',1,3,'2019-06-08 00:00:00'),(76,'222',1,3,'2019-06-08 00:00:00'),(77,'',1,3,'2019-06-08 00:00:00'),(78,'333',1,3,'2019-06-08 00:00:00'),(79,'333',1,3,'2019-06-08 00:00:00'),(80,'',1,3,'2019-06-08 00:00:00'),(81,'',1,3,'2019-06-08 00:00:00'),(82,'eee',1,3,'2019-06-08 00:00:00'),(83,'a萨达',1,3,'2019-06-08 00:00:00'),(84,'aa',1,3,'2019-06-08 00:00:00'),(85,'aa',1,3,'2019-06-08 13:20:00'),(86,'测试时间',1,3,'2019-06-08 13:21:00'),(87,'aaa',1,3,'2019-06-08 13:23:00'),(88,'zzz',1,3,'2019-06-08 13:23:00'),(89,'ccc',1,3,'2019-06-08 13:23:00'),(90,'aa',1,3,'2019-06-08 13:24:00'),(91,'asd',1,2,'2019-06-08 21:24:00'),(92,'1111',1,2,'2019-06-08 21:24:00');

/*Table structure for table `images` */

DROP TABLE IF EXISTS `images`;

CREATE TABLE `images` (
  `img_id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`img_id`)
) ENGINE=MEMORY DEFAULT CHARSET=utf8;

/*Data for the table `images` */

/*Table structure for table `review` */

DROP TABLE IF EXISTS `review`;

CREATE TABLE `review` (
  `review_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `article_id` bigint(20) NOT NULL,
  `review_date` datetime NOT NULL,
  `review_content` text NOT NULL,
  `like_count` bigint(20) NOT NULL,
  PRIMARY KEY (`review_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `review` */

insert  into `review`(`review_id`,`user_id`,`article_id`,`review_date`,`review_content`,`like_count`) values (3,3,2,'2019-06-01 11:26:11','现在在用everthing,也是秒出，但是有个问题，有时候办公不知道到要找哪个文件，所以，结合你之前的文档管理方法，两个结合起来用，会非常好，谢谢你的分享！',56),(4,4,2,'2019-06-02 04:26:21','先留言，再返回继续学习。',66),(5,1,3,'2019-06-03 16:26:29','小编写得很实用，关注“V微帮”公众号，回复“秘籍”送一套赚钱的实操项目给你',234),(6,2,3,'2019-06-04 12:00:00','好东西，收藏了，赶紧下载下来',124),(7,3,4,'2019-06-05 15:00:00','安利一款hope时间胶囊，活成希望的模样，到你想去的地方',22),(8,4,4,'2019-06-05 11:20:00','一罐好像不能加好友，可惜了，不过简述可以交流，足够了，好东西一起分享，开心',56),(9,1,5,'2019-06-05 10:00:00','怎麼說三星S10，一加7也隨便碾壓第二第三吧，這個排名不太靠譜！',88),(10,2,5,'2019-06-06 21:33:00','屏幕敢小点？价钱敢便宜点？制UI敢不带那么多小红点？',58),(11,3,3,'2019-06-06 09:21:00','写的很有深入感',54),(12,4,1,'2019-06-06 23:29:34','华为畅享7是华为近日在北京召开新品发布会推出的。定位一款入门级的千元机，该机可谓是华为眼下最便宜的华为手机，其做工用料还是不错的。外观方面，畅享7采用了5.0英寸的屏幕，屏幕覆盖有2.5D弧形玻璃。机身背面采用了经典三段式设计，大面积是金属材质，加上柔性喷砂工艺，摸上去手感细腻。',90);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_ip` varchar(20) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_password` varchar(15) NOT NULL,
  `user_email` varchar(30) DEFAULT NULL,
  `user_profile_photo` varchar(255) NOT NULL,
  `user_level` varchar(20) NOT NULL,
  `user_rights` varchar(20) NOT NULL,
  `user_registration_time` datetime NOT NULL,
  `user_birthday` date DEFAULT NULL,
  `user_age` tinyint(4) DEFAULT NULL,
  `user_telephone_number` char(11) NOT NULL,
  `user_nickname` varchar(20) NOT NULL,
  `user_write` bigint(20) DEFAULT NULL,
  `user_like` bigint(20) DEFAULT NULL,
  `user_sex` char(2) DEFAULT NULL,
  `user_address` varchar(20) DEFAULT NULL,
  `user_work` varchar(20) DEFAULT NULL,
  `user_profess` varchar(20) DEFAULT NULL,
  `user_intro` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_name` (`user_name`),
  KEY `user_nickname` (`user_nickname`),
  KEY `user_email` (`user_email`),
  KEY `user_telephone_number` (`user_telephone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`user_id`,`user_ip`,`user_name`,`user_password`,`user_email`,`user_profile_photo`,`user_level`,`user_rights`,`user_registration_time`,`user_birthday`,`user_age`,`user_telephone_number`,`user_nickname`,`user_write`,`user_like`,`user_sex`,`user_address`,`user_work`,`user_profess`,`user_intro`) values (1,'127.0.0.1','wenxue','wenxue@128','126734890@qq.com','http://127.0.0.1:3000/images/avatar1.jpg','1','1','2018-06-18 11:31:33','1997-11-09',21,'17624152936','雪儿',12,233,'女',NULL,NULL,NULL,NULL),(2,'255.255.155.1','东侯春初dd','aaaaaa@128','122342930@qq.com','http://127.0.0.1:3000/images/avatar2.jpg','1','2','2019-05-16 16:02:16','1978-09-11',37,'18876542890','侯东',2,56,'男',NULL,NULL,NULL,NULL),(3,'127.0.122.0','穿着parada','wenxue@128','122342930@qq.com','http://127.0.0.1:3000/images/avatar3.jpg','5','1','2019-05-02 19:57:16','1990-10-02',23,'13324567865','陈凯',3,123,'男',NULL,NULL,NULL,NULL),(4,'125.9.1.0','冬后春初xa','wenxue@128','122342930@qq.com','http://127.0.0.1:3000/images/avatar4.jpg','2','4','2019-05-02 19:57:21','1994-02-23',20,'13322459078','赵冬',23,44,'男',NULL,NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
