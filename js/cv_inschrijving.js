"use strict";
var _pageLang = '';
var _ttlInschrijvingPart = "Inschrijving - deel";
var _statePart1 = '';
var _statePart2 = '';
var _statePart3 = '';
var _aanvragerType = '';
var _aanvragerKlant = '';
var _aanvragerBedrijf = '';
var _aanvragerBedrijfAdres = '';
var _aanvragerBedrijfPcode = '';
var _aanvragerBedrijfCity = '';
var _aanvragerBedrijfBTW = '';
var _factuurAanvrager = '';
var _factuurEmail = '';
var _factuurKortingscode = '';
var _factuurReferentie = '';
var _contactAanspreking = '';
var _contactAchternaam = '';
var _contactVoornaam = '';
var _contactTelefoon = '';
var _contactEmail = '';
var _contactIsDeelnemer = '';
var _inschrijvingKMO = '';
var _inschrijvingVoorwaarden = '';
var _inschrijvingOpmerking = '';
var _inschrijvingOpleidingId = '';
var _inschrijvingOpleidingssoortId = '';
var _arrErrorPart1 = [];
var _arrErrorPart2 = [];
var _arrErrorPart3 = [];
var _arrErrorContact = [];
var _arrErrorFacturatie = [];
var _formPartActive = '';
var _htmlAddDeelnemer = '';
var _arrAddedDeelnemers = [];
var _arrErrorDeelnemer = [];
var _countAddedDeelnemer = 0;
var _arrBedrijven = [];
var _partOpen = '';
/////////////////////////////GLOBAL VARS////////////////////////////////

//////////////////////////////FUNCTIONS/////////////////////////////////
function initCVInschrijving(pagelang, arrbedrijven){
	//console.log(pagelang);
	window._pageLang = pagelang;
	window._arrBedrijven = arrbedrijven;
	//console.log(arrbedrijven);
	handleFrmInschrijving2();
}

