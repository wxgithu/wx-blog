#设置客户端连接的编码
SET NAMES UTF8;
#丢弃数据库，如果存在
DROP DATABASE IF EXISTS blog;
#创建数据库，设置编码为utf8
CREATE DATABASE blog CHARSET=UTF8;
#进入该数据库
USE blog;
#用户表
CREATE TABLE users(
   user_id bigint(20) NOT NULL AUTO_INCREMENT,
   user_ip varchar(20) NOT NULL,
   user_name varchar(20) NOT NULL,
   user_password varchar(15) NOT NULL,
   user_email varchar(30) NOT NULL,
   user_profile_photo varchar(255) NOT NULL,
   user_level varchar(20) NOT NULL,
   user_rights varchar(20) NOT NULL,
   user_registration_time datetime NOT NULL,
   user_birthday date DEFAULT NULL,
   user_age tinyint(4) DEFAULT NULL,
   user_telephone_number int(11) NOT NULL,
   user_nickname varchar(20) NOT NULL,
   PRIMARY KEY ( user_id ),
   KEY user_name ( user_name ),
   KEY user_nickname ( user_nickname ),
   KEY user_email ( user_email ),
   KEY user_telephone_number ( user_telephone_number )
);
#插入数据
INSERT INTO users VALUES ('1', '1111', '张甲', 'zhangjia', '22@22.com', '图片', '1', '1', '2018-06-18 11:30:43', '2018-06-13', '20', '156666633', '张嘎');
INSERT INTO users VALUES ('2', '222', '张一', 'zhangyi', 'yi@qq.com', '图片2', '1', '1', '2018-06-18 11:31:33', '2018-06-18', '21', '1533625255', '张一一');






