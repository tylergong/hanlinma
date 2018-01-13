/**/
var M = document.querySelector('meta[name="generator"]').getAttribute('data-variable'), D = M.split(',');
M = new Array();
M['weburl'] = D[0];
M['lang'] = D[1];
M['classnow'] = parseInt(D[2]);
M['id'] = parseInt(D[3]);
M['module'] = parseInt(D[4]);
M['tem'] = D[0] + 'templates/' + D[5];
var deviceType = /iPad/.test(navigator.userAgent) ? 't' : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? 'm' : 'd',
    is_ucbro = /UC/.test(navigator.userAgent);


/*job.js*/
$(document).ready(function () {
    if ($("#met-job-cv").length) {
        MetAnimOnScroll();
        $(document).on('click', ".met-job-cvbtn", function () {
            var cvurl = $(this).data('cvurl'), jobid = $(this).data('jobid');
            if ($("#met-job-cv .modal-body .form-group").length) {
                $("#met-job-cv .met-form").data('formValidation').resetForm();
                $("#met-job-cv .modal-body input[name='jobid']").val(jobid);
            } else {
                $("#met-job-cv .modal-body").html('<div class="height-100 vertical-align text-center cart-loader"><div class="loader vertical-align-middle loader-default"></div></div>');
                $.ajax({
                    url: cvurl + '&jobid=' + jobid, type: 'POST', success: function (data) {
                        $("#met-job-cv .modal-body").html(data).hide().slideDown(500);
                        $.components.init('placeholder');
                        $("#met-job-cv .met-form").formValidation({
                            framework: "bootstrap"
                        })
                        if (!$("#met-job-cv .modal-body input[name='jobid']").val()) $("#met-job-cv .modal-body input[name='jobid']").val(jobid);
                    }
                });
            }
            $("#met-job-cv").modal('show');
        });
    }
})
/*img.js*/
$(document).ready(function () {
    if ($('.met-img').length) {
        imageSize('.met-img .met-page-ajax');
        $(".met-img [data-original]").lazyload({
            load: function () {
                MetAnimOnScroll();
            }
        });
        MetAnimOnScroll();
    }
    if ($(".met-img-showbtn").length) {
        $(document).on('click', ".met-img-showbtn", function () {
            var imglist = $(this).data("imglist"), dyarr = new Array(), arlt = imglist.split('|');
            $.each(arlt, function (name, value) {
                if (value != '') {
                    var st = value.split('*'), key = name;
                    dyarr[key] = new Array();
                    dyarr[key]['src'] = st[1];
                    dyarr[key]['thumb'] = st[1];
                    dyarr[key]['subHtml'] = st[0];
                }
            })
            $(this).galleryLoad(dyarr);
        });
    }

    var $imgpara = $('.imgpara');
    if ($imgpara.length) {
        if (!$imgpara.find('li').length) $imgpara.remove();
    }
})
/*product.js*/
$(document).ready(function () {
    if ($('.met-product').length) {
        imageSize('.met-product .met-page-ajax');
        if ($(".met-product [data-original]").length) {
            $(".met-product [data-original]").lazyload();
            var $pro_fluid = $(".met-product .container-fluid");
            if ($pro_fluid.length) {
                $pro_fluid.each(function () {
                    var $this = $(this);
                    $(this).width($(this).width());
                    setTimeout(function () {
                        $this.width('');
                    }, 2000)
                });
            }
            MetAnimOnScroll();
        }
    }
    $(".product-hot-box img[data-original]").lazyload({
        load: function () {
            MetAnimOnScroll();
        }
    });


    var met_img_carousel = '#met-imgs-carousel', met_img_carousel_slide = met_img_carousel + ' .slick-slide';
    if ($(met_img_carousel_slide).length > 1) {
        var slickdots = met_img_carousel + ' ul.slick-dots', slickdots_div = met_img_carousel + ' ul.slick-dots div',
            slickdots_li = met_img_carousel + ' ul.slick-dots li', showpro_index = 0;
        $(met_img_carousel).on('init', function (event, slick) {
            var met_img_carousel_slide_true = met_img_carousel_slide + ':not(.slick-cloned)';
            for (var i = 0; i < $(met_img_carousel_slide_true).length; i++) {
                var thumbsrc = $(met_img_carousel_slide_true + ':eq(' + i + ')').data('exthumbimage'),
                    thumbalt = $(met_img_carousel_slide_true + ':eq(' + i + ') img').attr('alt'),
                    showpro_thumb = '<img src="' + thumbsrc + '" alt="' + thumbalt + '" />';
                $(slickdots_li).eq(i).html(showpro_thumb);
            }
            $(slickdots).wrapInner('<div></div>');
            $(slickdots_div).width($(slickdots_li).length * 74 - 10);
        })
        var slick_swipe = true, slick_fade = false;
        if ($(met_img_carousel).hasClass('fngallery') && deviceType == 'd') {
            slick_swipe = false;
            slick_fade = true;
        }
        $(met_img_carousel).slick({
            dots: true,
            speed: 500,
            fade: slick_fade,
            swipe: slick_swipe,
            lazyloadPrevNext: true,
            prevArrow: met_prevArrow,
            nextArrow: met_nextArrow,
        })
        $(met_img_carousel).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            paginationScroll(nextSlide);
            showpro_index = nextSlide;
        });
        $(window).resize(function () {
            paginationScroll(showpro_index);
        });

        function paginationScroll(index) {
            var slickdots_w = $(slickdots).width(), slickdots_div_w = $(slickdots_div).width(),
                deviation = parseInt(index * 74 - slickdots_w / 2 + 32);
            if (slickdots_div_w > slickdots_w) {
                var translateX = deviation > 0 ? -deviation : 0;
                if (deviation + slickdots_w >= slickdots_div_w) translateX = -parseInt(slickdots_div_w - slickdots_w);
                if ($('html').hasClass('no-csstransitions')) {
                    $(slickdots_div).stop().animate({left: translateX}, 500);
                } else {
                    $(slickdots_div).css({transform: 'translateX(' + translateX + 'px)'});
                }
            }
        }
    }
    if ($('.fngallery').length) $('.fngallery').galleryLoad();


    if ($('.met-showproduct.pagetype1').length) {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var href = $(this).attr('href');
            $(href).find('img:eq(0)').trigger('scroll');
        })

        navtabSwiper(".met-showproduct-navtabs");

        var prohot = '.product-hot .mob-masonry';
        if ($(prohot).length) {
            imageSize(prohot);
            $(prohot + ' img').lazyload();
            Breakpoints.on('xs sm', {
                enter: function () {
                    $(prohot).masonry({itemSelector: "li"});
                }
            });
        }
    }


    var showprotype2 = '.met-showproduct.pagetype2';
    if ($(showprotype2).length) {
        window.navbar = $(showprotype2 + ' .navbar');
        var navbar_t = navbar.offset().top, wh = $(window).height();
        $(window).scroll(function () {
            var st = $(this).scrollTop();
            if (st > navbar_t) {
                navbar.addClass('navbar-fixed-top animation-slide-top');
            } else {
                navbar.removeClass('navbar-fixed-top animation-slide-top');
            }
            navbar.find('.navbar-right li a').each(function () {
                var topsize = pro_topsize($(this));
                if (st >= (topsize - 30)) pro_active($(this));
            });
        });
        $(document).on('click', showprotype2 + ' .navbar .navbar-right li a', function (e) {
            e.preventDefault();
            var thisobj = $(this), scrollTopInt = setInterval(function () {
                var w_scroll = $(window).scrollTop();
                if (w_scroll == pro_topsize(thisobj) || w_scroll + wh >= $(document).height()) {
                    pro_active(thisobj);
                    clearInterval(scrollTopInt);
                }
                $('html,body').animate({scrollTop: pro_topsize(thisobj)}, 300, "linear");
            }, 300)
        })

        $(showprotype2 + ' .navbar .navbar-toggle').one("click", function () {
            setTimeout(function () {
                navtabSwiper(".met-showproduct-navtabs");
            }, 0)
        });
    }
})