function handleFrmInschrijving2(){
	$('#frm_inschrijving input[name="rdb_ikschrijfmein"]').on('change', function(){
		window._ikschrijfmein = $('#frm_inschrijving input[name="rdb_ikschrijfmein"]:checked').val();
		console.log(window._ikschrijfmein);
		
		switch(window._ikschrijfmein){
			case 'bedrijf':
				
				$('#'+window._partOpen).hide();
				$('#part_bedrijf').show();
				window._partOpen = 'part_bedrijf';
				actPart('bedrijf');
			break;
			case 'persoon':
				$('#'+window._partOpen).hide();
				$('#part_persoon').show();
				window._partOpen = 'part_persoon';
			break;
			case 'medewerker':
				$('#'+window._partOpen).hide();
				$('#part_medewerker').show();
				window._partOpen = 'part_medewerker';
			break;
		}
	});
	$('#frm_inschrijving').on('submit', function(event){
		event.preventDefault();
		console.log('sibmit form');
		$('#frm_inschrijving button[type="submit"]').prop('disabled',true);
		$('#'+window._partOpen+' .cr_error').removeClass('error').html('');
		$('input[name="cbo_algemenevoorwaarden"]').parent().removeClass('input_error');
		resetContact();
		resetFacturatie();
		switch(window._partOpen){
			case 'part_bedrijf':
				window._contactAchternaam = $.trim($('#'+window._partOpen+' input[name="txt_contact_name"]').val());
				window._contactVoornaam = $.trim($('#'+window._partOpen+' input[name="txt_contact_fname"]').val());
				window._contactEmail = $.trim($('#'+window._partOpen+' input[name="txt_contact_email"]').val());
				window._contactBirthDay = $.trim($('#'+window._partOpen+' select[name="sel_birth_day"]').val());
				window._contactBirthMonth = $.trim($('#'+window._partOpen+' select[name="sel_birth_month"]').val());
				window._contactBirthYear = $.trim($('#'+window._partOpen+' select[name="sel_birth_year"]').val());
				window._contactPhone = $.trim($('#'+window._partOpen+' input[name="txt_contact_phone"]').val());
				window._contactFunctie = $.trim($('#'+window._partOpen+' input[name="txt_contact_functie"]').val());
				window._contactAdres = '';
				window._contactPostcode = '';
				window._contactCity = '';
				window._contactCountry = '';
				
				if($('#'+window._partOpen+' input[name="rdb_contact_klant"]').is(':checked')){
				   window._contactIsKlant = $('#'+window._partOpen+' input[name="rdb_contact_klant"]:checked').val();
				}else{
				   window._contactIsKlant = '';
				}
				
				window._contactIsDeelnemer = '';
				if($('#'+window._partOpen+' input[name="cbo_psyche"]').is(':checked')){
					window._contactNieuwsbriefPsyche = 'y';
				}else{
				   	window._contactNieuwsbriefPsyche = 'n';
				}
				if($('#'+window._partOpen+' input[name="cbo_tegek"]').is(':checked')){
					window._contactNieuwsbriefTeGek = 'y';
				}else{
				   	window._contactNieuwsbriefTeGek = 'n';
				}
				if($('#'+window._partOpen+' input[name="cbo_algemenevoorwaarden"]').is(':checked')){
					window._contactVoorwaarden = 'y';
				}else{
				   	window._contactVoorwaarden = 'n';
				}
				var checkcontact = checkContact(window._contactAchternaam, window._contactVoornaam, window._contactEmail, window._contactIsDeelnemer, window._contactIsKlant, window._contactPhone);
				
				window._aanvragerBedrijf = $.trim($('#'+window._partOpen+' input[name="txt_facturatie_organisatie"]').val());
				window._aanvragerBedrijfAdres = $.trim($('#'+window._partOpen+' input[name="txt_facturatie_address"]').val());
				window._aanvragerBedrijfPcode = $.trim($('#'+window._partOpen+' input[name="txt_facturatie_pcode"]').val());
				window._aanvragerBedrijfCity = $.trim($('#'+window._partOpen+' input[name="txt_facturatie_city"]').val());
				window._aanvragerBedrijfBTW = $.trim($('#'+window._partOpen+' input[name="txt_facturatie_btw"]').val());
				window._factuurEmail = $.trim($('#'+window._partOpen+' input[name="txt_facturatie_email"]').val());
				window._factuurEmailBedrijf = $.trim($('#'+window._partOpen+' input[name="txt_facturatie_emailbedrijf"]').val());
				window._factuurBestelbonnummer = $.trim($('#'+window._partOpen+' input[name="txt_facturatie_bestelbonnr"]').val());
				var checkfacturatie = checkFacturatie(window._aanvragerBedrijf, window._aanvragerBedrijfAdres, window._aanvragerBedrijfPcode, window._aanvragerBedrijfCity, window._aanvragerBedrijfBTW, window._factuurEmailBedrijf);
				
				window._afwijkendBedrijf = '';
				window._afwijkendAdres = '';
				window._afwijkendPcode = '';
				window._afwijkendCity = '';
				var checkfacturatieafwijkend = '';
				if($('#frm_inschrijving input[name="cbo_facturatie_wijkenaf"]').is(':checked')){
					window._afwijkendBedrijf = $.trim($('#frm_inschrijving input[name="txt_facturatiewijkenaf_organisatie"]').val());
					window._afwijkendAdres = $.trim($('#frm_inschrijving input[name="txt_facturatiewijkenaf_address"]').val());
					window._afwijkendPcode = $.trim($('#frm_inschrijving input[name="txt_facturatiewijkenaf_pcode"]').val());
					window._afwijkendCity = $.trim($('#frm_inschrijving input[name="txt_facturatiewijkenaf_city"]').val());

					checkfacturatieafwijkend = checkFacturatieAfwijkend(window._afwijkendBedrijf, window._afwijkendAdres, window._afwijkendPcode, window._afwijkendCity);
				}else{
					checkfacturatieafwijkend = true;
				}
				//CHECK DEELNEMERS////////////////////////////////////
				resetCheckDataDeelnemer();
				var counterDeelnemers = 0;
				window._arrAddedDeelnemers.length = 0;
				var objDeelnemer = {naam:'',voornaam:'',email:'', phone:'', functie:''}
				var deelnemer_naam, deelnemer_voornaam, deelnemer_email, deelnemer_id, deelnemer_check, deelnemer_radio, deelnemer_phone, deelnemer_functie;
				$('#cr_list_deelnemers .deelnemer').each(function(index, element){
					deelnemer_id = $(this).attr('id');
					deelnemer_naam = $.trim($('#'+deelnemer_id+' input[name=txt_deelnemer_name]').val());
					deelnemer_voornaam = $.trim($('#'+deelnemer_id+' input[name=txt_deelnemer_fname]').val());
					deelnemer_email = $.trim($('#'+deelnemer_id+' input[name=txt_deelnemer_email]').val());
					deelnemer_phone = $.trim($('#'+deelnemer_id+' input[name=txt_deelnemer_phone]').val());
					deelnemer_functie = $.trim($('#'+deelnemer_id+' input[name=txt_deelnemer_functie]').val());

					objDeelnemer.naam = deelnemer_naam;
					objDeelnemer.id = deelnemer_id;
					objDeelnemer.voornaam = deelnemer_voornaam;
					objDeelnemer.email = deelnemer_email;
					objDeelnemer.phone = deelnemer_phone;
					objDeelnemer.functie = deelnemer_functie;
					if(checkDataDeelnemer(objDeelnemer) == 'OK'){
						window._arrAddedDeelnemers[counterDeelnemers] = {
							naam: deelnemer_naam,
							voornaam: deelnemer_voornaam,
							email: deelnemer_email,
							phone: deelnemer_phone,
							functie: deelnemer_functie
						};
						deelnemer_check = 'OK';
					}else{
						deelnemer_check = 'ERROR';
					}
					counterDeelnemers ++;
				});
				//CHECK VOORWAARDEN////////////////////////////////////
				if($('#'+window._partOpen+' input[name="cbo_algemenevoorwaarden"]').is(':checked')){
					window._contactVoorwaarden = 'y';
				}else{
				   	window._contactVoorwaarden = 'n';
				}
			break;
			case 'part_persoon':
				window._contactAchternaam = $.trim($('#'+window._partOpen+' input[name="txt_contact_name"]').val());
				window._contactVoornaam = $.trim($('#'+window._partOpen+' input[name="txt_contact_fname"]').val());
				window._contactEmail = $.trim($('#'+window._partOpen+' input[name="txt_contact_email"]').val());
				window._contactBirthDay = $.trim($('#'+window._partOpen+' select[name="sel_birth_day"]').val());
				window._contactBirthMonth = $.trim($('#'+window._partOpen+' select[name="sel_birth_month"]').val());
				window._contactBirthYear = $.trim($('#'+window._partOpen+' select[name="sel_birth_year"]').val());
				window._contactPhone = $.trim($('#'+window._partOpen+' input[name="txt_contact_phone"]').val());
				window._contactFunctie = '';
				window._contactIsDeelnemer = '';
				window._contactAdres = $.trim($('#'+window._partOpen+' input[name="txt_facturatie_address"]').val());
				window._contactPostcode = $.trim($('#'+window._partOpen+' input[name="txt_facturatie_pcode"]').val());
				window._contactCity = $.trim($('#'+window._partOpen+' input[name="txt_facturatie_city"]').val());
				window._contactCountry = $.trim($('#'+window._partOpen+' select[name="sel_country"]').val());
				if($('#'+window._partOpen+' input[name="cbo_psyche"]').is(':checked')){
					window._contactNieuwsbriefPsyche = 'y';
				}else{
				   	window._contactNieuwsbriefPsyche = 'n';
				}
				if($('#'+window._partOpen+' input[name="cbo_tegek"]').is(':checked')){
					window._contactNieuwsbriefTeGek = 'y';
				}else{
				   	window._contactNieuwsbriefTeGek = 'n';
				}
				if($('#'+window._partOpen+' input[name="cbo_algemenevoorwaarden"]').is(':checked')){
					window._contactVoorwaarden = 'y';
				}else{
				   	window._contactVoorwaarden = 'n';
				}
				window._contactIsKlant = 'y';
				var checkcontact = checkContact2(window._contactAchternaam, window._contactVoornaam, window._contactEmail, window._contactPhone, window._contactAdres, window._contactPostcode, window._contactCity, window._contactCountry);
				window._aanvragerBedrijf = '';
				window._aanvragerBedrijfAdres = '';
				window._aanvragerBedrijfPcode = '';
				window._aanvragerBedrijfCity = '';
				window._aanvragerBedrijfBTW = '';
				window._factuurEmail = '';
				window._factuurEmailBedrijf = '';
				window._factuurBestelbonnummer = '';
				var checkfacturatie = true;
				window._afwijkendBedrijf = '';
				window._afwijkendAdres = '';
				window._afwijkendPcode = '';
				window._afwijkendCity = '';
				window._afwijkendEmail = '';
				var checkfacturatieafwijkend = true;
				//CHECK VOORWAARDEN////////////////////////////////////
				if($('#'+window._partOpen+' input[name="cbo_algemenevoorwaarden"]').is(':checked')){
					window._contactVoorwaarden = 'y';
				}else{
				   	window._contactVoorwaarden = 'n';
				}
			break;
			case 'part_medewerker':
				window._contactAchternaam = $.trim($('#'+window._partOpen+' input[name="txt_contact_name"]').val());
				window._contactVoornaam = $.trim($('#'+window._partOpen+' input[name="txt_contact_fname"]').val());
				window._contactEmail = $.trim($('#'+window._partOpen+' input[name="txt_contact_email"]').val());
				window._contactBirthDay = $.trim($('#'+window._partOpen+' select[name="sel_birth_day"]').val());
				window._contactBirthMonth = $.trim($('#'+window._partOpen+' select[name="sel_birth_month"]').val());
				window._contactBirthYear = $.trim($('#'+window._partOpen+' select[name="sel_birth_year"]').val());
				window._contactPhone = $.trim($('#'+window._partOpen+' input[name="txt_contact_phone"]').val());
				window._contactFunctie = '';
				window._contactIsDeelnemer = '';
				window._contactAdres = $.trim($('#'+window._partOpen+' input[name="txt_facturatie_address"]').val());
				window._contactPostcode = $.trim($('#'+window._partOpen+' input[name="txt_facturatie_pcode"]').val());
				window._contactCity = $.trim($('#'+window._partOpen+' input[name="txt_facturatie_city"]').val());
				window._contactCountry = $.trim($('#'+window._partOpen+' select[name="sel_country"]').val());
				if($('#'+window._partOpen+' input[name="cbo_psyche"]').is(':checked')){
					window._contactNieuwsbriefPsyche = 'y';
				}else{
				   	window._contactNieuwsbriefPsyche = 'n';
				}
				if($('#'+window._partOpen+' input[name="cbo_tegek"]').is(':checked')){
					window._contactNieuwsbriefTeGek = 'y';
				}else{
				   	window._contactNieuwsbriefTeGek = 'n';
				}
				if($('#'+window._partOpen+' input[name="cbo_algemenevoorwaarden"]').is(':checked')){
					window._contactVoorwaarden = 'y';
				}else{
				   	window._contactVoorwaarden = 'n';
				}
				window._contactIsKlant = 'y';
				var checkcontact = checkContactIntern(window._contactAchternaam, window._contactVoornaam, window._contactEmail, window._contactPhone, window._contactAdres, window._contactPostcode, window._contactCity, window._contactCountry);
				window._aanvragerBedrijf = '';
				window._aanvragerBedrijfAdres = '';
				window._aanvragerBedrijfPcode = '';
				window._aanvragerBedrijfCity = '';
				window._aanvragerBedrijfBTW = '';
				window._factuurEmail = '';
				window._factuurEmailBedrijf = '';
				window._factuurBestelbonnummer = '';
				var checkfacturatie = true;
				window._afwijkendBedrijf = '';
				window._afwijkendAdres = '';
				window._afwijkendPcode = '';
				window._afwijkendCity = '';
				window._afwijkendEmail = '';
				var checkfacturatieafwijkend = true;
				//CHECK VOORWAARDEN////////////////////////////////////
				if($('#'+window._partOpen+' input[name="cbo_algemenevoorwaarden"]').is(':checked')){
					window._contactVoorwaarden = 'y';
				}else{
				   	window._contactVoorwaarden = 'n';
				}
			break;
		}
		if(checkcontact && checkfacturatie && window._arrErrorDeelnemer.length == 0 && window._contactVoorwaarden == 'y'){
			window._inschrijvingOpleidingId = $('#frm_inschrijving input[name="hid_oplid"]').val();
			window._inschrijvingOpleidingssoortId = $('#frm_inschrijving input[name="hid_oplsrtid"]').val();
			if(window._contactBirthYear == '0' || window._contactBirthMonth == '0' || window._contactBirthDay == '0'){
				window._contactBirthFinal = '';
			}else{
				window._contactBirthFinal = window._contactBirthYear+'-'+window._contactBirthMonth+'-'+window._contactBirthDay+'T00:00:00';
			}
			console.log(window._arrAddedDeelnemers);
			var ajaxcall = $.ajax({
				url: '/lib/AJAXInschrijvingCV.php',
				method: 'POST',
				data: {
					part:'inschrijving',
					klantis: window._partOpen,
					opleiding_id: window._inschrijvingOpleidingId, 
					opleidingssoort_id: window._inschrijvingOpleidingssoortId,
					aanvragerBedrijf: window._aanvragerBedrijf,
					aanvragerAdres: window._aanvragerBedrijfAdres,
					aanvragerPostcode: window._aanvragerBedrijfPcode,
					aanvragerCity: window._aanvragerBedrijfCity,
					aanvragerBTW: window._aanvragerBedrijfBTW,
					afwijkendBedrijf: window._afwijkendBedrijf,
					afwijkendAdres: window._afwijkendAdres,
					afwijkendPostcode: window._afwijkendPcode,
					afwijkendCity: window._afwijkendCity,
					factuurEmail: window._factuurEmail,
					factuurEmailBedrijf:window._factuurEmailBedrijf,
					factuurBestelbonnr: window._factuurBestelbonnummer,
					contactAchternaam: window._contactAchternaam,
					contactVoornaam: window._contactVoornaam,
					contactEmail: window._contactEmail,
					contactPhone: window._contactPhone,
					contactFunctie:window._contactFunctie,
					contactAdres: window._contactAdres,
					contactPostcode: window._contactPostcode,
					contactCity: window._contactCity,
					contactCountry: window._contactCountry,
					contactGeboortedatum: window._contactBirthFinal,
					deelnemers: JSON.stringify(window._arrAddedDeelnemers),
					nieuwsbriefPsyche: window._contactNieuwsbriefPsyche,
					nieuwsbriefTeGek: window._contactNieuwsbriefTeGek
				}
			});
		   	ajaxcall.success(function(data){
				console.log(data);
				if(data.toLowerCase().indexOf('error') != -1){
					$('#'+window._partOpen+' .cr_error').html('Uw aanvraag kan momenteel niet verstuurd worden. Gelieve later opnieuw te proberen aub.  Sorry voor het ongemak.').addClass('error');
					$('#frm_inschrijving button[type="submit"]').prop('disabled',false);
					
				}else{
					$('#'+window._partOpen+' .cr_error').html('Uw aanvraag werd correct verstruurd, na verwerking kan je een mail verwachten met de bevestiging.').addClass('success');
					//$('#frm_inschrijving button[type="submit"]').remove();
					window.location.href = "https://psyche.be/inschrijvingen/jaarvergadering-dd-ovl/jaarvergadering-bedankt";
				}
				
				//setTimeout(function(){window.location.href="/"+window._pageLang+"/home.html";}, 3000);
				
			});
		   	ajaxcall.fail(function(data){
				$('#'+window._partOpen+' .cr_error').html('Uw aanvraag kan momenteel niet verstuurd worden. Gelieve later opnieuw te proberen aub.  Sorry voor het ongemak.').addClass('error');
				console.log(data);
				$('#'+window._partOpen+' button[type="submit"]').prop('disabled',false);
			});
		}else{
			if(!checkcontact){
			   for(var t=0; t<window._arrErrorContact.length; t++){
					if(window._arrErrorContact[t].substring(-1, 3)==='sel'){
						$('#'+window._partOpen+' select[name='+window._arrErrorContact[t]+']').addClass('input_error');
					}else if(window._arrErrorContact[t].substring(-1, 3)==='txt'){
						$('#'+window._partOpen+' input[name='+window._arrErrorContact[t]+']').addClass('input_error');
					}else if(window._arrErrorContact[t].substring(-1, 3)==='rdb'){
						$('#'+window._partOpen+' input[name='+window._arrErrorContact[t]+']').closest('.cbo_group').addClass('input_error');
					}	
				}
			}
			if(!checkfacturatie || !checkfacturatieafwijkend){
			    for(var t=0; t<window._arrErrorFacturatie.length; t++){
					if(window._arrErrorFacturatie[t].substring(-1, 3)==='sel'){
						$('#'+window._partOpen+' select[name='+window._arrErrorFacturatie[t]+']').addClass('input_error');
					}else if(window._arrErrorFacturatie[t].substring(-1, 3)==='txt'){
						$('#'+window._partOpen+' input[name='+window._arrErrorFacturatie[t]+']').addClass('input_error');
					}else if(window._arrErrorFacturatie[t].substring(-1, 3)==='rdb'){
						$('#'+window._partOpen+' input[name='+window._arrErrorFacturatie[t]+']').closest('.cbo_group').addClass('input_error');
					}	
				}
			}
			if(window._arrErrorDeelnemer.length > 0){
			   	for(var i=0; i<window._arrErrorDeelnemer.length; i++){
					if(window._arrErrorDeelnemer[i][1].substring(-1, 3)==='sel'){
					  $('#'+window._arrErrorDeelnemer[i][0]+' select[name='+window._arrErrorDeelnemer[i][1]+']').addClass('input_error');
					}else if(window._arrErrorDeelnemer[i][1].substring(-1, 3)==='txt'){
						$('#'+window._arrErrorDeelnemer[i][0]+' input[name='+window._arrErrorDeelnemer[i][1]+']').addClass('input_error');
					}else if(window._arrErrorDeelnemer[i][1].substring(-1, 3)==='rdb'){
						$('#'+window._arrErrorDeelnemer[i][0]+' input[name='+window._arrErrorDeelnemer[i][1]+']').closest('.cbo_group').addClass('input_error');
					}
				}
			}
			if(window._contactVoorwaarden == 'n'){
			   $('#'+window._partOpen+' input[name="cbo_algemenevoorwaarden"]').parent().addClass('input_error');
			}
			$('#'+window._partOpen+' .cr_error').html('Het inschrijvingsformulier werd niet correct ingevuld.  Gelieve de invoer na te kijken aub.').addClass('error');
			$('#'+window._partOpen+' button[type="submit"]').prop('disabled',false);
		}
	});
}
function actPart(part){
	switch(part){
		case 'bedrijf':
			window._htmlAddDeelnemer = $('#frm_inschrijving .deelnemer_item:first-child').html();
			window._countAddedDeelnemer = $('#frm_inschrijving .deelnemer').length;
			actBtnAddDeelnemer();
			$('#frm_inschrijving input[name="rdb_contact_klant"]').on('change', function(){
				if($(this).val() == 'y'){
					$('#cr_ondernemingsnummer').removeClass('hidden');
					$('#cr_facturatie').addClass('hidden');
					actInputOndernemingsnummer();
				}else{
					$('#cr_ondernemingsnummer, #cr_facturatie').removeClass('hidden');
					actInputOndernemingsnummer();
				}
			});
			$('#frm_inschrijving input[name="cbo_facturatie_wijkenaf"]').on('change', function(){
				if($(this).is(":checked")){
				   $('#cr_facturatie_wijkenaf').removeClass('hidden');
				}else{
				   $('#cr_facturatie_wijkenaf').addClass('hidden');
				}
			});
		break;
	}
}
function handleFrmInschrijving(){
	console.log('handleinschrijving');
	window._htmlAddDeelnemer = $('#frm_inschrijving .deelnemer_item:first-child').html();
	window._countAddedDeelnemer = $('#frm_inschrijving .deelnemer').length;
	actBtnAddDeelnemer();
	$('#frm_inschrijving input[name="rdb_contact_klant"]').on('change', function(){
		if($(this).val() == 'y'){
		   	$('#cr_ondernemingsnummer').removeClass('hidden');
			$('#cr_facturatie').addClass('hidden');
			actInputOndernemingsnummer();
		}else{
			$('#cr_ondernemingsnummer, #cr_facturatie').removeClass('hidden');
		}
	});
	$('#frm_inschrijving input[name="cbo_facturatie_wijkenaf"]').on('change', function(){
		if($(this).is(":checked")){
		   $('#cr_facturatie_wijkenaf').removeClass('hidden');
		}else{
		   $('#cr_facturatie_wijkenaf').addClass('hidden');
		}
	});
	$('#frm_inschrijving').on('submit', function(event){
		event.preventDefault();
		$('#frm_inschrijving button[type="submit"]').prop('disabled',true);
		$('#cr_error').removeClass('error').html('');
		resetContact();
		resetFacturatie();
		//CHECK CONTACTPERSOON////////////////////////////////
		window._contactAchternaam = $.trim($('#frm_inschrijving input[name="txt_contact_name"]').val());
		window._contactVoornaam = $.trim($('#frm_inschrijving input[name="txt_contact_fname"]').val());
		window._contactEmail = $.trim($('#frm_inschrijving input[name="txt_contact_email"]').val());
//		if($('#frm_inschrijving input[name="rdb_contact_deelnemer"]').is(':checked')) { 
//				window._contactIsDeelnemer = $('#frm_inschrijving input[name="rdb_contact_deelnemer"]:checked').val();
//		}else{
				window._contactIsDeelnemer = '';
//		}
		var checkcontact = checkContact(window._contactAchternaam, window._contactVoornaam, window._contactEmail, window._contactIsDeelnemer);
		//CHECK FACTURATIE////////////////////////////////////
		window._aanvragerBedrijf = $.trim($('#frm_inschrijving input[name="txt_facturatie_organisatie"]').val());
		window._aanvragerBedrijfAdres = $.trim($('#frm_inschrijving input[name="txt_facturatie_address"]').val());
		window._aanvragerBedrijfPcode = $.trim($('#frm_inschrijving input[name="txt_facturatie_pcode"]').val());
		window._aanvragerBedrijfCity = $.trim($('#frm_inschrijving input[name="txt_facturatie_city"]').val());
		window._aanvragerBedrijfBTW = $.trim($('#frm_inschrijving input[name="txt_facturatie_btw"]').val());
		window._factuurEmail = $.trim($('#frm_inschrijving input[name="txt_facturatie_email"]').val());
		//window._factuurKortingscode = $.trim($('#frm_inschrijving input[name="txt_facturatie_kortingscode"]').val());
		var checkfacturatie = checkFacturatie(window._aanvragerBedrijf, window._aanvragerBedrijfAdres, window._aanvragerBedrijfPcode, window._aanvragerBedrijfCity, window._aanvragerBedrijfBTW, window._factuurEmail);
		//CHECK FACTURATIE AFWIJKEND//////////////////////////
		window._afwijkendBedrijf = '';
		window._afwijkendAdres = '';
		window._afwijkendPcode = '';
		window._afwijkendCity = '';
		window._afwijkendEmail = '';
		var checkfacturatieafwijkend = '';
		if($('#frm_inschrijving input[name="cbo_facturatie_wijkenaf"]').is(':checked')){
		   	window._afwijkendBedrijf = $.trim($('#frm_inschrijving input[name="txt_facturatiewijkenaf_organisatie"]').val());
			window._afwijkendAdres = $.trim($('#frm_inschrijving input[name="txt_facturatiewijkenaf_address"]').val());
			window._afwijkendPcode = $.trim($('#frm_inschrijving input[name="txt_facturatiewijkenaf_pcode"]').val());
			window._afwijkendCity = $.trim($('#frm_inschrijving input[name="txt_facturatiewijkenaf_city"]').val());
			window._afwijkendEmail = $.trim($('#frm_inschrijving input[name="txt_facturatiewijkenaf_email"]').val());
			checkfacturatieafwijkend = checkFacturatieAfwijkend(window._afwijkendBedrijf, window._afwijkendAdres, window._afwijkendPcode, window._afwijkendCity, window._afwijkendEmail);
		}else{
			checkfacturatieafwijkend = true;
		}
		//CHECK DEELNEMERS////////////////////////////////////
		resetCheckDataDeelnemer();
		var counterDeelnemers = 0;
		window._arrAddedDeelnemers.length = 0;
		var objDeelnemer = {naam:'',voornaam:'',email:''}
		var deelnemer_naam, deelnemer_voornaam, deelnemer_email, deelnemer_id, deelnemer_check, deelnemer_radio;
		$('#cr_list_deelnemers .deelnemer').each(function(index, element){
			deelnemer_id = $(this).attr('id');
			deelnemer_naam = $.trim($('#'+deelnemer_id+' input[name=txt_deelnemer_name]').val());
			deelnemer_voornaam = $.trim($('#'+deelnemer_id+' input[name=txt_deelnemer_fname]').val());
			deelnemer_email = $.trim($('#'+deelnemer_id+' input[name=txt_deelnemer_email]').val());
				
			objDeelnemer.naam = deelnemer_naam;
			objDeelnemer.id = deelnemer_id;
			objDeelnemer.voornaam = deelnemer_voornaam;
			objDeelnemer.email = deelnemer_email;
			if(checkDataDeelnemer(objDeelnemer) == 'OK'){
				window._arrAddedDeelnemers[counterDeelnemers] = {
					naam: deelnemer_naam,
					voornaam: deelnemer_voornaam,
					email: deelnemer_email
				};
				deelnemer_check = 'OK';
			}else{
				deelnemer_check = 'ERROR';
			}
			counterDeelnemers ++;
		});
		
		
		
		//CHECK CONTACT IS DEELNEMER////////
//		if(window._contactIsDeelnemer == 'y' && $('#cr_list_deelnemers .deelnemer').length == 1){
//		   	var checkdeelnemer_id, checkdeelnemer_naam, checkdeelnemer_voornaam, checkdeelnemer_email;
//			checkdeelnemer_id = $('#cr_list_deelnemers .deelnemer').attr('id');
//			checkdeelnemer_naam = $.trim($('#'+checkdeelnemer_id+' input[name=txt_deelnemer_name]').val());
//			checkdeelnemer_voornaam = $.trim($('#'+checkdeelnemer_id+' input[name=txt_deelnemer_fname]').val());
//			checkdeelnemer_email = $.trim($('#'+checkdeelnemer_id+' input[name=txt_deelnemer_email]').val());
//			if(checkdeelnemer_naam == '' && checkdeelnemer_voornaam == '' && checkdeelnemer_email == ''){
//			   window._arrErrorDeelnemer.length = 0;
//				counterDeelnemers = 0;
//			}
//		}
		if(checkcontact && checkfacturatie && window._arrErrorDeelnemer.length == 0){
//			if(window._contactIsDeelnemer == 'y'){
//			   	window._arrAddedDeelnemers[counterDeelnemers] = {
//					naam: window._contactAchternaam,
//					voornaam: window._contactVoornaam,
//					email: window._contactEmail
//				};
//			}
			window._inschrijvingOpleidingId = $('#frm_inschrijving input[name="hid_oplid"]').val();
			window._inschrijvingOpleidingssoortId = $('#frm_inschrijving input[name="hid_oplsrtid"]').val();
			console.log(window._arrAddedDeelnemers);
			var ajaxcall = $.ajax({
				url: '/lib/AJAXInschrijvingCV.php',
				method: 'POST',
				data: {
					part:'inschrijving',
					opleiding_id: window._inschrijvingOpleidingId, 
					opleidingssoort_id: window._inschrijvingOpleidingssoortId,
					aanvragerBedrijf: window._aanvragerBedrijf,
					aanvragerAdres: window._aanvragerBedrijfAdres,
					aanvragerPostcode: window._aanvragerBedrijfPcode,
					aanvragerCity: window._aanvragerBedrijfCity,
					aanvragerBTW: window._aanvragerBedrijfBTW,
					afwijkendBedrijf: window._afwijkendBedrijf,
					afwijkendAdres: window._afwijkendAdres,
					afwijkendPostcode: window._afwijkendPcode,
					afwijkendCity: window._afwijkendCity,
					afwijkendEmail: window._afwijkendEmail,
					factuurEmail: window._factuurEmail,
					contactAchternaam: window._contactAchternaam,
					contactVoornaam: window._contactVoornaam,
					contactEmail: window._contactEmail,
					deelnemers: JSON.stringify(window._arrAddedDeelnemers)
				}
			});
		   	ajaxcall.success(function(data){
				console.log(data);
				if(data.toLowerCase().indexOf('error') != -1){
					$('#cr_error').html('Uw aanvraag kan momenteel niet verstuurd worden. Gelieve later opnieuw te proberen aub.  Sorry voor het ongemak.').addClass('error');
					$('#frm_inschrijving button[type="submit"]').prop('disabled',false);
					
				}else{
					$('#cr_error').html('Uw aanvraag werd correct verstruurd, na verwerking kan je een mail verwachten met de bevestiging.').addClass('success');
					//$('#frm_inschrijving button[type="submit"]').remove();
					window.location.href = "https://psyche.be/inschrijvingen/jaarvergadering-dd-ovl/jaarvergadering-bedankt";
				}
				
				//setTimeout(function(){window.location.href="/"+window._pageLang+"/home.html";}, 3000);
				
			});
		   	ajaxcall.fail(function(data){
				$('#cr_error').html('Uw aanvraag kan momenteel niet verstuurd worden. Gelieve later opnieuw te proberen aub.  Sorry voor het ongemak.').addClass('error');
				console.log(data);
				$('#frm_inschrijving button[type="submit"]').prop('disabled',false);
			});
		}else{
			if(!checkcontact){
			   for(var t=0; t<window._arrErrorContact.length; t++){
					if(window._arrErrorContact[t].substring(-1, 3)==='sel'){
						$('#frm_inschrijving select[name='+window._arrErrorContact[t]+']').addClass('input_error');
					}else if(window._arrErrorContact[t].substring(-1, 3)==='txt'){
						$('#frm_inschrijving input[name='+window._arrErrorContact[t]+']').addClass('input_error');
					}else if(window._arrErrorContact[t].substring(-1, 3)==='rdb'){
						$('#frm_inschrijving input[name='+window._arrErrorContact[t]+']').closest('.cbo_group').addClass('input_error');
					}	
				}
			}
			if(!checkfacturatie || !checkfacturatieafwijkend){
			    for(var t=0; t<window._arrErrorFacturatie.length; t++){
					if(window._arrErrorFacturatie[t].substring(-1, 3)==='sel'){
						$('#frm_inschrijving select[name='+window._arrErrorFacturatie[t]+']').addClass('input_error');
					}else if(window._arrErrorFacturatie[t].substring(-1, 3)==='txt'){
						$('#frm_inschrijving input[name='+window._arrErrorFacturatie[t]+']').addClass('input_error');
					}else if(window._arrErrorFacturatie[t].substring(-1, 3)==='rdb'){
						$('#frm_inschrijving input[name='+window._arrErrorFacturatie[t]+']').closest('.cbo_group').addClass('input_error');
					}	
				}
			}
			if(window._arrErrorDeelnemer.length > 0){
			   	for(var i=0; i<window._arrErrorDeelnemer.length; i++){
					if(window._arrErrorDeelnemer[i][1].substring(-1, 3)==='sel'){
					  $('#'+window._arrErrorDeelnemer[i][0]+' select[name='+window._arrErrorDeelnemer[i][1]+']').addClass('input_error');
					}else if(window._arrErrorDeelnemer[i][1].substring(-1, 3)==='txt'){
						$('#'+window._arrErrorDeelnemer[i][0]+' input[name='+window._arrErrorDeelnemer[i][1]+']').addClass('input_error');
					}else if(window._arrErrorDeelnemer[i][1].substring(-1, 3)==='rdb'){
						$('#'+window._arrErrorDeelnemer[i][0]+' input[name='+window._arrErrorDeelnemer[i][1]+']').closest('.cbo_group').addClass('input_error');
					}
				}
			}
			$('#frm_inschrijving #cr_error').html('Het inschrijvingsformulier werd niet correct ingevuld.  Gelieve de invoer na te kijken aub.').addClass('error');
			$('#frm_inschrijving button[type="submit"]').prop('disabled',false);
		}
	});
}
function actInputOndernemingsnummer(){
	$('#frm_inschrijving input[name="txt_facturatie_btw"]').off().on('keyup', function(){
		clearTimeout(window._btwkeyup);
		clearInterval(window._intervalSearchBedrijf);
		window._btwvalue = $.trim($(this).val());
		window._btwkeyup = setTimeout(function(){
			searchBTWValue(window._btwvalue);
		}, 1000);
	});
}
function clearDataBedrijf(){
	$('#cr_facturatie input').val('');
	$('#cr_facturatie_wijkenaf').addClass('hidden');
	$('#frm_inschrijving input[name="cbo_facturatie_wijkenaf"]').prop('checked',false);
}
function searchBTWValue(btwnummer){
	startSearchingBtw();
	$('#cr_facturatie').addClass('hidden');
	clearDataBedrijf();
	//remove all letters and spaces dots from value
	var cleanvalue = btwnummer.replace(/[\D\s.]+/g, '');
	if(window._arrBedrijven.length > 0 && cleanvalue != ''){
		var cleanbtwnummer = '';
		var arr_result = [];
		for(var i = 0; i < window._arrBedrijven.length; i++){
			cleanbtwnummer = window._arrBedrijven[i]['btwnummer'].replace(/[\D\s.]+/g, '');
			if(cleanbtwnummer == cleanvalue){
			   	var valuetopush = new Array();
				valuetopush['id'] = window._arrBedrijven[i]['id'];
				valuetopush['naam'] = window._arrBedrijven[i]['naam'];
				valuetopush['email'] = window._arrBedrijven[i]['email'];
				valuetopush['facturatie_adres1'] = window._arrBedrijven[i]['facturatie_adres1'];
				valuetopush['facturatie_postcode'] = window._arrBedrijven[i]['facturatie_postcode'];
				valuetopush['facturatie_plaats'] = window._arrBedrijven[i]['facturatie_plaats'];
				arr_result.push(valuetopush);
			}
			if(i == window._arrBedrijven.length-1){
				clearInterval(window._intervalSearchBedrijf);
				if(arr_result.length>0){
					$('#cr_listbedrijven').html('<div class="cr_input_full"><label>Kies je bedrijf uit onderstaande lijst.</label><div class="cbo_group"></div></div>');
					for(var t = 0; t < arr_result.length; t++){
						$('#cr_listbedrijven .cbo_group').append('<div><input type="radio" name="rdb_bedrijven" value="'+arr_result[t]['naam']+'" data-naam="'+arr_result[t]['naam']+'" data-adres="'+arr_result[t]['facturatie_adres1']+'" data-plaats="'+arr_result[t]['facturatie_plaats']+'" data-postcode="'+arr_result[t]['facturatie_postcode']+'" data-email="'+arr_result[t]['email']+'" /><label>'+arr_result[t]['naam']+', '+arr_result[t]['facturatie_adres1']+', '+arr_result[t]['facturatie_postcode']+' '+arr_result[t]['facturatie_plaats']+'</label></div>');
					}
					actRadioButtonsBedrijf();
				}else{
					clearInterval(window._intervalSearchBedrijf);
				   $('#cr_listbedrijven').html('<p>Wij konden op basis van uw ondernemingsnummer geen bedrijf terugvinden.  Gelieve hieronder je bedrijfsgegevens in te vullen.</p>');
					$('#cr_facturatie').removeClass('hidden');
				}
			}
		}
	}else{
		clearInterval(window._intervalSearchBedrijf);
		$('#cr_listbedrijven').html('<p>Wij konden op basis van uw ondernemingsnummer geen bedrijf terugvinden.  Gelieve hieronder je bedrijfsgegevens in te vullen.</p>');
		$('#cr_facturatie').removeClass('hidden');
	}
}
function actRadioButtonsBedrijf(){
	$('#frm_inschrijving input[name="rdb_bedrijven"]').on('change',function(){
		var bedrijf_naam = $('#frm_inschrijving input[name="rdb_bedrijven"]:checked').attr('data-naam');
		var bedrijf_adres = $('#frm_inschrijving input[name="rdb_bedrijven"]:checked').attr('data-adres');
		var bedrijf_postcode = $('#frm_inschrijving input[name="rdb_bedrijven"]:checked').attr('data-postcode');
		var bedrijf_plaats = $('#frm_inschrijving input[name="rdb_bedrijven"]:checked').attr('data-plaats');
		var bedrijf_email = $('#frm_inschrijving input[name="rdb_bedrijven"]:checked').attr('data-email');
		$('#cr_facturatie input[name="txt_facturatie_organisatie"]').val(bedrijf_naam);
		$('#cr_facturatie input[name="txt_facturatie_address"]').val(bedrijf_adres);
		$('#cr_facturatie input[name="txt_facturatie_pcode"]').val(bedrijf_postcode);
		$('#cr_facturatie input[name="txt_facturatie_city"]').val(bedrijf_plaats);
		$('#cr_facturatie input[name="txt_facturatie_emailbedrijf"]').val(bedrijf_email);
		$('#cr_facturatie').removeClass('hidden');
	});
}
function startSearchingBtw(){
	$('#cr_listbedrijven').html('<p class="info">Zoeken in onze database...</p>');
	window._intervalSearchBedrijfCounter = 0;
	window._intervalSearchBedrijf = setInterval(function(){
		switch(window._intervalSearchBedrijfCounter){
			case 0:
				$('#cr_listbedrijven').html('<p class="info">Zoeken in onze database</p>');
				window._intervalSearchBedrijfCounter = 1;
			break;
			case 1:
				$('#cr_listbedrijven').html('<p class="info">Zoeken in onze database.</p>');
				window._intervalSearchBedrijfCounter = 2;
			break;
			case 2:
				$('#cr_listbedrijven').html('<p class="info">Zoeken in onze database..</p>');
				window._intervalSearchBedrijfCounter = 3;
			break;
			case 3:
				$('#cr_listbedrijven').html('<p class="info">Zoeken in onze database...</p>');
				window._intervalSearchBedrijfCounter = 0;
			break;
		}
	}, 300);
	
}
function checkContact(achternaam, voornaam, email, deelnemer, isklant, phone){
	var result = true;

	if(achternaam ==''){
		window._arrErrorContact.push('txt_contact_name');
		result = false;   
	}
	if(voornaam ==''){
	   	window._arrErrorContact.push('txt_contact_fname');
		result = false; 
	}
	if(email == '' || !checkEmail(email)){
	   	window._arrErrorContact.push('txt_contact_email');
		result = false; 
	}
	if(isklant == ''){
	   	window._arrErrorContact.push('rdb_contact_klant');
		result = false; 
	}
	
//	if(deelnemer == ''){
//	   	window._arrErrorContact.push('rdb_contact_deelnemer');
//		result = false; 
//	}
	return result;
}
function checkContact2(achternaam, voornaam, email, phone, adres, postcode, city, country){
	
	var result = true;

	if(achternaam ==''){
		window._arrErrorContact.push('txt_contact_name');
		result = false;   
	}
	if(voornaam ==''){
	   	window._arrErrorContact.push('txt_contact_fname');
		result = false; 
	}
	if(email == '' || !checkEmail(email)){
	   	window._arrErrorContact.push('txt_contact_email');
		result = false; 
	}
	
	if(adres == ''){
	   	window._arrErrorContact.push('txt_facturatie_address');
		result = false; 
	}
	if(postcode == ''){
	   	window._arrErrorContact.push('txt_facturatie_pcode');
		result = false; 
	}
	if(city == ''){
	   	window._arrErrorContact.push('txt_facturatie_city');
		result = false; 
	}
	if(country == ''){
	   	window._arrErrorContact.push('sel_country');
		result = false; 
	}
	return result;
}
function checkContactIntern(achternaam, voornaam, email, phone, adres, postcode, city, country){
	
	var result = true;

	if(achternaam ==''){
		window._arrErrorContact.push('txt_contact_name');
		result = false;   
	}
	if(voornaam ==''){
	   	window._arrErrorContact.push('txt_contact_fname');
		result = false; 
	}
	if(email == '' || !checkEmail(email)){
	   	window._arrErrorContact.push('txt_contact_email');
		result = false; 
	}
	
	/*if(adres == ''){
	   	window._arrErrorContact.push('txt_facturatie_address');
		result = false; 
	}
	if(postcode == ''){
	   	window._arrErrorContact.push('txt_facturatie_pcode');
		result = false; 
	}
	if(city == ''){
	   	window._arrErrorContact.push('txt_facturatie_city');
		result = false; 
	}
	if(country == ''){
	   	window._arrErrorContact.push('sel_country');
		result = false; 
	}*/
	return result;
}
function resetContact(){
	if(window._arrErrorContact.length>0){
	   for(var i=0; i<window._arrErrorContact.length; i++){
		   if(window._arrErrorContact[i].substring(-1,3) === 'sel'){
			  $('#frm_inschrijving select[name='+window._arrErrorContact[i]+']').removeClass('input_error');
			}else if(window._arrErrorContact[i].substring(-1,3) === 'txt'){
			  $('#frm_inschrijving input[name='+window._arrErrorContact[i]+']').removeClass('input_error');
			}else if(window._arrErrorContact[i].substring(-1,3) === 'rdb'){
				$('#frm_inschrijving input[name='+window._arrErrorContact[i]+']').closest('.cbo_group').removeClass('input_error');
			}
		}
	}
	window._arrErrorContact.length = 0;
}
function checkFacturatie(bedrijf, adres, pcode, city, btw, email){
	var result = true;

	if(bedrijf ==''){
		window._arrErrorFacturatie.push('txt_facturatie_organisatie');
		result = false;   
	}
	if(adres ==''){
	   	window._arrErrorFacturatie.push('txt_facturatie_address');
		result = false; 
	}
	if(pcode ==''){
	   	window._arrErrorFacturatie.push('txt_facturatie_pcode');
		result = false; 
	}
	if(city ==''){
	   	window._arrErrorFacturatie.push('txt_facturatie_city');
		result = false; 
	}
	if(btw ==''){
	   	window._arrErrorFacturatie.push('txt_facturatie_btw');
		result = false; 
	}
	if(email == '' || !checkEmail(email)){
	   	window._arrErrorFacturatie.push('txt_facturatie_emailbedrijf');
		result = false; 
	}
	return result;
}
function checkFacturatieAfwijkend(bedrijf, adres, pcode, city){
	var result = true;

	if(bedrijf ==''){
		window._arrErrorFacturatie.push('txt_facturatiewijkenaf_organisatie');
		result = false;   
	}
	if(adres ==''){
	   	window._arrErrorFacturatie.push('txt_facturatiewijkenaf_address');
		result = false; 
	}
	if(pcode ==''){
	   	window._arrErrorFacturatie.push('txt_facturatiewijkenaf_pcode');
		result = false; 
	}
	if(city ==''){
	   	window._arrErrorFacturatie.push('txt_facturatiewijkenaf_city');
		result = false; 
	}
//	if(btw ==''){
//	   	window._arrErrorFacturatie.push('txt_facturatie_btw');
//		result = false; 
//	}
	
	return result;
}
function resetFacturatie(){
	if(window._arrErrorFacturatie.length>0){
	   for(var i=0; i<window._arrErrorFacturatie.length; i++){
		   if(window._arrErrorFacturatie[i].substring(-1,3) === 'sel'){
			  $('#frm_inschrijving select[name='+window._arrErrorFacturatie[i]+']').removeClass('input_error');
			}else if(window._arrErrorFacturatie[i].substring(-1,3) === 'txt'){
			  $('#frm_inschrijving input[name='+window._arrErrorFacturatie[i]+']').removeClass('input_error');
			}else if(window._arrErrorFacturatie[i].substring(-1,3) === 'rdb'){
				$('#frm_inschrijving input[name='+window._arrErrorFacturatie[i]+']').closest('.cbo_group').removeClass('input_error');
			}
		}
	}
	window._arrErrorFacturatie.length = 0;
}







