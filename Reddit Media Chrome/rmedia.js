(function($){
	var rMedia = {
		amendTabs: function() {
			var $hideall = $('<li class="extra-tools hideall"><a title="Hide all links" id="hideAll">hide all</li>');
			var $showImages = $('<li class="extra-tools expandimg"><a title="Expand media links" id="expandAll">expand all</li>');
			$("ul.tabmenu").append($showImages, $hideall);
		},
		removeThings: function() {
			var toRemove = [
				'#ad-frame',
				'#ad_main',
				'#siteTable_promoted',
				'#siteTable_organic',
				'.footer-parent',
				'.rank',
				'.dropdown.srdrop',
				'sponsored-tagline'
			];
			for (var i=0; i < toRemove.length; i++) {
				$(toRemove[i]).remove();
			}
		},
		hideAll: function() {
			function hider() {
				// Populate array with all the hide links on a page
				var u = $("#siteTable .hide-button a");
				if (u.length) {
					// Click each hide link 500ms apart
					setTimeout(hider, 500);
					u[0].onclick();
				}
			}
			var hideAll = document.getElementById('hideAll');
			hideAll.onclick = hider;
		},
		addExpando: function() {
			//var buttonArray = new Array();
			var imageToggle = $('.content .thing.link').find("a.title").each(function() {
				// Put all the links in an array
				var imgLink = $(this).attr('href');
				// If the link is an image
				if (imgLink && (imgLink.indexOf("imgur") >= 0 || imgLink.indexOf(".jpeg") >= 0 || imgLink.indexOf(".jpg") >= 0 || imgLink.indexOf(".png") >= 0 || imgLink.indexOf(".gif") >= 0 || imgLink.indexOf(".png") >= 0)) {
					$(this).parent().after('<div title="Load Image" class="expando-button collapsed selfimage">&nbsp;</div>');
					// If the link is an imgur gallery
					if (imgLink && (imgLink.indexOf("imgur.com/a/") >= 0)) {
						$(this).parent().parent().find('.expando-button').remove();
						$(this).parent().after('<div title="Load Imgur Gallery" class="expando-button collapsed galleryimages">&nbsp;</div>');
					}
				}
			});
		},
		expandImages: function() {
			// Expand Single Images
			$('div.selfimage').click(function(){
				if ($(this).hasClass('collapsed')){
					$(this).removeClass('collapsed').addClass('expanded');
					$(this).parent().find("a.title").each(function() {
						var parentImgLink = $(this).attr("href");
						var parentImgExt = (parentImgLink.indexOf("imgur") >= 0 && parentImgLink.indexOf("jpg") < 0 && parentImgLink.indexOf("gif") < 0 && parentImgLink.indexOf("png") < 0) ? ".jpg" : "";
						var parentImg = $("<img class='image-inline' style='display:block;max-width:780px;' src='" + parentImgLink + parentImgExt + "' />");
						$(this).parent().parent().after(parentImg);
					});
					$(this).parent().parent().find('a.thumbnail').hide();
				} else {
					$(this).removeClass('expanded').addClass('collapsed');
					$(this).parent().parent().find('.image-inline').remove();
					$(this).parent().parent().find('a.thumbnail').show();
				}
			});
			// Expand Imgur Galleries
			$('div.galleryimages').click(function(){
				if ($(this).hasClass('collapsed')){
					$(this).removeClass('collapsed').addClass('expanded');
					$(this).parent().find("a.title").each(function() {
						var parentImgurLink = $(this).attr("href");
						var parentImgurExt = (parentImgurLink.indexOf("imgur.com/a/") >= 0) ? ".jpg" : "";
						var parentImgur = $("<iframe class='imgur-album' width='60%' height='600' frameborder='0' src='" + parentImgurLink + "/embed'></iframe>");
						$(this).parent().parent().after(parentImgur);
					});
					$(this).parent().parent().find('a.thumbnail').hide();
				} else {
					$(this).removeClass('expanded').addClass('collapsed');
					$(this).parent().parent().find('iframe.imgur-album').remove();
					$(this).parent().parent().find('a.thumbnail').show();
				}
			});
		},
		expandAll: function() {
			function imageExpand(needle, haystack){
				var time = 1;
				$('.thing.link > .entry > .expando-button').each(function(i){
					var hat = this;
					setTimeout(function () {
						$(hat).trigger('click');
					}, time * 400);
					time++;
				});
				function imageExpando(needle, haystack) {
					var length = haystack.length;
					for (var i = 0; i < length; i++) {
						if (haystack[i] === needle) {return true;}
					}
					return false;
				}
				var arr = [];
				var x = $(".commentarea").find(".md p a").each(function () {
					var href = $(this).attr("href");
					if ((!$(this).hasClass("drowsapMorphed")) && ($(this).next(".drowsapMorphed").length === 0) && href && (href.indexOf("imgur") >= 0 || href.indexOf("jpeg") >= 0 || href.indexOf("jpg") >= 0 || href.indexOf("png") >= 0 || href.indexOf("gif") >= 0 || href.indexOf("png") >= 0) && !imageExpando(href, arr)) {
						var ext = (href.indexOf("imgur") >= 0 && href.indexOf("jpg") < 0 && href.indexOf("gif") < 0 && href.indexOf("png") < 0) ? ".jpg" : "";
						var img = $("<img style='display:block;max-width:600px;' src='" + href + ext + "' />");
						$(this).after(img);
						arr.push(href);
					}
				});
			}
			var expandAll = document.getElementById('expandAll');
			expandAll.onclick = imageExpand;
		},
		init: function(){
			$(document).ready(function() {
				rMedia.amendTabs();
				//rMedia.removeThings();
				rMedia.hideAll();
				rMedia.addExpando();
				rMedia.expandImages();
				rMedia.expandAll();
			});
		}
	};
	rMedia.init();
}(jQuery));