function pro_active(dom) {
    navbar.find('.navbar-right li').removeClass('active');
    dom.parent('li').addClass('active');
}

function pro_topsize(dom) {
    var oftop = $(dom.attr("href")).offset().top, topsize = oftop - 100;
    if (navbar.hasClass('navbar-fixed-top')) {
        topsize = topsize + 50;
    } else {
        if (Breakpoints.is('xs')) {
            topsize = topsize - navbar.find(".navbar-collapse-toolbar").height();
        }
    }
    if (topsize < 0) topsize = 10;
    return topsize;
}

function MetAnimOnScroll(okno) {
    if ($('#met-grid').length > 0) {
        new AnimOnScroll(document.getElementById('met-grid'), {
            minDuration: 0.4, maxDuration: 0.7, viewportFactor: 0.2
        });
    }
}

/*news.js*/
$(document).ready(function () {
    imageSize('.met-news .met-news-list [data-scale]');
    var news_original = '.met-news .met-page-ajax [data-original]';
    if ($(news_original).length) {
        $(news_original).lazyload();
    }

    if ($('.news-headlines .slick-slide').length > 1) {
        $('.news-headlines').slick({
            autoplay: true,
            dots: true,
            autoplaySpeed: 4000,
            speed: 500,
            swipe: false,
            prevArrow: met_prevArrow,
            nextArrow: met_nextArrow,
            lazyloadPrevNext: true,
            responsive: [{
                breakpoint: 1200, settings: {
                    swipe: true
                }
            }]
        });
    }
})
/*page.js*/
$(document).ready(function () {
    if ($(".met-page-ajax").length) {
        if ($(".met_pager a").length == 1) $(".met_pager").addClass('hide');
        if ($(".met-page-ajax-body").hasClass("visible-xs-block")) {
            Breakpoints.get('xs').on({
                enter: function () {
                    metpageajax();
                }
            });
        } else {
            metpageajax();
            setTimeout(function () {
                $('.met-page-ajax-body').scrollFun(function (val) {
                    val.appearDiy();
                });
            }, 0)
        }
    }
})

function metpageajax() {
    var pagebtn = $("#met-page-btn"), pageul = $(".met-page-ajax");
    window.pagemax = $(".met_pager a").length - 1;
    window.page = pagebtn.data("page");
    if (window.pagemax <= window.page) pagebtn.addClass('hide');
    pagebtn.click(function () {
        var dom = $(this);
        page++;
        $.ajax({
            url: dom.data("url") + '&page=' + page, type: 'POST', success: function (data) {
                pageul.append(data);
                pagespecial();
                if (pagemax <= page) dom.addClass('hide');
            }
        });
    });
}

function pagespecial() {
    $(".met-page-ajax .page" + page + " [data-original]").lazyload({
        load: function () {
            MetAnimOnScroll();
        }
    });
    $('html,body').stop().animate({scrollTop: $(window).scrollTop() + 1}, 10);
    MetAnimOnScroll();
}

/*editor.js*/
$(document).ready(function () {
    if ($(".met-editor table").length) {
        $(".met-editor table").addClass('table table-bordered table-hover table-striped table-responsive');
        tablexys();
    }

    if ($(".met-editor img").length) {
        $(".met-editor.lazyload img").lazyload();
        if (!$(".met-editor.no-gallery").length) {
            $(".met-editor").wrapInner("<div class='editorlightgallery'></div>");
            $(".met-editor").each(function () {
                var img_gallery_open = 1, this_editor = this;
                $("img", this).one('click', function () {
                    if (img_gallery_open) {
                        $('img', this_editor).each(function () {
                            if ($(this).parent("a").length == 0) {
                                var data_thumb = data_src = $(this).data("original") ? $(this).data("original") : $(this).attr("src");
                                if ($(this).hasClass('imgloading')) {
                                    var data_thumbs = data_src.split('upload/');
                                    data_thumb = '../include/thumb.php?dir=../upload/' + data_thumbs[1] + '&x=60&y=60';
                                }
                                $(this).wrap("<div class='lg-item-box' data-src='" + data_src + "' data-exthumbimage='" + data_thumb + "'></div>");
                            }
                        });
                        $('.editorlightgallery', this_editor).galleryLoad();
                        $(this).parent('.lg-item-box').trigger('click');
                        img_gallery_open = 0;
                    }
                });
            });
        }
    }
})

function tablexys() {
    Breakpoints.get('xs').on({
        enter: function () {
            $(".met-editor table").each(function () {
                var table = $(this);
                if (table.is(':visible') && !table.hasClass('tablesaw')) {
                    if (table.find("thead").length) {
                        table.addClass('tablesaw').attr("data-tablesaw-mode", "swipe");
                    } else {
                        var td = table.find("tbody tr:eq(0) td"), th;
                        if (td.length == 0) td = table.find("tbody tr:eq(0) th");
                        td.each(function () {
                            th += '<th>' + $(this).html() + '</th>';
                        });
                        table.prepend("<thead><tr>" + th + "</tr></thead>");
                        table.find("tbody tr:eq(0)").remove();
                        table.find("tbody td").attr('width', 'auto');
                        table.addClass('tablesaw').attr("data-tablesaw-mode", "swipe");
                    }
                }
            });
            $('.met-editor .table-responsive').parent().addClass('table-saw');
            $(document).trigger("enhance.tablesaw");
        }
    });
}
/*index.js*/

