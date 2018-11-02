(function(){
    angular.module('app' , ['ngRoute' , 'app.controllers' , 'app.directives' , 'infinite-scroll'])
        .config(['$routeProvider' , function($routeProvider){
            $routeProvider
                .when('/' , {
                    templateUrl : 'views/home/home.html',
                    controller : 'homeController'
                })

                .when('/weddingDress' , {
                    templateUrl : 'views/weddingDress/weddingDress.html',
                    controller : 'weddingController'
                })

                .when('/photographyPackage' , {
                    templateUrl : 'views/photographyPackage/photographyPackage.html',
                    controller : 'photographyPackageController'
                })

                .when('/photography/:id' , {
                    templateUrl : 'views/photography/photography.html',
                    controller : 'photographyController'
                })

                .when('/mine' , {
                    templateUrl : 'views/mine/mine.html',
                    controller: 'mineController'
                })

                .when('/login' , {
                    templateUrl : 'views/mine/login.html',
                    controller: 'loginController'
                })

                .when('/register' , {
                    templateUrl : 'views/mine/register.html',
                    controller: 'registerController'
                })

                .when('/article1' , {
                    templateUrl : 'views/articles/article1.html',
                    controller: 'articleController'
                })

                .when('/article2' , {
                    templateUrl : 'views/articles/article2.html',
                    controller: 'articleController'
                })

                .when('/article3' , {
                    templateUrl : 'views/articles/article3.html',
                    controller: 'articleController'
                })

                .when('/article4' , {
                    templateUrl : 'views/articles/article4.html',
                    controller: 'articleController'
                })

                .when('/weddingDressDetail/:id' , {
                    templateUrl : 'views/weddingDress/weddingDressDetail.html',
                    controller: 'weddingDressDetailController'
                })

                .when('/photographyPackageDetail/:id' , {
                    templateUrl : 'views/photographyPackage/photographyPackageDetail.html',
                    controller: 'photographyPackageDetailController'
                })

                .when('/myOrders/:flag' , {
                    templateUrl : 'views/mine/myOrders.html',
                    controller: 'ordersController'
                })


        }]);
})();
