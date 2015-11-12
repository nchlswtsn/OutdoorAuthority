'use strict';

var app = angular.module('APP_NAME');

app.controller('homeCtrl', function($scope, $http) {
  $scope.results = [];
  $scope.trailSearch = function() {
    var city_state_input = $scope.city_state_input.split(', ');

    //CITY STATE URL
    var city_stateUrl = 'https://outdoor-data-api.herokuapp.com/api.json?api_key=3fa93ff162bb2f1cba0ad4bde89e0d49&q[city_cont]='
    + city_state_input[0] + '&q[state_cont]=' + city_state_input[1] + '&radius=15&callback=?&callback=JSON_CALLBACK';

    //MAP URL
    // var city_stateUrl = 'https://outdoor-data-api.herokuapp.com/api.json?api_key=3fa93ff162bb2f1cba0ad4bde89e0d49&q[city_cont]='
    // + city_state_input[0] + '&q[state_cont]=' + city_state_input[1] + '&radius=15&callback=?&callback=JSON_CALLBACK';

    $http.jsonp(city_stateUrl, {format: 'json', callback: 'JSON_CALLBACK'})

    //DATA URL CALLBACK
    .success(function(data) {
      data.places.forEach(function(activity) {
        $scope.results.push(activity);

        // $scope.distance = results.activities[0].attribs.parseFloat(attribs.length.replace(/"/g,''));
        // ************** Fine tune logging of activity data
      });
    })
    .error(function(err) {  // check on this protocol on this error function
    });

    //MAP URL CALLBACK
    // .success(function(data) {
    //   data.places.forEach(function(activity) {
    //     $scope.results.push(activity);
    //
    //     // $scope.distance = results.activities[0].attribs[parseFloat(attribs.length.replace(/"/g, ''))];
    //
    //     // ************** Fine tune logging of activity data
    //   });
    // });
  };
});

app.controller('navCtrl', function($scope, $state, auth) {
  $scope.logout = function() {
    auth.logout();
    $state.go('home');
  };
});

app.controller('usersCtrl', function($scope, $state, auth) {
  $scope.currentState = $state.current.name.split('.')[1].toUpperCase();
  $scope.submit = function(user) {
    var submitFunc = $scope.currentState === 'LOGIN' ? auth.login : auth.register;
    submitFunc(user).success(function(res) {
      $state.go('home');
    }).error(function(res) {
      $scope.user = {};
      alert(res.message);
    });
  };
});
