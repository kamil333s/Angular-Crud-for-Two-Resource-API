module.exports = function(app){
  app.directive('selectAllOnFocus', function() {
    return {
      restrict: 'A',
      link: function(scope, element){
        element.mouseup(function(evt){
          console.log('MOUSEUP');
          evt.preventDefault();
        });// mouseup
        element.focus(function(){
          console.log('FOCUS');
          element.select();
        });// focus
      }// link
    }// return
  });  
};
