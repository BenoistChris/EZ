var pathname = window.location.pathname;

var html = '<div class="toolbox">ok</div>';
var html = html + '<div class="toolbox-btn">></div>';

jQuery('body').prepend(html);
jQuery('.toolbox-btn').mouseover(function(){$('.toolbox').addClass('toolbox-open');$(this).fadeOut(100);});
jQuery('.toolbox').mouseout(function(){$(this).removeClass('toolbox-open');$('.toolbox-btn').fadeIn(300);});

var css = '<style>.toolbox{color:#fff;position: fixed;background: #212121;width:200px;height: 100%;z-index:999;padding: 10px;box-shadow: 4px 0px 13px 0px #00000047;left:-220px;transition: all .3s ease-out;}.toolbox-open{left:0;}.toolbox-btn{background: #2e3644;color: #fff;position: fixed;z-index: 99999;padding: 10px;border-radius: 100px;width: 20px;height: 20px;text-align: center;top: calc(50% - 10px);}</style>';

jQuery('body').prepend(css);
