<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [
    '__pattern__' => [
        'name' => '\w+',
    ],
    '__alias__' =>  [
        'special'  =>  'index/Special',
    ],
    '[a]' => [
        ':aid' => ['index/Details/index', ['method' => 'get'], ['id' => '\d+']],
    ],
    '[c]' => [
        ':cid' => ['index/Lists/index', ['method' => 'get'], ['cid' => '\d+']],
    ],
];
