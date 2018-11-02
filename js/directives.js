(function(){
    angular.module('app.directives' , [])
        //头部标题
        .directive('header',function(){
            return{
                restrict:'EA',
                replace:true,
                templateUrl:'templates/header.html',
                scope:{
                    title:'@',
                    rightTitle:'@'
                }
            }
        })

        //最新客照
        .directive('newPhoto',function(){
            return{
                restrict:'EA',
                replace:true,
                templateUrl:'templates/newPhoto.html',
                scope:{
                    data:'='
                }

            }
        })
        //热门婚纱
        .directive('hotDress',function(){
            return{
                restrict:'EA',
                replace:true,
                templateUrl:'templates/hotDress.html'
            }
        })

        //头部-返回
        .directive('backHeader',function(){
            return{
                restrict:'EA',
                replace:true,
                templateUrl:'templates/backHeader.html',
                scope:{
                    title:'@',
                    rightTitle:'@',
                    callback:'&'
                },

                controller:function($scope){
                    $scope.back1 = function(){
                        if($scope.callback){
                            $scope.callback();
                        }
                    }
                }
            };
        })

        /*//weddingDress滚动加载(不用插件版本)
        .directive("infiniteScroll", function () {
            return {
                controller: "weddingController"
            };
        })

        //photographyPackage滚动加载
        .directive("photographyScroll", function () {
            return {
                controller: "photographyPackageController"
            };
        })*/

        /**********************/
        .directive('pageHeader',function(){
            return{
                restrict:'EA',
                replace:true,
                templateUrl:'templates/pageHeader.html',
                scope:{
                    title:'@'
                }
            };
        })


        .directive('pageFooter',function(){
            return{
                restrict:'EA',
                replace:true,
                templateUrl:'templates/pageFooter.html',
                scope:{
                    selectIndex:'='
                }
            };
        })

        .directive('chose',function(){
            return{
                restrict:'EA',
                replace:true,
                templateUrl:'templates/chose.html',
                scope:false
            };
        })

})();
