// Copyright(C)2014 Cafi Net All Rights Reserved.
// 利用規約 http://japanism.info/free-template.html#template
$(function(){
// 調整用 ここから
	// スライドショーのスピードを変更
	var first_photo = 2000; // 最初の写真を何秒かけて表示するか（1000 = 1秒）
	var change_photo = 2000; // 写真を何秒かけて切り替えるか
	var slide_time = 5000; // 何秒ごとに写真の切り替えを実行するか（first_photo と change_photo より長く設定）
	var change_photo_click = 800; // 写真を何秒かけて切り替えるか（進む・戻るボタンなどクリックによる切り替え）
	// その他
	var header_hover = 300; // title.png の hover アクションのスピード
	var menu_hover = 300; // nav_pc の hover アクションのスピード
	var modal_hover = 300; // Gallery thumbnail の hover アクションのスピード 
	var back_top_speed = 500; // トップへ戻るスピード（back-top.png をクリックしたとき）
	var content_state = 1; // content の非表示・表示[1 = ON][0 = OFF]
	var modal_state = 0; // モーダルウィンドウ ON/OFF[1 = ON][0 = OFF]
	var min_width = 900; // ブレークポイント[900]
// 調整用 ここまで
	var site_title = $('#site_title');
	var header = $('header');
	var content1 = $('#content1');
	// var menu_button = $('#menu_button');
	var nav = $('#nav_mo');
	var touch_start = ('ontouchstart' in window);
	var modal_window = $('#modal_window');
	var modal_bg = $('#modal_bg');
	var modal_prev_button = $('#modal_prev_button');
	var modal_next_button = $('#modal_next_button');
	var modal_close_button = $('#modal_close_button');
	var back_top = $('#back_top');
	var nav_mo_sub = $('.nav_mo_sub');
	$(window).scroll(function(){
		if ($(window).scrollTop() > 100) {
			back_top.fadeIn('fast');
		}
	});
	back_top.click(function(){
		$('body,html').animate({scrollTop: '0px'}, back_top_speed, 'swing');
	});
	var nav_height = nav.innerHeight();
	var nav_height2 = nav.innerHeight();
	$('#nav_mo > ul > li').click(function(){
		var nav_mo_sub_height = $(this).children('.nav_mo_sub').height() + 15;
		if ($(this).children('.nav_mo_sub').is(':visible')) {
			$(this).children('.nav_mo_sub').slideUp('fast');
			menu_button.animate({'top': nav_height2 - nav_mo_sub_height + 'px'}, 'fast');
			nav_height2 = nav_height2 - nav_mo_sub_height;
		} else {
			$(this).children('.nav_mo_sub').slideDown('fast');
			menu_button.animate({'top': nav_height2 + nav_mo_sub_height + 'px'}, 'fast');
			nav_height2 = nav_height2 + nav_mo_sub_height;
		}
	});
	if (touch_start == false) {
		$('#nav_pc > ul > li').hover(function(){
			$(this).children('.nav_pc_sub').not(':animated').slideDown();
		},
		function(){
			$(this).children('.nav_pc_sub').slideUp();
		});		
	} else {
		$('#nav_pc > ul > li').click(function(){
			if ($(this).children('.nav_pc_sub').is(':visible')) {
				$(this).children('.nav_pc_sub').slideUp('fast');
			} else {
				$(this).children('.nav_pc_sub').slideDown('fast');
			}
		});
	}
	function window_control () {
		$('#nav_mo ul li a').unbind();
		$('a[href^=#block]').unbind();
		menu_button.unbind();
		nav.unbind();
		content1.unbind();
		var window_width = $(window).width()+15;
		var header_width = header.width();
		if (nav_mo_sub.is(':visible')) {
			nav_mo_sub.slideUp('fast');
		}
		nav_height2 = nav_height;
		nav.css('display', 'none');
		if (window_width < min_width) {
			menu_button.css('top', '0px');
			menu_button.css('left', header_width / 2 - 75 + 'px');
			menu_button.click(function(){
				if (nav.is(':visible')) {
					nav.slideUp('fast');
					if (nav_mo_sub.is(':visible')) {
						nav_mo_sub.slideUp('fast');
					}
					nav_height2 = nav_height;
					menu_button.animate({'top': '0px'}, 'fast', 'linear');
				} else {
					nav.slideDown('fast');
					menu_button.animate({'top': nav_height + 'px'}, 'fast');
				}
			});
		} else {
			nav.css('margin-top', '');
		}
		if (touch_start == false) {
			if ($(window).height() < $(document).height() && content_state ==1) {
				var block_count = $("[id^='block']").length;
				for (var i = 2; i <= block_count; i++) {
					$('#content'+i).css('opacity', 0);
				}
			}
			$(window).scroll(function(){
				var scroll_value2 = $(window).scrollTop();
				if (content_state == 1) {
					for (var i = 2; i <= block_count; i++) {
						var block_top = $('#block'+(i-1)).offset().top;
						if (scroll_value2 >= block_top) {
							$('#content'+i).animate({'opacity': 1}, 700, 'swing');
						}
					}
					if ($(window).height() + scroll_value2 >= $(document).height() - 100) {
						for (var i = 2; i <= block_count; i++) {
							$('#content'+i).animate({'opacity': 1}, 700, 'swing');
						}
					}
				}
			});
		}
	}
	var modal = $('.modal');
	var modal_dt = $('.modal dt');
	var modal_dt_p = $('.modal dt p');
	function modal_gallery (){
		modal.css('margin-left', '');
		modal_dt.css({'max-width': '', 'height': ''});
		modal_dt_p.css('width', '');
		var modal_width = $('.modal:first').width();
		var first_width = $('.modal dt:first img').width();
		var img_calc;
		modal_dt_p.css('width', first_width - 10 + 'px');
		if (modal_width - first_width * 2 > 0) {
			img_calc = modal_width % (first_width + 12); 
			modal.css('margin-left', img_calc / 2 + 'px');
			modal_dt.css({'max-width': first_width + 'px', 'margin-right': '10px'});		
		} else {
			img_calc = modal_width % (first_width + 2);
			modal.css('margin-left', img_calc / 2 + 'px');
			modal_dt.css({'max-width': first_width + 'px', 'margin-right': '0px'});
		}
		var height_array = new Array();
		modal_dt.each(function(index, element) {
            height_array[index] = $(this).height();
        });
		var dt_max_height = Math.max.apply(null, height_array);
		modal_dt.css('height', dt_max_height + 'px');
	}
	var last = $('#stage ul li').length;
	var number = 1;	
	var slide_set;
	var state;
	var stage = $('#stage');
	var stage_first = $('#stage ul li:first-child');
	var slide_control = $('#slide_control');
	var play_stop = $('#play_stop');
	$(window).load(function(){
		window_control();
		var stage_height = stage_first.find('img').height();
		stage.css('height', stage_height);
		var stage_width = stage_first.find('img').width();
		var slide_control_width = slide_control.innerWidth();
		slide_control.css({'top': stage_height - 30 + 'px', 'left': (stage_width - slide_control_width) / 2 +'px'});
		modal_gallery();
	});
	$(window).resize(function(){
		window_control();
		var stage_height = stage_first.find('img').height();
		stage.css('height', stage_height);
		var stage_width = stage_first.find('img').width();
		var slide_control_width = slide_control.innerWidth();
		slide_control.css({'top': stage_height - 30 + 'px', 'left': (stage_width - slide_control_width) / 2 +'px'});	
		modal_gallery();	
		modal_bg.fadeOut();
		modal_window.fadeOut('normal', function(){
			$(this).html('');
		});
		modal_prev_button.fadeOut();
		modal_next_button.fadeOut();
		modal_close_button.fadeOut();
		modal_prev_button.off();
		modal_next_button.off(); 
	});
	stage_first.animate({opacity:1}, first_photo);
	for (var i = 1; i <= last; i++) {
		if (i == 1) {
			$('#slide_control #number_last').append('<span id="photo_'+i+'"><img src="C:/Users/Kei/VScord/tbte/images/active.png"/></span>');
		} else {
			$('#slide_control #number_last').append('<span id="photo_'+i+'"><img src="C:/Users/Kei/VScord/tbte/images/active.png"/></span>');
			$('#photo_'+i).css('opacity', 0.5);
		}
		$('#photo_'+i).css('width', '20px');
	}
	function slide_start (){
		slide_set = setInterval(function(){
			if (number == last) {
				$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo);
				stage_first.animate({opacity:1}, change_photo);
				number = 1;
				$("#photo_1").animate({opacity:1}, change_photo);
				for (var i = 1; i <= last; i++) {
					if (i != number) {
						$("#photo_"+i).animate({opacity:0.5}, change_photo);
					}
				}
			} else {
				$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo).next('li').animate({opacity:1}, change_photo);
				number++;
				$("#photo_"+number).animate({opacity:1}, change_photo);
				for (var i = 1; i <= last; i++) {
					if (i != number) {
						$("#photo_"+i).animate({opacity:0.5}, change_photo);
					}
				}
			}
		},slide_time);
		state = 1;
		play_stop.html('<img src="C:/Users/Kei/VScord/tbte/images/stop.png" alt="停止"/>');
	}
	function slide_stop (){
		clearInterval(slide_set);
		state = 0;
		play_stop.html('<img src="C:/Users/Kei/VScord/tbte/images/play.png" alt="再生"/>');
	}
	slide_start();
	$("[id^='photo_']").on('click', function(){ 
		var photo_id = $(this).attr('id');
		var id_slice = photo_id.slice(6);
		slide_stop();
		$('#stage ul li:not(:nth-child(' + id_slice + '))').animate({opacity:0}, change_photo_click); 
		$('#stage ul li:nth-child(' + id_slice + ')').animate({opacity:1}, change_photo_click);
		number = id_slice;
		$("#photo_"+number).animate({opacity:1}, change_photo_click);
		for (var i = 1; i <= last; i++) {
			if (i != number) {
				$("#photo_"+i).animate({opacity:0.5}, change_photo_click);
			}
		}
	});	
	$('#prev_button').click(function(){
		slide_stop();
		if (number == 1) {
			$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo_click);
			$('#stage ul li:nth-child(' + last + ')').animate({opacity:1}, change_photo_click);
			number = last;
		} else {
			$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo_click).prev('li').animate({opacity:1}, change_photo_click);
			number--;
		}
		$("#photo_"+number).animate({opacity:1}, change_photo_click);
		for (var i = 1; i <= last; i++) {
			if (i != number) {
				$("#photo_"+i).animate({opacity:0.5}, change_photo_click);
			}
		}
	});
	$('#next_button').click(function(){
		slide_stop();
		if (number == last) {
			$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo_click);
			stage_first.animate({opacity:1}, change_photo_click);
			number = 1;
		} else {
			$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo_click).next('li').animate({opacity:1}, change_photo_click);
			number++;
		}
		$("#photo_"+number).animate({opacity:1}, change_photo_click);
		for (var i = 1; i <= last; i++) {
			if (i != number) {
				$("#photo_"+i).animate({opacity:0.5}, change_photo_click);
			}
		}
	});
	play_stop.on('click', function(){ 
		if(state == 1){
			slide_stop();
		} else if(state == 0){
			slide_start();
		}
	});		
	var modal_dt_img = $('.modal dt img');
	if (touch_start == false) {
		$('#site_title').hover(function(){
			$(this).stop().animate({opacity:0.9}, header_hover);
		},
		function(){
			$(this).stop().animate({opacity:1}, header_hover);
		});
		$('.nav_hover').hover(function(){
			$(this).stop().animate({opacity: 0}, menu_hover);
		},
		function(){
			$(this).stop().animate({opacity: 1}, menu_hover);
		});
		if (modal_state == 1) {
			$(modal_dt_img).hover(function(){
				$(this).stop().animate({opacity:0.7}, modal_hover);
			},
			function(){
				$(this).stop().animate({opacity:1}, modal_hover);
			});	
		}
	}
	if (modal_state == 1) {
		modal_dt_img.css('cursor', 'pointer');
		var dt_length = modal_dt.length;
		var cafinet;
		var dt_index;
		modal_dt_img.on('click', function(){
			dt_index = modal_dt_img.index(this);
			var window_width = $(window).width();
			var window_height = $(window).height();
			var dd_html = $('.modal dd:eq(' + dt_index + ')').html();
			modal_window.html(dd_html)
			var modal_width_minus = 20;
			var modal_height_minus = 20;
			modal_bg.fadeIn();
			modal_window.html(dd_html).css({'width': window_width - modal_width_minus + 'px', 'height': window_height - modal_height_minus + 'px', 'left': 10 + 'px', 'top': 10 + 'px'}).fadeIn('normal', function(){
				var modal_img_width = $('#modal_window img').innerWidth();
				var modal_img_height = $('#modal_window img').innerHeight();
				if (window_height - modal_height_minus - modal_img_height < 0) {
					$('#modal_window img').css({'width': 'auto', 'height': '100%'}).fadeIn();
				} else if (window_width - modal_width_minus - modal_img_width > 0 && window_height - modal_height_minus - modal_img_height > 0) {
					$('#modal_window img').css('margin-top', (window_height - modal_height_minus - modal_img_height) / 2 + 'px').fadeIn();
				} else {
					$('#modal_window img').css({'width': '100%', 'height': 'auto', 'margin-top': (window_height - modal_height_minus - modal_img_height) / 2 + 'px'}).fadeIn();
				}
				modal_prev_button.css({'top': window_height / 2 - 50 + 'px', 'left': '5px'}).fadeIn();
				modal_next_button.css({'top': window_height / 2 - 50 + 'px', 'left': window_width - 105 + 'px'}).fadeIn();
				modal_close_button.css({'top': '15px', 'left': window_width - 35 + 'px'}).fadeIn();
				modal_prev_button.on('click', function(){
					if (dt_index == 0) {
						dt_index = dt_length - 1;
						dd_html = $('.modal dd:eq(' + dt_index + ')').html();
						modal_window.fadeOut('normal', function(){
							modal_window.html(dd_html).fadeIn('normal', function(){
								modal_img_width = $('#modal_window img').innerWidth();
								modal_img_height = $('#modal_window img').innerHeight();
								if (window_height - modal_height_minus - modal_img_height < 0) {
									$('#modal_window img').css({'width': 'auto', 'height': '100%'}).fadeIn();
								} else if (window_width - modal_width_minus - modal_img_width > 0 && window_height - modal_height_minus - modal_img_height > 0) {
									$('#modal_window img').css('margin-top', (window_height - modal_height_minus - modal_img_height) / 2 + 'px').fadeIn();
								} else {
									$('#modal_window img').css({'width': '100%', 'height': 'auto', 'margin-top': (window_height - modal_height_minus - modal_img_height) / 2 + 'px'}).fadeIn();
								}
								modal_window.queue([]);
								modal_window.stop();
							});
						});
					} else {
						dt_index--;
						dd_html = $('.modal dd:eq(' + dt_index + ')').html();
						modal_window.fadeOut('normal', function(){
							modal_window.html(dd_html).fadeIn('normal', function(){
								modal_img_width = $('#modal_window img').innerWidth();
								modal_img_height = $('#modal_window img').innerHeight();
								if (window_height - modal_height_minus - modal_img_height < 0) {
									$('#modal_window img').css({'width': 'auto', 'height': '100%'}).fadeIn();
								} else if (window_width - modal_width_minus - modal_img_width > 0 && window_height - modal_height_minus - modal_img_height > 0) {
									$('#modal_window img').css('margin-top', (window_height - modal_height_minus - modal_img_height) / 2 + 'px').fadeIn();
								} else {
									$('#modal_window img').css({'width': '100%', 'height': 'auto', 'margin-top': (window_height - modal_height_minus - modal_img_height) / 2 + 'px'}).fadeIn();
								}
								modal_window.queue([]);
								modal_window.stop();
							});
						});
					}
				});
				modal_next_button.on('click', function(){
					if (dt_index == dt_length - 1) {
						dt_index = 0;
						dd_html = $('.modal dd:eq(' + dt_index + ')').html();
						modal_window.fadeOut('normal', function(){
							modal_window.html(dd_html).fadeIn('normal', function(){
								modal_img_width = $('#modal_window img').innerWidth();
								modal_img_height = $('#modal_window img').innerHeight();
								if (window_height - modal_height_minus - modal_img_height < 0) {
									$('#modal_window img').css({'width': 'auto', 'height': '100%'}).fadeIn();
								} else if (window_width - modal_width_minus - modal_img_width > 0 && window_height - modal_height_minus - modal_img_height > 0) {
									$('#modal_window img').css('margin-top', (window_height - modal_height_minus - modal_img_height) / 2 + 'px').fadeIn();
								} else {
									$('#modal_window img').css({'width': '100%', 'height': 'auto', 'margin-top': (window_height - modal_height_minus - modal_img_height) / 2 + 'px'}).fadeIn();
								}
								modal_window.queue([]);
								modal_window.stop();
							});
						});
					} else {
						dt_index++;
						dd_html = $('.modal dd:eq(' + dt_index + ')').html();
						modal_window.fadeOut('normal', function(){
							modal_window.html(dd_html).fadeIn('normal', function(){
								modal_img_width = $('#modal_window img').innerWidth();
								modal_img_height = $('#modal_window img').innerHeight();
								if (window_height - modal_height_minus - modal_img_height < 0) {
									$('#modal_window img').css({'width': 'auto', 'height': '100%'}).fadeIn();
								} else if (window_width - modal_width_minus - modal_img_width > 0 && window_height - modal_height_minus - modal_img_height > 0) {
									$('#modal_window img').css('margin-top', (window_height - modal_height_minus - modal_img_height) / 2 + 'px').fadeIn();
								} else {
									$('#modal_window img').css({'width': '100%', 'height': 'auto', 'margin-top': (window_height - modal_height_minus - modal_img_height) / 2 + 'px'}).fadeIn();
								}
								modal_window.queue([]);
								modal_window.stop();
							});
						});
					}
				});				
				modal_close_button.on('click', function(){
					modal_bg.fadeOut();
					modal_window.fadeOut('normal', function(){
						$(this).html('');
					});
					modal_prev_button.fadeOut();
					modal_next_button.fadeOut();
					modal_close_button.fadeOut();
					modal_prev_button.off();
					modal_next_button.off(); 
				});
			});
		});
		modal_window.click(function(){
			modal_bg.fadeOut();
			modal_window.fadeOut('normal', function(){
				$(this).html('');
			});
			modal_prev_button.fadeOut();
			modal_next_button.fadeOut();
			modal_close_button.fadeOut();
			modal_prev_button.off();
			modal_next_button.off(); 
		});
	}
});