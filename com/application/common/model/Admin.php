<?php

namespace app\common\model;

use think\Loader;
use think\Model;
use think\Validate;

class Admin extends Model {
    protected $pk = 'id';
    protected $table = 'admins';
    protected $insert = ['create_time'];//新增时自动添加字段

    // 格式化状态 汉字显示
    public function getIsShowTxtAttr($value, $data) {
        $status = [0 => '已禁用', 1 => '正常'];
        return $status[$data['is_show']];
    }

    // 密码加密模式
    protected function setPwdAttr($value) {
        return md5($value);
    }

    // 格式化新增时间
    protected function setCreateTimeAttr($value) {
        return time();
    }

    // 登录
    public function login($data) {
        //1、执行验证（模型验证）
        $validate = Loader::validate('Admin');
        if (!$validate->check($data)) {
            return ['valid' => -1, 'msg' => $validate->getError()];
        }

        //2、比对用户名和密码是否正确
        $userInfo = $this->where('name', $data['name'])->find();
        if (!$userInfo) {
            return ['valid' => -3, 'msg' => '用户名不存在'];
        } else {
            if (md5($data['pwd']) != $userInfo['pwd']) {
                return ['valid' => -2, 'msg' => '密码错误'];
            }
        }

        //3、将用户信息存入 session
        session('admin.admin_id', $userInfo['id']);
        session('admin.admin_name', $userInfo['name']);
        return ['valid' => 0, 'msg' => '登录成功'];
    }

    // 修改密码
    public function pass($data) {
        //1、执行验证
        $validate = new Validate([
            'pwd' => 'require',
            'new_pwd' => 'require',
            'confirm_pwd' => 'require|confirm:new_pwd',
        ], [
            'pwd.require' => '请输入原始密码',
            'new_pwd.require' => '请输入新密码',
            'confirm_pwd.require' => '请输入确认密码',
            'confirm_pwd.confirm' => '二次输入密码不一致',
        ]);
        if (!$validate->check($data)) {
            return ['valid' => 0, 'msg' => $validate->getError()];
            //dump($validate->getError());
        }

        //2、比对原始密码是否一致
        $userInfo = $this->where('id', session('admin.admin_id'))->find();
        if ($userInfo && md5($data['pwd']) != $userInfo['pwd']) {
            return ['valid' => 0, 'msg' => '原始密码不正确'];
        }

        //3、修改密码
        $res = $this->save([
            'pwd' => $data['confirm_pwd'],
        ], [$this->pk => session('admin.admin_id')]);
        if ($res) {
            return ['valid' => 1, 'msg' => '密码修改成功'];
        } else {
            return ['valid' => 0, 'msg' => '密码修改失败'];
        }
    }

    // 获取用列表
    public function getAll() {
        $userData = $this->field('id,name,is_show')->order('is_show desc, id desc')->paginate(8);
        foreach ($userData as $k => &$v) {
            $groups = db('admin_group')->alias('ag')
                ->join('group g', 'ag.group_id=g.id', 'LEFT')
                ->where('admin_id', $v['id'])
                ->column('gname');
            $v['groups'] = implode(',', $groups);
        }
        return $userData;
    }

    // 添加用户
    public function store($data) {
        // 1、验证输入数据
        $validate = new Validate([
            'name' => 'require',
            'pwd' => 'require',
        ], [
            'name.require' => '请输入用户名',
            'pwd.require' => '请输入密码',
        ]);
        if (!$validate->check($data)) {
            return ['valid' => 0, 'msg' => $validate->getError()];
        }

        // 2、验证管理员是否存在
        if ($this->where('name', $data['name'])->find()) {
            return ['valid' => 0, 'msg' => '用户名已经存在，请不要重复添加'];
        }

        // 3、将数据写入数据库
        $res = $this->save($data);
        if (false === $res) {
            return ['valid' => 0, 'msg' => $this->getError()];
        } else {
            return ['valid' => 1, 'msg' => '添加成功'];
        }
    }

    // 修改用户
    public function edit($data) {
        // 1、验证输入数据
        $validate = new Validate([
            'name' => 'require',
        ], [
            'name.require' => '请输入用户名',
        ]);
        if (!$validate->check($data)) {
            return ['valid' => 0, 'msg' => $validate->getError()];
        }

        // 2、验证管理员是否存在
        if ($this->where('id', '<>', $data['id'])->where('name', $data['name'])->find()) {
            return ['valid' => 0, 'msg' => '用户名已被占用，请换一个重试'];
        }

        // 3、保存修改内容（判断是否有修改密码）
        if (!empty($data['pwd'])) {
            $res = $this->save($data, [$this->pk => $data['id']]);
        } else {
            $res = $this->save([
                'name' => $data['name']
            ], [$this->pk => $data['id']]);
        }
        if (false === $res) {
            return ['valid' => 0, 'msg' => $this->getError()];
        } else {
            return ['valid' => 1, 'msg' => '修改成功'];
        }
    }

    // 禁用、恢复用户
    public function show($id, $handle) {
        if ($id == 1) {
            return ['valid' => 0, 'msg' => '超级管理员不能禁用哦！'];
        } else {
            $res = $this->where('id', $id)->update(['is_show' => $handle]);
            if ($res) {
                return ['valid' => 1, 'msg' => '修改成功'];
            } else {
                return ['valid' => 0, 'msg' => '删除失败'];
            }
        }
    }

    // 删除用户
    public function del($id) {
        if ($id == 1) {
            return ['valid' => 0, 'msg' => '超级管理员不能删除哦！'];
        } else {
            if ($this::destroy($id)) {
                return ['valid' => 1, 'msg' => '删除成功'];
            } else {
                return ['valid' => 0, 'msg' => '删除失败'];
            }
        }
    }

    // 设置用户分组关系
    public function setGroup($data) {
        // 1、验证
        if (!isset($data['group_id'])) {
            return ['valid' => 0, 'msg' => '请选择用户组'];
        }
        // 2、删除用户原有关系
        db('admin_group')->where('admin_id', $data['id'])->delete();
        // 3、组合入库数据
        foreach ($data['group_id'] as $v) {
            $list[] = ['admin_id' => $data['id'], 'group_id' => $v];
        }
        // 4、批量入库
        if (db('admin_group')->insertAll($list)) {
            return ['valid' => 1, 'msg' => '设置分组成功'];
        } else {
            return ['valid' => 0, 'msg' => '设置分组失败'];
        }
    }
}
