(function() {
    angular.module('meanApp');
  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location','$routeParams', 'meanData', '$scope', '$http', 'Upload','$window'];
  function profileCtrl($location, $routeParams, meanData, $scope, $http, Upload, $window) {
    var vm = this;

    vm.user = {};
    vm.jsondata = {};

        $scope.myImage='';
        $scope.myCroppedImage='';

        var handleFileSelect=function(evt) {
          var file=evt.currentTarget.files[0];
          var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function($scope){
              $scope.myImage=evt.target.result;
            });
          };
          reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

    if($window.localStorage['sso'] && $window.localStorage['sig']){
	var local_sso=$window.localStorage['sso'];
	var local_sig=$window.localStorage['sig'];
	$window.localStorage.removeItem('sso');
	$window.localStorage.removeItem('sig');

	window.location='/auth/forum?sso='+local_sso+'&sig='+local_sig;
    }	
/*$.getJSON( 'http://forum.theorexedutech.com/user_actions.json?username=pat123&filter=2,4,5,7', function( data ) {
alert(JSON.stringify(data));
});
*/
 $.ajax({
            url: "http://forum.theorexedutech.com/user_actions.json?username=pat123&filter=2,4,5,7",
	    //url: "http://ec2-54-179-187-62.ap-southeast-1.compute.amazonaws.com/user_actions.json?username=pat123&filter=2,4,5,7",
            type: "POST",
            crossDomain: true,
            dataType: "json",
            success: function (response) {
                //alert("hi");
            },
            error: function (xhr, status) {
                //alert(JSON.stringify(xhr));
            }
        });
    meanData.getProfile($routeParams)
      .success(function(data) {
        vm.jsondata = data;
        if(data.emailVerified){
          $scope.email_notverified = !data.emailVerified;
        }else{
          $scope.email_notverified=true;
        }

	//var json_res=data;
	//alert();
	//var redirect_to=data.redirect_to;
	//alert(JSON.stringify(data));	
	//window.location = redirect_to;



      })
      .error(function (e) {
        console.log(e);
      });

    meanData.getConnectionRequests($routeParams)
      .success(function(data) {
        vm.connection_requests = data;	
      })
      .error(function (e) {
        console.log(e);
      });

    meanData.getConnections($routeParams)
      .success(function(data) {
        vm.connections = data;	
      })
      .error(function (e) {
        console.log(e);
      });

    meanData.isEmailVerified($routeParams)
      .success(function(data) {
        $scope.isVerified = data.is_verified;
      })
      .error(function (e) {
        console.log(e);
      });

	    $scope.getCommitData = function() {
		IN.API.Profile("me").fields(
		        [ "id", "firstName", "lastName", "pictureUrl",
		                "publicProfileUrl", "headline", "summary", "location", "positions" ]).result(function(result) {
		    //set the model
		    $scope.$apply(function() {
		        $scope.jsondata = result.values[0];
		    });
		}).error(function(err) {
		    $scope.$apply(function() {
		        $scope.error = err;
		    });
		});
	    };

	    $scope.profileNameUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"name":vm.jsondata.name} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
			$scope.nameUpdateSuccess = true;
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileHeadlineUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"headline":vm.jsondata.headline} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
			$scope.headlineUpdateSuccess = true;
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileBioUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"bio":vm.jsondata.bio} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
			$scope.bioUpdateSuccess = true;
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileLocationUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"location":$scope.jsondata.location.name} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
			$scope.locationUpdateSuccess = true;
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileExperienceUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"experience":vm.jsondata.experience} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
			$scope.expUpdateSuccess = true;
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileEducationUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"education":vm.jsondata.education} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
			$scope.eduUpdateSuccess = true;
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileSkillUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"skill":vm.jsondata.skill} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
			$scope.skillUpdateSuccess = true;
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileAddlInfoUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"additional_info":vm.jsondata.additional_info} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
			$scope.addlinfoUpdateSuccess = true;
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileProjectUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"projects":vm.jsondata.projects} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
			$scope.projUpdateSuccess = true;
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileSocialFbUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"facebook.public_profile":vm.jsondata.facebook.public_profile} })
		      .success(function(data) {
			//vm.user = data;
			//alert(JSON.stringify(data));
			$scope.socialfbUpdateSuccess = true;
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };


	  $scope.addNewExperience = function() {
	    var newItemNo = vm.jsondata.experience.length+1;
	    vm.jsondata.experience.push({'id':newItemNo});
	//alert(newItemNo);
	  };

	  $scope.removeExperience = function(index) {
	    var lastItem = vm.jsondata.experience.length-1;
	    vm.jsondata.experience.splice(index,1);
	  };

	  $scope.addNewEducation = function() {
	    var newItemNo = vm.jsondata.education.length+1;
	    vm.jsondata.education.push({'id':newItemNo});
	//alert(newItemNo);
	  };

	  $scope.removeEducation = function(index) {
	    var lastItem = vm.jsondata.education.length-1;
	    vm.jsondata.education.splice(index,1);
	  };
	  $scope.addNewSkill = function() {
	    var newItemNo = vm.jsondata.skill.length+1;
	    vm.jsondata.skill.push({'id':newItemNo});
	//alert(newItemNo);
	  };

	  $scope.removeSkill = function(index) {
	    var lastItem = vm.jsondata.skill.length-1;
	    vm.jsondata.skill.splice(index,1);
	  };

	  $scope.addNewProject = function() {
	    var newItemNo = vm.jsondata.skill.length+1;
	    vm.jsondata.projects.push({'id':newItemNo});
	//alert(newItemNo);
	  };

	  $scope.removeProject = function(index) {
	    var lastItem = vm.jsondata.skill.length-1;
	    vm.jsondata.projects.splice(index,1);
	  };

    $scope.uploadPic = function(dataUrl,name) {
		var file = Upload.dataUrltoBlob(dataUrl, name,document.getElementById('myModal'))
	    meanData.uploadImage(file,vm.jsondata)
	      .success(function(data) {
		//alert(JSON.stringify(data));	
		//window.location = redirect_to;
		//vm.jsondata.profilepic=data;
   		//document.getElementById('myModal').style.display = "none";
	      })
	      .error(function (e) {
		console.log(e);
	      });

    };

    $scope.resendMail = function() {
	    meanData.resendMail()
	      .success(function(data) {
		vm.jsondata.successmsg=data.is_sent;
	      })
	      .error(function (e) {
		console.log(e);
	      });

    };

	$scope.accept_connect = function(userId){
		meanData.acceptConnect(userId)
		.success(function(data) {
		    meanData.getConnectionRequests($routeParams)
		      .success(function(data) {
			vm.connection_requests = data;	
		      })
		      .error(function (e) {
			console.log(e);
		      });
	      	})
	      	.error(function (e) {
			console.log(e);
	       	});
	}


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementById("imgclose");

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// Resend mail modal

// Get the modal
var resendmailmodal = document.getElementById('resendMailModal');

// Get the button that opens the modal
var resendmailbtn = document.getElementById("notverified_btn");

// Get the <span> element that closes the modal
var resendmailspan = document.getElementById("resendmailclose");

// When the user clicks on the button, open the modal
resendmailbtn.onclick = function() {
    resendmailmodal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
resendmailspan.onclick = function() {
    resendmailmodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }else if (event.target==document.getElementById('form_wrapper')){
	document.getElementById('form_wrapper').style.display="none";
    }

    if (event.target == resendmailmodal) {
        resendmailmodal.style.display = "none";
    }else if (event.target==document.getElementById('form_wrapper')){
	document.getElementById('form_wrapper').style.display="none";
    }

}

/*$("[data-toggle=popover]").popover({
    html: true, 

});
*/
document.getElementById('showform').onclick= function() {
    document.getElementById('form_wrapper').style.display="block";
};​​​​​
            vm.onEnd = function(){
		$("[data-toggle=popover]").popover({
		    html: true, 

		});
            };
  }



})();
