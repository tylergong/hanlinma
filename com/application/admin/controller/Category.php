<?php

namespace app\admin\controller;

class Category extends Common {
    //
    protected $db;

    public function _initialize() {
        parent::_initialize(); // TODO: Change the autogenerated stub
        $this->db = new \app\common\model\Category();
    }

    //栏目列表
    public function index() {
        $cates = $this->db->getAll();
        $this->assign('cates', $cates);
        return $this->fetch();
    }

    //添加栏目
    public function store() {
        if (request()->isPost()) {
            $res = $this->db->store(input('post.'));
            if ($res['valid']) {
                $this->success($res['msg'], 'index');
                exit;
            } else {
                $this->error($res['msg']);
                exit;
            }
        }
        return $this->fetch();
    }

    // 添加子栏目
    public function addSon() {
        if (request()->isPost()) {
            $res = $this->db->store(input('post.'));
            if ($res['valid']) {
                $this->success($res['msg'], 'index');
                exit;
            } else {
                $this->error($res['msg']);
                exit;
            }
        }

        $id = input('param.id/d');
        $data = $this->db->find($id);
        $this->assign('data', $data);

        return $this->fetch();
    }

    // 编辑
    public function edit() {
        if (request()->isPost()) {
            $res = $this->db->edit(input('post.'));
            if ($res['valid']) {
                $this->success($res['msg'], 'index');
                exit;
            } else {
                $this->error($res['msg']);
                exit;
            }
        }

        $id = input('param.id/d');
        $oldData = $this->db->find($id);
        $this->assign('oldData', $oldData);

        $cateData = $this->db->getCateData($id);
        $this->assign('cateData', $cateData);

        return $this->fetch();
    }

    // 删除
    public function del() {
        $id = input('get.id/d');
        if ($id <= 25) {
            $this->error('系统固定分类，无法删除');
            exit;
        }
        $res = $this->db->del();
        if ($res['valid']) {
            $this->success($res['msg'], 'index');
            exit;
        } else {
            $this->error($res['msg']);
            exit;
        }
    }
}
