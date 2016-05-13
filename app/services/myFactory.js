module.exports = function(app) {
  app.factory('myFactory', ['$http', '$window', function($http, $window) {
  var fac = {};

  fac.setToken = function(token) {
    $window.localStorage.token = token
    return token;
  };

  fac.getToken = function() {
    var token = $window.localStorage.token;
    return token;
  };

  fac.clearToken = function() {
    $window.localStorage.token = '';
    return true;
  };
  
  return fac;
  }]);
}