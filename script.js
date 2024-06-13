var ajax_optionDiv;
var ajax_Mask;

function ajax_list(inputObj, paramToExternalFile, e, LookupTable, LinkField, DisplayField, Param){
	var protocol=window.location.protocol + "//";
	var host=protocol + window.location.host
	var path=window.location.pathname;
	var pathArray = path.split( '/' );
	var uri=host + "/" + pathArray[0];
	var externalFile="ajax_list.php";
	var divID="ajax_listOfOptions";
	var divTop=ajax_getTopPos(inputObj) + inputObj.offsetHeight + "px";
	var divLeft=ajax_getLeftPos(inputObj) + "px";
	
	document.getElementById("hidden_" + inputObj.id).value="";
	document.getElementById("span_" + inputObj.id).innerHTML="";
	
	if(!ajax_optionDiv){
		ajax_optionDiv=document.createElement("div");
		ajax_optionDiv.id=divID;
		document.body.appendChild(ajax_optionDiv);
		
		$("#" + divID).attr("onclick", "ajax_list_hide()");
		$("#" + divID).css({minWidth: "500px", width: "800", height: "150px", border: "1px solid #CCC", background: "#FFFFFF", position: "absolute", zindex: "990", overflow: "auto"});
	}
	
	$("#" + divID).css({top: divTop, left: divLeft, display: "block"});
	
	var url= externalFile + "?" + paramToExternalFile + "=1&letters=" + inputObj.value.replace(" ", "+") + "&lookupTable=" + LookupTable + "&linkField=" + LinkField + "&displayField=" + DisplayField + "&param=" + Param + "&obj=" + inputObj.id;
	
	$.ajax({
		type: "get", 
		url: url,
		async: false,
		success: function (data){
			$("#" + divID).html(data);	
		}
	});
}

function ajax_list_selected(val1, val2, inputObj){
	$("#" + inputObj).val(val1);
	$("#hidden_" + inputObj).val(val1);
	$("#span_" + inputObj).html(val2);
	
	ajax_list_hide();
}

function ajax_getTopPos(inputObj){
	var returnValue=inputObj.offsetTop;
	
	while((inputObj = inputObj.offsetParent) != null) returnValue+=inputObj.offsetTop;
	
	return returnValue;
}

function ajax_getLeftPos(inputObj){
	var returnValue=inputObj.offsetLeft;
	
	while((inputObj = inputObj.offsetParent) != null) returnValue+=inputObj.offsetLeft;
	
	return returnValue;
}

function ajax_list_hide(){
	if(ajax_optionDiv) ajax_optionDiv.style.display="none";
}

function checkall(){
	j=parseInt(document.getElementById("num").value);
	
	for (i=1;i<=j;i++){
		if(document.getElementById("chk"+i).disabled==false) document.getElementById("chk"+i).checked = true;
	}
}

function uncheckall(){
	j=parseInt(document.getElementById("num").value);
	
	for (i=1;i<=j;i++){
		document.getElementById("chk"+i).checked = false;
	}
}

function cekSelected(act){	
	h=0; i=0; j=parseInt(document.getElementById("num").value); k=0;
	var params=new Array();
	var uri=document.URL.substr(0, document.URL.indexOf("?"));
	var splits1=document.URL.split("?");
	var splits2=splits1[1].split("&");
	for(k=0; k < splits2.length; k++){		
		var splits3=splits2[k].split("=");
		params[splits3[0]]=splits3[1];
	}
	
	var menu=params["menu"];
	
	for (i=1;i<=j;i++){
		if(document.getElementById("chk"+i).checked == true){
			h=1;
			break;
		}
	}
	
	if(h==0){
		if(act == "approve")
			alert ("No Records selected for approve..");
		else if(act == "delete")
			alert ("No Records selected for delete..");
		else if(act == "reject")
			alert ("No Records selected for reject..");		
		else if(act == "publish")
			alert ("No Records selected for publish..");		
	}else{
		if(act == "approve"){
			if(confirm("Are your sure for approve selected records..?!"))
				document.forms["myFRM"].action=uri + '?menu=' + menu + '&action=approved'; 
		}else if(act == "delete"){
			if(confirm("Are your sure for delete selected records..?!"))
				document.forms["myFRM"].action=uri + '?menu=' + menu + '&action=delete'; 
		}else if(act == "reject"){
			if(confirm("Are your sure for reject selected records..?!"))
				document.forms["myFRM"].action=uri + '?menu=' + menu + '&action=rejected'; 
		}else if(act == "publish"){
			if(confirm("Are your sure for publish selected records..?!"))
				document.forms["myFRM"].action=uri + '?menu=' + menu + '&action=publish'; 
		}
		
		document.forms["myFRM"].submit();
	}
}

