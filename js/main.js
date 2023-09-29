"use strict";


var _page = 'home';
var _backgroundposy = 0;
var _backgroundposx = 0;
var _swipeboxscroll = 0;
var _pageLang = 'nl';

function initPage(page, subpage, lang){
	window._pageLang = lang;
	initSmoothScrolling();
	initLangNav(page);
	$('.js body').velocity("fadeIn", { duration: 500 });
	//initScrollBackground();
	window._page = page;
	initMainNavigation();
	switch(page){
		case 'home':
			//loadUserHistory();
		break;
		case 'login':
			initLoginPage();
		break;
		case 'firstlogin':
			initFLoginPage();
		break;
		case 'inschrijving':
			//initFormInschrijvingQR();
		break;
	}
}
function initLangNav(page){
	switch(page){
		case 'opleidingen':
			page = 'examens';
		break;
	}
	if($('#cr_nav_lang').length){
	   $('#cr_nav_lang span').one('click', function(){
		var setlang = $(this).attr('data-lang');
		window.location.href = '/'+setlang+'/'+page+'.html';
	   });
	}
}
/**************************MAIN NAVIGATION*****************************/
function initMainNavigation(){
	if($("#cr_nav_top .btn_logout").length){
		$("#cr_nav_top .btn_logout").on('click', function(event){
			event.preventDefault();
			var ajaxcall = $.ajax({
				url: '/lib/AJAXlogin.php',
				method: 'POST',
				data: {part:'logout'}
			});
		   	ajaxcall.success(function(data){
				window.location.href="/"+window._pageLang+"/home.html";
			});
		   	ajaxcall.fail(function(data){
				console.log(data);
			});
	   });
	}
}
/*******************CHECK EMAIL ***************************************/
function checkEmail(value){
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(value))	{
		return true;	
	}
}


/****************SMOOTH SCROLLING******************************/
function smoothScrollingTo(target){
  $('html,body').animate({scrollTop:$(target).offset().top}, 500);
}
function initSmoothScrolling(){
	$('a[href*=\\#]').on('click', function(event){     
		event.preventDefault();
		smoothScrollingTo(this.hash);
	});
}
/****************PHOTO gallery******************************/

function initSwipeBox(){
	
	$( '.swipebox' ).swipebox({
		removeBarsOnMobile : false, hideBarsDelay : 0,
		beforeOpen: function() { 
		// window._swipeboxscroll = $(window).scrollTop();
			$('body').append('<div id="anti_click" style="position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:1000;background:black;"></div>').css({'overflow':'hidden', 'position':'fixed'});
		}, 
		afterClose: function() {
			$('#anti_click').remove();
			$('body').css({'overflow':'visible', 'position':'relative'});
			// $(window).scrollTop(window._swipeboxscroll);
		}
	});
}


