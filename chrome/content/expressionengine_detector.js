/**
 * DevDemonEEDetectorChrome namespace.
 */
if ("undefined" == typeof(DevDemonEEDetectorChrome)) {
	
	var DevDemonEEDetectorChrome = {
		init: function() { 
		    var appcontent = document.getElementById("appcontent");
		    appcontent.addEventListener("pageshow", DevDemonEEDetectorChrome.onPageLoad, true);
		    
		    var container = gBrowser.tabContainer;  
		    container.addEventListener("TabSelect", DevDemonEEDetectorChrome.onPageLoad, false);  
		  },
		  
		onPageLoad: function(aEvent){
			
			// Get Icons
			var UrlBarIcon = document.getElementById("dd-expressionengine_detector-img");
			var StatusBarIcon = document.getElementById("dd-expressionengine_detector-statusbar");
			
			// Hide them!
			UrlBarIcon.style.display = 'none';
			StatusBarIcon.style.display = 'none';
			
			var win = getBrowser().selectedBrowser.contentWindow.wrappedJSObject; // The page 
			var cookies = win.document.cookie.split(';'); // All cookies
			var cookieCount = 0;
				
			// Loop through all cookies
			for (var i=0;i < cookies.length; i++) {
				var cookie = cookies[i];
				cookie = cookie.split('=');
				cookie[0] = DevDemonEEDetectorChrome.trim_cookie(cookie[0]);
				
				if (	cookie[0].indexOf('last_visit') > 0 ||
						cookie[0].indexOf('last_activity') > 0 ||
						cookie[0].indexOf('tracker') > 0 ||
						cookie[0].indexOf('userhash') > 0 ||
						cookie[0].indexOf('uniqueid') > 0 ||
						cookie[0].indexOf('sessionid') > 0
				) cookieCount++;
						
				//Firebug.Console.log(cookie);
			}
	
			// If we have 3 strikes
			if (cookieCount > 2){
				UrlBarIcon.style.display = '';
				StatusBarIcon.style.display = '';
			}
			
			//Firebug.Console.log(win.document.cookie);
			//Firebug.Console.log(document.getElementById("dd-expressionengine_detector-img"));	
		},
		
		trim_cookie: function(str){
			var	str = str.replace(/^\s\s*/, ''),
			ws = /\s/,
			i = str.length;
			while (ws.test(str.charAt(--i)));
			return str.slice(0, i + 1);
		}
	};

};

//********************************************************************************* //

window.addEventListener("load", DevDemonEEDetectorChrome.init, false );
/*
window.addEventListener("load", function(){
	getBrowser().addEventListener("TabSelect", checkEE, false); // When people change tabs, we need to recheck
	var appcontent = document.getElementById("appcontent");   // browser
	if (appcontent) appcontent.addEventListener("DOMContentLoaded", DevDemonEEDetectorChrome.onLoad, true);
}, false);
*/

//********************************************************************************* //
