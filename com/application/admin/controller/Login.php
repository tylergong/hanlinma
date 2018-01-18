<?php

namespace app\admin\controller;

use app\common\model\Admin;
use think\Controller;

class Login extends Controller {
    //登录
    public function login() {
        if (request()->isPost()) {
            return (new Admin())->login(input('post.'));
        }
        return $this->fetch();
    }

    // 退出
    public function logout() {
        session(null);
        $this->success('登出成功', 'admin/index/index');
    }
}
