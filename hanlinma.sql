/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 50637
 Source Host           : 127.0.0.1:3306
 Source Schema         : hanlinma

 Target Server Type    : MySQL
 Target Server Version : 50637
 File Encoding         : 65001

 Date: 03/05/2018 15:05:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for hlm_admin_group
-- ----------------------------
DROP TABLE IF EXISTS `hlm_admin_group`;
CREATE TABLE `hlm_admin_group` (
  `admin_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '管理员 ID',
  `group_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '用户组 ID',
  UNIQUE KEY `admin_id_group_id` (`admin_id`,`group_id`) USING BTREE,
  KEY `admin_id` (`admin_id`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='管理员与用户分组中间表';

-- ----------------------------
-- Records of hlm_admin_group
-- ----------------------------
BEGIN;
INSERT INTO `hlm_admin_group` VALUES (1, 1);
INSERT INTO `hlm_admin_group` VALUES (3, 2);
COMMIT;

-- ----------------------------
-- Table structure for hlm_admins
-- ----------------------------
DROP TABLE IF EXISTS `hlm_admins`;
CREATE TABLE `hlm_admins` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT '' COMMENT '用户名',
  `pwd` varchar(32) DEFAULT '' COMMENT '密码',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否启用',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='管理员表';

-- ----------------------------
-- Records of hlm_admins
-- ----------------------------
BEGIN;
INSERT INTO `hlm_admins` VALUES (1, 'admin', 'c4ca4238a0b923820dcc509a6f75849b', 1516199090, 1);
INSERT INTO `hlm_admins` VALUES (3, 'info', 'c4ca4238a0b923820dcc509a6f75849b', 1516199548, 1);
COMMIT;

-- ----------------------------
-- Table structure for hlm_article
-- ----------------------------
DROP TABLE IF EXISTS `hlm_article`;
CREATE TABLE `hlm_article` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '标题',
  `thumb` varchar(255) DEFAULT '' COMMENT '文章缩略图',
  `author` varchar(50) NOT NULL DEFAULT '' COMMENT '文章作者',
  `content` mediumtext COMMENT '内容',
  `cid` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '所属栏目',
  `click_num` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '点击次数',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `up_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间',
  `is_del` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否删除（0否 1是）',
  `del_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '删除时间',
  `admin_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '管理员 ID',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC COMMENT='文章表';

-- ----------------------------
-- Records of hlm_article
-- ----------------------------
BEGIN;
INSERT INTO `hlm_article` VALUES (1, '988建站套餐', '', 'tylergong', '988建站套餐', 2, 67, 1516114099, 1518272271, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (2, '1988建站套餐', '', 'gongming', '1988建站套餐', 3, 24, 1516114657, 1518272261, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (3, '网站定制开发', '', '123', '网站定制开发', 4, 5, 1516116399, 1518272623, 0, 1518272604, 1);
INSERT INTO `hlm_article` VALUES (4, '企业系统开发', '', 'tang', '企业系统开发', 5, 4, 1518272246, 1518272286, 0, 1518272286, 1);
INSERT INTO `hlm_article` VALUES (5, '联系我们', '', 'gg', '联系我们', 28, 27, 1518272346, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (6, '公司介绍', '', 'g', '公司介绍', 22, 6, 1518272356, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (7, '技术团队', '', 'g', '技术团队', 23, 4, 1518272366, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (8, '信息系统维护服务', '', 'tylergong', '信息系统维护服务', 11, 12, 1518272367, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (9, '网络系统维护服务', '', 'tylergong', '网络系统维护服务', 12, 5, 1518272368, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (10, '网络布线工程服务', '', 'tylergong', '网络布线工程服务', 13, 2, 1518272369, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (11, '安防监控工程服务', '', 'tylergong', '安防监控工程服务', 14, 1, 1518272370, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (12, '网站排名优化', '', 'tylergong', '网站排名优化', 7, 10, 1518272371, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (13, '品牌推广策划', '', 'tylergong', '品牌推广策划', 8, 7, 1518272372, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (14, '推广培训课程', '', 'tylergong', '推广培训课程', 9, 2, 1518272373, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (15, '新闻资讯文章一', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'gm', '新闻资讯文章一', 25, 1, 1518272374, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (16, '新闻资讯文章二', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '新闻资讯文章二', 25, 1, 1518272375, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (17, '新闻资讯文章三', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '新闻资讯文章三', 26, 1, 1518272376, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (18, '新闻资讯文章四', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '新闻资讯文章四', 26, 2, 1518272377, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (19, '新闻资讯文章五', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tang', '新闻资讯文章五', 27, 1, 1518272378, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (20, '新闻资讯文章六', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tang', '新闻资讯文章六', 27, 3, 1518272379, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (21, '新闻资讯文章七', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tang', '新闻资讯文章七', 27, 6, 1518272381, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (22, '新闻资讯文章八', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tang', '新闻资讯文章八', 25, 44, 1518272384, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (23, '企业网站案例一', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '企业网站案例一', 17, 6, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (24, '企业网站案例二', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '企业网站案例二', 17, 1, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (25, '企业网站案例三', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '企业网站案例三', 17, 2, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (26, '企业网站案例四', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '企业网站案例四', 17, 1, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (27, '企业网站案例五', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '企业网站案例五', 17, 2, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (28, '排名优化案例一', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '排名优化案例一', 18, 2, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (29, '排名优化案例二', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '排名优化案例二', 18, 1, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (30, '排名优化案例三', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '排名优化案例三', 18, 1, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (31, '网络工程案例一', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '网络工程案例一', 19, 1, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (32, '网络工程案例二', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '网络工程案例二', 19, 2, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (33, '安防监控案例一', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '安防监控案例一', 20, 1, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (34, '安防监控案例二', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '安防监控案例二', 20, 1, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (35, '安防监控案例三', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '安防监控案例三', 20, 1, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (36, '安防监控案例四', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '安防监控案例四', 20, 1, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (37, '企业网站案例六', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '企业网站案例六', 17, 1, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (38, '企业网站案例七', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tylergong', '企业网站案例七', 17, 1, 1518281926, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (39, '网络工程案例三', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tang', '网络工程案例三', 19, 2, 1518281928, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (40, '网络工程案例四', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'tang', '网络工程案例四', 19, 3, 1518281929, 0, 0, 0, 0);
INSERT INTO `hlm_article` VALUES (41, '1', '', '1', '                        <p></p>\r\n                    <p>1</p>', 1, 1, 1518356845, 0, 0, 0, 1);
INSERT INTO `hlm_article` VALUES (42, '123', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', '123', '                        <p>                        </p><p>                        </p><p></p>\r\n                    <p><img src=\"/uploads/20180211/399566c698f777b3d218a3713c17f8a9.jpg\" alt=\"1-1g125145i3629\" style=\"max-width: 100%;\">123123</p><p></p>\r\n                    <p></p>\r\n                    <p><br></p>', 22, 1, 1518361458, 1518361716, 0, 0, 1);
COMMIT;

-- ----------------------------
-- Table structure for hlm_attachment
-- ----------------------------
DROP TABLE IF EXISTS `hlm_attachment`;
CREATE TABLE `hlm_attachment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) DEFAULT '' COMMENT '文件名称',
  `path` varchar(255) DEFAULT '' COMMENT '文件路径',
  `extension` char(5) DEFAULT '' COMMENT '文件扩展名',
  `createtime` int(11) unsigned DEFAULT '0' COMMENT '上传时间',
  `size` int(10) unsigned DEFAULT '0' COMMENT '文件大小',
  `md5` char(32) DEFAULT '' COMMENT '文件hash散列值 md5',
  `sha1` char(255) DEFAULT '' COMMENT '文件hash散列值 sha1',
  PRIMARY KEY (`id`),
  KEY `md5` (`md5`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='上传文件日志记录表';

-- ----------------------------
-- Records of hlm_attachment
-- ----------------------------
BEGIN;
INSERT INTO `hlm_attachment` VALUES (1, '45aa7fc429d1e6a48eef691a57e77c86.jpg', '/uploads/2018-02-11/20180211/45aa7fc429d1e6a48eef691a57e77c86.jpg', 'jpg', 1518358445, 52990, 'c7703368f2722f79700fe79a9e96fe5a', '8883da8ded5ab55ada3f67b5d296ea079e7860b2');
INSERT INTO `hlm_attachment` VALUES (2, '09cfb161775675903fb9c9696c77e5c5.jpg', '/uploads/20180211/09cfb161775675903fb9c9696c77e5c5.jpg', 'jpg', 1518358881, 46623, 'c879034d958a4ce0f69d086811725e6b', 'f32e3f9c788e1d74b7d5a490fe7f642ee6852415');
INSERT INTO `hlm_attachment` VALUES (3, '25742fb8533cabd7f40ff665aa1f4132.jpg', '/uploads/20180211/25742fb8533cabd7f40ff665aa1f4132.jpg', 'jpg', 1518360723, 11679, 'd080c6d2c89de8fbcf29d71b8d1db50b', '1fb6a984bbac26cc9f6fd91501c4bd7d978724ef');
INSERT INTO `hlm_attachment` VALUES (4, '48218a716e4055813eea826f67593cf3.jpg', '/uploads/20180211/48218a716e4055813eea826f67593cf3.jpg', 'jpg', 1518360854, 29744, '06055ffe17ddec97d51038647e2b2ca7', '3f3f70a93a16473ca8eb166a7d193cfb74df0a90');
INSERT INTO `hlm_attachment` VALUES (5, '5c7743cc65272b68db4f34491d3f96d3.png', '/uploads/20180211/5c7743cc65272b68db4f34491d3f96d3.png', 'png', 1518360923, 3499, 'ebaf08751e091fad7943349b6ffbdd0f', 'dd2dbb48a42cc08e4cf864fb74d424da0c26f820');
INSERT INTO `hlm_attachment` VALUES (6, 'b064680c143ef8dafcc94fa7df1f64ea.jpg', '/uploads/20180211/b064680c143ef8dafcc94fa7df1f64ea.jpg', 'jpg', 1518360974, 45818, '08165d443bce6c09db2be8edb0b63f32', 'ff483498d7ee50301f1c6d4935d087abaaf36939');
INSERT INTO `hlm_attachment` VALUES (7, 'cadf01f70a253f0b558f25c55f9839a5.jpg', '/uploads/20180211/cadf01f70a253f0b558f25c55f9839a5.jpg', 'jpg', 1518360984, 19299, '5147be13ccf9cbb9a858ed496df4b701', '57ed630754234f940737e92e51e1c5a66098fffe');
INSERT INTO `hlm_attachment` VALUES (8, '6c36261c82da9a1cfd106775a82f5dc6.jpg', '/uploads/20180211/6c36261c82da9a1cfd106775a82f5dc6.jpg', 'jpg', 1518361390, 90268, '0c530f7f76233e9613e6ea53b03bf3cf', '6edc3986e1f83845c13deab9ecb8391dc2ed6058');
INSERT INTO `hlm_attachment` VALUES (9, 'b3a097e373eb2a22a0b348f3a9565801.jpg', '/uploads/20180211/b3a097e373eb2a22a0b348f3a9565801.jpg', 'jpg', 1518361602, 98920, '7da1a72e8594b5cea2fbcc51dd4156f7', 'eaa9d9b3f5fa06b0fac4d1019ce35b1bcb7cc89b');
INSERT INTO `hlm_attachment` VALUES (10, '399566c698f777b3d218a3713c17f8a9.jpg', '/uploads/20180211/399566c698f777b3d218a3713c17f8a9.jpg', 'jpg', 1518361714, 15172, '578c6764cbd9fca1f00655fa738e86c1', '8d08e3b9bee24a7d1a2037381bd049e0ef377d95');
COMMIT;

-- ----------------------------
-- Table structure for hlm_category
-- ----------------------------
DROP TABLE IF EXISTS `hlm_category`;
CREATE TABLE `hlm_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cname` varchar(20) NOT NULL COMMENT '栏目名称',
  `url` varchar(255) DEFAULT '' COMMENT '跳转 url',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否显示',
  `pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '父ID',
  `csort` int(10) unsigned NOT NULL DEFAULT '100' COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC COMMENT='栏目表';

-- ----------------------------
-- Records of hlm_category
-- ----------------------------
BEGIN;
INSERT INTO `hlm_category` VALUES (1, '网站设计', '###', 1, 0, 1);
INSERT INTO `hlm_category` VALUES (2, '988建站套餐', '/a/1.html', 1, 1, 1);
INSERT INTO `hlm_category` VALUES (3, '1988建站套餐', '/a/2.html', 1, 1, 2);
INSERT INTO `hlm_category` VALUES (4, '网站定制开发', '/a/3.html', 1, 1, 3);
INSERT INTO `hlm_category` VALUES (5, '企业系统开发', '/a/4.html', 1, 1, 4);
INSERT INTO `hlm_category` VALUES (6, '品牌推广', '###', 1, 0, 2);
INSERT INTO `hlm_category` VALUES (7, '网站排名优化', '/a/12.html', 1, 6, 1);
INSERT INTO `hlm_category` VALUES (8, '品牌推广策划', '/a/13.html', 1, 6, 2);
INSERT INTO `hlm_category` VALUES (9, '推广培训课程', '/a/14.html', 1, 6, 3);
INSERT INTO `hlm_category` VALUES (10, '服务项目', '###', 1, 0, 3);
INSERT INTO `hlm_category` VALUES (11, '信息系统维护服务', '/a/8.html', 1, 10, 1);
INSERT INTO `hlm_category` VALUES (12, '网络系统维护服务', '/a/9.html', 1, 10, 2);
INSERT INTO `hlm_category` VALUES (13, '网络布线工程服务', '/a/10.html', 1, 10, 3);
INSERT INTO `hlm_category` VALUES (14, '安防监控工程服务', '/a/11.html', 1, 10, 4);
INSERT INTO `hlm_category` VALUES (16, '成功案例', '', 1, 0, 4);
INSERT INTO `hlm_category` VALUES (17, '企业网站案例', '', 1, 16, 1);
INSERT INTO `hlm_category` VALUES (18, '排名忧化案例', '', 1, 16, 2);
INSERT INTO `hlm_category` VALUES (19, '网络工程案例', '', 1, 16, 3);
INSERT INTO `hlm_category` VALUES (20, '安防监控案例', '', 1, 16, 4);
INSERT INTO `hlm_category` VALUES (21, '关于我们', '###', 1, 0, 5);
INSERT INTO `hlm_category` VALUES (22, '公司介绍', '/a/6.html', 1, 21, 1);
INSERT INTO `hlm_category` VALUES (23, '技术团队', '/a/7.html', 1, 21, 2);
INSERT INTO `hlm_category` VALUES (24, '新闻资讯', '', 1, 21, 3);
INSERT INTO `hlm_category` VALUES (25, '行业新闻', '', 1, 24, 1);
INSERT INTO `hlm_category` VALUES (26, '企业新闻', '', 1, 24, 2);
INSERT INTO `hlm_category` VALUES (27, '活动新闻', '', 1, 24, 3);
INSERT INTO `hlm_category` VALUES (28, '联系我们', '/a/5.html', 1, 0, 6);
COMMIT;

-- ----------------------------
-- Table structure for hlm_flinks
-- ----------------------------
DROP TABLE IF EXISTS `hlm_flinks`;
CREATE TABLE `hlm_flinks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fname` varchar(50) DEFAULT NULL COMMENT '名称',
  `flink` varchar(200) DEFAULT NULL COMMENT '指向链接',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否有效',
  `orderby` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='友情链接表';

-- ----------------------------
-- Records of hlm_flinks
-- ----------------------------
BEGIN;
INSERT INTO `hlm_flinks` VALUES (1, '就要听我说', 'http://www.91lsme.com', 1, 1);
COMMIT;

-- ----------------------------
-- Table structure for hlm_group
-- ----------------------------
DROP TABLE IF EXISTS `hlm_group`;
CREATE TABLE `hlm_group` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `gname` varchar(100) NOT NULL DEFAULT '' COMMENT '分组名称',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否禁用（1正常 0已禁用）',
  `rules` varchar(200) NOT NULL DEFAULT '' COMMENT '规则',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='用户分组表';

-- ----------------------------
-- Records of hlm_group
-- ----------------------------
BEGIN;
INSERT INTO `hlm_group` VALUES (1, '系统管理员', 1, '');
INSERT INTO `hlm_group` VALUES (2, '资料管理员', 1, '2,3,5,6,7,8,9,11,12,13,14,15,16,17,47,23,24,25,26');
COMMIT;

-- ----------------------------
-- Table structure for hlm_rules
-- ----------------------------
DROP TABLE IF EXISTS `hlm_rules`;
CREATE TABLE `hlm_rules` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `rname` varchar(50) NOT NULL DEFAULT '' COMMENT '权限中文名称',
  `rules` varchar(50) NOT NULL DEFAULT '' COMMENT '权限标识',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否禁用（1正常 0已禁用）',
  `pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '父ID',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '类型（1表示附近规则启作用）',
  `condition` varchar(100) NOT NULL DEFAULT '' COMMENT '附加规则',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COMMENT='权限表';

-- ----------------------------
-- Records of hlm_rules
-- ----------------------------
BEGIN;
INSERT INTO `hlm_rules` VALUES (1, '后台', '', 1, 0, 0, '');
INSERT INTO `hlm_rules` VALUES (2, '后台首页', 'admin/index/index', 1, 1, 0, '');
INSERT INTO `hlm_rules` VALUES (3, '后台修改密码', 'admin/index/pass', 1, 1, 0, '');
INSERT INTO `hlm_rules` VALUES (4, '栏目管理', '', 1, 0, 0, '');
INSERT INTO `hlm_rules` VALUES (5, '栏目列表', 'admin/category/index', 1, 4, 0, '');
INSERT INTO `hlm_rules` VALUES (6, '栏目添加', 'admin/category/store', 1, 4, 0, '');
INSERT INTO `hlm_rules` VALUES (7, '栏目添加子类', 'admin/category/addSon', 1, 4, 0, '');
INSERT INTO `hlm_rules` VALUES (8, '栏目编辑', 'admin/category/edit', 1, 4, 0, '');
INSERT INTO `hlm_rules` VALUES (9, '栏目删除', 'admin/category/del', 1, 4, 0, '');
INSERT INTO `hlm_rules` VALUES (10, '文章管理', '', 1, 0, 0, '');
INSERT INTO `hlm_rules` VALUES (11, '文章列表', 'admin/article/index', 1, 10, 0, '');
INSERT INTO `hlm_rules` VALUES (12, '文章添加', 'admin/article/store', 1, 10, 0, '');
INSERT INTO `hlm_rules` VALUES (13, '文章编辑', 'admin/article/edit', 1, 10, 0, '');
INSERT INTO `hlm_rules` VALUES (14, '文章删除到回收站', 'admin/article/delToRecycle', 1, 10, 0, '');
INSERT INTO `hlm_rules` VALUES (15, '回收站列表', 'admin/article/recycle', 1, 10, 0, '');
INSERT INTO `hlm_rules` VALUES (16, '回收站恢复到文章列表', 'admin/article/outToRecycle', 1, 10, 0, '');
INSERT INTO `hlm_rules` VALUES (17, '回收站彻底删除', 'admin/article/del', 1, 10, 0, '');
INSERT INTO `hlm_rules` VALUES (22, '友链管理', '', 1, 0, 0, '');
INSERT INTO `hlm_rules` VALUES (23, '友链列表', 'admin/link/index', 1, 22, 0, '');
INSERT INTO `hlm_rules` VALUES (24, '友链添加、编辑', 'admin/link/store', 1, 22, 0, '');
INSERT INTO `hlm_rules` VALUES (25, '友链删除', 'admin/link/del', 1, 22, 0, '');
INSERT INTO `hlm_rules` VALUES (26, '友链排序', 'admin/link/changeSort', 1, 22, 0, '');
INSERT INTO `hlm_rules` VALUES (27, '权限管理', '', 1, 0, 0, '');
INSERT INTO `hlm_rules` VALUES (28, '用户列表', 'admin/admin/index', 1, 27, 0, '');
INSERT INTO `hlm_rules` VALUES (29, '用户添加', 'admin/admin/store', 1, 28, 0, '');
INSERT INTO `hlm_rules` VALUES (30, '用户编辑', 'admin/admin/edit', 1, 28, 0, '');
INSERT INTO `hlm_rules` VALUES (31, '用户删除', 'admin/admin/del', 1, 28, 0, '');
INSERT INTO `hlm_rules` VALUES (32, '用户禁用', 'admin/admin/show', 1, 28, 0, '');
INSERT INTO `hlm_rules` VALUES (33, '设置用户分组', 'admin/admin/setGroup', 1, 28, 0, '');
INSERT INTO `hlm_rules` VALUES (34, '用户组列表', 'admin/group/index', 1, 27, 0, '');
INSERT INTO `hlm_rules` VALUES (35, '用户组添加、编辑', 'admin/group/store', 1, 34, 0, '');
INSERT INTO `hlm_rules` VALUES (36, '用户组删除', 'admin/group/del', 1, 34, 0, '');
INSERT INTO `hlm_rules` VALUES (37, '用户组禁用', 'admin/group/changeStatus', 1, 34, 0, '');
INSERT INTO `hlm_rules` VALUES (38, '用户组分配权限', 'admin/group/setAuth', 1, 34, 0, '');
INSERT INTO `hlm_rules` VALUES (39, '权限列表', 'admin/rules/index', 1, 27, 0, '');
INSERT INTO `hlm_rules` VALUES (40, '权限添加', 'admin/rules/store', 1, 39, 0, '');
INSERT INTO `hlm_rules` VALUES (41, '权限添加子类', 'admin/rules/addSon', 1, 39, 0, '');
INSERT INTO `hlm_rules` VALUES (42, '权限编辑', 'admin/rules/edit', 1, 39, 0, '');
INSERT INTO `hlm_rules` VALUES (43, '权限删除', 'admin/rules/del', 1, 39, 0, '');
INSERT INTO `hlm_rules` VALUES (44, '网站配置管理', '', 1, 0, 0, '');
INSERT INTO `hlm_rules` VALUES (45, '配置列表', 'admin/webset/index', 1, 44, 0, '');
INSERT INTO `hlm_rules` VALUES (46, '配置修改', 'admin/webset/edit', 1, 44, 0, '');
INSERT INTO `hlm_rules` VALUES (47, '文章排序', 'admin/article/sort', 1, 10, 0, '');
COMMIT;

-- ----------------------------
-- Table structure for hlm_webset
-- ----------------------------
DROP TABLE IF EXISTS `hlm_webset`;
CREATE TABLE `hlm_webset` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `webset_name` varchar(50) DEFAULT '' COMMENT '配置名称',
  `webset_value` varchar(255) DEFAULT '' COMMENT '配置值',
  `webset_des` varchar(100) DEFAULT '' COMMENT '配置描述',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='配置表';

-- ----------------------------
-- Records of hlm_webset
-- ----------------------------
BEGIN;
INSERT INTO `hlm_webset` VALUES (1, 'title', '深圳翰林码网站建设公司_深圳网络品牌推广告公司_深圳网站排名忧化公司', '网站名称');
INSERT INTO `hlm_webset` VALUES (2, 'email', 'supper@hanlinma.com', '站长信息');
INSERT INTO `hlm_webset` VALUES (3, 'copyright', '深圳翰林码网络科技有限公司 | Copyright © 2017-2018 <a href=\"http://www.hanlinma.com\" target=\"_blank\">www.hanlinma.com</a> All rights reserved. ', '版权信息');
INSERT INTO `hlm_webset` VALUES (4, 'beian', '<a href=\"http://www.miitbeian.gov.cn/\" target=\"_blank\">深ICP备 00000000号</a>', '备案信息');
INSERT INTO `hlm_webset` VALUES (5, 'keywords', '翰林码,hanlinma,网站设计,品牌推广,网站优化,网络工程', '网站关键字');
INSERT INTO `hlm_webset` VALUES (6, 'description', '深圳翰林码网站建设公司_深圳网络品牌推广告公司_深圳网站排名忧化公司', '网站描述');
INSERT INTO `hlm_webset` VALUES (7, 'indexwords', '翰林码网络科技有限公司是一家充满活力的企业，致力于企业IT信息化工程维护和网站排名推广，是一家专业从事网站建设与推广、网络系统维护（IT外包）、网络工程施工的企业。以诚信为本，以质量求生存，本着一切按客户实际需求而经营，我们从市场的角度和客户的需求出发，帮助企业及其产品树立良好的视觉形象，拓展市场空间创造竞争优势，提升企业的无形资产。...', '网站首页推荐词');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
