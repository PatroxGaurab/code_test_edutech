// Get the modal
var modal1 = document.getElementById('myModal1');
var modal2 = document.getElementById('myModal2');
var modal3 = document.getElementById('myModal3');
var modal4 = document.getElementById('myModal4');
var modal5 = document.getElementById('myModal5');
// Get the button that opens the modal
var btn1 = $("#myBtn1");
var btn2 = document.getElementById("myBtn2");
var btn3 = document.getElementById("myBtn3");
var btn4 = document.getElementById("myBtn4");
var btn5 = document.getElementById("myBtn5");
// Get the <span> element that closes the modal
var span = $(".close");
var span = $(".sclose");
// When the user clicks on the button, open the modal 
$(document).on('click','#myBtn1',function() {
    $("#myModal1").css('display','block');
});
$(document).on('click','#myBtn2',function() {
    $("#myModal2").css('display','block');
});
$(document).on('click','#myBtn3',function() {
    $("#myModal3").css('display','block');
});
$(document).on('click','#myBtn4',function() {
    $("#myModal4").css('display','block');
});
//////////////// HEAD

	$(document).on('click','#myBtn5',function() {
	    $("#myModal5").css('display','block');
	});

if($(".close")){
	$(document).on('click','.close',function() {
	    $("#myModal1").css('display','none');
	    $("#myModal2").css('display','none');
	    $("#myModal3").css('display','none');
	    $("#myModal4").css('display','none');
	    $("#myModal5").css('display','none');
	});
}
////////////////

if(btn5){
	$(document).on('click','#myBtn5',function() {
	    $("#myModal5").css('display','block');
	});
}

if($(".close")){
	$(document).on('click','.close',function() {
	    $("#myModal1").css('display','none');
	    $("#myModal2").css('display','none');
	    $("#myModal3").css('display','none');
	    $("#myModal4").css('display','none');
	    $("#myModal5").css('display','none');
	});
}
////////////// a2eff56d9a7dfc521add7b8869af7353c7a1c0c7
if($(".sclose")){
	$(document).on('click','.sclose',function() {
	    $("#myModal1").css('display','none');
	    $("#myModal2").css('display','none');
	    $("#myModal3").css('display','none');
	    $("#myModal4").css('display','none');
	    $("#myModal5").css('display','none');
	});
}

// When the user clicks on <span> (x), close the modal
/*span.click(function() {
    modal1.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
    modal4.style.display = "none";
    modal5.style.display = "none";
});*/
