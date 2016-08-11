(function() {

  angular
    .module('meanApp').filter('offset', function() {
	  return function(input, start) {
	    start = parseInt(start, 10);
	    return input.slice(start);
	  };
	});

  angular
    .module('meanApp')
    .controller('coursesCtrl', coursesCtrl);

  coursesCtrl.$inject = ['$location','$routeParams', 'meanData','$scope'];
  function coursesCtrl($location, $routeParams, meanData, $scope) {
    var vm = this;

    vm.user = {};
    vm.courses={};
    vm.courseTags = {}

    console.log("Inside courses controller");
	//var params={tags:"Programming"};
	var params={};
    meanData.getCourses(params)
      .success(function(data) {
	//alert(JSON.stringify(data));	

	vm.courses=data;
      })
      .error(function (e) {
        console.log(e);
      });

    meanData.getTags()
      .success(function(data) {
	//alert(JSON.stringify(data));	

	vm.courseTags=data;
      })
      .error(function (e) {
        console.log(e);
      });

	  vm.itemsPerPage = 2;
	  vm.currentPage = 0;

	  vm.range = function() {
	    var rangeSize = 5;
	    var ret = [];
	    var start;

	    if(rangeSize > (vm.pageCount()+1)){
		rangeSize = vm.pageCount()+1;
	    }

	    start = vm.currentPage;
	    if ( start > vm.pageCount()-rangeSize ) {
	      start = vm.pageCount()-rangeSize+1;
	    }
	    if(start<=0){
		start=0;
	    }
	    for (var i=start; i<start+rangeSize; i++) {
	      ret.push(i);
	    }
	    return ret;
	  };

	  vm.prevPage = function() {
	    if (vm.currentPage > 0) {
	      vm.currentPage--;
	    }
	  };

	  vm.prevPageDisabled = function() {
	    return vm.currentPage === 0 ? "disabled" : "";
	  };

	  vm.pageCount = function() {
	    return Math.ceil(vm.courses.length/vm.itemsPerPage)-1;
	  };

	  vm.nextPage = function() {
	    if (vm.currentPage < vm.pageCount()) {
	      vm.currentPage++;
	    }
	  };

	  vm.nextPageDisabled = function() {
	    return vm.currentPage === vm.pageCount() ? "disabled" : "";
	  };

	  vm.setPage = function(n) {
	    vm.currentPage = n;
	  };

	  vm.setTag = function(n) {
	    params = {tags:n};
	    meanData.getCourses(params)
	      .success(function(data) {
		//alert(JSON.stringify(data));	

		vm.courses=data;
		vm.currentPage = 0;
	      })
	      .error(function (e) {
		console.log(e);
	      });
	  };

	}
})();
