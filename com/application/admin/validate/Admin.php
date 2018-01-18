<?php

namespace app\admin\validate;

use think\Validate;

class Admin extends Validate {
    protected $rule = [
        'name' => 'require',
        'pwd' => 'require',
        'code' => 'require|captcha',
    ];
    protected $message = [
        'name.require' => '请输入用户名',
        'pwd.require' => '请输入密码',
        'code.require' => '请输入验证码',
        'code.captcha' => '验证码不正确',
    ];
}