// ARRAY OF GLOBAL SCRIPTS
var scripts = [
	"https://code.jquery.com/jquery-3.3.1.min.js",
	"https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js",
	"https://kit.fontawesome.com/e10158bc74.js",
	"https://hammerjs.github.io/dist/hammer.js",
	"js/global.js"
]

// CREATE SCRIPTS BASED ON THE 'SCRIPTS' ARRAY
function helper_script(scripts, control) {
	// ADD UNIQUE JS OF PAGE 
	if (control == 0) {
		var page_script = document.getElementsByTagName('script')[0].getAttribute('data-script');
		if (page_script) {
			page_script.replace(/(\r\n|\n|\r)/gm, " ").trim().split(',').map(function (elm) {
				scripts.push(elm);
			});
		}
	}
	var script_tag = document.createElement('script');
	script_tag.src = scripts[control];
	script_tag.onload = function () {
		control++;
		scripts.length != control ? helper_script(scripts, control) : console.log('all scripts are loaded!');
	}
	document.body.appendChild(script_tag);
}

// ON DOCUMENT LOADED
document.addEventListener('DOMContentLoaded', function () {
	// CREATE SCRIPTS
	helper_script(scripts, 0);
});