$(document).ready(function () {
    var IE9 = (navigator.userAgent.indexOf("MSIE 9.0") > 0) ? true : false;

    function head_width(res) {
        $('.head-left').css('max-width', $('.head-box .container').width() - $('.head-right').width());
        if (!res) $(window).resize(function () {
            win_width = $(window).width();
            head_width(true);
        });
    }

    head_width();
    M['head'] = new Swiper('.head-left', {
        wrapperClass: 'head-left-wrapper',
        slideClass: 'head-left-slide',
        slidesPerView: 'auto',
        simulateTouch: false,
        freeMode: true,
        freeModeSticky: true,
        mousewheelControl: true,
        mousewheelSensitivity: 1,
        observer: true,
        observeParents: true
    });
    $('.head-other b').click(function () {
        if ($('.head-other').hasClass('active')) {
            $('.head-other').removeClass('active');
        } else {
            $('.head-other').addClass('active');
        }
    }).mouseout(function () {
        if ($('.head-other').hasClass('active')) {
            $('.head-other').removeClass('active');
        }
    });
    $('.case-slide img[data-original]').lazyload();

    if (M['classnow'] == 10001) {

        M['service'] = new Swiper('.service-box', {
            wrapperClass: 'service-wraper',
            slideClass: 'service-slide',
            slidesPerView: IE9 ? 4 : 'auto',
            autoplay: 3800,
            simulateTouch: $('.service-slide').length > 4 ? true : false,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            observer: true,
            observeParents: true
        });

        M['case'] = new Swiper('.case-box', {
            wrapperClass: 'case-wraper',
            slideClass: 'case-slide',
            slidesPerView: IE9 ? 3 : 'auto',
            autoplay: 3800,
            simulateTouch: $('.case-slide').length > 3 ? true : false,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            observer: true,
            observeParents: true
        });
        $('.service-background img[data-original]').lazyload();
        $('.about-background').lazyload();
        $('.case-background').lazyload();
        $('.parent-background').lazyload();

        M['info'] = new Swiper('.info-box', {
            wrapperClass: 'info-wraper',
            slideClass: 'info-slide',
            slidesPerView: IE9 ? 2 : 'auto',
            autoplay: 4000,
            simulateTouch: $('.info-slide').length > 2 ? true : false,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            observer: true,
            observeParents: true
        });


        M['parent'] = new Swiper('.parent-box', {
            wrapperClass: 'parent-wraper',
            slideClass: 'parent-slide',
            slidesPerView: IE9 ? 3 : 'auto',
            autoplay: 3000,
            simulateTouch: $('.parent-slide').length > 3 ? true : false,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            observer: true,
            observeParents: true
        });
        $('.product-wraper img[data-original]').lazyload();
        $('.parent-slide img[data-original]').lazyload();
        $('.friend-background').lazyload();
        $('.friend-link').css('padding-left', $('.friend-title').width() + 30);
    }
    $('.met-categories ul>li>ul').each(function () {
        $(this).parent('li').addClass('has').click(function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    });
    $('.bookmark').click(function () {
        var _title = document.title;
        var url = document.URL;
        if (window.sidebar) {
            try {
                window.sidebar.addPanel(_title, url, "");
            } catch (e) {
                alert($(this).attr('data-alert'));
            }
        } else {
            if (window.opera && window.print) {
                var __mbm = document.createElement("a");
                __mbm.setAttribute("rel", "sidebar");
                __mbm.setAttribute("href", url);
                __mbm.setAttribute("title", _title);
                __mbm.click();
            } else {
                if (document.all) {
                    window.external.AddFavorite(url, _title);
                } else {
                    alert($(this).attr('data-alert'));
                }
            }
        }
    });
})
/*own.js*/
var Site = window.Site;
$(function () {
    Site.run();

    var wh = $(window).height();
    $('.met-nav .dropdown a.link').click(function () {
        if (deviceType == 'd' && !Breakpoints.is('xs') && $(this).data("hover")) window.location.href = $(this).attr('href');
    });

    if ($(".navbar-fixed-top").length) {
        $(window).scroll(function () {
            if ($(".navbar-fixed-top").offset().top > 1) {
                $(".navbar-fixed-top").addClass("navbar-shadow");
            } else {
                $(".navbar-fixed-top").removeClass("navbar-shadow");
            }
        });
    }

    Breakpoints.on('sm md', {
        enter: function () {
            setTimeout(function () {
                $('.met-nav .nav>li>.dropdown-menu').each(function () {
                    if ($(this).parent('li').offset().left < $(window).width() / 2 - $(this).parent('li').width() / 2) {
                        $(this).removeClass('dropdown-menu-right').addClass('dropdown-menu-left');
                    }
                    if ($(this).parent('li').offset().left > $(window).width() / 2 - $(this).parent('li').width() / 2) {
                        $('.dropdown-submenu', this).addClass('dropdown-menu-left');
                    }
                });
            }, 0)
        }
    });
    if (deviceType != 'd') {
        setTimeout(function () {
            $('.met-nav .nav>li').each(function () {
                if ($('.dropdown-submenu', this).length) $(this).addClass('openallsub');
            })
        }, 0)
    }

    Breakpoints.on('sm md lg', {
        enter: function () {
            $(".navlist .dropdown-submenu").hover(function () {
                $(this).parent('.dropdown-menu').addClass('overflow-visible');
            }, function () {
                $(this).parent('.dropdown-menu').removeClass('overflow-visible');
            });
        }
    })

    var $navlist = $('.met-nav .navlist'), nav_langlist = function () {
        $navlist.removeClass('flex');
        if (!Breakpoints.is('xs') && $navlist.position().top > 20) {
            $('body').addClass('met-navflex');
            $navlist.addClass('flex');
            if ($('body').hasClass('met-navfixed')) $('body').addClass('met-navfixed-langlist');
        } else {
            $('body').removeClass('met-navflex');
            $navlist.removeClass('flex');
            if ($('body').hasClass('met-navfixed')) $('body').removeClass('met-navfixed-langlist');
        }
    };
    nav_langlist();
    $(window).resize(function () {
        nav_langlist();
    });


    var $metbanner = $('.met-banner'), metbanner_slide = '.met-banner .slick-slide';
    if ($metbanner.length) {
        imageloadFun('.met-banner img:eq(0)', function () {
            var bannerh_default = new Array(300, 150, 150), datah = $metbanner.data('height').split('|');
            if ($metbanner.hasClass('banner-ny-h')) bannerh_default = new Array(150, 100, 100);
            var bannerh = datah ? datah : bannerh_default, bannerAutoH = function () {
                $metbanner.removeClass('fixedheight').height('auto').find('img').height('');
                if (Breakpoints.is('xs') && $metbanner.height() <= bannerh_default[2]) $metbanner.addClass('fixedheight').height('');
            };
            if ($metbanner.hasClass('fixedheight')) {
                Breakpoints.on('md lg', {
                    enter: function () {
                        $metbanner.height(bannerh[0]);
                    }
                })
                Breakpoints.on('sm', {
                    enter: function () {
                        $metbanner.height(bannerh[1]);
                    }
                })
                Breakpoints.on('xs', {
                    enter: function () {
                        $metbanner.height(bannerh[2]);
                    }
                })
            } else {
                bannerAutoH();
                $(window).resize(function () {
                    bannerAutoH();
                })
            }
            ;
            if ($(metbanner_slide).length > 1) {
                $metbanner.slick({
                    autoplay: true,
                    dots: true,
                    autoplaySpeed: 4000,
                    pauseOnHover: false,
                    prevArrow: met_prevArrow,
                    nextArrow: met_nextArrow,
                    lazyloadPrevNext: true,
                });
                $metbanner.on('setPosition', function (event, slick) {
                    $(metbanner_slide + ' .banner-text').addClass('hide');
                    $(metbanner_slide + '.slick-active .banner-text').removeClass('hide');
                });
                if (deviceType == 'd' && !Breakpoints.is('xs')) $metbanner.slick('slickSetOption', 'swipe', false);
            }
        })
    }


    if ($('.met-column-nav-ul').length) {
        Breakpoints.on('xs sm', {
            enter: function () {
                navtabSwiper('.met-column-nav-ul');
            }
        })
    }


    if ($('#met-weixin').length) {
        var $met_weixin = $('#met-weixin');
        Breakpoints.on('xs', {
            enter: function () {
                if ($met_weixin.offset().left < 80) $met_weixin.find('i[data-plugin=webuiPopover]').attr({'data-placement': 'right'});
                if ($(window).width() - $met_weixin.offset().left - $met_weixin.outerWidth() < 80) $met_weixin.find('i[data-plugin=webuiPopover]').attr({'data-placement': 'left'});
            }
        })
    }

    if ($('.met-footnav').length) {
        Breakpoints.get('xs').on({
            enter: function () {
                $('.met-footnav .mob-masonry').masonry({itemSelector: ".masonry-item"});
            }
        });
    }
    $(".met-scroll-top").click(function () {
        $('html,body').animate({'scrollTop': 0}, 300);
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > wh) {
            $(".met-scroll-top").removeClass('hide').addClass("animation-slide-bottom");
        } else {
            $(".met-scroll-top").addClass('hide').removeClass('animation-slide-bottom');
        }
    });

    if ($(".metvideobox").length > 0) {
        $(".metvideobox").each(function () {
            var data = $(this).attr("data-metvideo");
            data = data.split("|");
            var width = data[0], height = data[1], poster = data[2], autoplay = data[3], src = data[4];
            var vhtml = '<div class="metvideobox" style="height:' + height + 'px;">';
            vhtml += '<video class="metvideo video-js vjs-default-skin" controls preload="none" width="' + width + '" height="' + height + '" poster="' + poster + '" data-setup=\'{\"autoplay\":' + autoplay + '}\'>';
            vhtml += '<source src="' + src + '" type="video/mp4" />';
            vhtml += '</video></div>';
            $(this).after(vhtml).remove();
        });
        include(M["weburl"] + 'public/ui/v1/js/effects/video-js/video-js.css');
        if (deviceType == 'd') {
            include(M["weburl"] + "public/ui/v1/js/effects/video-js/video_hack.js", function () {
                setTimeout(function () {
                    videoSizeRes('.metvideo');
                }, 0)
            });
        } else {
            videoSizeRes('.metvideo');
        }
    }
    if ($('.met-editor iframe,.met-editor embed').length) videoSizeRes('.met-editor iframe,.met-editor embed');
    $(document).on('click', '.modal-dialog.modal-center', function (e) {
        if (!$(e.target).closest(".modal-dialog.modal-center .modal-content").length) $(this).parents('.modal').modal('hide');
    });


    function main_height() {
        $('.met-showproduct.pagetype2 nav.navbar h1.navbar-brand').css('max-width', $('.met-showproduct.pagetype2 nav.navbar .container').width() - $('.met-showproduct.pagetype2 nav.navbar .nav.shop-btn-body').width() - $('#navbar-showproduct-pagetype2 .nav').width() - 36);
    }

    var isMobile = $('html').hasClass('isMobile') ? true : false;

    var win_width = $(window).width();
    main_height();
    $(window).resize(function () {
        win_width = $(window).width();
        main_height();
    });

    if ($('#map').length > 0) {
        var script = document.createElement("script"), coordinate = $('#map').attr('coordinate') || '105,25';
        script.src = "//api.map.baidu.com/api?v=2.0&ak=aL2Gwp389Kxj3bFhSMq7cf9w&callback=map_func";
        document.body.appendChild(script);
        map_func = function () {
            var coo = coordinate && coordinate.split(',');
            var map = new BMap.Map("map");
            map.centerAndZoom(new BMap.Point(coo[0] * 1, coo[1] * 1), 19);
            map.enableScrollWheelZoom();
            var Icon = new BMap.Icon(M['tem'] + "/min/svg/point.svg\" class=\"point_svg", new BMap.Size(28, 56));
            var marker = new BMap.Marker(new BMap.Point(coo[0] * 1, coo[1] * 1), {icon: Icon});
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
            map.addOverlay(marker);
        }
    }
})

