module.exports = function(app) {
  app.directive('customNav', function() {
    return{
      restrict: 'E',
      templateUrl:'templates/nav.html'
    };
  });
};