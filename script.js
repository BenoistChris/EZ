var pathname = window.location.pathname;

var html = '<div class="toolbox"><div class="toolbox-list-countries"><ul></ul><p><a id="open-countries">Ouvrir</a></p></div><div class="toolbox-close">⨯</div></div>';
var html = html + '<div class="toolbox-btn">></div>';


jQuery('body').prepend(html);
jQuery('.toolbox-btn').mouseover(function(){
   loadListCountries();
   jQuery('.toolbox').addClass('toolbox-open');
   jQuery('.toolbox-btn').fadeOut('fast');
});

jQuery('.toolbox').on('click', '.toolbox-close', function() {
   jQuery('.toolbox').removeClass('toolbox-open');
   jQuery('.toolbox-btn').fadeIn('fast');
});


jQuery('.toolbox-list-countries').on('click', 'input', function() {
   if(jQuery('.toolbox-list-countries input').is(":checked")) {
	    jQuery('#open-countries').show();
   } else {
      jQuery('#open-countries').hide();
   }
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

function loadListCountries() {
   jQuery('.toolbox-list-countries ul').html('');
   jQuery('#select-locale-field-options li').each(function() {
   if(jQuery(this).find('a').length>0) {
   var marche = jQuery(this).find('.locale-row-title').text().replace("(EUR€)", "").replace("(UK£)", "").replace("(US$)", "").replace("(DHS)", "").replace("日本 (JPY¥)","Japan").replace("한국 (KRW₩)","Korea").replace("中国大陆 (CNY¥)","China").replace("香港特別行政區","Hong Kong - CN").replace("臺灣地區","Taiwan").replace("Hong Kong SAR","Hong-Kong - EN");
jQuery('.toolbox-list-countries ul').append('<li><input type="checkbox" name="pays" /> <a href="' + jQuery(this).find('a').attr('href') + '?noredirect=ok" target="_blank">' + marche + '</a></li>');
   }
   });
}

var css = '<style>.toolbox{color:#fff;position: fixed;background: #212121;width:200px;height: 100%;z-index:999;padding: 10px;box-shadow: 4px 0px 13px 0px #00000047;transform: translateX(-220px);transition: all .3s ease-out;}.toolbox-open{transform: translateX(0px);}.toolbox-btn{background: #2e3644;color: #fff;position: fixed;z-index: 99999;padding: 10px;border-radius: 100px;width: 20px;height: 20px;text-align: center;top: calc(50% - 10px);}.toolbox input{appearance: auto;-webkit-appearance: auto;-moz-appearance: auto;}.toolbox a{font-size: 85%;}.toolbox-close{position:absolute;cursor: pointer;font-size: 30px;right: 2px;top: -9px;}#open-countries{background: green;padding: 4px 10px;margin-top: 10px;border-radius: 2px;display:none;}</style>';

jQuery('body').prepend(css);
