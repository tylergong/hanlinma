<?php

namespace app\index\controller;


class Details extends Common {
    public function _initialize() {
        parent::_initialize(); // TODO: Change the autogenerated stub
    }

    public function index() {
        $article_id = input('param.aid');
        if ($article_id) {
            // 获取文章信息
            $articleData = db('hlm_article')->alias('a')
                ->join('hlm_category c', 'a.cid=c.id')
                ->where('a.id', $article_id)
                ->where('a.is_del', 0)
                ->field('a.id,a.title,a.create_time,a.author,a.content,a.click_num,a.cid,c.cname,c.pid')
                ->find();
            if ($articleData) {
                // 新增一次点击次数
                db('hlm_article')->where('id', $article_id)->setInc('click_num');
                // 查询文章当前父分类
                $articleData['father'] = db('hlm_category')->where('id', $articleData['pid'])->where('id', '<>', 21)->find();
                // 转义字符
                $articleData['content'] = stripslashes($articleData['content']);
                $this->assign('articleData', $articleData);
            } else {
                $this->redirect('/');
            }
        } else {
            $this->redirect('/');
        }

        $webSet = $this->loadWebSet();
        $webSet['title'] = $articleData['title'] . '_' . $webSet['title'];
        $webSet['description'] = $articleData['title'] . ',' . $webSet['description'];
        $this->assign('_webSet', $webSet);

        return $this->fetch();
    }

}
