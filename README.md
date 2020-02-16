[![MIT Licence](https://img.shields.io/github/license/gitbrent/bootstrap-switch-button.svg)](https://opensource.org/licenses/mit-license.php) [![Bootstrap 4.3.1](https://img.shields.io/badge/bootstrap-4.3.1-green.svg?style=flat-square)](https://getbootstrap.com/docs/4.1) [![Known Vulnerabilities](https://snyk.io/test/npm/bootstrap-switch-button/badge.svg)](https://snyk.io/test/npm/bootstrap-switch-button) [![Package Quality](https://npm.packagequality.com/shield/bootstrap-switch-button.svg)](https://packagequality.com/#?package=bootstrap-switch-button) [![JSDelivr Badge](https://data.jsdelivr.com/v1/package/gh/gitbrent/bootstrap-switch-button/badge)](https://www.jsdelivr.com/package/gh/gitbrent/bootstrap-switch-button)

# Bootstrap Switch Button

**Bootstrap Switch Button** converts plain checkboxes into awesome switch buttons.

---

#### Library Distributions

| Project                                                                                    | Description                                             |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| [bootstrap4-toggle](https://github.com/gitbrent/bootstrap4-toggle)                         | Supports bootstrap4 (requires jQuery)                   |
| [bootstrap-switch-button](https://github.com/gitbrent/bootstrap-switch-button)             | Supports bootstrap4+ (ES6 class, no dependencies)       |
| [bootstrap-switch-button-react](https://github.com/gitbrent/bootstrap-switch-button-react) | Supports bootstrap4+ (React component, no dependencies) |

# Demos

**Demos and API Docs:** https://gitbrent.github.io/bootstrap-switch-button/

![Demo GIF](https://github.com/gitbrent/bootstrap-switch-button/blob/master/demo/assets/bootstrap-switch-button-demo.gif?raw=true)

# Installation

## CDN

```html
<link
  href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap-switch-button@1.1.0/css/bootstrap-switch-button.min.css"
  rel="stylesheet"
/>
<script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap-switch-button@1.1.0/dist/bootstrap-switch-button.min.js"></script>
```

## Download

[Latest GitHub Release](https://github.com/gitbrent/bootstrap-switch-button/releases/latest)

## NPM

```ksh
npm i bootstrap-switch-button
```

## Yarn

```ksh
yarn add bootstrap-switch-button
```

# Usage

## Initialize With HTML

Simply add `data-toggle="switchbutton"` to automatically convert a plain checkbox into a bootstrap 4 switch button.

```html
<input id="chkSwitch" type="checkbox" data-toggle="switchbutton" />
```

## Initialize With Code

Switch buttons can also be initialized via JavaScript code.

EX: Initialize id `chkSwitch` with a single line of JavaScript.

```html
<input id="chkSwitch" type="checkbox" checked />
<script>
  $(function() {
    $("#chkSwitch").switchbutton();
  });
</script>
```

# API

## Options

- Options can be passed via data attributes or JavaScript
- For data attributes, append the option name to `data-` (ex: `data-onlabel="Enabled"`)

```html
<input
  type="checkbox"
  data-toggle="switchbutton"
  data-onlabel="Enabled"
  data-offlabel="Disabled"
/>
<input type="checkbox" id="switch-two" />
<script>
  $(function() {
    $("#switch-two").switchButton({
      onlabel: "Enabled",
      offlabel: "Disabled"
    });
  });
</script>
```

| Name       | Type        | Default   | Description                                                                                                                                   |
| ---------- | ----------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `onlabel`  | string/html | "On"      | Text of the on switch button                                                                                                                  |
| `offlabel` | string/html | "Off"     | Text of the off switch button                                                                                                                 |
| `onstyle`  | string      | "primary" | Style of the on switch button. Possible values are: `primary`,`secondary`,`success`,`danger`,`warning`,`info`,`light`,`dark`                  |
| `offstyle` | string      | "light"   | Style of the off switch button. Possible values are: `primary`,`secondary`,`success`,`danger`,`warning`,`info`,`light`,`dark`                 |
| `size`     | string      | "normal"  | Size of the switch button. Possible values are: `large`, `normal`, `small`, `mini`.                                                           |
| `style`    | string      |           | Appends the value to the class attribute of the switch button. This can be used to apply custom styles. Refer to Custom Styles for reference. |
| `width`    | integer     | _null_    | Sets the width of the switch button. if set to _null_, width will be auto-calculated.                                                         |
| `height`   | integer     | _null_    | Sets the height of the switch button. if set to _null_, height will be auto-calculated.                                                       |

## Methods

Methods can be used to control switch buttons directly.

```html
<input id="switch-demo" type="checkbox" data-toggle="switchbutton" />
```

| Method     | Example                                     | Description                                       |
| ---------- | ------------------------------------------- | ------------------------------------------------- |
| initialize | `$('#switch-demo').switchButton()`          | Initializes the switch button plugin with options |
| destroy    | `$('#switch-demo').switchButton('destroy')` | Destroys the switch button                        |
| on         | `$('#switch-demo').switchButton('on')`      | Sets the switch button to 'On' state              |
| off        | `$('#switch-demo').switchButton('off')`     | Sets the switch button to 'Off' state             |
| toggle     | `$('#switch-demo').switchButton('toggle')`  | Toggles the state of the switch button on/off     |
| enable     | `$('#switch-demo').switchButton('enable')`  | Enables the switch button                         |
| disable    | `$('#switch-demo').switchButton('disable')` | Disables the switch button                        |

# Events

## Event Propagation

Note All events are propagated to and from input element to the switch button.

You should listen to events from the `<input type="checkbox">` directly rather than look for custom events.

```html
<input id="switch-event" type="checkbox" data-toggle="switchbutton" />
<div id="console-event"></div>
<script>
  $(function() {
    $("#switch-event").change(function() {
      $("#console-event").html("Checked?: " + $(this).prop("checked"));
    });
  });
</script>
```

## API vs Input

This also means that using the API or Input to trigger events will work both ways.

```html
<input id="switch-trigger" type="checkbox" data-toggle="switchbutton" />
<button class="btn btn-success" onclick="toggleApiOn()">On by API</button>
<button class="btn btn-danger" onclick="toggleApiOff()">Off by API</button>
<button class="btn btn-success" onclick="toggleInpOn()">On by Input</button>
<button class="btn btn-danger" onclick="toggleInpOff()">Off by Input</button>
<script>
  function toggleApiOn() {
    $("#switch-trigger").switchButton("on");
  }
  function toggleApiOff() {
    $("#switch-trigger").switchButton("off");
  }
  function toggleInpOn() {
    $("#switch-trigger")
      .prop("checked", true)
      .change();
  }
  function toggleInpOff() {
    $("#switch-trigger")
      .prop("checked", false)
      .change();
  }
</script>
```
