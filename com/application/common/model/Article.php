<?php

namespace app\common\model;

use think\Model;

class Article extends Model {
    //
    protected $pk = 'id';
    protected $table = 'hlm_article';
    protected $insert = ['admin_id', 'create_time'];//新增时自动添加字段
    protected $update = ['up_time'];//修改时自动添加字段

    // 获取用当前用户 ID
    protected function setAdminIdAttr($value) {
        return session('admin.admin_id');
    }

    // 格式化新增时间
    protected function setCreateTimeAttr($value) {
        return time();
    }

    // 格式化修改时间
    protected function setUpTimeAttr($value) {
        return time();
    }

    // 获取列表
    public function getAll($where = array('is_del' => 0), $orderby = 'create_time desc') {
        $allList = db('hlm_article')->alias('a')
            ->join('hlm_category c', 'a.cid = c.id')
            ->field('a.id,a.title,a.author,a.create_time,a.click_num,c.cname')
            ->where('a.is_del', $where['is_del']);
        if (!empty($where['title'])) {
            $allList = $allList->where('a.title', 'like', "%{$where['title']}%");
        }
        if (!empty($where['cid'])) {
            $allList = $allList->where('a.cid', $where['cid']);
        }
        $allList = $allList->order('a.' . $orderby . ' ,a.id asc');
        return $allList;
    }

    // 获取回收站列表
    public function getRecycleAll() {
        return db('hlm_article')->alias('a')
            ->join('hlm_category c', 'a.cid=c.id')
            ->field('a.id,a.title,a.author,a.create_time,a.del_time,a.click_num,c.cname')
            ->where('a.is_del', 1)
            ->order('a.create_time desc')
            ->paginate(8);
    }

    // 编辑保存
    public function edit($data) {
        //1、验证、添加
        $res = $this->validate(true)->allowField(true)->save($data, [$this->pk => $data['id']]);
        if ($res) {
            return ['valid' => 1, 'msg' => '编辑成功'];
        } else {
            return ['valid' => 0, 'msg' => $this->getError()];
        }
    }

    // 新增保存
    public function store($data) {
        //1、验证、添加
        $res = $this->validate(true)->allowField(true)->save($data);
        if ($res) {
            return ['valid' => 1, 'msg' => '添加成功'];
        } else {
            return ['valid' => 0, 'msg' => $this->getError()];
        }
    }

    // 物理删除数据
    public function del($id) {
        if (Article::destroy($id)) {
            return ['valid' => 1, 'msg' => '删除成功'];
        } else {
            return ['valid' => 0, 'msg' => '删除失败'];
        }
    }
}
