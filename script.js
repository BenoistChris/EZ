var pathname = window.location.pathname;

var html = '<div class="toolbox"><div class="toolbox-list-countries"><ul></ul></div></div>';
var html = html + '<div class="toolbox-btn">></div>';


jQuery('body').prepend(html);
jQuery('.toolbox-btn').mouseover(function(){
   loadListCountries();
   jQuery('.toolbox').addClass('toolbox-open');
   jQuery('.toolbox-btn').fadeOut('fast');
});
jQuery('.toolbox').mouseout(function(){
//   jQuery(this).removeClass('toolbox-open');
//   jQuery('.toolbox-btn').fadeIn('fast');
});

function loadListCountries() {
   jQuery('.toolbox-list-countries ul').html('');
   jQuery('#select-locale-field-options li').each(function() {
   if(jQuery(this).find('a').length>0) {
jQuery('.toolbox-list-countries ul').append('<li><a href="' + jQuery(this).find('a').attr('href') + '">' + jQuery(this).find('.locale-row-title').text() + '</a></li>');
   }
   });
}

var css = '<style>.toolbox{color:#fff;position: fixed;background: #212121;width:200px;height: 100%;z-index:999;padding: 10px;box-shadow: 4px 0px 13px 0px #00000047;transform: translateX(-220px);transition: all .3s ease-out;}.toolbox-open{transform: translateX(0px);}.toolbox-btn{background: #2e3644;color: #fff;position: fixed;z-index: 99999;padding: 10px;border-radius: 100px;width: 20px;height: 20px;text-align: center;top: calc(50% - 10px);}</style>';

jQuery('body').prepend(css);
