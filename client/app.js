var app = angular.module('myApp', ['ngRoute', 'controllers']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../views/list.html'
        }).when('/single/:id', {
            templateUrl: '../views/single.html'
        }).when('/team/:team', {
            templateUrl: '../views/team.html'
        });

    }]);
    
var controlApp = angular.module('controllers', []);
controlApp.controller('listReq', function($scope, $http, $location, $routeParams) {
    $scope.goToSingle = function(id){
        $location.path("/api/single/" + id);           
    } 
    $http.get('/api/list')
    .then(function (response) {
        $scope.teamList = response.data;
    }); 
});    
  

controlApp.controller("singleController", function($scope, $routeParams, $http, $location){
    var myId = $routeParams.id;    
    $http.get("/api/single/" + myId)
       .then(function (response) {
            $scope.singleTeam = response.data;
    });
}); 

    
controlApp.controller("singleTeam", function($scope, $http, $routeParams, $location){ 
    $http.get('/api/team/' + $routeParams.team)
       .then(function (response) {
            $scope.team = response.data;
            console.log($scope.team)
        });  
});
