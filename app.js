	var app = angular.module('myApp', []);

app.controller('MainCtrl',function($scope, $http, $interval){

	var onUserComplete = function(response){
		$scope.user = response.data;
		$http.get($scope.user.repos_url)
			.then(onRepos, onError)
	};
	var onRepos = function(response){
		$scope.repos = response.data;
	};
	var onError = function(reason){
	 	$scope.error = "could not fetch the data";
	};
	var decrementCountdown = function(){
		$scope.Countdown -= 1;
		if ($scope.Countdown < 1){
			$scope.search($scope.userName);
		}
	};
	var startCountdown = function(){
		$interval(decrementCountdown, 1000 , $scope.Countdown);
	};

	 $scope.search = function(userName){
		$http.get("https://api.github.com/users/"+ userName)
			.then(onUserComplete, onError);
		};
	$scope.userName = 'angular';
	$scope.message = "Github Viewer";
	$scope.repoSortOrder = "-stargazers_count";
	$scope.Countdown = 5;
	startCountdown();
});