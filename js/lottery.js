'use strict';

var _createClass = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ('value' in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
})();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

var aniLottery = anime({
	targets: '.lottery-wrap'
});

var Turntable = (function() {
	function Turntable(opts) {
		_classCallCheck(this, Turntable);

		this.opts = $.extend(true, {
				target: '.lottery-wrap', // 旋转对象
				easing: 'easeInOutSine', // anime.js 动画曲线
				isplay: false, // 动画是否在播放
				duration: 3000, // 动画时长
				rotateNum: 5, // 旋转圈数
				total: 6, // 奖励个数
				offset: 0
			}, // 旋转偏移值
			opts);

		this.opts.angle = 360 / this.opts.total; // 旋转角度
	}

	_createClass(Turntable, [{
		key: 'start',
		value: function start(index, cb) {
			this.opts.isplay = true;
			var self = this,
				opt = this.opts,
				angle = opt.angle

			var off = 0
			if (index == 0) {
				off = 0
			} else if (index == 1) {
				off = 300
			} else if (index == 2) {
				off = 240
			} else if (index == 3) {
				off = 180
			} else if (index == 4) {
				off = 120
			} else if (index == 5) {
				off = 60
			}
			aniLottery = anime({
				targets: this.opts.target,
				easing: this.opts.easing,
				autoplay: false,
				duration: this.opts.duration,
				rotate: opt.rotateNum * 360 + off,
				complete: function complete() {
					$(self.opts.target).css({
						'-webkit-transform': 'rotate(' + off + 'deg)',
						'transform': 'rotate(' + off + 'deg)'
					});
					self.stop();
					cb && cb(index);
				}
			});
			aniLottery.restart();
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.opts.isplay = false;
			aniLottery.pause();
		}
	}], [{
		key: 'create',
		value: function create(opts) {
			return new Turntable(opts);
		}
	}]);

	return Turntable;
})();


// 适配不同屏幕
$(function() {
	var $html = $("html");
	var size = $html.width() / 10 + "px";
	$html.css("font-size", size);
})
// 复制文本
function copyFn(text) {
	var oInput = document.createElement("input");
	oInput.value = text;
	document.body.appendChild(oInput);
	oInput.select(); // 选择对象
	document.execCommand("Copy"); // 执行浏览器复制命令
	oInput.className = "oInput";
	oInput.style.display = "none";
	toastFn('复制成功')
}

let isshow = true

function toastFn(text) {
	if (isshow) {
		isshow = false
		$('body').append('<div class="toastAlert"><p><span class="toast">' + text + '</span></p></div>')
		$('.toastAlert').addClass('show');
		setTimeout(() => {
			$('.toastAlert').removeClass('show');
			$('.toastAlert').html('');
			isshow = true
		}, 1500)
	}

}