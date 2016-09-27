(function () {

  angular
    .module('meanApp')
    .directive('footer', footer);

  function footer () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/footer/footer.template.html',
      controller: 'footerCtrl as footervm'
    };
  }

})();