$(window).load(function () {
    $('.load-box').addClass('active');
});

function navtabSwiper(navObj) {
    var navtabSdefault = function () {
        var navObjW = sonWidthSum(navObj + '>li') + $('.caret', navObj).length;
        if (navObjW > $(navObj).parent().width()) {
            if ($(navObj).hasClass('swiper-wrapper')) {
                if (!$(navObj).hasClass('flex-start')) $(navObj).addClass('flex-start');
            } else {
                $(navObj)
                    .addClass("swiper-wrapper flex-start")
                    .wrap("<div class=\"swiper-container swiper-navtab\"></div>").after('<div class="swiper-scrollbar"></div>')
                    .find(">li").addClass("swiper-slide");
                var swiperNavtab = new Swiper('.swiper-navtab', {
                    slidesPerView: 'auto',
                    scrollbar: '.swiper-scrollbar',
                    scrollbarHide: false,
                    scrollbarDraggable: true
                });
            }
            if ($(navObj).parents('.sidebar-tile').length && $('.product-search').length) $(navObj).parents('.sidebar-tile').height('auto').css({'margin-bottom': 10});
            if ($('.dropdown', navObj).length && $(".swiper-navtab").length) {
                if (!$(".swiper-navtab").hasClass('overflow-visible')) $(".swiper-navtab").addClass("overflow-visible");
            }
        } else if ($(navObj).hasClass('flex-start')) {
            $(navObj).removeClass('flex-start');
        }
    };
    navtabSdefault();
    $(window).resize(function () {
        navtabSdefault();
    })
    $(navObj).removeClass('invisible-xs');
    Breakpoints.on('xs sm', {
        enter: function () {
            $('.dropdown-menu', navObj).each(function () {
                if ($(this).parent('li').offset().left > $(window).width() / 2 - $(this).parent('li').width() / 2) {
                    $(this).addClass('dropdown-menu-right');
                }
            });
        }
    });
}

