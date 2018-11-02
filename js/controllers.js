(function(){
    angular.module('app.controllers' , ['app.services'])
        /*
         * 主页
         * */
        .controller('homeController' , ['$scope' , '$interval' , 'photographyService' , function($scope , $interval , photographyService){

            $scope.$on('$destroy',function(){
                $interval.cancel(timer);
            });


            var imgs = document.querySelectorAll('.ad>img');
            var navs = document.querySelectorAll('.ul li');
            var index = 0;
            var timer = $interval(show , 4000);

            function show(){
                document.querySelector('.ul>ul>li.actived').className = '';

                imgs[index].className = 'outLeft';
                index++;
                if(index >imgs.length-1){
                    index = 0;
                }

                navs[index].className = 'actived';
                imgs[index].className = 'inRight';
                //if(document.querySelector('#ad_info_img')){
                document.querySelector('#ad_info_img').src = "images/ban0" + (index + 1) + ".png";
                //}
            }

            //新品活动菜单
            var $shadows = $('.shadow');
            var $img = $('.new_event_right>img');

            $shadows.bind('click' , function(){
                var $actived = $('#actived');
                var $index = $(this).index('.shadow');
                var $imgUrl = 'images/new_event_right0' + ($index + 1) + '.png';

                $actived.removeAttr('id');
                $(this).attr('id','actived');

                $img.attr('src' , $imgUrl);

            });

            //热门婚纱
            var hotWeddingDress = [
                {"id":"dd4e65d7-beff-11e7-87b4-14dda97c4e49","image":"a10.jpg","price":378,"name":"妮玫欧新娘公主婚纱裙"},{"id":"162bd373-bf0a-11e7-87b4-14dda97c4e49","image":"m31.jpg","price":776,"name":"模丽秀挂脖型婚纱"},{"id":"dd57cb46-beff-11e7-87b4-14dda97c4e49","image":"b30.jpg","price":366,"name":"白色蕾丝新娘婚纱"},

                {"id":"dd626414-beff-11e7-87b4-14dda97c4e49","image":"c40.jpg","price":624,"name":"赤鳄小拖尾花朵抹胸婚纱"},{"id":"dd6260b8-beff-11e7-87b4-14dda97c4e49","image":"c10.jpg","price":820,"name":"属于长拖尾简约婚纱"},{"id":"dd62654e-beff-11e7-87b4-14dda97c4e49","image":"c50.jpg","price":520,"name":"月缦鱼尾抹胸婚纱"},

                {"id":"dd6265ab-beff-11e7-87b4-14dda97c4e49","image":"c60.jpg","price":440,"name":"汉朴思抹胸小拖尾婚纱"},{"id":"dd6e9ff1-beff-11e7-87b4-14dda97c4e49","image":"d10.jpg","price":378,"name":"乔逸曼挂脖拖尾绑带婚纱"},{"id":"dd6ea1f6-beff-11e7-87b4-14dda97c4e49","image":"d30.jpg","price":288,"name":"爱然鹏蕾丝挂脖婚纱"},



                {"id":"899ba705-bf03-11e7-87b4-14dda97c4e49","image":"h30.jpg","price":366,"name":"名门短裙摆新娘婚纱礼服"},{"id":"297d1da0-bf6c-11e7-a2a4-14dda9569274","image":"n30.jpg","price":676,"name":"模丽秀婚纱礼服"}, {"id":"e3e085e0-bf02-11e7-87b4-14dda97c4e49","image":"g30.jpg","price":366,"name":"白色蕾丝韩式新娘婚纱"},

                {"id":"dd6ea2b9-beff-11e7-87b4-14dda97c4e49","image":"d70.jpg","price":345,"name":"妮玫欧蓬蓬裙婚纱"},{"id":"e3e0863d-bf02-11e7-87b4-14dda97c4e49","image":"g40.jpg","price":624,"name":"名瑞童话公主蕾丝婚纱"},{"id":"e3e08707-bf02-11e7-87b4-14dda97c4e49","image":"g60.jpg","price":440,"name":"轻奢品牌吊带抹胸婚纱"},

                {"id":"e3e0874e-bf02-11e7-87b4-14dda97c4e49","image":"g70.jpg","price":540,"name":"韵雅蒂新款缎面婚纱"},{"id":"61bb0291-bf07-11e7-87b4-14dda97c4e49","image":"i10.jpg","price":820,"name":"妮玫欧韩版新款"},{"id":"61c19fec-bf07-11e7-87b4-14dda97c4e49","image":"i40.jpg","price":684,"name":"曼香侬新款婚纱"},

            ]
            var hotLength = hotWeddingDress.length/2;//9
            var end = 0;

            //初始化
            loadHot(end);

            //换一批
            $scope.replace = function(){console.log(end)
                if(end>hotLength/2){
                    end = -9;
                }
                end += 9;
                loadHot(end);console.log(end)

            };

            //加载热门婚纱
            function loadHot(end){
                $scope.hotData = hotWeddingDress.slice(end , end + 9);console.log($scope.hotData)
            }

            //加载最新客照
            $scope.photographyData = [];
            photographyService.photographyList().then(function(response){
                if(response.data.code == '100'){
                    $scope.photographyData = response.data.data.slice(0,6);
                    console.log($scope.photographyData);
                }
            });

            var swiperLr = new Swiper('.hotDress_wrapper', {
                freeMode: true,////////////////////////////////////////

                slidesPerView: 'auto',
                spaceBetween: 6,
                slidesPerGroup: 3,

                loopFillGroupWithBlank: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper

            });

        }])

        /*
         * 婚纱页
         * */
        .controller('weddingController' , ['$rootScope' , '$scope' , '$window' , 'weddingDressService' , '$timeout' ,function($rootScope , $scope , $window , weddingDressService , $timeout){
            // isBottom为防止滚动多次触发，用于截流。
            // $scope.infinite_isCmp用于控制“正在加载……”的显示与隐藏，可以为这个标签添加css3动画，达到如图所示效果
            $scope.isBottom = false;
            $scope.infinite_isCmp = false;

            $scope.requireCount = 10;

            $scope.weddingDress = [];
            $scope.weddingDressData = [];
            $scope.length = 0;
            //获取婚纱列表
            weddingDressService.weddingDressList().then(function(response){
                if(response.data.code == 100){
                    $scope.weddingDress = response.data.data.weddingClothes;
                    $scope.weddingDressData = $scope.weddingDress.slice(0 , $scope.requireCount);
                    $scope.length = response.data.data.weddingClothes.length;
                    //console.log($scope.weddingDressData);
                }
            });

            //获取更多
            $scope.loadMore = function() {

                $scope.infinite_isCmp = true;
                $scope.requireCount += 10;
                $scope.isBottom = true;

                $timeout(function () {
                    $scope.weddingDressData = $scope.weddingDress.slice(0 , $scope.requireCount);
                    console.log($scope.weddingDressData);
                    $scope.isBottom = false;
                    if($scope.requireCount>$scope.length){
                        $scope.isBottom = true;
                        $scope.infinite_isCmp = false;

                        var $notMore = $('<div class="waiting">没有了，别再拉我了</div>');
                        $('.weddingDress_wrapper').append($notMore);

                    }

                },800);

            };



            /*//获得元素
             var body = $window.document.querySelector(".swiper-slide");
             var content = $window.document.querySelector(".weddingDress_wrapper");

             //监听滚动
             body.onscroll = function () {
             var scrollTop = body.scrollTop,
             viewHeight = body.clientHeight,
             height = content.offsetHeight;

             //判断是否滚动到底部
             if (((scrollTop + viewHeight) >= height) && !isBottom && $rootScope.requireCount<=$rootScope.length)
             {
             isBottom = true;
             console.log("到底了");
             $scope.infinite_isCmp = true;
             $scope.$apply();
             $rootScope.requireCount+=10;

             //模拟请求延时,将第二次延时2s后
             $timeout(function () {
             weddingDressService.weddingDressList().then(function(response){
             if(response.data.code == 100){
             $scope.weddingDressData = response.data.data.weddingClothes.slice(0 , $rootScope.requireCount);
             //length = weddingDressList.length;
             console.log($scope.weddingDressData);

             isBottom = false;
             $scope.infinite_isCmp = false;
             if($rootScope.requireCount>$rootScope.length){
             var $notMore = $('<div class="waiting">没有了，别再拉我了</div>');
             $('.weddingDress_wrapper').append($notMore);
             }
             }
             });
             },800);
             }
             }*/
        }])

        /*
         * 摄影套餐页
         * */
        .controller('photographyPackageController' , ['$scope' , '$window' , 'photographyService' , '$timeout' ,function($scope , $window , photographyService , $timeout){
            // isBottom为防止滚动多次触发，用于截流。
            // $scope.infinite_isCmp用于控制“正在加载……”的显示与隐藏，可以为这个标签添加css3动画，达到如图所示效果
            $scope.isBottom = false;
            $scope.infinite_isCmp = false;

            $scope.requireCount1 = 6;

            $scope.photographyPackage = [];
            $scope.photographyPackageData = [];
            $scope.length1 = 0;
            //获取摄影套餐列表
            photographyService.photographyPackageList().then(function(response){
                if(response.data.code == 100){
                    $scope.photographyPackage = response.data.data.photographyPackages;

                    $scope.photographyPackageData = $scope.photographyPackage.slice(0 , $scope.requireCount1);
                    $scope.length1 = $scope.photographyPackage.length; console.log($scope.length1)
                }
            });

            //获取更多
            $scope.loadMore1 = function() {

                $scope.infinite_isCmp = true;
                $scope.requireCount1 += 8;
                $scope.isBottom = true;

                $timeout(function () {
                    $scope.photographyPackageData = $scope.photographyPackage.slice(0, $scope.requireCount1);
                    console.log($scope.photographyPackageData);
                    $scope.isBottom = false;console.log($scope.requireCount1);console.log($scope.length1)
                    if ($scope.requireCount1 > $scope.length1) {
                        $scope.isBottom = true;console.log('123')
                        $scope.infinite_isCmp = false;

                        var $notMore = $('<div class="waiting">没有了，别再拉我了</div>');
                        $('.photographyOrder_wrapper').append($notMore);

                    }

                }, 800);
            }
        }])
        /*
         * 写真摄影
         * */
        .controller('photographyController' , ['$scope' , '$window' , 'photographyService' , '$routeParams' , function($scope , $window , photographyService , $routeParams){
            $scope.photographyData = [];
            $scope.photography = {
                areaId : '1'
            };
            if($routeParams.id){
                $scope.photography.areaId = $routeParams.id;console.log($scope.photography.areaId)
            }

            $scope.areasData = [];

            //初始化客照
            loadPhotography();

            //加载写真客照
            function loadPhotography(){
                var formData = new FormData();
                for(var key in $scope.photography){
                    formData.append(key , $scope.photography[key]);
                }

                photographyService.photographyList(formData).then(function(response){
                    if(response.data.code == '100'){
                        $scope.photographyData = response.data.data;
                        console.log($scope.photographyData);
                    }
                });
            }


            //加载地区分类
            photographyService.areaList().then(function(response){console.log(response);
                if(response.data.code == '100'){
                    $scope.areasData = response.data.data;
                    console.log($scope.areasData);

                }
            });

            //切换地区
            $scope.changeArea = function(){ console.log(this.area)
                $scope.photography.areaId = this.area.id;
                loadPhotography();
            };

            var swiperLr = new Swiper('.swiper-container-lr', {
                freeMode: true,
                slidesPerView: 'auto',
                spaceBetween: 3,

                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper

            });

        }])

        /*
         * 文章
         * */
        .controller('articleController' , function($scope , $window , $location , $anchorScroll){
            $scope.clickBack = function(){
                $window.history.back();
            };

            $location.hash();
            $anchorScroll();


        })

    /**
     * 婚纱详情
     * */
        .controller('weddingDressDetailController' , function($scope , $window , $routeParams , weddingDressService , $location , ordersService){
            $scope.clickBack = function(){
                $location.path("/weddingDress");
                //$window.history.back();
            };

            $scope.isLogin = function(){
                if($window.sessionStorage.getItem('Login')){
                    $location.path('/myOrders/1');

                }
                else{
                    $location.path('/login');
                }
            };

            //热门婚纱
            var hotWeddingDress = [
                {"id":"dd4e65d7-beff-11e7-87b4-14dda97c4e49","image":"a10.jpg","price":378,"name":"妮玫欧新娘公主婚纱裙"},{"id":"162bd373-bf0a-11e7-87b4-14dda97c4e49","image":"m31.jpg","price":776,"name":"模丽秀挂脖型婚纱"},{"id":"dd57cb46-beff-11e7-87b4-14dda97c4e49","image":"b30.jpg","price":366,"name":"白色蕾丝新娘婚纱"},

                {"id":"dd626414-beff-11e7-87b4-14dda97c4e49","image":"c40.jpg","price":624,"name":"赤鳄小拖尾花朵抹胸婚纱"},{"id":"dd6260b8-beff-11e7-87b4-14dda97c4e49","image":"c10.jpg","price":820,"name":"属于长拖尾简约婚纱"},{"id":"dd62654e-beff-11e7-87b4-14dda97c4e49","image":"c50.jpg","price":520,"name":"月缦鱼尾抹胸婚纱"},

                {"id":"dd6265ab-beff-11e7-87b4-14dda97c4e49","image":"c60.jpg","price":440,"name":"汉朴思抹胸小拖尾婚纱"},{"id":"dd6e9ff1-beff-11e7-87b4-14dda97c4e49","image":"d10.jpg","price":378,"name":"乔逸曼挂脖拖尾绑带婚纱"},{"id":"dd6ea1f6-beff-11e7-87b4-14dda97c4e49","image":"d30.jpg","price":288,"name":"爱然鹏蕾丝挂脖婚纱"},



                {"id":"899ba705-bf03-11e7-87b4-14dda97c4e49","image":"h30.jpg","price":366,"name":"名门短裙摆新娘婚纱礼服"},{"id":"297d1da0-bf6c-11e7-a2a4-14dda9569274","image":"n30.jpg","price":676,"name":"模丽秀婚纱礼服"}, {"id":"e3e085e0-bf02-11e7-87b4-14dda97c4e49","image":"g30.jpg","price":366,"name":"白色蕾丝韩式新娘婚纱"},

                {"id":"dd6ea2b9-beff-11e7-87b4-14dda97c4e49","image":"d70.jpg","price":345,"name":"妮玫欧蓬蓬裙婚纱"},{"id":"e3e0863d-bf02-11e7-87b4-14dda97c4e49","image":"g40.jpg","price":624,"name":"名瑞童话公主蕾丝婚纱"},{"id":"e3e08707-bf02-11e7-87b4-14dda97c4e49","image":"g60.jpg","price":440,"name":"轻奢品牌吊带抹胸婚纱"},

                {"id":"e3e0874e-bf02-11e7-87b4-14dda97c4e49","image":"g70.jpg","price":540,"name":"韵雅蒂新款缎面婚纱"},{"id":"61bb0291-bf07-11e7-87b4-14dda97c4e49","image":"i10.jpg","price":820,"name":"妮玫欧韩版新款"},{"id":"61c19fec-bf07-11e7-87b4-14dda97c4e49","image":"i40.jpg","price":684,"name":"曼香侬新款婚纱"},

            ];
            var hotLength = hotWeddingDress.length/2;//9
            var end = 0;

            //初始化
            loadHot(end);

            //换一批
            $scope.replace = function(){console.log(end)
                if(end>hotLength/2){
                    end = -9;
                }
                end += 9;
                loadHot(end);console.log(end)

            };
            //加载热门婚纱
            function loadHot(end){
                $scope.hotData = hotWeddingDress.slice(end , end + 9);console.log($scope.hotData)
            }

            /*//加载最新客照
             $scope.photographyData = [];
             photographyService.photographyList().then(function(response){
             if(response.data.code == '100'){
             $scope.photographyData = response.data.data.slice(0,6);
             console.log($scope.photographyData);
             }
             });*/

            var swiperLr = new Swiper('.hotDress_wrapper', {
                freeMode: true,

                slidesPerView: 'auto',
                spaceBetween: 6,
                slidesPerGroup: 3,

                loopFillGroupWithBlank: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper

            });


            //获取特定婚纱
            $scope.weddingDress = {
                method:'id',
                id: $routeParams.id

            };
            weddingDressService.weddingDress($scope.weddingDress).then(function(response){console.log(response)
                if(response.data.code == '100'){
                    $scope.weddingDressData = response.data.data;
                    console.log($scope.weddingDressData.images);
                    $scope.weddingDressImages = $scope.weddingDressData.images;
                }
            });

            //婚纱预定
            $scope.choseIndex = 'S';
            $scope.num = 1;
            $scope.min = function(){
                if($scope.num>1){
                    $scope.num --;
                }
            };
            $scope.add =function(){
                $scope.num ++;console.log($scope.choseIndex)
            };

            //加入购物车初始化
            $('.items').flyto({
                item      : '#btn',
                target    : '#cart',
                button    : '#my-btn'
            });

            //点击加入购物车
            $scope.showChose = function(){
                //判断是否登录
                if($window.sessionStorage.getItem('Login')){

                    $('.none').show();//$('#my-btn').show();
                    $('.chose').slideDown('slow');

                    $scope.disable = false;
                }
                else{
                    $location.path('login');
                }
            };
            //取消
            $scope.cancelChose = function(event){
                $('.none').hide();
                $('.chose').slideUp("slow");
            };


            $scope.weddingDressOrder = function(){
                $scope.user = JSON.parse($window.sessionStorage.getItem('Login'));console.log($scope.user)

                $scope.wedding = {
                    size: $scope.choseIndex,
                    amount: $scope.num,
                    id: $routeParams.id,
                    user: $scope.user.id
                };

                ordersService.weddingDressOrder($scope.wedding).then(function(response){
                    if(response.data.code == 100){
                        console.log(response)

                    }
                });

                $scope.disable = true;
                $scope.cancelChose();
            }

        })

    /**
     * 摄影套餐详情
     * */
        .controller('photographyPackageDetailController' , function($scope , $window , $routeParams , photographyService , $location , ordersService){
            $scope.isLogin = function(){
                if($window.sessionStorage.getItem('Login')){
                    $location.path('/myOrders/2');

                }
                else{
                    $location.path('/login');
                }
            };


            $scope.clickBack = function(){
                $window.history.back();
            };

            //获取特定套餐
            $scope.photographyPackage = {
                method: 'id',
                id: $routeParams.id
            };

            photographyService.photography($scope.photographyPackage).then(function(response){
                if(response.data.code == '100'){
                    $scope.photographyPackageData = response.data.data;
                    console.log($scope.photographyPackageData);

                }
            });


            //------------------加载推荐客照----------------------//
            var begin = (Math.random() + 0.3)*10;

            //初始化
            getPhotography(begin);

            //换一批
            $scope.replace = function(){
                if(begin>12){
                    begin = -1;
                }
                begin += 1;
                getPhotography(begin);

            };


            $scope.photographyData = [];

            /*
             * 获取写真
             * */
            function getPhotography(begin){
                photographyService.photographyList().then(function(response){
                    if(response.data.code == '100'){
                        $scope.photographyData = response.data.data.slice(begin,begin + 1)[0].image;
                        console.log($scope.photographyData);
                    }
                });
            }


            var swiperLr = new Swiper('.hotDress_wrapper', {
                freeMode: true,

                slidesPerView: 'auto',
                spaceBetween: 10,

                loopFillGroupWithBlank: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper

            });
            //加入购物车初始化
            $('.items').flyto({
                item      : '#btn',
                target    : '#cart',
                button    : '#my-btn'
            });

            //点击加入购物车
            $scope.showChose = function(){
                //判断是否登录
                if($window.sessionStorage.getItem('Login')){

                    $('.none').show();//$('#my-btn').show();
                    $('.chose').slideDown('slow');

                    $scope.disable = false;
                }
                else{
                    $location.path('login');
                }
            };
            //取消
            $scope.cancelChose = function(event){
                $('.none').hide();
                $('.chose').slideUp("slow");
            };




            $scope.photoPackageOrder = function($event){

                $scope.user = JSON.parse($window.sessionStorage.getItem('Login'));console.log($scope.user)

                $scope.order = {
                    photographyPackageId: $routeParams.id,
                    memberId: $scope.user.id
                };

                ordersService.photographyPackageOrder($scope.order).then(function (response) {
                    if(response.data.code == 100){
                        console.log(response)
                    }
                });
                $scope.disable = true;

                //console.log($event)
                //$event.stopPropagation();
                //$event.preventDefault();
                $scope.cancelChose();

            }
        })
        /*
         * 个人中心
         * */
        .controller('mineController' , ['$scope' , '$window' , 'memberService' , function($scope , $window , memberService){
            $scope.isShow = false;

            //判断是否登录
            if($window.sessionStorage.getItem('Login')){
                $scope.user = JSON.parse($window.sessionStorage.getItem('Login'));
                $scope.isShow = true;
            }


            //注销
            $scope.logout = function(){
                $window.sessionStorage.removeItem('Login');
                $scope.isShow = false;
            };


            //返回
            $scope.clickBack = function(){
                $window.history.back();
            };

            //-------------------------修改手机号信息------------------------------
            $scope.edit = function(event){
                setTimeout(function(){
                    var $ipt = $('#ipt');
                    $ipt.focus();
                    var result= $scope.user.phone;//对input取值
                    $ipt.val(""); //使input的值为空
                    $ipt.val(result);//重新负值
                    //使input获取焦点
                },1);

                console.log($('#ipt').val())
                $('.editPhone').slideDown('100');

            };

            //取消
            $scope.cancel = function(){
                $('.editPhone').slideUp('100');
                $('.editNickname').slideUp('100');
                $('.editPassword').slideUp('100');
            };

            //保存
            $scope.savePhone = function(){
                $scope.changePhone = {
                    id:$scope.user.id,
                    phone:$('#ipt').val()
                };

                memberService.editPhone($scope.changePhone).then(function(response){console.log($scope.user)
                    if(response.data.code == 100){
                        console.log(response.data.data)
                        $scope.user.phone = $('#ipt').val();

                        $window.sessionStorage.setItem('Login' , JSON.stringify($scope.user));
                        $('.editPhone').slideUp('100');
                    }
                })

            };

            //-------------------------修改昵称------------------------------
            $scope.editNickname = function(){
                setTimeout(function(){
                    var $nickname = $('#nickname');
                    $nickname.focus();//使input获取焦点
                    var result= $scope.user.nickname;//对input取值
                    //$ipt.val(""); //使input的值为空
                    $nickname.val(result);//重新负值
                },0);

                console.log($('#nickname').val())
                $('.editNickname').slideDown('100');

            };


            //保存
            $scope.saveNickname = function(){
                $scope.changeNickname = {
                    id:$scope.user.id,
                    nickname:$('#nickname').val()
                };
                console.log($scope.changeNickname)
                memberService.editNickname($scope.changeNickname).then(function(response){
                    if(response.data.code == 100){
                        console.log(response.data.data)
                        $scope.user.nickname = $('#nickname').val();

                        $window.sessionStorage.setItem('Login' , JSON.stringify($scope.user));
                        $('.editNickname').slideUp('100');
                    }
                })

            };


            //-------------------------修改密码------------------------------
            $scope.editPassword = function(){
                setTimeout(function(){
                    var $oldPassword = $('#oldPassword');
                    $oldPassword.focus();//使input获取焦点
                },0);

                console.log($('#nickname').val())
                $('.editPassword').slideDown('100');

            };


            //保存
            $scope.savePassword = function(){
                $scope.changePassword = {
                    id:$scope.user.id,
                    oldPassword:$('#oldPassword').val(),
                    newPassword:$('#newPassword').val()
                };

                console.log($scope.changePassword)
                var formData = new FormData();
                for(var key in $scope.changePassword){
                    formData.append(key , $scope.changePassword[key]);
                }
                console.log($scope.changePassword)
                memberService.editPassword(formData).then(function(response){
                    if(response.data.code == 100){
                        console.log(response.data.data)

                        $('.editPassword').slideUp('100');
                    }
                })

            };

            ////获取订单列表
            //$scope.ordersData = [];
            //ordersService.ordersList().then(function(response){
            //    if(response.data.Code == 100){
            //        $scope.ordersData = response.data.Data;
            //        console.log($scope.ordersData)
            //    }
            //});
        }])

        /*
         * 登录
         * */
        .controller('loginController' , ['$scope' , '$window' , '$location' , 'memberService' , function($scope , $window , $location , memberService){

            $scope.focus = false;
            $scope.focusPassword = false;
            $scope.notValid = false;

            $scope.notLogin = false;

            $scope.user = {
                phone : '',
                password : ''
            };

            //登录
            $scope.login = function(){
                if($scope.frm.$valid){console.log('请求发出');console.log($scope.notValid)
                    $scope.notValid = false;

                    var formData = new FormData();
                    for(var key in $scope.user){
                        formData.append(key , $scope.user[key]);
                    }

                    memberService.login(formData).then(function(response){console.log(response)
                        if(response.data.code == 100){
                            $scope.member = response.data.data; console.log($scope.member)

                            $window.sessionStorage.setItem('Login' , JSON.stringify($scope.member));
                            $window.history.back();
                        }
                        else{
                            $scope.notLogin = true;
                        }
                    });

                }
                else{
                    $scope.notValid = true;console.log('请求未发出');console.log($scope.notValid);
                }

            };

            //返回
            $scope.clickBack = function(){
                $window.history.back();
            }
        }])


    /**
     * 注册
     * */
        .controller('registerController' , ['$scope' , '$window' , '$location' , 'memberService' , function($scope , $window , $location , memberService){
            $scope.focusNickname = false;
            $scope.focus = false;
            $scope.focusPassword = false;
            $scope.notValid = false;

            $scope.notRegister = false;

            $scope.user = {
                phone : '',
                nickname: '',
                password : ''
            };

            //注册
            $scope.register = function(){
                if($scope.frm.$valid){console.log('请求发出');console.log($scope.notValid)
                    $scope.notValid = false;

                    var formData = new FormData();
                    for(var key in $scope.user){
                        formData.append(key , $scope.user[key]);
                    }

                    memberService.register(formData).then(function(response){console.log(response)
                        if(response.data.code == 100){
                            $scope.member = response.data.data; console.log($scope.member)

                            $window.sessionStorage.setItem('Login' , JSON.stringify($scope.member));
                            $location.path('mine');
                        }
                        else{
                            $scope.notRegister = true;
                        }
                    });

                }
                else{
                    $scope.notValid = true;console.log('请求未发出');console.log($scope.notValid);
                }

            };

            //返回
            $scope.clickBack = function(){
                $window.history.back();
            }
        }])

        .controller('ordersController' , function($scope , $window , ordersService , $timeout , $routeParams , $location){
            //返回
            $scope.back = function(){
                $window.history.back();
            };

            $scope.orderFlag = $routeParams.flag;console.log($scope.orderFlag)

            console.log(JSON.parse($window.sessionStorage.getItem('Login')).id)

            $scope.userId = {
                id : JSON.parse($window.sessionStorage.getItem('Login')).id
            };console.log($scope.userId)


            //获取摄影订单
            ordersService.photographyOrders($scope.userId).then(function(response){
                if(response.data.code == 100){
                    $scope.photographyOrdersList = response.data.data.photographyOrders;console.log($scope.photographyOrdersList)

                    $timeout(function(){
                        var swiper1 = new Swiper('.swiper-containerOrder1', {

                            slidesPerView: 'auto',
                            spaceBetween: 0,
                            pagination: {
                                clickable: true
                            },

                            observer:true,//修改swiper自己或子元素时，自动初始化swiper
                            observeParents:true,//修改swiper的父元素时，自动初始化swiper
                        });
                    },0);


                    //获取婚纱订单
                    loadWeedingDressOrders();
                }
            });


            function loadWeedingDressOrders(){
                ordersService.weddingDressOrders($scope.userId).then(function(response){
                    if(response.data.code == 100){
                        $scope.weddingDressOrdersList = response.data.data.weddingDressOrders;


                        $timeout(function(){
                            var swiper = new Swiper('.swiper-containerOrder', {

                                slidesPerView: 'auto',
                                spaceBetween: 0,
                                pagination: {
                                    clickable: true
                                },

                                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                            });
                        },0)
                    }
                });
            }


            function loadPhotographyOrders(){
                ordersService.photographyOrders($scope.userId).then(function(response){
                    if(response.data.code == 100) {
                        $scope.photographyOrdersList = response.data.data.photographyOrders;


                        $timeout(function(){
                            var swiper1 = new Swiper('.swiper-containerOrder1', {

                                slidesPerView: 'auto',
                                spaceBetween: 0,
                                pagination: {
                                    clickable: true
                                },

                                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                            });
                        },0);
                    }
                });
            }
            //取消婚纱
            $scope.cancelWeddingDressOrder = function(id){
                ordersService.cancelWeddingDressOrders(id).then(function(response){
                    if(response.data.code == 100){
                        console.log(response)

                        loadWeedingDressOrders();
                    }
                });
            };

            //取消摄影
            $scope.cancelPhotographyOrder = function(id){
                ordersService.cancelPhotographyOrders(id).then(function(response){
                    if(response.data.code == 100){
                        console.log(response)

                        loadPhotographyOrders();
                    }
                })
            };


            //删除婚纱
            $scope.deleteWeddingDressOrder = function(id){
                ordersService.deleteWeddingDressOrders(id).then(function(response){
                    if(response.data.code == 100){
                        console.log(response)

                        loadWeedingDressOrders();
                    }
                })
            };


            //删除摄影
            $scope.deletePhotographyOrder = function(id){console.log('删除摄影')
                ordersService.deletePhotographyOrders(id).then(function(response){
                    if(response.data.code == 100){
                        console.log(response)

                        loadPhotographyOrders();
                    }
                })
            };

        })
})();
