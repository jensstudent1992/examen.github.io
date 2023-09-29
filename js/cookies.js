"use strict";
/************************************************
*			SESSION COOKIE FUNCTIONS			*
************************************************/
$(document).ready(function(){
	actCookieAlert();
});
function actCookieAlert(){
	var cookie_session_status='';
	$.post('/lib/checkCookieSession.php',{session:'cookieAccept_kb'},function(data){
		cookie_session_status = data;
		if(!checkCookie('cookieAccept_kb') && cookie_session_status == 'noexist'){
			$('body').append( '<div id="cr_cookiesign"><p>Wij maken op deze website gebruik van cookies om uw gebruikerservaring te optimaliseren. Wij zijn wettelijk verplicht om u hierover te informeren.</p><p><a href="" id="btn_cookie_ok">Ik ga akkoord!</a></p></div>' );
			$('#cr_cookiesign').animate({'opacity':1}, 600);
			actButtonsCookies();
		}
	});
}
function actButtonsCookies(){
	$('#btn_cookie_ok').click(function(event){
		event.preventDefault();
		closeBannerCookies();
		setCookie('cookieAccept_kb','yes',365);
	});
}
function closeBannerCookies(){
	$('#cr_cookiesign').animate({'opacity':0}, 600, function(){
		$('#cr_cookiesign').remove();
	});
}

function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name){
	var c_value = String(document.cookie);
	
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1)
	{
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1)
	{
		c_value = null;
	}
	else
	{
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1)
	  	{
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}
function checkCookie(c_name){
	var value=getCookie(c_name);
	if (value!=null && value!="")
	{
		return true;
	}
	else
	{
		return false;
	}
}
function setSessionValue(s_name, s_value){
	$.post('/lib/acceptCookieSession.php',{name:s_name, value:s_value},function(data){
		//alert(data);	
	});
}