function include(file, fun) {
    var files = typeof file == "string" ? [file] : file;
    for (var i = 0; i < files.length; i++) {
        var name = files[i].replace(/^\s|\s$/g, ""), att = name.split('.'), ext = att[att.length - 1].toLowerCase();
        if (ext == 'js') {
            var filesi = document.createElement('script');
            filesi.src = name;
            filesi.type = "text/javascript";
            if (typeof filesi != "undefined") document.getElementsByTagName('html')[0].appendChild(filesi);
        } else if (ext == 'css') {
            var filesi = document.createElement('link');
            filesi.href = name;
            filesi.type = 'text/css';
            filesi.rel = "stylesheet";
            if (typeof filesi != "undefined") document.getElementsByTagName('head')[0].appendChild(filesi);
        }
    }
    if (typeof fun === "function") {
        filesi.onload = filesi.onreadystatechange = function () {
            var r = filesi.readyState;
            if (!r || r === 'loaded' || r === 'complete') {
                filesi.onload = filesi.onreadystatechange = null;
                fun();
            }
        };
    }
}

function imageSize(risObj, risImg) {
    var risObjs = risObj.split(','), risImg = risImg ? risImg : 'img';
    for (var i = 0; i < risObjs.length; i++) {
        $(risObjs[i]).each(function () {
            var scale = $(this).data('scale');
            if (scale) {
                $(risImg, this).height($(risImg, this).width() * scale);
                $(risImg, this).each(function () {
                    var thisimg = $(this);
                    imageloadFun(this, function () {
                        thisimg.height('').removeAttr('height');
                    })
                });
                var $this = $(this);
                $(window).resize(function () {
                    var resImg = $this.find(risImg + '.imgloading');
                    resImg.height(resImg.width() * scale);
                });
            }
        });
    }
}

function imageloadFun(risObj, fun) {
    $(risObj).each(function () {
        if ($(this).data('lazy') || $(this).data('original')) {
            var thisimg = $(this), loadtime = setInterval(function () {
                if (thisimg.attr('src') == thisimg.data('original') || thisimg.attr('src') == thisimg.data('lazy')) {
                    clearInterval(loadtime);
                    var img = new Image(), img_url = thisimg.attr('src');
                    img.src = img_url;
                    if (img.complete) {
                        if (typeof fun === "function") fun();
                        return;
                    }
                    img.onload = function () {
                        if (typeof fun === "function") fun();
                    };
                }
            }, 100)
        } else if ($(this).attr('src')) {
            var img = new Image(), img_url = $(this).attr('src');
            img.src = img_url;
            if (img.complete) {
                if (typeof fun === "function") fun();
                return;
            }
            img.onload = function () {
                if (typeof fun === "function") fun();
            };
        }
    });
}

function sonWidthSum(sonObj, sonNum) {
    var sonObjs = $(sonObj), sonTrueNum = sonObjs.length, parentObjW = 0;
    if (sonNum > sonTrueNum || !sonNum) sonNum = sonTrueNum;
    for (var i = 0; i < sonNum; i++) {
        var sonObjW = sonObjs.eq(i).outerWidth() + parseInt(sonObjs.eq(i).css('marginLeft')) + parseInt(sonObjs.eq(i).css('marginRight'));
        parentObjW += sonObjW;
    }
    return parentObjW + sonNum;
}

$.fn.extend({
    galleryLoad: function (dynamic) {
        $("body").addClass("met-white-lightGallery");
        if (dynamic) {
            $(this).lightGallery({
                autoplayControls: false,
                getCaptionFromTitleOrAlt: false,
                dynamic: true,
                dynamicEl: dynamic,
                thumbWidth: 64,
                thumbContHeight: 84,
            });
        } else {
            $(this).lightGallery({
                selector: '.lg-item-box:not(.slick-cloned)',
                autoplayControls: false,
                exThumbImage: 'data-exthumbimage',
                getCaptionFromTitleOrAlt: false,
                thumbWidth: 64,
                thumbContHeight: 84,
            });
        }
        $(this).on('onSlideClick.lg', function () {
            $('.lg-outer .lg-toolbar').toggleClass('opacity0');
            if ($('.lg-outer .lg-toolbar').hasClass('opacity0')) {
                $('.lg-outer').removeClass('lg-thumb-open');
            } else {
                $('.lg-outer').addClass('lg-thumb-open');
            }
            if (Breakpoints.is('xs')) {
                if ($('.lg-outer .lg-toolbar').hasClass('opacity0')) {
                    $('.lg-outer .lg-actions').addClass('hide');
                } else {
                    $('.lg-outer .lg-actions').removeClass('hide');
                }
            } else {
                $('.lg-outer .lg-actions').removeClass('hide');
            }
        });
    }, scrollFun: function (fun, set) {
        if (typeof fun === "function") {
            var defaultSetting = {
                top: 30, loop: false, skip_invisible: true, is_scroll: false
            };
            $.extend(defaultSetting, set);
            $(this).each(function () {
                var $this = $(this), fun_open = true, windowDistanceFun = function () {
                    if (fun_open) {
                        var this_t = $this.offset().top, scroll_t = $(window).scrollTop(),
                            this_scroll_t = this_t - scroll_t - $(window).height(),
                            this_scroll_b = this_t + $this.outerHeight() - scroll_t,
                            visible = defaultSetting.skip_invisible ? $this.is(":visible") : true;
                        if (this_scroll_t < defaultSetting.top && this_scroll_b > 0 && visible) {
                            if (!defaultSetting.loop) fun_open = false;
                            fun($this);
                        }
                    }
                };
                windowDistanceFun();
                if (defaultSetting.is_scroll) {
                    $(window).scroll(function () {
                        if (fun_open) windowDistanceFun();
                    })
                }
            });
        }
    }, appearDiy: function (is_reset) {
        $(this).each(function () {
            var $this = $(this), animation = 'animation-' + $(this).data('animate');
            if (is_reset) {
                $(this).removeClass(animation).removeClass('appear-no-repeat').addClass('invisible');
            } else {
                $(this).addClass(animation).addClass('appear-no-repeat');
                setTimeout(function () {
                    $this.removeClass('invisible');
                }, 0)
            }
        });
    }
})

