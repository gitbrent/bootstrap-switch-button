+function ($) {
	'use strict';

	$('.example:not(.skip)').each(function() {
		// fetch & encode html
		var html = $('<div>').text($(this).html()).html()
		// find number of space/tabs on first line (minus line break)
		var count = html.match(/^(\s+)/)[0].length - 1
		// replace tabs/spaces on each lines with
		var regex = new RegExp('\\n\\s{'+count+'}', 'g')
		var code = html.replace(regex, '\n').replace(/\t/g, '  ').trim()
		// other cleanup
		code = code.replace(/=""/g,'')
		// add code block to dom
		$(this).after( $('<code class="highlight html">').html(code) )
	});

	$('code.highlight').each(function() {
		hljs.highlightBlock(this)
	});
}(jQuery);

var Demo = function () {}

Demo.prototype.init = function(selector) {
	document.getElementById(selector).switchButton();
}
Demo.prototype.destroy = function(selector) {
	document.getElementById(selector).switchButton('destroy');
}
Demo.prototype.on = function(selector) {
	document.getElementById(selector).switchButton('on');
}
Demo.prototype.off = function(selector) {
	document.getElementById(selector).switchButton('off');
}
Demo.prototype.toggle = function(selector) {
	document.getElementById(selector).switchButton('toggle');
}
Demo.prototype.enable = function(selector) {
	document.getElementById(selector).switchButton('enable');
}
Demo.prototype.disable = function(selector) {
	document.getElementById(selector).switchButton('disable');
}

demo = new Demo()
