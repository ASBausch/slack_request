//create routes for individual html pages
//using the ngRoutes cdn so that we can use the routing functions
var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        //ng-view is a feature of angular routing and used in our index.jade
        templateUrl: '/pages/channels.html',
        controller: 'channelControl'
    }).when('/list', {
        templateUrl: '/pages/wishList.html',
        controller: 'wishControl'
    });

}]);

app.controller('channelControl', ['$scope', '$http', function ($scope, $http) {
    //retrieving data from our /channels and then setting the scope to that retrieved data
    $http({
        url: '/channels',
        method: 'get'
    }).then(function(response){
        $scope.channels = response.data;
    });

}]);

app.controller('wishControl', ['$scope', '$http', function ($scope, $http) {
    //takes our form data and sends it to our database collection
    $http({
        url: '/wishList',
        //this gets the data to our post route in wishList.js
        method: 'get'
    }).then(function(res){
        $scope.wishes = res.data;


    });


    $scope.submit = function(){
        var wish = {name: $scope.dataWish, purpose: $scope.dataPurpose, wish: true};
        //this checks to see if the forms are filled, auto evaluates to true is something is input
        if(wish.name && wish.purpose){
        $http({
            url: '/wishList',
            //this sends the data to our post route in wishList.js
            method: 'post',
            //this wish is req.body in the router
            data: wish
        }).then(function(){

        });

        $http({
            url: '/wishList',
            //this gets the data to our post route in wishList.js
            method: 'get'
        }).then(function(res){
            $scope.wishes = res.data;

        console.log("I ran");
        });
    }
        else{
        alert("Fill out the damn fields");
        }

    }

    $scope.searchAll = null;
}]);