function handleFrmPart4(){
	$('#frm_inschrijving #cr_part4 button[name="btn_cancel"]').off().on('click',function(){
		resetFormPart4();
		initFrmInschrijving(3);
	});
	$('#frm_inschrijving #cr_part4 button[name="btn_send"]').off().one('click',function(){
		resetFormPart4();
		if($('#frm_inschrijving input[name="rdb_kmo"]').is(':checked')) { 
			window._inschrijvingKMO = $('#frm_inschrijving input[name="rdb_kmo"]:checked').val();
		}else{
			window._inschrijvingKMO = '';
		}
		if($('#frm_inschrijving input[name="cbo_voorwaarden"]').is(':checked')) { 
			window._inschrijvingVoorwaarden = 'y';
		}else{
			window._inschrijvingVoorwaarden = 'n';
		}
		window._inschrijvingOpmerking = $('#frm_inschrijving textarea[name="ta_opmerking"]').val();
		window._inschrijvingOpleidingId = $('#frm_inschrijving input[name="hid_oplid"]').val();
		window._inschrijvingOpleidingssoortId = $('#frm_inschrijving input[name="hid_oplsrtid"]').val();
		if(window._inschrijvingVoorwaarden == 'y' && window._inschrijvingOpleidingId != '' && window._inschrijvingOpleidingssoortId){
		   	//HANDLE INSCHRIJVING
			var ajaxcall = $.ajax({
				url: '/lib/AJAXInschrijvingCV.php',
				method: 'POST',
				data: {
					part:'inschrijving',
					opleiding_id: window._inschrijvingOpleidingId, 
					opleidingssoort_id: window._inschrijvingOpleidingssoortId,
					referentieNummer: window._factuurReferentie,
					aanvragerBedrijf: window._aanvragerBedrijf,
					aanvragerKlant: window._aanvragerKlant,
					aanvragerType: window._aanvragerType,
					aanvragerAdres: window._aanvragerBedrijfAdres,
					aanvragerPostcode: window._aanvragerBedrijfPcode,
					aanvragerCity: window._aanvragerBedrijfCity,
					aanvragerBTW: window._aanvragerBedrijfBTW,
					factuurAanvrager: window._factuurAanvrager,
					factuurEmail: window._factuurEmail,
					contactGeslacht: window._contactAanspreking,
					contactAchternaam: window._contactAchternaam,
					contactVoornaam: window._contactVoornaam,
					contactTelefoon: window._contactTelefoon,
					contactEmail: window._contactEmail,
					deelnemers: JSON.stringify(window._arrAddedDeelnemers),
					inschrijvingKMO: window._inschrijvingKMO,
					inschrijvingOpmerking: window._inschrijvingOpmerking
				}
			});
		   	ajaxcall.success(function(data){
				console.log(data);
				if(data.toLowerCase().indexOf('error') != -1){
					$('#cr_part4 .cr_error').html('Uw aanvraag kan momenteel niet verstuurd worden. Gelieve later opnieuw te proberen aub.  Sorry voor het ongemak.').addClass('error');
					handleFrmPart4();
					
				}else{
					$('#cr_part4 .cr_error').html('Uw aanvraag werd correct verstuurd.  U zal spoedig van ons een email verwachten met de bevestiging.').addClass('success');
					$('#frm_inschrijving #cr_part4 button[name="btn_send"]').remove();
				}
				
				//setTimeout(function(){window.location.href="/"+window._pageLang+"/home.html";}, 3000);
				
			});
		   	ajaxcall.fail(function(data){
				$('#cr_part4 .cr_error').html('Uw aanvraag kan momenteel niet verstuurd worden. Gelieve later opnieuw te proberen aub.  Sorry voor het ongemak.').addClass('error');
				console.log(data);
				handleFrmPart4();
			});
		}else{
		   $('#frm_inschrijving input[name="cbo_voorwaarden"]').closest('.cbo_group').addClass('input_error');
			handleFrmPart4();
		}
	});
}
function switchFormPart(part){
	$('#'+window._formPartActive).fadeOut('fast').promise().done(function(){
		switch(part){
			case 1:
				$('#cr_part'+part).fadeIn('fast');
				window._formPartActive = 'cr_part'+part;
			break;
			case 2:
				$('#cr_part'+part).fadeIn('fast');
				window._formPartActive = 'cr_part'+part;
			break;
			case 3:
				$('#cr_part'+part).fadeIn('fast');
				window._formPartActive = 'cr_part'+part;
			break;
			case 4:
				$('#cr_part'+part).fadeIn('fast');
				window._formPartActive = 'cr_part'+part;
			break;
		}
	});
}
function resetFormPart1(){
	if(window._arrErrorPart1.length>0){
	   for(var i=0; i<window._arrErrorPart1.length; i++){
		   if(window._arrErrorPart1[i].substring(-1,3) === 'sel'){
			  $('#frm_inschrijving select[name='+window._arrErrorPart1[i]+']').removeClass('input_error');
			}else if(window._arrErrorPart1[i].substring(-1,3) === 'txt'){
			  $('#frm_inschrijving input[name='+window._arrErrorPart1[i]+']').removeClass('input_error');
			}else if(window._arrErrorPart1[i].substring(-1,3) === 'rdb'){
				$('#frm_inschrijving input[name='+window._arrErrorPart1[i]+']').closest('.cbo_group').removeClass('input_error');
			}
		}
	}
	window._arrErrorPart1.length = 0;
	$('#cr_part1 .cr_error').html('').removeClass('error success');
}
function resetFormPart2(){
	if(window._arrErrorPart2.length>0){
	   for(var i=0; i<window._arrErrorPart2.length; i++){
		   if(window._arrErrorPart2[i].substring(-1,3) === 'sel'){
			  $('#frm_inschrijving select[name='+window._arrErrorPart2[i]+']').removeClass('input_error');
			}else if(window._arrErrorPart2[i].substring(-1,3) === 'txt'){
			  $('#frm_inschrijving input[name='+window._arrErrorPart2[i]+']').removeClass('input_error');
			}else if(window._arrErrorPart2[i].substring(-1,3) === 'rdb'){
				$('#frm_inschrijving input[name='+window._arrErrorPart2[i]+']').closest('.cbo_group').removeClass('input_error');
			}
		}
	}
	window._arrErrorPart2.length = 0;
	$('#cr_part2 .cr_error').html('').removeClass('error success');
}
function resetFormPart3(){
	if(window._arrErrorPart3.length>0){
	   for(var i=0; i<window._arrErrorPart3.length; i++){
		   if(window._arrErrorPart3[i].substring(-1,3) === 'sel'){
			  $('#frm_inschrijving select[name='+window._arrErrorPart3[i]+']').removeClass('input_error');
			}else if(window._arrErrorPart3[i].substring(-1,3) === 'txt'){
			  $('#frm_inschrijving input[name='+window._arrErrorPart3[i]+']').removeClass('input_error');
			}else if(window._arrErrorPart3[i].substring(-1,3) === 'rdb'){
				$('#frm_inschrijving input[name='+window._arrErrorPart3[i]+']').closest('.cbo_group').removeClass('input_error');
			}
		}
	}
	window._arrErrorPart3.length = 0;
	$('#cr_part3 .cr_error').html('').removeClass('error success');
}
function resetFormPart4(){
	$('#cr_part4 .cbo_group').removeClass('input_error');
	$('#cr_part4 .cr_error').html('').removeClass('error');
}
function checkFormPart1(type, klant, naam, adres, pcode, city, btw, email){
	var result = true;
	console.log('checkform1:'+klant);
	if(type == ''){
		window._arrErrorPart1.push('rdb_aanvrager_type');
	   result = false;
	}
	if(klant == '' && type != 'particulier'){
		window._arrErrorPart1.push('rdb_aanvrager_klant');
	   	result = false;
	}
	if(email == '' || !checkEmail(email)){
		window._arrErrorPart1.push('txt_facturatie_email');
	   	result = false;
	}
	if(naam == ''){
		window._arrErrorPart1.push('txt_aanvrager_naam');
		result = false;
	}
	if(adres == '' && klant != 'y'){
        window._arrErrorPart1.push('txt_aanvrager_address');
        result = false;
    }
    if(pcode == '' && klant != 'y'){
        window._arrErrorPart1.push('txt_aanvrager_pcode');
        result = false;
    }
    if(city == '' && klant != 'y'){
        window._arrErrorPart1.push('txt_aanvrager_city');
        result = false;
    }
	switch(type){
		default:
		case 'particulier':
//			if(naam == ''){
//				window._arrErrorPart1.push('txt_aanvrager_naam');
//				result = false;
//			}
//			if(btw == ''){
//				window._arrErrorPart1.push('txt_aanvrager_btw');
//				result = false;
//			}
//			if(klant !== 'y'){
//				if(adres == ''){
//					window._arrErrorPart1.push('txt_aanvrager_address');
//					result = false;
//				}
//				if(pcode == ''){
//					window._arrErrorPart1.push('txt_aanvrager_pcode');
//					result = false;
//				}
//				if(city == ''){
//					window._arrErrorPart1.push('txt_aanvrager_city');
//					result = false;
//				}
//			}
		break;
		case 'bedrijf':
			
			if(btw == ''){
				window._arrErrorPart1.push('txt_aanvrager_btw');
				result = false;
			}
			//if(klant !== 'y'){
//				if(adres == ''){
//					window._arrErrorPart1.push('txt_aanvrager_address');
//					result = false;
//				}
//				if(pcode == ''){
//					window._arrErrorPart1.push('txt_aanvrager_pcode');
//					result = false;
//				}
//				if(city == ''){
//					window._arrErrorPart1.push('txt_aanvrager_city');
//					result = false;
//				}
//			}
		break;
	}
	return result;
}
function checkFormPart2(aanspreking, achternaam, voornaam, telefoon, email){
	var result = true;
	//if(factuuraanvrager == ''){
	   //	window._arrErrorPart2.push('rdb_facturatie_adresaanvrager');
	//	result = false;
	//}
	/*if(factuuremail =='' || !checkEmail(factuuremail)){
	   	window._arrErrorPart2.push('txt_facturatie_email');
		result = false;
	}*/
	if(aanspreking ==''){
	   	window._arrErrorPart2.push('rdb_contact_geslacht');
		result = false;
	}
	if(achternaam ==''){
		window._arrErrorPart2.push('txt_contact_name');
		result = false;   
	}
	if(voornaam ==''){
	   	window._arrErrorPart2.push('txt_contact_fname');
		result = false; 
	}
	if(telefoon ==''){
	   	window._arrErrorPart2.push('txt_contact_phone');
		result = false; 
	}
	if(email == '' || !checkEmail(email)){
	   	window._arrErrorPart2.push('txt_contact_email');
		result = false; 
	}
	return result;
}
function checkParticulier(){
	
	if(window._aanvragerType == 'particulier'){
		//addNewDeelnemer();
		
		$('#deelnemer_1 input[name="rdb_deelnemer_geslacht"][value="'+window._contactAanspreking+'"]').prop('checked', true);
		$('#deelnemer_1 input[name="txt_deelnemer_name"]').val(window._contactAchternaam);
		$('#deelnemer_1 input[name="txt_deelnemer_fname"]').val(window._contactVoornaam);
		$('#deelnemer_1 input[name="txt_deelnemer_email"]').val(window._contactEmail);
	}
}
function addNewDeelnemer(){
	console.log('add deelnemer'+$('#cr_list_deelnemers .deelnemer_item').length);
	var countDeelnemersAdded = parseInt($('#cr_list_deelnemers .deelnemer_item').length)+1;
	var htmlAddDeelnemernew = window._htmlAddDeelnemer.replaceAll('rdb_deelnemer_geslacht', 'rdb_deelnemer_geslacht'+countDeelnemersAdded);
	$('#cr_list_deelnemers').append('<div class="deelnemer_item input_group" id="deelnemer_'+countDeelnemersAdded+'">'+htmlAddDeelnemernew+'</div>').promise().done(function(){
		$('#deelnemer_'+countDeelnemersAdded).find('.span_aantal').html(countDeelnemersAdded);
	});
	actBtnCloseDeelnemer();
}
function checkDataDeelnemer(objDeelnemer){
	var result = 'OK';
			var id = objDeelnemer.id;
			if(objDeelnemer.aanspreking == ''){
			   	window._arrErrorDeelnemer.push([id, objDeelnemer.radio_geslacht]);
				result = 'ERROR';
			}
			if(objDeelnemer.naam == ''){
			   window._arrErrorDeelnemer.push([id, 'txt_deelnemer_name']);
				result = 'ERROR';
			}
			if(objDeelnemer.voornaam == ''){
			   window._arrErrorDeelnemer.push([id, 'txt_deelnemer_fname']);
				result = 'ERROR';
			}
			if(objDeelnemer.email == '' || !checkEmail(objDeelnemer.email)){
			   window._arrErrorDeelnemer.push([id, 'txt_deelnemer_email']);
				result = 'ERROR';
			}
			if(objDeelnemer.functie == ''){
			   window._arrErrorDeelnemer.push([id, 'txt_deelnemer_functie']);
				result = 'ERROR';
			}
	return result;
}
function resetCheckDataDeelnemer(){
	if(window._arrErrorDeelnemer.length>0){
	   for(var i=0; i<window._arrErrorDeelnemer.length; i++){
		   if(window._arrErrorDeelnemer[i][1].substring(-1, 3)==='sel'){
			  $('#'+window._arrErrorDeelnemer[i][0]+' select[name='+window._arrErrorDeelnemer[i][1]+']').removeClass('input_error');
			}else if(window._arrErrorDeelnemer[i][1].substring(-1, 3)==='txt'){
			  $('#'+window._arrErrorDeelnemer[i][0]+' input[name='+window._arrErrorDeelnemer[i][1]+']').removeClass('input_error');
			}else if(window._arrErrorDeelnemer[i][1].substring(-1, 3)==='rdb'){
				 $('#'+window._arrErrorDeelnemer[i][0]+' input[name='+window._arrErrorDeelnemer[i][1]+']').closest('.cbo_group').removeClass('input_error');
			}
		}
	}
	window._arrErrorDeelnemer.length = 0;
	if($('#canvasSimpleDiv')){
	   $('#canvasSimpleDiv').removeClass('input_error');
	}
}
function actBtnCloseDeelnemer(){
	$('.btn_close').off().one('click', function(){
		$(this).parent().remove();
	});
}
function actBtnAddDeelnemer(){
	
	var addTimeout = setTimeout(function(){
		$('.btn_add_deelnemer').one('click', function(){
			if($('#cr_list_deelnemers .deelnemer').length < 10){
			   	window._countAddedDeelnemer++;
				var strInputDeelnemer = $('#cr_cv_form .cntnt_form #deelnemer_1').html().replace(/input_error/g, "");
				var countDeelnemersAdded = window._countAddedDeelnemer;
				//remove all close buttons deelnemer
				//jQuery('#frm_'+window._actFormid+' .cntnt_form .btn_close_deelnemer').remove();
				strInputDeelnemer = '<div class="deelnemer input_group" id="deelnemer_'+countDeelnemersAdded+'">'+strInputDeelnemer+'</div>';
				$('#cr_cv_form .cntnt_form .cr_deelnemers_list').append(strInputDeelnemer);
				$('#cr_cv_form .cntnt_form #deelnemer_'+countDeelnemersAdded+' .span_aantal').html(countDeelnemersAdded);
				actBtnAddDeelnemer();
				actBtnCloseDeelnemer();
			}
			
		});
	}.bind(this),1000);
	
}
function checkEmail(value){
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(value))	{
		return true;	
	}
}