function videoSizeRes(obj) {
    $(obj).each(function () {
        var $this = $(this), scale = $(this).attr('height') / $(this).attr('width');
        if (!scale) scale = parseInt($(this).css('height')) / parseInt($(this).css('width'));
        if (scale) {
            $(this).height($(this).width() * scale);
            $(window).resize(function () {
                $this.height($this.width() * scale);
            });
        }
    });
}

/*sys.js*/
if (M["module"] && M["id"]) {
    var modulename = "";
    switch (M["module"]) {
        case 2:
            modulename = "news";
            break;
        case 3:
            modulename = "product";
            break;
        case 4:
            modulename = "download";
            break;
        case 5:
            modulename = "img";
            break
    }
    if (modulename != "") {
        $.ajax({
            type: "POST",
            url: M["weburl"] + "include/hits.php?type=" + modulename + "&id=" + M["id"] + "&metinfover=v1"
        })
    }
}
var url = M["weburl"] + "include/interface/uidata.php?lang=" + M["lang"], h = window.location.href;
if (h.indexOf("preview=1") != -1) {
    url = url + "&theme_preview=1"
}
$.ajax({
    type: "POST", url: url, dataType: "json", success: function (msg) {
        var c = msg.config;
        if (c.met_online_type != 3) {
            include(M["weburl"] + "public/css/online.css");

            jQuery.migrateMute === void 0 && (jQuery.migrateMute = !0), function (e, t, n) {
                function r(n) {
                    var r = t.console;
                    i[n] || (i[n] = !0, e.migrateWarnings.push(n), r && r.warn && !e.migrateMute && (r.warn("JQMIGRATE:" + n), e.migrateTrace && r.trace && r.trace()))
                }

                function a(t, a, i, o) {
                    if (Object.defineProperty) {
                        try {
                            return Object.defineProperty(t, a, {
                                configurable: !0, enumerable: !0, get: function () {
                                    return r(o), i
                                }, set: function (e) {
                                    r(o), i = e
                                }
                            }), n
                        } catch (s) {
                        }
                    }
                    e._definePropertyBroken = !0, t[a] = i
                }

                var i = {};
                e.migrateWarnings = [], !e.migrateMute && t.console && t.console.log && t.console.log("JQMIGRATE:Logging is active"), e.migrateTrace === n && (e.migrateTrace = !0), e.migrateReset = function () {
                    i = {}, e.migrateWarnings.length = 0
                }, "BackCompat" === document.compatMode && r("jQuery is not compatible with Quirks Mode");
                var o = e("<input/>", {size: 1}).attr("size") && e.attrFn, s = e.attr,
                    u = e.attrHooks.value && e.attrHooks.value.get || function () {
                        return null
                    }, c = e.attrHooks.value && e.attrHooks.value.set || function () {
                        return n
                    }, l = /^(?:input|button)$/i, d = /^[238]$/,
                    p = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
                    f = /^(?:checked|selected)$/i;
                a(e, "attrFn", o || {}, "jQuery.attrFn is deprecated"), e.attr = function (t, a, i, u) {
                    var c = a.toLowerCase(), g = t && t.nodeType;
                    return u && (4 > s.length && r("jQuery.fn.attr( props,pass ) is deprecated"), t && !d.test(g) && (o ? a in o : e.isFunction(e.fn[a]))) ? e(t)[a](i) : ("type" === a && i !== n && l.test(t.nodeName) && t.parentNode && r("Can't change the 'type' of an input or button in IE 6/7/8"), !e.attrHooks[c] && p.test(c) && (e.attrHooks[c] = {
                        get: function (t, r) {
                            var a, i = e.prop(t, r);
                            return i === !0 || "boolean" != typeof i && (a = t.getAttributeNode(r)) && a.nodeValue !== !1 ? r.toLowerCase() : n
                        }, set: function (t, n, r) {
                            var a;
                            return n === !1 ? e.removeAttr(t, r) : (a = e.propFix[r] || r, a in t && (t[a] = !0), t.setAttribute(r, r.toLowerCase())), r
                        }
                    }, f.test(c) && r("jQuery.fn.attr('" + c + "') may use property instead of attribute")), s.call(e, t, a, i))
                }, e.attrHooks.value = {
                    get: function (e, t) {
                        var n = (e.nodeName || "").toLowerCase();
                        return "button" === n ? u.apply(this, arguments) : ("input" !== n && "option" !== n && r("jQuery.fn.attr('value') no longer gets properties"), t in e ? e.value : null)
                    }, set: function (e, t) {
                        var a = (e.nodeName || "").toLowerCase();
                        return "button" === a ? c.apply(this, arguments) : ("input" !== a && "option" !== a && r("jQuery.fn.attr('value',val) no longer sets properties"), e.value = t, n)
                    }
                };
                var g, h, v = e.fn.init, m = e.parseJSON, y = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
                e.fn.init = function (t, n, a) {
                    var i;
                    return t && "string" == typeof t && !e.isPlainObject(n) && (i = y.exec(e.trim(t))) && i[0] && ("<" !== t.charAt(0) && r("$(html) HTML strings must start with '<' character"), i[3] && r("$(html) HTML text after last tag is ignored"), "#" === i[0].charAt(0) && (r("HTML string cannot start with a '#' character"), e.error("JQMIGRATE:Invalid selector string (XSS)")), n && n.context && (n = n.context), e.parseHTML) ? v.call(this, e.parseHTML(i[2], n, !0), n, a) : v.apply(this, arguments)
                }, e.fn.init.prototype = e.fn, e.parseJSON = function (e) {
                    return e || null === e ? m.apply(this, arguments) : (r("jQuery.parseJSON requires a valid JSON string"), null)
                }, e.uaMatch = function (e) {
                    e = e.toLowerCase();
                    var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || 0 > e.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
                    return {browser: t[1] || "", version: t[2] || "0"}
                }, e.browser || (g = e.uaMatch(navigator.userAgent), h = {}, g.browser && (h[g.browser] = !0, h.version = g.version), h.chrome ? h.webkit = !0 : h.webkit && (h.safari = !0), e.browser = h), a(e, "browser", e.browser, "jQuery.browser is deprecated"), e.sub = function () {
                    function t(e, n) {
                        return new t.fn.init(e, n)
                    }

                    e.extend(!0, t, this), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, t.sub = this.sub, t.fn.init = function (r, a) {
                        return a && a instanceof e && !(a instanceof t) && (a = t(a)), e.fn.init.call(this, r, a, n)
                    }, t.fn.init.prototype = t.fn;
                    var n = t(document);
                    return r("jQuery.sub() is deprecated"), t
                }, e.ajaxSetup({converters: {"text json": e.parseJSON}});
                var b = e.fn.data;
                e.fn.data = function (t) {
                    var a, i, o = this[0];
                    return !o || "events" !== t || 1 !== arguments.length || (a = e.data(o, t), i = e._data(o, t), a !== n && a !== i || i === n) ? b.apply(this, arguments) : (r("Use of jQuery.fn.data('events') is deprecated"), i)
                };
                var j = /\/(java|ecma)script/i, w = e.fn.andSelf || e.fn.addBack;
                e.fn.andSelf = function () {
                    return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), w.apply(this, arguments)
                }, e.clean || (e.clean = function (t, a, i, o) {
                    a = a || document, a = !a.nodeType && a[0] || a, a = a.ownerDocument || a, r("jQuery.clean() is deprecated");
                    var s, u, c, l, d = [];
                    if (e.merge(d, e.buildFragment(t, a).childNodes), i) {
                        for (c = function (e) {
                            return !e.type || j.test(e.type) ? o ? o.push(e.parentNode ? e.parentNode.removeChild(e) : e) : i.appendChild(e) : n
                        }, s = 0; null != (u = d[s]); s++) {
                            e.nodeName(u, "script") && c(u) || (i.appendChild(u), u.getElementsByTagName !== n && (l = e.grep(e.merge([], u.getElementsByTagName("script")), c), d.splice.apply(d, [s + 1, 0].concat(l)), s += l.length))
                        }
                    }
                    return d
                });
                var Q = e.event.add, x = e.event.remove, k = e.event.trigger, N = e.fn.toggle, T = e.fn.live,
                    M = e.fn.die, S = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
                    C = RegExp("\\b(?:" + S + ")\\b"), H = /(?:^|\s)hover(\.\S+|)\b/, A = function (t) {
                        return "string" != typeof t || e.event.special.hover ? t : (H.test(t) && r("'hover' pseudo-event is deprecated,use 'mouseenter mouseleave'"), t && t.replace(H, "mouseenter$1 mouseleave$1"))
                    };
                e.event.props && "attrChange" !== e.event.props[0] && e.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), e.event.dispatch && a(e.event, "handle", e.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), e.event.add = function (e, t, n, a, i) {
                    e !== document && C.test(t) && r("AJAX events should be attached to document:" + t), Q.call(this, e, A(t || ""), n, a, i)
                }, e.event.remove = function (e, t, n, r, a) {
                    x.call(this, e, A(t) || "", n, r, a)
                }, e.fn.error = function () {
                    var e = Array.prototype.slice.call(arguments, 0);
                    return r("jQuery.fn.error() is deprecated"), e.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, e) : (this.triggerHandler.apply(this, e), this)
                }, e.fn.toggle = function (t, n) {
                    if (!e.isFunction(t) || !e.isFunction(n)) {
                        return N.apply(this, arguments)
                    }
                    r("jQuery.fn.toggle(handler,handler...) is deprecated");
                    var a = arguments, i = t.guid || e.guid++, o = 0, s = function (n) {
                        var r = (e._data(this, "lastToggle" + t.guid) || 0) % o;
                        return e._data(this, "lastToggle" + t.guid, r + 1), n.preventDefault(), a[r].apply(this, arguments) || !1
                    };
                    for (s.guid = i; a.length > o;) {
                        a[o++].guid = i
                    }
                    return this.click(s)
                }, e.fn.live = function (t, n, a) {
                    return r("jQuery.fn.live() is deprecated"), T ? T.apply(this, arguments) : (e(this.context).on(t, this.selector, n, a), this)
                }, e.fn.die = function (t, n) {
                    return r("jQuery.fn.die() is deprecated"), M ? M.apply(this, arguments) : (e(this.context).off(t, this.selector || "**", n), this)
                }, e.event.trigger = function (e, t, n, a) {
                    return n || C.test(e) || r("Global events are undocumented and deprecated"), k.call(this, e, t, n || document, a)
                }, e.each(S.split("|"), function (t, n) {
                    e.event.special[n] = {
                        setup: function () {
                            var t = this;
                            return t !== document && (e.event.add(document, n + "." + e.guid, function () {
                                e.event.trigger(n, null, t, !0)
                            }), e._data(this, n, e.guid++)), !1
                        }, teardown: function () {
                            return this !== document && e.event.remove(document, n + "." + e._data(this, n)), !1
                        }
                    }
                })
            }(jQuery, window);
            var t, x, y;
            (function ($) {
                jQuery.fn.PositionFixed = function (options) {
                    var defaults = {css: "", x: 0, y: 0};
                    var o = jQuery.extend(defaults, options);
                    var isIe6 = false;
                    if ($.browser.msie && parseInt($.browser.version) == 6) {
                        isIe6 = true
                    }
                    var html = $("html");
                    if (isIe6 && html.css("backgroundAttachment") !== "fixed") {
                        html.css("backgroundAttachment", "fixed")
                    }
                    return this.each(function () {
                        var domThis = $(this)[0];
                        var objThis = $(this);
                        if (isIe6) {
                            var left = parseInt(o.x) - html.scrollLeft(), top = parseInt(o.y) - html.scrollTop();
                            objThis.css("position", "absolute");
                            domThis.style.setExpression("left", "eval((document.documentElement).scrollLeft + " + o.x + ') + "px"');
                            domThis.style.setExpression("top", "eval((document.documentElement).scrollTop + " + o.y + ') + "px"')
                        } else {
                            objThis.css("position", "fixed").css("top", o.y).css("left", o.x)
                        }
                    })
                }
            })(jQuery);
            var Floaters = {
                delta: 0.08,
                queue: null,
                collection: {},
                items: [],
                addItem: function (Obj, left, top, ani) {
                    Obj.style["top"] = top + "px";
                    Obj.style["left"] = left + "px";
                    var newItem = {object: Obj, oLeft: left, oTop: top};
                    this.items[this.items.length] = newItem;
                    this.delta = ani ? ani : this.delta
                },
                sPlay: function () {
                    this.collection = this.items;
                    this.queue = setInterval(function () {
                        metplay()
                    }, 10)
                }
            };

            function checkStandard() {
                var scrollY;
                if (document.documentElement && document.documentElement.scrollTop) {
                    scrollY = document.documentElement.scrollTop
                } else {
                    if (document.body) {
                        scrollY = document.body.scrollTop
                    }
                }
                return scrollY
            }

            function metplay() {
                var diffY = checkStandard();
                for (var i in Floaters.collection) {
                    var obj = Floaters.collection[i].object;
                    var obj_y = Floaters.collection[i].oTop;
                    var total = diffY + obj_y;
                    if (obj.offsetTop != total) {
                        var oy = (total - obj.offsetTop) * Floaters.delta;
                        oy = (oy > 0 ? 1 : -1) * Math.ceil(Math.abs(oy));
                        obj.style["top"] = obj.offsetTop + oy + "px"
                    } else {
                        clearInterval(Floaters.queue);
                        Floaters.queue = setInterval(function () {
                            metplay()
                        }, 10)
                    }
                }
            }

            function onlineclose() {
                $("#onlinebox").hide();
                return false
            }

            function olne_domx(type, onlinex) {
                var maxr = document.body.offsetWidth - $("#onlinebox").width();
                if (type > 1) {
                    onlinex = document.body.scrollWidth - $("#onlinebox").width() - onlinex
                }
                if (onlinex < 0) {
                    onlinex = 0
                }
                if (onlinex > maxr) {
                    onlinex = maxr;
                    if ($.browser.msie && parseInt($.browser.version) == 6) {
                        onlinex = maxr - 18
                    }
                }
                return onlinex
            }

            function olne_domx_op(type, onlinex) {
                var zwd = document.documentElement.clientWidth;
                var oboxw = $("#onlinebox").width();
                oboxw = oboxw == 0 ? $("#onlinebox .onlinebox-conbox").width() : oboxw;
                var maxr = zwd - oboxw;
                if (type > 1) {
                    onlinex = zwd - oboxw - onlinex
                }
                if (onlinex < 0) {
                    onlinex = 0
                }
                if (onlinex > maxr) {
                    onlinex = maxr;
                    if ($.browser.msie && parseInt($.browser.version) == 6) {
                        onlinex = maxr - 18
                    }
                }
                return onlinex
            }

            function olne_dd_wd(d) {
                var w = 0;
                d.each(function () {
                    w = w > $(this).outerWidth(true) ? w : $(this).outerWidth(true)
                });
                return w
            }

            function olne_mouse_on(t, my, nex, type) {
                if (t == 1) {
                    my.hide();
                    nex.show();
                    var dmk = $("div.onlinebox-conbox .online-tbox").size() ? $("div.onlinebox-conbox .online-tbox").outerWidth(true) : 0;
                    var dt = olne_dd_wd($("div.onlinebox-conbox dd"));
                    dt = dt > dmk ? dt : $("div.onlinebox-conbox .online-tbox").outerWidth(true);
                    if (dt <= 0) {
                        dt = 100
                    }
                    nex.css({"width": dt + "px"})
                } else {
                    nex.css({"position": "absolute", "left": "0px"});
                    nex.hide();
                    my.show()
                }
                olne_resize()
            }

            function olne_resize() {
                mx = Number(olne_domx_op(t, x));
                my = Number(y);
                if (t > 0 && t < 3) {
                    var floatDivr = document.getElementById("onlinebox");
                    Floaters.addItem(floatDivr, mx, my);
                    Floaters.sPlay()
                } else {
                    $("#onlinebox").PositionFixed({x: mx, y: my})
                }
            }

            function olne_mouse(dom, type) {
                var nex = dom.next("div.onlinebox-conbox");
                if ($(".onlinebox_2").size() > 0) {
                    dom.click(function () {
                        olne_mouse_on(1, $(this), nex, type)
                    })
                } else {
                    dom.hover(function () {
                        olne_mouse_on(1, $(this), nex, type)
                    }, function () {
                    })
                }
                $("#onlinebox .onlinebox-top").click(function () {
                    if (!nex.is(":hidden")) {
                        olne_mouse_on(0, dom, nex, type)
                    }
                });
                textWrap($(".onlinebox-showbox span"))
            }

            function textWrap(my) {
                var text = "", txt = my.text();
                txt = txt.split("");
                for (var i = 0; i < txt.length; i++) {
                    text += txt[i] + "<br/>"
                }
                my.html(text)
            }

            function olne_app(msg, type, mxq, myq) {
                $("body").append(msg);
                mx = Number(olne_domx_op(type, mxq));
                my = Number(myq);
                if (type > 0 && type < 3) {
                    var floatDivr = document.getElementById("onlinebox");
                    Floaters.addItem(floatDivr, mx, my);
                    Floaters.sPlay()
                } else {
                    $("#onlinebox").PositionFixed({x: mx, y: my})
                }
                $(window).resize(function () {
                    olne_resize()
                });
                $("#onlinebox").show();
                if ($("div.onlinebox-showbox").size() > 0) {
                    olne_mouse($("div.onlinebox-showbox"), type)
                }
            }

            $(document).ready(function () {
                var url = M["weburl"] + "include/online.php?lang=" + M["lang"];
                $.ajax({
                    type: "POST", url: url, dataType: "json", success: function (msg) {
                        t = msg.t, x = msg.x, y = msg.y;
                        if (t != 3) {
                            olne_app(msg.html, t, x, y)
                        }
                    }
                })
            })
        }
        if (c.met_stat == 1) {
            var navurl = M["classnow"] == 10001 ? "" : "../";
            var stat_d = M["classnow"] + "-" + M["id"] + "-" + M["lang"];
            var url = M["weburl"] + "include/stat/stat.php?type=para&u=" + navurl + "&d=" + stat_d;
            $.getScript(url)
        }
    }
});