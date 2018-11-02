(function(){
    angular.module('app.services' , [])
        .constant('ROOT_URL' , 'http://116.62.71.239/8101/wedding/interface/')

        /*
        * 获取weddingDress
        * */
        .service('weddingDressService' , ['$http' , 'ROOT_URL' , function($http , ROOT_URL){
            //获取weddingDressList
            this.weddingDressList = function(){
                return $http.get(ROOT_URL + 'weddingDressAjax.php?method=list');
            };

            //获取特定weddingDress
            this.weddingDress = function(id){
                return $http({
                    method : 'get',
                    url : ROOT_URL + 'weddingDressAjax.php',
                    params : id
                });
            };
        }])

        /*
         * 获取photographyPackage
         * */
        .service('photographyService' , ['$http' , 'ROOT_URL' , function($http , ROOT_URL){
            //获取photographyPackage
            this.photographyPackageList = function(){
                return $http.get(ROOT_URL + 'photographyAjax.php?method=photographyPackageList');
            };

            //获取photography列表
            this.photographyList =function(photography){
                return $http({
                    method : 'post',
                    url : ROOT_URL +  'photographyAjax.php?method=photographyList',
                    data : photography,
                    headers: {'Content-Type':undefined},
                    transformRequest: angular.identity
                });
            };

            //获取area
            this.areaList = function(){
                return $http.get(ROOT_URL + 'photographyAjax.php?method=areaList');
            };

            //获取特定weddingDress
            this.photography = function(id){
                return $http({
                    method : 'get',
                    url : ROOT_URL + 'photographyAjax.php',
                    params : id
                });
            };
        }])


        /**
         * 登陆注册
         * */
        .service('memberService' , ['$http' , 'ROOT_URL' , function($http , ROOT_URL){
            //登陆
            this.login = function(login){
                return $http({
                    method : 'post',
                    url : ROOT_URL +  'membersAjax.php?method=login',
                    data : login,
                    headers: {'Content-Type':undefined},
                    transformRequest: angular.identity
                });
            };

            //注册
            this.register = function(register){
                return $http({
                    method : 'post',
                    url : ROOT_URL +  'membersAjax.php?method=register',
                    data : register,
                    headers: {'Content-Type':undefined},
                    transformRequest: angular.identity
                });
            };

            //修改手机号
            this.editPhone = function(params){
                return $http({
                    method : 'get',
                    url : ROOT_URL +  'membersAjax.php?method=editphone',
                    params : params
                });
            };

            //修改昵称
            this.editNickname = function(params){
                return $http({
                    method : 'get',
                    url : ROOT_URL +  'membersAjax.php?method=editnickname',
                    params : params
                });
            };

            //修改密码
            this.editPassword = function(params){
                return $http({
                    method : 'post',
                    url : ROOT_URL +  'membersAjax.php?method=editpassword',
                    data : params,
                    headers: {'Content-Type':undefined},
                    transformRequest: angular.identity
                });
            };
        }])


        /**
        * 预定
        * */

        .service('ordersService' , ['$http' , 'ROOT_URL' , function($http , ROOT_URL){
            // 婚纱预定
            this.weddingDressOrder = function(params){
                return $http({
                    method : 'get',
                    url : ROOT_URL +  'ordersAjax.php?method=weddress',
                    params : params
                });
            };

            //摄影预定
            this.photographyPackageOrder = function(params){
                return $http({
                    method : 'get',
                    url : ROOT_URL +  'ordersAjax.php?method=photography',
                    params : params
                });
            };

            //婚纱订单weddingDressOrders
            this.weddingDressOrders = function(params){
                return $http({
                    method : 'get',
                    url : ROOT_URL +  'ordersAjax.php?method=weddingdresslist',
                    params : params
                });
            };

            //摄影订单
            this.photographyOrders = function(params){
                return $http({
                    method : 'get',
                    url : ROOT_URL +  'ordersAjax.php?method=photographylist',
                    params : params
                });
            };

            //取消婚纱
            this.cancelWeddingDressOrders = function(id){
                return $http.get(ROOT_URL +  'ordersAjax.php?method=weddresscancel&wedId=' + id);
            };

            //取消摄影
            this.cancelPhotographyOrders = function(id){
                return $http.get(ROOT_URL +  'ordersAjax.php?method=wedphocancel&phoId=' + id);
            };

            //删除婚纱订单
            this.deleteWeddingDressOrders = function(id){
                return $http.get(ROOT_URL +  'ordersAjax.php?method=deleteweddingdressorders&wedId=' + id);
            };

            //删除摄影订单
            this.deletePhotographyOrders = function(id){
                return $http.get(ROOT_URL +  'ordersAjax.php?method=deletephotographyorders&phoId=' + id);
            };
        }])
})();