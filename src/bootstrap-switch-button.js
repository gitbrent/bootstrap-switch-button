/*\
|*|  :: Bootstrap Switch Button ::
|*|
|*|  Bootstrap Switch Button
|*|  https://github.com/gitbrent/bootstrap-switch-button
|*|
|*|  This library is released under the MIT Public License (MIT)
|*|
|*|  Bootstrap Switch Button (C) 2019-present Brent Ely (https://github.com/gitbrent)
|*|
|*|  Permission is hereby granted, free of charge, to any person obtaining a copy
|*|  of this software and associated documentation files (the "Software"), to deal
|*|  in the Software without restriction, including without limitation the rights
|*|  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
|*|  copies of the Software, and to permit persons to whom the Software is
|*|  furnished to do so, subject to the following conditions:
|*|
|*|  The above copyright notice and this permission notice shall be included in all
|*|  copies or substantial portions of the Software.
|*|
|*|  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
|*|  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
|*|  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
|*|  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
|*|  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
|*|  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
|*|  SOFTWARE.
\*/
'use strict';

(function() {
	/**
	 * `SwitchBtn` is instantiated for each switch-button
	 */
	class SwitchBtn {
		constructor(element, options) {
			const DEFAULTS = {
				onlabel: 'On',
				onstyle: 'primary',
				offlabel: 'Off',
				offstyle: 'light',
				size: '',
				style: '',
				width: null,
				height: null,
			};
			options = options || {};

			// A: Capture ref to HMTL element
			this.element = element;

			// B: Set options
			this.options = {
				onlabel: element.getAttribute('data-onlabel') || options.onlabel || DEFAULTS.onlabel,
				onstyle: element.getAttribute('data-onstyle') || options.onstyle || DEFAULTS.onstyle,
				offlabel: element.getAttribute('data-offlabel') || options.offlabel || DEFAULTS.offlabel,
				offstyle: element.getAttribute('data-offstyle') || options.offstyle || DEFAULTS.offstyle,
				size: element.getAttribute('data-size') || options.size || DEFAULTS.size,
				style: element.getAttribute('data-style') || options.style || DEFAULTS.style,
				width: element.getAttribute('data-width') || options.width || DEFAULTS.width,
				height: element.getAttribute('data-height') || options.height || DEFAULTS.height,
			};

			// LAST: Render switchButton
			this.render();
		}
		render() {
			function calcH(el) {
				const styles = window.getComputedStyle(el);
				const height = el.offsetHeight;
				const borderTopWidth = parseFloat(styles.borderTopWidth);
				const borderBottomWidth = parseFloat(styles.borderBottomWidth);
				const paddingTop = parseFloat(styles.paddingTop);
				const paddingBottom = parseFloat(styles.paddingBottom);

				return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
			}

			// 1: On
			var switchOn = document.createElement('label');
			switchOn.setAttribute('class', 'btn btn-' + this.options.onstyle + ' btn-' + this.options.size);
			switchOn.setAttribute('for', this.element.id);
			switchOn.innerHTML = this.options.onlabel;

			// 2: Off
			var switchOff = document.createElement('label');
			switchOff.setAttribute('class', 'btn btn-' + this.options.offstyle + ' btn-' + this.options.size);
			switchOn.setAttribute('for', this.element.id);
			switchOff.innerHTML = this.options.offlabel;

			// 3: Handle
			var switchHandle = document.createElement('span');
			switchHandle.setAttribute('class', 'switch-handle btn btn-light btn-' + this.options.size);

			// 4: Button-Group
			var switchGroup = document.createElement('div');
			switchGroup.setAttribute('class', 'switch-group');
			switchGroup.appendChild(switchOn);
			switchGroup.appendChild(switchOff);
			switchGroup.appendChild(switchHandle);

			// 5: Container
			var switchCont = document.createElement('div');
			switchCont.setAttribute('class', 'switch btn');
			switchCont.classList.add(this.element.checked ? 'btn-' + this.options.onstyle : 'btn-' + this.options.offstyle);
			if (this.options.size) switchCont.classList.add('btn-' + this.options.size);
			if (this.options.style) switchCont.classList.add(this.options.style);

			// 6: Replace HTML checkbox with Switch-Button
			this.element.parentElement.insertBefore(switchCont, this.element);
			//this.element.style.display = 'none';
			switchCont.appendChild(this.element);
			switchCont.appendChild(switchGroup);

			// 7: Set button W/H, lineHeight
			{
				// A: Set style W/H
				// NOTE: `offsetWidth` returns *rounded* integer values, so use `getBoundingClientRect` instead.
				switchCont.style.width =
					(this.options.width ||
						Math.max(switchOn.getBoundingClientRect().width, switchOff.getBoundingClientRect().width + switchHandle.getBoundingClientRect().width / 2)) + 'px';
				switchCont.style.height = (this.options.height || Math.max(switchOn.getBoundingClientRect().height, switchOff.getBoundingClientRect().height)) + 'px';

				// B: Apply on/off class
				switchOn.classList.add('switch-on');
				switchOff.classList.add('switch-off');

				// C: Finally, set lineHeight if needed
				if (this.options.height) {
					switchOn.style.lineHeight = calcH(switchOn) + 'px';
					switchOff.style.lineHeight = calcH(switchOff) + 'px';
				}
			}

			// 8: Add listeners
			switchCont.addEventListener('touchstart', this.toggle.bind(this));
			switchCont.addEventListener('click', this.toggle.bind(this));

			// 9: Set switch to bootstrap object
			this.switch = switchCont;

			// 10: Keep reference to this instance for subsequent calls via `getElementById().switchButton()`
			this.element.switchBtn = this;

			// 11: Fire events
			this.update(true);
			//this.trigger(true); // 20200215: TODO: theres an Issue on a diff version of the lib where triggering change on load isnt a good thing
		}

		toggle(event) {
			if (this.element.checked) this.off();
			else this.on();
			if (typeof event !== 'undefined' && event) event.preventDefault();
		}
		on(silent) {
			if (this.element.disabled) return false;
			this.switch.classList.remove('btn-' + this.options.offstyle);
			this.switch.classList.add('btn-' + this.options.onstyle);
			this.switch.classList.remove('off');
			this.element.checked = true;
			if (!silent) this.trigger();
		}
		off(silent) {
			if (this.element.disabled) return false;
			this.switch.classList.remove('btn-' + this.options.onstyle);
			this.switch.classList.add('btn-' + this.options.offstyle);
			this.switch.classList.add('off');
			this.element.checked = false;
			if (!silent) this.trigger();
		}

		/**
		 * Keep Switch-Button and corresponding checkbox in-sync
		 */
		enable() {
			this.switch.classList.remove('disabled');
			this.switch.removeAttribute('disabled');
			this.element.removeAttribute('disabled');
		}
		disable() {
			this.switch.classList.add('disabled');
			this.switch.setAttribute('disabled', 'disabled');
			this.element.setAttribute('disabled', 'disabled');
		}

		update(silent) {
			if (this.element.disabled) this.disable();
			else this.enable();
			if (this.element.checked) this.on(silent);
			else this.off(silent);
		}
		trigger(silent) {
			if (!silent) this.element.dispatchEvent(new Event('change', { bubbles: true }));
			//this.update(silent);
		}
		destroy() {
			// A: Remove button-group from UI, replace checkbox element
			this.switch.parentNode.insertBefore(this.element, this.switch);
			this.switch.parentNode.removeChild(this.switch);

			// B: Delete internal refs
			delete this.element.switchBtn;
			delete this.switch;
		}
	}

	/**
	 * Add `switchButton` prototype function to HTML Elements
	 * Enables execution when used with HTML - ex: `document.getElementById('switch-trigger').switchButton('on')`
	 */
	Element.prototype.switchButton = function(options, silent) {
		var _switchBtn = this.switchBtn || new SwitchBtn(this, options);

		// Execute method calls
		if (options && typeof options === 'string') {
			if (options.toLowerCase() == 'toggle') _switchBtn.toggle();
			else if (options.toLowerCase() == 'on') _switchBtn.on(silent);
			else if (options.toLowerCase() == 'off') _switchBtn.off(silent);
			else if (options.toLowerCase() == 'enable') _switchBtn.enable();
			else if (options.toLowerCase() == 'disable') _switchBtn.disable();
			else if (options.toLowerCase() == 'destroy') _switchBtn.destroy();
		}
	};

	/**
	 * Replace all `.switch-button` inputs with "Bootstrap-Switch-Button"
	 * Executes once page elements have rendered enabling script to be placed in `<head>`
	 */
	if (typeof window !== 'undefined')
		window.onload = function() {
			document.querySelectorAll('input[type=checkbox][data-toggle="switchbutton"]').forEach(function(ele) {
				ele.switchButton();
			});
		};

	// Export library if possible
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = SwitchBtn;
	}
})();
