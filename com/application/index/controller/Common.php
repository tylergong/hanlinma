<?php
/**
 * Created by PhpStorm.
 * User: gongming
 * Date: 2018/2/10
 * Time: 上午10:42
 */

namespace app\index\controller;


use think\Controller;
use think\Request;

class Common extends Controller {
    //
    public function __construct(Request $request = null) {
        parent::__construct($request);
        // 1、获取网站配置项数据
        $webSet = $this->loadWebSet();
        $this->assign('_webSet', $webSet);
        // 2、获取导航数据
        $cateData = $this->loadCateData();
        $this->assign('_cateData', $cateData);
        // 3、获取友情链接数据
        $linkData = $this->loadLinkData();
        $this->assign('_linkData', $linkData);
    }

    // 获取网站配置项数据
    public function loadWebSet() {
        return db('webset')->column('webset_value', 'webset_name');
    }

    // 获取导航数据
    public function loadCateData() {
        $category = db('category');
        $cateData = $category->where('pid', 0)->where('is_show', 1)->order('csort asc')->select();
        if (is_array($cateData)) {
            foreach ($cateData as $k => &$v) {
                $v['cateSon'] = $category->where('pid', $v['id'])->where('is_show', 1)->order('csort asc')->select();
                if (is_array($v['cateSon']) && count($v['cateSon']) > 0) {
                    $v['hasSon'] = 1;
                } else {
                    $v['hasSon'] = 0;
                }
            }
        }
        return $cateData;
    }

    // 获取友情链接数据
    public function loadLinkData() {
        return db('flinks')->order('orderby desc')->limit(6)->select();
    }

}