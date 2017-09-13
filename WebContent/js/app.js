var app = angular.module("myApp", ['ui.router']);

app.provider('helloWorld', function() {

    this.name = 'Default';

    this.$get = function($http) {
    	
        return {
            sayHello: function() {
            	return $http.get('http://services.groupkt.com/country/get/all');
            }
        }
    };

    this.setName = function(name) {	
    	this.name = name;
    };
    
});


app.config(function($stateProvider,$urlRouterProvider,$provide,helloWorldProvider) {
	
	console.log("app config");
	
	$urlRouterProvider.when("", "/PageTab");

    $stateProvider
        .state("PageTab", {
            url: "/PageTab",
            templateUrl: "/AngularJs/view/PageTab.html"
        })
        .state("PageTab.Page1", {
            url: "/Page1",
            templateUrl: "/AngularJs/view/Page1.html"
        })
        .state("PageTab.Page2", {
            url: "/Page2",
            templateUrl: "/AngularJs/view/Page2.html"
         })
        .state("PageTab.Page3", {
            url: "/Page3",
            templateUrl: "/AngularJs/view/Page3.html"
        });
        
});

app.run(function($rootScope,helloWorld) {
    console.log("app run");
    $rootScope.data = '';
    helloWorld.sayHello().then(function(response){
		   console.log(JSON.stringify(response.data));
		   $rootScope.data = JSON.stringify(response.data);
	});
});

app.directive("test1", function() {
    console.log("app directive setup");
    return {
        compile: function() {console.log("app directive compile");}
    }
});

app.directive("test2", function() {
    return {
        link: function() {console.log("app directive link");}
    }
});

app.factory('userRepository', function($http) {
	  this.sayHello = function() {
      	return $http.get('http://services.groupkt.com/country/get/all');
      }		
});

app.controller('myAppController', ['$rootScope','$scope', '$http','helloWorld', function($rootScope,$scope, $http, helloWorld){
	
	if($rootScope.data.length > 0)
		console.log("app controller");
	
	helloWorld.sayHello().then(function(response){
		   console.log(JSON.stringify(response.data));
	});
   
	console.log($rootScope.data);
	
}]);

	