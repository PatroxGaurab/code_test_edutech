(function() {
  
  angular
    .module('meanApp')
    .controller('bot_gameCtrl', bot_gameCtrl);

  bot_gameCtrl.$inject = ['$location','$routeParams', 'meanData', 'authentication','$timeout'];
  function bot_gameCtrl($location, $routeParams, meanData, authentication,$timeout) {
    var vm = this;

    vm.user = {};
    vm.botgame_json = {};
    vm.showWishlistedVar=false;
    vm.testCaseResults = new Array();
    vm.testCaseUnsuccess = new Array();
    vm.isFinished=false;
    vm.isFailed=false;
//Bot board
	var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
        	lineNumbers: true,
		mode:"javascript",
	  	theme:"paraiso-dark"
    	});
	editor.setValue("/* Complete the following function which takes emailInput as input \nand returns \"L\" if the email is valid else returns \"R\". \nRun your code and see how it performs on the grid at right.\nYour bot moves a step either right or left depending upon the return value \nand ultimately reaches to the destination if your program passes all test cases.\nYou can signup for the next Learning Revolution- TheoreX - Learn,Create,Execute*/\nfunction validateEmail( emailInput )\n{\n	return \"L\";\n}");

//Initialization of test cases and validation logics
var test_cases=[
  ['yourhero@xxx.com', 'L'],
  ['plainaddress', 'R'],
  ['firstname.lastname@domain.com', 'L'],
  ['#@%^%#$@#$@#.com', 'R'],
  ['@domain.com', 'R'],
  ['email@subdomain.domain.com', 'L'],
  ['Joe Smith <email@domain.com>', 'R'],
  ['email.domain.com', 'R'],
  ['firstname+lastname@domain.com', 'L'],
  ['email@123.123.123.123', 'L'],
  ['email@domain@domain.com', 'R'],
  ['email@[123.123.123.123]', 'L'],
  ['"email"@domain.com', 'L'],
  ['.email@domain.com', 'R'],
  ['1234567890@domain.com', 'L'],
  ['email@domain-one.com', 'L'],
  ['email.@domain.com', 'R'],
  ['email..email@domain.com', 'R'],
  ['_______@domain.com', 'L'],
  ['あいうえお@domain.com', 'R'],
  ['email@domain.com (Joe Smith)', 'R'],
  ['email@domain.name', 'L'],
  ['email@domain', 'R'],
  ['email@domain.co.jp', 'L'],
  ['firstname-lastname@domain.com', 'L'],
  ['email@-domain.com', 'R'],
  ['Johnny.depp@hayeee.com', 'L'],
  ['email@domain.web', 'R'],
  ['email@111.222.333.44444', 'R'],
  ['patrox@theorexedutech.com', 'L'],
  ['xer@@@@kzs.com', 'R'],
];

var change_dirL=[
	['L','D'],
	['R','U'],
	['U','L'],
	['D','R']
];

var change_dirR=[
	['L','U'],
	['R','D'],
	['U','R'],
	['D','L']
];

//Instantiating createJS on canvas
var cjs = createjs;
var stage=new cjs.Stage("canvas");
cjs.Ticker.on("tick", stage);


vm.cjs_init = function(){
	stage = new cjs.Stage("canvas");
	cjs.Ticker.on("tick", stage);
}
var circle_start=null;
var circle_end=null;

vm.run_bot = function() {
// Initialize variables for showing success and failure messages
    vm.isFinished=false;
    vm.isFailed=false;
//disable run_bot_bt
	$("#run_bot_bt").prop( "disabled", true );
//initialize results array
	vm.testCaseResults=new Array();
        vm.testCaseUnsuccess = new Array();
//append user-written email validation function to main body
	var js = editor.getValue();
	var s = document.createElement('script');
	s.textContent = js;
	document.body.appendChild(s);


    var game_div = document.getElementById('game_div');

    var c = document.getElementById('canvas');

    var ctx = c.getContext('2d');
	var sizeWidth = ctx.canvas.width;
	var sizeHeight = ctx.canvas.height;

	var scaleWidth = (sizeWidth-10)/12;
	var scaleHeight = (sizeHeight-10)/4;
	var centerX=5;
	var centerY=5;
	var radius=5;

//stop start circle animation
	stage.removeChild(circle_start);
	circle_start = stage.addChild(new cjs.Shape());
	circle_start.graphics.setStrokeStyle(2).beginStroke("#48d853").drawCircle(0, 0, 5);
	circle_start.graphics.beginFill("#48d853").drawCircle(0, 0, 5);
	circle_start.x = centerX;
	circle_start.y = centerY+(2*scaleHeight);

//start point
	ctx.beginPath();
	ctx.arc(centerX, centerY+(2*scaleHeight), radius, 0, 2 * Math.PI, false);
	ctx.fillStyle="#48d853";
	ctx.fill();
	ctx.lineWidth=2;
	ctx.strokeStyle="#48d853";
   	ctx.stroke();

//start line
	ctx.beginPath();
	ctx.moveTo(centerX, centerY+(2*scaleHeight));
	ctx.lineTo(centerX+(1*scaleWidth), centerY+(2*scaleHeight));
	ctx.lineWidth=4;
	ctx.stroke();

	var cur_dir=1;
	var curX=centerX;
	var curY=centerY+(2*scaleHeight);
	var line = stage.addChild(new cjs.Shape());

	line.graphics.beginStroke("#48d853").setStrokeStyle(4).moveTo(centerX,centerY+(2*scaleHeight));
	var cmd = line.graphics.lineTo(centerX,centerY+(2*scaleHeight)).command;

	cjs.Tween.get(cmd, {loop:false}).to({x:centerX+(1*scaleWidth),y:curY}, 1000);

	curX=curX+scaleWidth;
	curY=curY;

	var circle = stage.addChild(new cjs.Shape());
	circle.graphics.setStrokeStyle(2).beginStroke("#48d853").drawCircle(0, 0, 5);
	circle.graphics.beginFill("#48d853").drawCircle(0, 0, 5);
	circle.visible=false;
	circle.x = curX;
	circle.y = curY;
	cjs.Tween.get(circle, {loop:false}).wait(1000*(i+1)).to({visible:true}, 1000);
	var i;
	for(i=0;i<31;i++){
		var actual_direction=test_cases[i][1];
//execute validateEmail()
		var user_direction=validateEmail(test_cases[i][0]);
		if(user_direction==actual_direction){
		//if(true){
			var line = stage.addChild(new cjs.Shape());
			line.graphics.beginStroke("#48d853").setStrokeStyle(4).moveTo(curX,curY);
			var cmd = line.graphics.lineTo(curX,curY).command;

			if(actual_direction=="L"){
				cur_dir=change_dirL[cur_dir][1];
				if(cur_dir=="L"){
					curX=curX-scaleWidth;
					curY=curY;
					cur_dir=0;
				}
				if(cur_dir=="R"){
					curX=curX+scaleWidth;
					curY=curY;
					cur_dir=1;
				}
				if(cur_dir=="U"){
					curX=curX;
					curY=curY-scaleHeight;
					cur_dir=2;
				}
				if(cur_dir=="D"){
					curX=curX;
					curY=curY+scaleHeight;
					cur_dir=3;
				}
			}else if(actual_direction=="R"){
				cur_dir=change_dirR[cur_dir][1];
				if(cur_dir=="L"){
					curX=curX-scaleWidth;
					curY=curY;
					cur_dir=0;
				}
				if(cur_dir=="R"){
					curX=curX+scaleWidth;
					curY=curY;
					cur_dir=1;
				}
				if(cur_dir=="U"){
					curX=curX;
					curY=curY-scaleHeight;
					cur_dir=2;
				}
				if(cur_dir=="D"){
					curX=curX;
					curY=curY+scaleHeight;
					cur_dir=3;
				}
			}

			var circle = stage.addChild(new cjs.Shape());
			circle.graphics.setStrokeStyle(2).beginStroke("#48d853").drawCircle(0, 0, 5);
			circle.graphics.beginFill("#48d853").drawCircle(0, 0, 5);
			circle.visible=false;
			circle.x = curX;
			circle.y = curY;
			cjs.Tween.get(circle, {loop:false}).wait(1000*(i+1)).to({visible:true}, 1000);

			cjs.Tween.get(cmd, {loop:false}).wait(1000*(i+1)).to({x:curX,y:curY}, 1000);

			//vm.testCaseResults.push(test_cases[i][0]+" : Passed");
			//setTimeout(function(){ vm.testCaseResults.push(test_cases[i][0]+" : Passed"); }, 1000*(i+1));
			vm.do_timeout(test_cases[i][0],i);
		}else{
			var circle = stage.addChild(new cjs.Shape());
			circle.graphics.setStrokeStyle(2).beginStroke("#ff471a").drawCircle(0, 0, 5);
			circle.graphics.beginFill("#ff471a").drawCircle(0, 0, 5);
			circle.visible=false;
			circle.x = curX;
			circle.y = curY;
			cjs.Tween.get(circle, {loop:false}).wait(1000*(i)).to({visible:true}, 1000);
			cjs.Tween.get(circle, {loop:true}).to({scaleX:2,scaleY:2}, 1000);
			vm.do_timeout_unsuccess(test_cases[i][0],i);
			$timeout(function() { vm.isFailed=true; }, 1000*(i+1));
			break;	
		}

	}
		$timeout(function() { vm.isFinished=true; }, 1000*(i+1));
		$timeout(function() { $("#run_bot_bt").prop( "disabled", false );},1000*(i+1));
}

vm.do_timeout = function(str,i){
	$timeout(function() { vm.testCaseResults.push(str); }, 1000*(i+1));
}
vm.do_timeout_unsuccess = function(str,i){
	$timeout(function() { vm.testCaseUnsuccess.push(str); }, 1000*(i+1));
}
vm.loaded = function() {
    var game_div = document.getElementById('game_div');

    var c = document.getElementById('canvas');

    var ctx = c.getContext('2d');
	var sizeWidth = ctx.canvas.width;
	var sizeHeight = ctx.canvas.height;

	var scaleWidth = (sizeWidth-10)/12;
	var scaleHeight = (sizeHeight-10)/4;
	var centerX=5;
	var centerY=5;
	var radius=5;
		
	for(var j=0;j<5;j++){
		for(var i=0;i<13;i++){
			var circle = new createjs.Shape();
			circle.graphics.setStrokeStyle(2).beginStroke("#8e8e8e").drawCircle(0, 0, 5);
			circle.x = centerX+(i*scaleWidth);
			circle.y = centerY+(j*scaleHeight);
			stage.addChild(circle);

		}
	}
//start
	circle_start = stage.addChild(new cjs.Shape());
	circle_start.graphics.setStrokeStyle(2).beginStroke("#48d853").drawCircle(0, 0, 5);
	circle_start.graphics.beginFill("#48d853").drawCircle(0, 0, 5);
	circle_start.x = centerX;
	circle_start.y = centerY+(2*scaleHeight);
	cjs.Tween.get(circle_start, {loop:true}).to({scaleX:2,scaleY:2}, 1000);
//end
	circle_end = stage.addChild(new cjs.Shape());
	circle_end.graphics.setStrokeStyle(2).beginStroke("#37c7f5").drawCircle(0, 0, 5);
	circle_end.graphics.beginFill("#37c7f5").drawCircle(0, 0, 5);
	circle_end.x = centerX+(12*scaleWidth);
	circle_end.y = centerY+(2*scaleHeight);
	cjs.Tween.get(circle_end, {loop:true}).to({scaleX:2,scaleY:2}, 1000);

	//var width = $("#game_div").width();
	
	// So we need to calculate the proper scaled width
	// that should work well with every resolution
	//var ratio = 4/12;
	//var height = width * ratio;
	//alert(width);
	//alert(height);
	//c.width = width;
	//c.height = height;
	//run_bot();

}
this.loaded();

    console.log("Inside bot_game controller id:"+$routeParams.id);
	var params={id:$routeParams.id};
    meanData.getBotgames(params)
      .success(function(data) {
	vm.botgame_json = data;
	vm.showWishlisted();
      })
      .error(function (e) {
        console.log(e);
      });

	vm.isUserLoggedIn = function() {
	    return authentication.isLoggedIn();
	};

	vm.isWishListed = function() {
	    meanData.isWishlisted(params).success(function(data) {
		vm.showWishlistedVar=data.isWishlisted;
	    })
	    .error(function (e) {
		console.log(e);
		return false;
	    });
	};

	vm.showWishlisted = function(){
		//if(vm.isWishListed()){ vm.showWishlistedVar=true} else { vm.showWishlistedVar=false};
		vm.isWishListed(function(data){});
	}

	vm.toggleWishlist = function() {
	    meanData.toggleWishlist(params)
	      .success(function(data) {
		vm.showWishlisted();
	      })
	      .error(function (e) {
		console.log(e);
	      });
	};
  }

})();