function printSelection(node){
  var content=node.innerHTML
  var pwin=window.open('','print_content','width=100,height=100');
  pwin.document.open();
  pwin.document.write('<html><body onload="window.print()">'+content+'</body></html>');
  pwin.document.close();
  setTimeout(function(){pwin.close();},1000);
}

function printdiv(printpage)
{
	var headstr = "<html><head><title></title></head><body>";
	var footstr = "</body>";
	var newstr = document.all.item(printpage).innerHTML;
	var oldstr = document.body.innerHTML;
	document.body.innerHTML = headstr+newstr+footstr;
	window.print();
	document.body.innerHTML = oldstr;
	return false;
}

function showDialog(inputObj){
	var idtrgt='#formdialog';
		$(idtrgt).css({zindex: "999"});
		
		//Get the screen height and width
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
	
		//Set heigth and width to mask to fill up the whole screen
		$('#mask').attr("onclick", "closeDialog()");
		$('#mask').css({'width':maskWidth,'height':maskHeight, 'top': 0, 'left': 0});
		
		//transition effect		
		$('#mask').fadeIn(1000);	
		$('#mask').fadeTo("slow",0.8);	
	
		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();
              
		//Set the popup window to center
		$(idtrgt).css('top',  winH/2-$(idtrgt).height()/2);
		$(idtrgt).css('left', winW/2-$(idtrgt).width()/2);
	
		//transition effect
		$(idtrgt).fadeIn(); 	
}

function closeDialog(){
	$('#mask').hide();	
	$('#formdialog').hide();
}

$(document).ready(function(e) {  
	$(window).resize(function () {	 
 		var box = $('#formdialog');
 
    //Get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
     
    //Set height and width to mask to fill up the whole screen
   	$('#mask').css({'width':maskWidth,'height':maskHeight});
               
    //Get the window height and width
    var winH = $(window).height();
    var winW = $(window).width();

    //Set the popup window to center
    box.css('top',  winH/2 - box.height()/2);
    box.css('left', winW/2 - box.width()/2);
	});
});

function gotoLink(varParam, varPage){
	var linkPage='';
	var uri=document.URL.substr(0, document.URL.indexOf("?"));
		
	if(varPage == 'family'){linkPage='tbempfamilya.php';}else if(varPage == 'addcontract'){linkPage='tbempappointltra.php?action=addcontract';}else if(varPage == 'editcontract'){linkPage='tbempappointltra.php?action=selectuser2';}else if(varPage == 'education'){linkPage='tbempeducationa.php';}else if(varPage == 'training'){linkPage='tbemptraininga.php';}else if(varPage == 'certificate'){linkPage='tbempcertificatea.php';}else if(varPage == 'language'){linkPage='tbemplanguagea.php';}else if(varPage == 'skill'){linkPage='tbempskilla.php';}else if(varPage == 'career'){linkPage='tbempcareera.php';}else if(varPage == 'experience'){linkPage='tbempexprhista.php';}else if(varPage == 'mutation'){linkPage='tbempmutationa.php';}else if(varPage == 'sick'){linkPage='tbempsicka.php';}else if(varPage == 'mistake'){linkPage='tbempmistakea.php';}else if(varPage == 'test'){linkPage='tbemprslta.php';}else if(varPage == 'other'){linkPage='tbempothera.php';}else if(varPage == 'emergency'){linkPage='tbempemergencya.php';}else if(varPage == 'equipment'){linkPage='tbempequipneeda.php';}
	
	window.location=uri + "?menu=" + linkPage + "&" + varParam;
}
	
function deleteRCD(varParam, varPage){
	var uri=document.URL.substr(0, document.URL.indexOf("?"));
	var menu=getParamURI("menu");
	
	if(confirm("Are you sure want to delete this data ?!")){
		window.location=uri + '?menu=' + menu + '&action=delete&form=' + varPage + "&" + varParam;
	}
}

function getParamURI(name){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	var regexS = "[\\?&]"+name+"=([^&#]*)";  
	var regex = new RegExp( regexS );  
	var results = regex.exec( window.location.href ); 
	if( results == null )    
		return "";  
	else    
		return results[1];
}

// Disabled Right Click Mouse
function RMOff(name){
	$("img").bind("contextmenu", function(e){
		return false;
	});
}

// Dialog Form Showing
function showcolorbox(){
	$("a#clrbox").trigger("click");
}

$(document).ready(function(){
    $('form').bind("keypress", function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });
});