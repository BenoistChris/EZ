		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		// ----------------------------------------------------------
	
		jQuery('head').append('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">');
		
		var pathname = window.location.pathname;
		
		var html = '<div class="toolbox"><div class="toolbox-list-countries"><ul></ul><p class="eco" style="text-align: right;font-size: 13px;"><a id="eco-on"><i class="fa-solid fa-eye" style="margin-right:3px;"></i>non-eco</a><a id="eco-off"><i class="fa-solid fa-eye-slash" style="margin-right:3px;"></i>non-eco</a></p><p><a id="open-countries"><i class="fa-solid fa-up-right-from-square"></i>Ouvrir</a></p><hr class="mt-2" /><p><a id="edit"><i class="fa-solid fa-pen-to-square"></i>Modifier la page</a></p><p><a id="switch-admin"><i class="fa-solid fa-up-right-from-square"></i>Switch staging</a></p><p><a id="cachinator" target="_blank"><i class="fa-solid fa-rotate"></i>Cachinator</a></p><hr class="mt-2" /><p class="idmmm-on"><a id="idmmm-on"><i class="fa-solid fa-toggle-off"></i>Codes Y / ID MMM</a></p><p class="idmmm-off"><a id="idmmm-off"><i class="fa-solid fa-toggle-on"></i>Codes Y / ID MMM</a></p><p class="imageSize-on"><a id="imageSize-on"><i class="fa-solid fa-toggle-off"></i>Tailles images</a></p><p class="imageSize-off"><a id="imageSize-off"><i class="fa-solid fa-toggle-on"></i>Tailles images</a></p><p class="geoloc-on"><a id="geoloc-on"><i class="fa-solid fa-toggle-off"></i>Masque popin géoloc</a></p><p class="geoloc-off"><a id="geoloc-off"><i class="fa-solid fa-toggle-on"></i>Masque popin géoloc</a></p><p class="d-none static-key-off"><a id="link-static-key"><i class="fa-solid fa-toggle-off"></i>Clés statiques</a></p><p class="d-none static-key-on"><a id="link-static-key-off"><i class="fa-solid fa-toggle-on"></i>Clés statiques</a></p><p class="text-check-on" style="display: none !important;"><a id="text-check-on"><i class="fa-solid fa-toggle-off"></i>Vérif texte UK</a></p><p class="text-check-off" style="display: none !important;"><a id="text-check-off"><i class="fa-solid fa-toggle-on"></i>Vérif texte UK</a></p><hr class="mt-2" /><p><a href="https://onedior.atlassian.net/wiki/spaces/PCDW/overview" target="_blank"><i class="fa-brands fa-confluence"></i>Tutoriaux Confluence</a></p><p><a href="https://dior-parfums.cloud.akeneo.com/user/login" target="_blank"><i class="fa-solid fa-database"></i>PIM</a></p><p><a href="https://production-eu01-dior.demandware.net/on/demandware.store/Sites-Site/default/" target="_blank"><i class="fa-brands fa-salesforce"></i>SFCC Staging</a></p><p><a href="https://staging-eu01-dior.demandware.net/on/demandware.store/Sites-Site/default/ViewApplication-DisplayWelcomePage" target="_blank"><i class="fa-brands fa-salesforce"></i>SFCC Production</a></p><p><a href="https://wwws.dior.com/couture/admin/horizon" target="_blank"><i class="fa-solid fa-file"></i>eZ Publish</a></p><p><a href="https://onedior.atlassian.net/servicedesk/customer/portal/8" target="_blank"><i class="fa-solid fa-bug"></i>Ticket Support</a></p><p><a href="https://onedior.atlassian.net/servicedesk/customer/portal/10" target="_blank"><i class="fa-solid fa-lightbulb"></i>Ticket Evolution</a></p><p><a href="https://onedior.atlassian.net/jira/your-work" target="_blank"><i class="fa-brands fa-jira"></i>Accueil Jira</a></p><p><a href="https://crowdin.com/translate/dior-front-newlook/431/en-fr" target="_blank"><i class="fa-solid fa-language"></i>Crowdin</a></p><p><a href="https://digital.diorgallery.com/" target="_blank"><i class="fa-solid fa-image"></i>Dior Gallery</a></p><p><a href="https://pcsgui.dior.com/monitoring-contribution" target="_blank"><i class="fa-solid fa-magnifying-glass"></i>Testeur produit</a></p></div><div class="toolbox-close"><i class="fa-solid fa-xmark"></i></div></div>';
			
		var html = html + '<div class="toolbox-btn"><i class="fa-solid fa-angle-right"></i></div>';
		
		
		jQuery('body').prepend(html);
		
		if (window.location.href.indexOf('wwws.dior')>-1 || window.location.href.indexOf('cachinator')>-1) jQuery('.toolbox').append('<style>.toolbox, .toolbox-btn, .span-imageSize {display: none !important; opacity: 0 !important; visibility: hidden !important;}</style>');
		
		jQuery('.toolbox-btn').mouseover(function(){			
		   loadListCountries();
	       fnDisplayIdmmm();
		   jQuery('.toolbox').addClass('toolbox-open');
		   jQuery('.toolbox-btn').fadeOut('fast');
		});
		
		//Detecte si on change d'url - Start
		
		let lastUrl = location.href; 
		new MutationObserver(() => {
		  const url = location.href;
		  if (url !== lastUrl) {
		    lastUrl = url;
		    onUrlChange();
		  }
		}).observe(document, {subtree: true, childList: true});
 
 
		function onUrlChange() {
		  jQuery('.toolbox-close').trigger('click');
			pathname = window.location.pathname;
		}
		
		//Detecte si on change d'url - End
		
		
		//Bouton fermé - Start
		jQuery('.toolbox').on('click', '.toolbox-close', function() {
		   jQuery('.toolbox').removeClass('toolbox-open');
		   jQuery('.toolbox-btn').fadeIn('fast');
		});
		//Bouton fermé - End
		
		
		jQuery('.toolbox-list-countries').on('click', 'input', function() {
		   if(jQuery('.toolbox-list-countries input').is(":checked")) {
			    jQuery('#open-countries').show();
		   } else {
		      jQuery('#open-countries').hide();
		   }
		});
		
		
		//Switch admin/prod - Start		
		if (pathname.indexOf('_admin')>0) jQuery('#switch-admin').html('<i class="fa-solid fa-up-right-from-square"></i>Switch prod');

		jQuery('.toolbox').on('click', '#switch-admin', function() {
			if (pathname.indexOf('_admin')>0) {
				window.open(
				   pathname.replace("_admin", ""),
				  '_blank'
				);
			} else {
				var parts = window.location.href.split("/");
				parts[3] += "_admin";
				var newStr = parts.join("/");
				window.open(
				   newStr,
				  '_blank'
				);
			}
		});
		//Switch admin/prod - End

		
		//Modifier la page - Start
		jQuery('body').on('click', '#edit', function() {
			let urlStart = String(pathname.match(/^(?:[^/]*\/){1}([^/]*)/g)); 
			let urlClean = pathname.replace(urlStart, "");
			let eZurl = '';
			if (pathname.indexOf('/products/')>0) {
				
				let codey = '';
				
				codey = jQuery('.top-content-desktop-sticky ul li.product-medias-grid-image:nth-of-type(1) .span-code-y').text();
				
				if (codey.length<1) {
					let codey = pathname.match(/(?<=beauty-)(.*)/g);
					if (codey.indexOf('-')>0) codey = String(codey).match(/.+?(?=-)/);
				}
				
				let url = "https://h-world.fr/dior/eZ-url-get.php?y=" + codey;
				
				$.ajax({
					method: "GET",
					url: url,
			        success:function(data)
			        {
						if(data.length>1) {
			           		 eZurl = 'https://wwws.dior.com/' + data.replace(/(\r\n|\n|\r)/gm, "");
						} else {
			           		 eZurl = 'https://wwws.dior.com/couture/admin/horizon/products/fp-pcd';
						}
						window.open(
							   eZurl,
							  '_blank'
						);
			        } 
				});

				
			} else {
				eZurl = 'https://wwws.dior.com/couture/admin/horizon' + urlClean;
				window.open(
					   eZurl,
					  '_blank'
				);
			}
		});
		//Modifier la page - end
		
		
		//IDMMM / Codes Y - Start
		
		setTimeout(fnIdmmm, 3000);
		setTimeout(fnIdmmm, 5000);
		jQuery( window ).scroll(function() {
			fnIdmmm();
		});
		
		jQuery('div').on('click', '.product-video-video', function() {
			setTimeout(fnIdmmm, 1000);
		});
		
		function fnIdmmm( )
		{
			jQuery('.span-idmmm, .span-y').remove();
			
			jQuery('video').each(function() {
				jQuery(this).after('<div class="span-idmmm"><i class="fa-solid fa-pen-to-square"></i><span class="span-idmmm-code"></span></div>');
				jQuery(this).next('.span-idmmm').find('.span-idmmm-code').html(jQuery(this).attr('widemotionresource'));
				fnDisplayIdmmm();
			});
			
			
			jQuery('img').each(function(){
				let src = jQuery(this).attr('src');
				if (typeof src !== 'undefined' && src !== false) {
					if(src.includes('_E0')) jQuery(this).after('<div class="span-y"></div>');
					code = '';
				    if(jQuery(this).attr('src').includes('_E01_')) {
						code = String(jQuery(this).attr('src').match(/(?<=assets)(.*)(?=_E01_)/g));
					} else if (jQuery(this).attr('src').includes('_E02_')) {
						code = String(jQuery(this).attr('src').match(/(?<=assets)(.*)(?=_E02_)/g));
					} else if (jQuery(this).attr('src').includes('_E03_')) {
						code = String(jQuery(this).attr('src').match(/(?<=assets)(.*)(?=_E03_)/g));
					} else if (jQuery(this).attr('src').includes('_E04_')) {
						code = String(jQuery(this).attr('src').match(/(?<=assets)(.*)(?=_E04_)/g));
					} else if (jQuery(this).attr('src').includes('_E05_')) {
						code = String(jQuery(this).attr('src').match(/(?<=assets)(.*)(?=_E05_)/g));
					} 
									
					let sku = code.toString().split('_')[1];
					if (sku) { sku = '<span class="span-sku">' + sku + '</span>'; } else { sku = ''; }
			
				    let codeY = '<span class="span-code-y">' + code.toString().split('/')[1] + '</span>';
				    if(jQuery(this).attr('src').includes('_E0')) jQuery(this).next('.span-y').html(codeY + sku);   
				}
 
				fnDisplayIdmmm();
			});
		}
		
		function fnDisplayIdmmm() {
			if(getCookie('idmmm')=='true') {
				jQuery('.span-idmmm, .span-y').addClass('d-none');
				jQuery('.idmmm-off').addClass('d-none');
				jQuery('.idmmm-on').removeClass('d-none');
			} else {
				jQuery('.span-idmmm, .span-y').removeClass('d-none');
				jQuery('.idmmm-off').removeClass('d-none');
				jQuery('.idmmm-on').addClass('d-none');
			}
		}
		
		jQuery('.toolbox').on('click', '#idmmm-on', function() {
			setCookie('idmmm','false');
			fnDisplayIdmmm();
		});
		
		jQuery('.toolbox').on('click', '#idmmm-off', function() {
			setCookie('idmmm','true');
			fnDisplayIdmmm();
		});
		//IDMMM / Codes Y - End
		
		
		//Masque la popin de géoloc - Start
		if(getCookie('geoloc')=='true') {
		   jQuery('.geolocation-actions > button:nth-of-type(1)').trigger('click');
		   jQuery('.geoloc-on').hide();
		} else {
		   jQuery('.geoloc-off').hide();
		}
		
		jQuery('.toolbox').on('click', '#geoloc-on', function() {
		   setCookie('geoloc','true');
		   jQuery('.geolocation-actions > button:nth-of-type(1)').trigger('click');
		   jQuery('.geoloc-off').show();
		   jQuery('.geoloc-on').hide();
		});
		
		jQuery('.toolbox').on('click', '#geoloc-off', function() {
			setCookie('geoloc','false');
		   jQuery('.geoloc-on').show();
		   jQuery('.geoloc-off').hide();
		});
		//Masque la popin de géoloc - End
		
		
		//Clé statique - Start
		if (window.location.href.includes("debugWording=true")) {
			jQuery('.static-key-on').removeClass('d-none');	
		} else {
			jQuery('.static-key-off').removeClass('d-none');
		}
		
		jQuery('.toolbox').on('click', '#link-static-key', function() {
			document.location.href = window.location.href + '?debugWording=true'; 
		});
		
		jQuery('.toolbox').on('click', '#link-static-key-off', function() {
			document.location.href = window.location.href.replace('?debugWording=true', ''); 
		});
		//Clé statique - End
		
	
		jQuery('.toolbox').on('click', '#showy', function() {
		  setInterval(function(){ 
		    jQuery('a.product-light, a.product-link, .slide-content a').each(function() { 
		      if ($(this).find('.divy').length<1) $(this).prepend('<div class="divy"></div>');
		       $(this).find('.divy').html('Y' + $(this).attr('href').toUpperCase().match(/(?<=-Y).+?-/g)[0].slice(0, -1)); 
		    });
		  }, 1000);
		});
		
		
		jQuery('.toolbox').on('click', '#open-countries', function() {
			jQuery('.toolbox-list-countries li').each(function() {
			if(jQuery(this).find('input').is(":checked")) {
				window.open(
				   jQuery(this).find('a').attr('href'),
				  '_blank'
				);
			}
			});
		});
		
		
		//Chargement de la liste des pays - Start
		function loadListCountries() {
		   jQuery('.toolbox-list-countries ul').html('');
		   jQuery('#select-region-field-options li').each(function() {
			   if(jQuery(this).find('a').attr('href').length>0) {
			   var marche = jQuery(this).find('.footer-link__title').text().replace("(EUR€)", "").replace("(UK£)", "").replace("(US$)", "").replace("(DHS)", "").replace("日本 (JPY¥)","Japan").replace("한국 (KRW₩)","Korea").replace("中国大陆 (CNY¥)","China").replace("香港特別行政區","Hong Kong - CN").replace("臺灣地區","Taiwan").replace("Hong Kong - CN / Hong Kong SAR","Hong-Kong CN").replace("(CHF)","").replace("(CAD$)","").replace("(AUD$)","");
			
			let ecomm = 'data-ecomm="true"';
			marche = marche.trim();
				   
			if(marche !== 'Belgique' && marche !== 'België' && marche !== 'France' && marche !== 'Deutschland' && marche !== 'España' && marche !== 'Italia' && marche !== 'Switzerland' && marche !== 'United Kingdom' && marche !== 'United States' && marche !== 'China' && marche !== 'Taiwan' && marche !== 'Japan' && marche !== 'Nederland') {
				ecomm = 'data-ecomm="false"';
			}
				   
			jQuery('.toolbox-list-countries ul').append('<li ' + ecomm + '><input type="checkbox" name="pays" /> <a href="' + jQuery(this).find('a').attr('href') + '?noredirect=ok" target="_blank">' + marche + '</a></li>');
			   } else {
				   
				let ecomm = 'data-ecomm="false"';
				marche = jQuery(this).find('.footer-link__title').text().trim();
					   
				if(marche !== 'International' && marche !== 'South America' && marche !== 'Middle East') {
					ecomm = 'data-ecomm="true"';
				}
				   
			   	 jQuery('.toolbox-list-countries ul').append('<li class="pays" '+ecomm+'>'+marche+'</li>');
			   }
		   });
			
			if(pathname.indexOf('_admin')>0) $('.toolbox-list-countries ul, .eco').hide();
		}
		//Chargement de la liste des pays - End
		
		
		//Cookies - Start
		function setCookie(name,value) {
	        var date = new Date();
	        date.setTime(date.getTime() + (999*24*60*60*1000));
	        expires = "; expires=" + date.toUTCString();
		    
		    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
		}
		function getCookie(name) {
		    var nameEQ = name + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0;i < ca.length;i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') c = c.substring(1,c.length);
		        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		    }
		    return null;
		}
		//Cookies - End
		
		
		//Copier texte - Start
		jQuery('div').on('click', '.span-sku, .span-code-y, .span-idmmm .span-idmmm-code',  function( event ) {
			 event.stopPropagation();
			 event.preventDefault();
		     copy($(this));
			 jQuery('.text-copy').remove();
			 jQuery('body').append('<div class="text-copy"></div>');
			 setTimeout(function(){jQuery('.text-copy').fadeOut()}, 2000);
		});
		function copy(element) {
	        var $temp = jQuery("<input>");
	        $("body").append($temp);
	        $temp.val($(element).text()).select();
	        document.execCommand("copy");
	        $temp.remove();
			
		}
		//Copier texte - End
		
		
		//Green cookie - Start
		if(jQuery('h1[class^="Unauthorized_title"]').length) {
			jQuery('body').prepend('<center><h2><br>Installation du "Green Cookie" en cours<br>Veuillez patienter...</h2></center>');
			jQuery('body').append('<iframe class="d-none" src="https://sid.one.dior.com"></iframe><iframe class="d-none" src="https://sid.one.dior.cn"></iframe>');
			setTimeout(function(){location.reload();}, 1000);
		}
		//Green cookie - End
		
		//Ajout url produit - Start
		
		if (pathname.indexOf('/horizon/products/fp-pcd')>0 && pathname.toLowerCase().indexOf('/y')>0) {
			let extract = String(pathname.match(/[^\/]+$/g));
			let url = "https://h-world.fr/dior/eZ-url-add.php?url=" + pathname;
			if(String(extract.substring(0,4).match(/^([A-z][0-9]+)$/g))!='null') {
				$.ajax({
				  method: "GET",
				  url: url
				});
			}
		}
		
		//Ajout url produit - End
		
		//Ajout IDMMM - Start
		
		if (pathname.indexOf('/folder-media/folder-videos/')>0) {
			let url = "https://h-world.fr/dior/eZ-url-add.php?url=" + pathname;
				$.ajax({
				  method: "GET",
				  url: url
				});
		}
		
		//Ajout IDMMM - End
		
		
		//Copy/Past translations - Start
		
		$('#ezcoeditlanguages-newts p, .context-attributes .button-left:nth-of-type(1) #ezcoeditlanguages-sourcets p').after('<div style="padding-bottom:5px" id="copySelection"><i class="fa-regular fa-copy"></i></i> Copy selection</div><div style="padding-bottom:5px" id="pastSelection"><i class="fa-regular fa-paste"></i> Past selection</div>');
		
		$('#copySelection').on('click', function() {
			let langSelection = '';
			$('.context-attributes .button-left:nth-of-type(1) #ezcoeditlanguages-sourcets input, .context-attributes .button-left:nth-of-type(1) #ezcoeditlanguages-newts input').each(function() {
				if($(this).is(":checked")) langSelection = langSelection + $(this).val() + '|';
			    jQuery('.selection-copy').remove();
			    jQuery('body').append('<div class="selection-copy"></div>');
			    setTimeout(function(){jQuery('.selection-copy').fadeOut()}, 2000);
			});
		
			setCookie('langSelection',langSelection);
		});
		
		$('#pastSelection').on('click', function() {
			let cookie = getCookie('langSelection');
			const lang = cookie.split("|");
			$('.context-attributes .button-left:nth-of-type(1) #ezcoeditlanguages-sourcets input, .context-attributes .button-left:nth-of-type(1) #ezcoeditlanguages-newts input').prop( "checked", false );
			for (var i = 0; i < lang.length; i++) {
				$('.context-attributes .button-left:nth-of-type(1) #ezcoeditlanguages-sourcets input[value="'+lang[i]+'"], .context-attributes .button-left:nth-of-type(1) #ezcoeditlanguages-newts input[value="'+lang[i]+'"]').prop( "checked", true );
			}
		});
		
		//Copy/Past translations - End
		
		
		//Check if personalized or customized on UK - Start		
		
		if(getCookie('text-check')=='true') {
		   checkText();
		   jQuery('.text-check-on').hide();
		} else {
		   jQuery('.text-check-off').hide();
		}
		
		jQuery('.toolbox').on('click', '#text-check-on', function() {
		   setCookie('text-check','true');
		   checkText();
		   jQuery('.text-check-off').show();
		   jQuery('.text-check-on').hide();
		});
		
		jQuery('.toolbox').on('click', '#text-check-off', function() {
		   setCookie('text-check','false');
		   jQuery('.text-check-on').show();
		   jQuery('.text-check-off').hide();
		});
		
		function checkText() {
			if (window.location.href.indexOf('/en_gb')>-1) {
					let verif = 'false';
				$('body .page-content p, body .page-content div, body .page-content span, body .page-content ul, body .page-content li').each(function() {
					if($(this).text().toLowerCase().indexOf('ized')>-1 || $(this).text().toLowerCase().indexOf('ization')>-1 || $(this).text().toLowerCase().indexOf('sport')>-1) {
						verif = 'true';
						//alert('Merci de vérifier l\'orthographe de ce texte pour le UK : ' + $(this).text());
					}
				});
					if (verif == 'true') alert('Merci de vérifier l\'orthographe du texte pour le UK (personalized ou customized...).');
			}
		}
		
		//Check if personalized or customized on UK - End
		
		
		//IDMMM / Codes Y - Start
		
		setTimeout(imageSize, 3000);
		setTimeout(imageSize, 5000);
		jQuery( window ).scroll(function() {
			imageSize();
		});
		
		function imageSize( )
		{
			jQuery('.span-imageSize').remove();
			
			jQuery('img').each(function(){
				let src = jQuery(this).attr('src');
				if (typeof src !== 'undefined' && src !== false && jQuery(this).width() > 50) {
				    jQuery(this).after('<div class="span-imageSize">' + jQuery(this).width() + ' x ' + jQuery(this).height() + 'px<br>(Img orig.: ' + jQuery(this).prop('naturalWidth') + ' x ' + jQuery(this).prop('naturalHeight') + 'px)</div>');
				}
 
				fnDisplayImageSize();
			});
		}
		
		function fnDisplayImageSize() {
			if(getCookie('imageSize')=='true') {
				jQuery('.span-imageSize').addClass('d-none');
				jQuery('.imageSize-off').addClass('d-none');
				jQuery('.imageSize-on').removeClass('d-none');
			} else {
				jQuery('.span-imageSize').removeClass('d-none');
				jQuery('.imageSize-off').removeClass('d-none');
				jQuery('.imageSize-on').addClass('d-none');
			}
		}
		
		jQuery('.toolbox').on('click', '#imageSize-on', function() {
			setCookie('imageSize','false');
			fnDisplayImageSize();
		});
		
		jQuery('.toolbox').on('click', '#imageSize-off', function() {
			setCookie('imageSize','true');
			fnDisplayImageSize();
		});
		//IDMMM / Codes Y - End
		
		
		//Cachinator - Start
		
		$('#cachinator').attr('href', 'https://cachinator.one.dior.com/?cachinatorUrl=' + window.location.href);
		
		var url = new URL(window.location.href);
		var cachinatorUrl = url.searchParams.get("cachinatorUrl");
		
		if (window.location.href.indexOf('cachinator')>-1 && cachinatorUrl.length>-1) {
			setCookie('cachinatorUrl',cachinatorUrl);
			$('body').append('<div id="url" class="d-none">' + cachinatorUrl + '</div>');
			copy($('#url'));
			$('.ant-form.ant-form-horizontal.login-form').submit();
		}
		
		var cookieCachinatorUrl = getCookie('cachinatorUrl');
		
		if (window.location.href.indexOf('cachinator')>-1) {
			$("body").bind("DOMSubtreeModified", function() {
				//$("#path").attr('value', cookieCachinatorUrl.replace('https://www.dior.com',''));
				//$("#path").val(cookieCachinatorUrl.replace('https://www.dior.com',''));
				//$('.ant-btn.ant-btn-primary').removeAttr( "disabled" );
				//$('.ant-form.ant-form-inline.form').submit();
			});
		}
				
		//if(window.location.href.indexOf('cachinator')>-1 && cookieCachinatorUrl.length>0) {
			//document.getElementById('path').value = getCookie('cachinatorUrl');
			//document.getElementById('path').value = 'hein';
			//setCookie('cachinatorUrl','');
		//}
		
		//Cachinator - End

		
		//Modifier la vidéo - Start
		jQuery('body').on('click', '.span-idmmm i', function() {
			
			let idmmm = $(this).parent().parent().find('video').attr('widemotionresource');
			let url = "https://h-world.fr/dior/eZ-url-get.php?idmmm=" + idmmm;
			
			$.ajax({
				method: "GET",
				url: url,
		        success:function(data)
		        {
					if(data.length>1) {
		           		 eZurl = 'https://wwws.dior.com' + data.replace(/(\r\n|\n|\r)/gm, "");
					} else {
		           		 eZurl = 'https://wwws.dior.com/couture/admin/folder-media/folder-videos';
					}
					window.open(
						   eZurl,
						  '_blank'
					);
		        } 
			});
			
			/*
			
			let urlStart = String(pathname.match(/^(?:[^/]*\/){1}([^/]*)/g)); 
			let urlClean = pathname.replace(urlStart, "");
			let eZurl = '';
			if (pathname.indexOf('/products/')>0) {
				
				let codey = '';
				
				codey = jQuery('.top-content-desktop-sticky ul li.product-medias-grid-image:nth-of-type(1) .span-code-y').text();
				
				if (codey.length<1) {
					let codey = pathname.match(/(?<=beauty-)(.*)/g);
					if (codey.indexOf('-')>0) codey = String(codey).match(/.+?(?=-)/);
				}
				
				let url = "https://h-world.fr/dior/eZ-url-get.php?y=" + codey;
				
				$.ajax({
					method: "GET",
					url: url,
			        success:function(data)
			        {
						if(data.length>1) {
			           		 eZurl = 'https://wwws.dior.com/' + data.replace(/(\r\n|\n|\r)/gm, "");
						} else {
			           		 eZurl = 'https://wwws.dior.com/couture/admin/horizon/products/fp-pcd';
						}
						window.open(
							   eZurl,
							  '_blank'
						);
			        } 
				});

				
			} else {
				eZurl = 'https://wwws.dior.com/couture/admin/horizon' + urlClean;
				window.open(
					   eZurl,
					  '_blank'
				);
			}
			*/
		});
		//Modifier la vidéo - end
		
		
		//Afficher/masquer non eco - Start
		
		jQuery('body').on('click', '#eco-on', function() {
			$('li[data-ecomm="false"], #eco-off').show();
			$('#eco-on').hide();
		});
		
		jQuery('body').on('click', '#eco-off', function() {
			$('#eco-on').show();
			$('li[data-ecomm="false"], #eco-off').hide();
		});
		
		//Afficher/masquer non eco - End
		
		
		var css = '<style>.mt-2{margin-top: 15px;} .toolbox{overflow-y: auto;color:#fff;position: fixed;background: #212121;width:200px; height: 100vh; top: 0;z-index:999;padding: 10px;box-shadow: 4px 0px 13px 0px #00000047;transform: translateX(-220px);transition: transform .3s ease-out; visibility: hidden;}.toolbox-open{transform: translateX(0px); visibility:visible;}.toolbox-btn{background: #2e3644;color: #fff;position: fixed;z-index: 99999;padding: 5px;border-radius: 100px;width: 20px;height: 20px;text-align: center;top: calc(50% - 10px);}.toolbox input{appearance: auto;-webkit-appearance: auto;-moz-appearance: auto;}.toolbox a{font-size: 85%;}.toolbox-close{font-size:22px;position:absolute;cursor: pointer; right: -6px;top: -2px;}#open-countries{background: green;padding: 4px 10px;border-radius: 2px;display:none;}.toolbox-list-countries{padding-bottom:30px;}.toolbox-list-countries>ul{margin-bottom:10px;}.pt-2{padding-top:20px;}.divy{background: black; color: white; padding: 2px 10px;}body{overflow-y: inherit !important;}.fa-toggle-off,.fa-toggle-on{font-size:16px}.fa-toggle-on{color:#00e900}.fa-toggle-off{color:#d80000}.d-none{display:none;}.span-idmmm{background: #000;color:#fff;position: absolute; top: 0; right: 0; padding: 2px 5px;font-size:13px;}.span-y{position: absolute; background: black; color: #fff; top: 0; right: 0; text-align: right; padding: 0 2px; z-index: 99;font-size:13px;} .toolbox { scrollbar-width: auto; scrollbar-color: #fff #212121; }  .toolbox::-webkit-scrollbar { width: 10px; } .toolbox::-webkit-scrollbar-track { background: #212121; } .toolbox::-webkit-scrollbar-thumb { background-color: #fff; border-radius: 14px; border: 3px solid #212121; }.span-code-y{display:block;}.span-sku{display:block;}.text-copy::after {content: "Texte copié";position: fixed;top: 0px;left: calc(50vw - 50px);width: 100px;background: #25bb00;padding: 6px 5px;border-radius: 4px;z-index: 99999;color: #fff;font-size: 12px; text-align: center; }.selection-copy::after {content: "Sélection copiée";position: fixed;top: 0px;left: calc(50vw - 50px);width: 100px;background: #25bb00;padding: 6px 5px;border-radius: 4px;z-index: 99999;color: #fff;font-size: 12px; text-align: center; }.span-sku, .span-code-y, .span-idmmm{cursor: pointer;}.pays{font-size: 12px; font-weight: bold; margin-top: 10px; margin-bottom: 4px; color: #ffffff;}.toolbox-list-countries li:not(.pays) { margin-left: 7px;}#copySelection, #pastSelection{cursor: pointer;}.span-code-y:hover, .span-sku:hover, .span-idmmm-code:hover {font-weight: bold;}.span-imageSize {position: absolute;background: black;color: #fff; bottom: 0; right: 0; text-align: right;padding: 0 2px;z-index: 99; font-size: 11px;}.toolbox hr { opacity: .3;}.toolbox p:hover, .toolbox a:hover, .toolbox span:hover {text-decoration: underline;}.toolbox i { margin-right: 9px;width: 16px;text-align: center;}li[data-ecomm="false"], #eco-off { display: none;}.span-idmmm i { margin-right: 10px;}</style>';
		
		jQuery('body').prepend(css);