function initFrmInschrijving(part){
	switch(part){
		case 1:
			$('#cr_inschrijving_left .ttl').html('Aanvraag');
		break;
		case 2:
			$('#cr_inschrijving_left .ttl').html('Contactpersoon');
		break;
		case 3:
			$('#cr_inschrijving_left .ttl').html('Deelnemer');
		break;
		case 4:
			$('#cr_inschrijving_left .ttl').html('Bevestiging');
		break;
	}
	
	switchFormPart(part);
	switch(part){
		case 1:
			handleFrmPart1();
		break;
		case 2:
			handleFrmPart2();
		break;
		case 3:
			handleFrmPart3();
		break;
		case 4:
			handleFrmPart4();
		break;
	}
}
function handleFrmPart1(){
	$('#frm_inschrijving #cr_part1 button[name="btn_cancel"]').off().on('click',function(){
		window.location.href = "/"+window._pageLang+"/opleidingen.html";
	});
	$('#frm_inschrijving input[name="rdb_aanvrager_klant"]').off().on('change',function(){
		var rdb_klant_value = $(this).val();
		console.log(rdb_klant_value);
		if(rdb_klant_value == 'y'){
			$('#frm_inschrijving input[name="txt_aanvrager_address"]').parent().hide();
			$('#frm_inschrijving input[name="txt_aanvrager_pcode"]').parent().hide();
			$('#frm_inschrijving input[name="txt_aanvrager_city"]').parent().hide();
		}else{
			$('#frm_inschrijving input[name="txt_aanvrager_address"]').parent().show();
			$('#frm_inschrijving input[name="txt_aanvrager_pcode"]').parent().show();
			$('#frm_inschrijving input[name="txt_aanvrager_city"]').parent().show();
		}
	});
	$('#frm_inschrijving input[name="rdb_aanvrager_type"]').off().on('change',function(){
		var rdbvalue = $('#frm_inschrijving input[name="rdb_aanvrager_type"]:checked').val();
		if(rdbvalue == 'particulier'){
		   $('#frm_inschrijving div[data-type="klant"]').hide();
		   //$('#frm_inschrijving div[data-type="gegevens"]').hide();
		}else{
			$('#frm_inschrijving div[data-type="klant"]').show();
		   //$('#frm_inschrijving div[data-type="gegevens"]').show();
		}
	});
	$('#frm_inschrijving #cr_part1 button[name="btn_1"]').off().on('click',function(){
		if( window._statePart1 != 'processing'){
		   	window._statePart1 = 'processing';
			resetFormPart1();
			if($('#frm_inschrijving input[name="rdb_aanvrager_type"]').is(':checked')) { 
				window._aanvragerType = $('#frm_inschrijving input[name="rdb_aanvrager_type"]:checked').val();
			}else{
				window._aanvragerType = '';
			}
			//window._aanvragerType = $('#frm_inschrijving input[name="rdb_aanvrager_type"]').val();
			if($('#frm_inschrijving input[name="rdb_aanvrager_klant"]').is(':checked')) { 
				window._aanvragerKlant = $('#frm_inschrijving input[name="rdb_aanvrager_klant"]:checked').val();
			}else{
				window._aanvragerKlant = '';
			}
			
			window._aanvragerBedrijf = $.trim($('#frm_inschrijving input[name="txt_aanvrager_naam"]').val());
			window._aanvragerBedrijfAdres = $.trim($('#frm_inschrijving input[name="txt_aanvrager_address"]').val());
			window._aanvragerBedrijfPcode = $.trim($('#frm_inschrijving input[name="txt_aanvrager_pcode"]').val());
			window._aanvragerBedrijfCity = $.trim($('#frm_inschrijving input[name="txt_aanvrager_city"]').val());
			window._aanvragerBedrijfBTW = $.trim($('#frm_inschrijving input[name="txt_aanvrager_btw"]').val());
			window._factuurEmail = $.trim($('#frm_inschrijving input[name="txt_facturatie_email"]').val());
			window._factuurReferentie = $.trim($('#frm_inschrijving input[name="txt_facturatie_referentie"]').val());
			
			var checkPart1 = checkFormPart1(window._aanvragerType, window._aanvragerKlant, window._aanvragerBedrijf, window._aanvragerBedrijfAdres, window._aanvragerBedrijfPcode, window._aanvragerBedrijfCity, window._aanvragerBedrijfBTW, window._factuurEmail);
			if(checkPart1){
				initFrmInschrijving(2);
				window._statePart1 = '';
			}else{
				//if(window._aanvragerType == ''){
					//$('#cr_part1 div[data-type="type"] .cr_error').html('Gelieve een keuze te maken aub.').addClass('error');
				//}
				//if(window._aanvragerKlant == ''){
					//$('#cr_part1 div[data-type="klant"] .cr_error').html('Gelieve een keuze te maken aub.').addClass('error');
				//}
				
					//$('#cr_part1 div[data-type="gegevens"] .cr_error').html('Gelieve alle gegevens correct in te vullen aub.').addClass('error');
				
			   	for(var t=0; t<window._arrErrorPart1.length; t++){
					if(window._arrErrorPart1[t].substring(-1, 3)==='sel'){
						$('#frm_inschrijving select[name='+window._arrErrorPart1[t]+']').addClass('input_error');
					}else if(window._arrErrorPart1[t].substring(-1, 3)==='txt'){
						$('#frm_inschrijving input[name='+window._arrErrorPart1[t]+']').addClass('input_error');
					}else if(window._arrErrorPart1[t].substring(-1, 3)==='rdb'){
						$('#frm_inschrijving input[name='+window._arrErrorPart1[t]+']').closest('.cbo_group').addClass('input_error');
					}
				}
				window._statePart1 = '';
			}
		}
		
	});
}
function handleFrmPart2(){
	$('#frm_inschrijving #cr_part2 button[name="btn_cancel"]').off().on('click',function(){
		resetFormPart2();
		initFrmInschrijving(1);
	});
	$('#frm_inschrijving #cr_part2 button[name="btn_2"]').off().on('click',function(){
		if( window._statePart2 != 'processing'){
		   	window._statePart2 = 'processing';
			resetFormPart2();
			//if($('#frm_inschrijving input[name="rdb_facturatie_adresaanvrager"]').is(':checked')) { 
				//window._factuurAanvrager = $('#frm_inschrijving input[name="rdb_facturatie_adresaanvrager"]:checked').val();
			//}else{
				//window._factuurAanvrager = '';
			//}
			//window._aanvragerType = $('#frm_inschrijving input[name="rdb_aanvrager_type"]').val();
			if($('#frm_inschrijving input[name="rdb_contact_geslacht"]').is(':checked')) { 
				window._contactAanspreking = $('#frm_inschrijving input[name="rdb_contact_geslacht"]:checked').val();
			}else{
				window._contactAanspreking = '';
			}
			
			/*window._factuurEmail = $.trim($('#frm_inschrijving input[name="txt_facturatie_email"]').val());
			window._factuurReferentie = $.trim($('#frm_inschrijving input[name="txt_facturatie_referentie"]').val());*/
			window._contactAchternaam = $.trim($('#frm_inschrijving input[name="txt_contact_name"]').val());
			window._contactVoornaam = $.trim($('#frm_inschrijving input[name="txt_contact_fname"]').val());
			window._contactTelefoon = $.trim($('#frm_inschrijving input[name="txt_contact_phone"]').val());
			window._contactEmail = $.trim($('#frm_inschrijving input[name="txt_contact_email"]').val());
			
			var checkPart2 = checkFormPart2(window._contactAanspreking, window._contactAchternaam, window._contactVoornaam, window._contactTelefoon, window._contactEmail);
			
			if(checkPart2){
				initFrmInschrijving(3);
				window._statePart2 = '';
			}else{
				//if(window._factuurAanvrager == ''){
					//$('#cr_part2 div[data-type="facturatie"] .cr_error').html('Is het facturatieadres hetzelfde als dat van de aanvrager?').addClass('error');
				//}
				
				//$('#cr_part2 div[data-type="contact"] .cr_error').html('Gelieve alle gegevens corret in te vullen aub.').addClass('error');
			   	for(var t=0; t<window._arrErrorPart2.length; t++){
					if(window._arrErrorPart2[t].substring(-1, 3)==='sel'){
						$('#frm_inschrijving select[name='+window._arrErrorPart2[t]+']').addClass('input_error');
					}else if(window._arrErrorPart2[t].substring(-1, 3)==='txt'){
						$('#frm_inschrijving input[name='+window._arrErrorPart2[t]+']').addClass('input_error');
					}else if(window._arrErrorPart2[t].substring(-1, 3)==='rdb'){
						$('#frm_inschrijving input[name='+window._arrErrorPart2[t]+']').closest('.cbo_group').addClass('input_error');
					}	
				}
				window._statePart2 = '';
			}
		}
		
	});
}
function handleFrmPart3(){
	$('#frm_inschrijving #cr_part3 button[name="btn_cancel"]').off().on('click',function(){
		resetFormPart3();
		initFrmInschrijving(2);
	});
	window._htmlAddDeelnemer = $('#frm_inschrijving #cr_part3 .deelnemer:first-child').html();
	$('#frm_inschrijving button[name="btn_add"]').off().on('click',function(){
		addNewDeelnemer();
	});
	checkParticulier();
	$('#frm_inschrijving #cr_part3 button[name="btn_3"]').off().on('click',function(){
		if( window._statePart3 != 'processing'){
		   	window._statePart3 = 'processing';
			resetFormPart3();
			resetCheckDataDeelnemer();
			var counterDeelnemers = 0;
			//var arrDeelnemers = [];
			window._arrAddedDeelnemers.length = 0;
			var objDeelnemer = {aanspreking:'',naam:'',voornaam:'',rijksregisternummer:'',email:''}
			var deelnemer_aanspreking, deelnemer_naam, deelnemer_voornaam, deelnemer_rijksregisternummer, deelnemer_email, deelnemer_id, deelnemer_check, deelnemer_radio;
			$('#cr_list_deelnemers .deelnemer').each(function(index, element){
				deelnemer_id = $(this).attr('id');
				deelnemer_radio = $('#'+deelnemer_id+' input[type="radio"]:first-child').attr('name');
				
				if($('#'+deelnemer_id+' input[name="'+deelnemer_radio+'"]').is(':checked')) { 
					deelnemer_aanspreking = $('#'+deelnemer_id+' input[name="'+deelnemer_radio+'"]:checked').val();
				}else{
					deelnemer_aanspreking = '';
				}
				deelnemer_naam = $.trim($('#'+deelnemer_id+' input[name=txt_deelnemer_name]').val());
				deelnemer_voornaam = $.trim($('#'+deelnemer_id+' input[name=txt_deelnemer_fname]').val());
				deelnemer_email = $.trim($('#'+deelnemer_id+' input[name=txt_deelnemer_email]').val());
				deelnemer_rijksregisternummer = $.trim($('#'+deelnemer_id+' input[name=txt_deelnemer_rijksregister]').val()).replace(/\D/g,'');
				
				objDeelnemer.naam = deelnemer_naam;
				objDeelnemer.id = deelnemer_id;
				objDeelnemer.voornaam = deelnemer_voornaam;
				objDeelnemer.email = deelnemer_email;
				objDeelnemer.rijksregisternummer = deelnemer_rijksregisternummer;
				objDeelnemer.aanspreking = deelnemer_aanspreking;
				objDeelnemer.radio_geslacht = deelnemer_radio;
				if(checkDataDeelnemer(objDeelnemer) == 'OK'){
					window._arrAddedDeelnemers[counterDeelnemers] = {
						naam: deelnemer_naam,
						voornaam: deelnemer_voornaam,
						email: deelnemer_email,
						aanspreking:deelnemer_aanspreking,
						rijksregisternummer:deelnemer_rijksregisternummer
					};
					deelnemer_check = 'OK';
				}else{
					deelnemer_check = 'ERROR';
				}
				counterDeelnemers ++;
			});
			if(window._arrErrorDeelnemer.length <= 0){
				initFrmInschrijving(4);
				window._statePart3 = '';
			}else{
				console.log(window._arrErrorDeelnemer);
			   	//if(deelnemer_check != 'OK'){
						for(var i=0; i<window._arrErrorDeelnemer.length; i++){
							if(window._arrErrorDeelnemer[i][1].substring(-1, 3)==='sel'){
							  $('#'+window._arrErrorDeelnemer[i][0]+' select[name='+window._arrErrorDeelnemer[i][1]+']').addClass('input_error');
							}else if(window._arrErrorDeelnemer[i][1].substring(-1, 3)==='txt'){
								$('#'+window._arrErrorDeelnemer[i][0]+' input[name='+window._arrErrorDeelnemer[i][1]+']').addClass('input_error');
							}else if(window._arrErrorDeelnemer[i][1].substring(-1, 3)==='rdb'){
								$('#'+window._arrErrorDeelnemer[i][0]+' input[name='+window._arrErrorDeelnemer[i][1]+']').closest('.cbo_group').addClass('input_error');
							}
							
						}
					}
				window._statePart3 = '';
			//}
		}
		
	});
}