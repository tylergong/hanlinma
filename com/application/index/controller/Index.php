<?php

namespace app\index\controller;

use think\Controller;
use think\Request;

class Index extends Controller {

    // 首页
    public function index() {
        return $this->fetch();
    }

    // 文章页
    public function article() {
        $id = input('param.id\d');
        echo $id;
        return $this->fetch();
    }

    public function caseList() {
        return $this->fetch();
    }

    public function actList() {
        return $this->fetch();
    }
}
