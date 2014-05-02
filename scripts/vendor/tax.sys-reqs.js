// Dependent on Tax.Cookie in tax.js
Tax.SysReqs = {
	compatTables : {green : {}, yellow : {}, beta : {}, red : {} },	
		
	isCookieEnabled : false,
	
	isGreen : false,
	
	isYellow : false,
	
	isBeta : false,
	
	isRed : false,
	
	isBrowserCompatible : false,
	
	isCompatible : false,
	
	cookieName : 'ttoReady',
	
	autocheck: true,
		
	skipCookieCheck : false,
		
	loaded : function() {
		Tax.SysInfo.parse();
		Tax.SysReqs.setTTO();
		
		if(Tax.SysReqs.autocheck) {
			Tax.SysReqs.checkCompatible();
		}
	},
	
	initialize : function() {
		
	},
	
	checkCompatible : function() {
		// check the system (os & browser)
		var systemGreen = Tax.SysReqs.checkSystemCompatible(Tax.SysReqs.compatTables.green);
		var systemYellow = Tax.SysReqs.checkSystemCompatible(Tax.SysReqs.compatTables.yellow);
		var systemBeta = Tax.SysReqs.checkSystemCompatible(Tax.SysReqs.compatTables.beta);
		var systemRed = Tax.SysReqs.checkSystemCompatible(Tax.SysReqs.compatTables.red);
		
		// green first
		if(systemGreen) {
			Tax.SysReqs.isGreen = true;
			Tax.SysReqs.isBrowserCompatible = true;
		}
		
		// yellow overwrite green
		if(systemYellow) {
			Tax.SysReqs.isYellow = true;			
			Tax.SysReqs.isGreen = false;
			Tax.SysReqs.isBrowserCompatible = true;
		}
		
		// beta overwrite green and yellow
		if(systemBeta) {
			Tax.SysReqs.isYellow = true;			
			Tax.SysReqs.isGreen = false;
			Tax.SysReqs.isBeta = true;
			Tax.SysReqs.isBrowserCompatible = true;
		}
		
		// red overwrite all, or set if no match
		if(systemRed || (!Tax.SysReqs.isGreen && !Tax.SysReqs.isYellow)) {
			Tax.SysReqs.isRed = true;
			Tax.SysReqs.isYellow = false;
			Tax.SysReqs.isGreen = false;
		}
		
		// do cookie check and set final flag
		Tax.SysReqs.checkCookieEnabled();
		
		Tax.SysReqs.isCompatible = Tax.SysReqs.isBrowserCompatible && Tax.SysReqs.isCookieEnabled;
	},	
	
	checkCookieEnabled : function() {
		var cookieValue = "";
		
		if (Tax.SysReqs.isGreen) {
			cookieValue = 'Green';
		}
		else if (Tax.SysReqs.isYellow || Tax.SysReqs.isBeta) {
			cookieValue = 'Yellow';
		}
		else {
			cookieValue = 'Red';
		}
		
		if(Tax.SysInfo.browser.id == 'unknown') {
			cookieValue = 'Green';
		}
		
		cookieValue = cookieValue + '|' + Tax.SysInfo.browser.id + '|' + Tax.SysInfo.browser.name + '|' + Tax.SysInfo.browser.version 
					 + '|' + Tax.SysInfo.os.id + '|' + Tax.SysInfo.os.name;
		
		// Set path to / and add the proper domain here 
		options = {path:"/", domain:".intuit.com"};  
		
		Tax.Cookie.write(Tax.SysReqs.cookieName, cookieValue, options);
				
		if(Tax.SysReqs.skipCookieCheck || Tax.Cookie.read(Tax.SysReqs.cookieName)) {
			Tax.SysReqs.isCookieEnabled = true;
		}
	},
	
	/**
	 * @private
	 */
	checkSystemCompatible : function(table) {
		var osTable = Tax.SysReqs.getSubTable(table, Tax.SysInfo.os.id);
		
		// supports all browsers
		if(osTable.hasOwnProperty('all')) {
			return true;
		}
		
		var browserRules = Tax.SysReqs.getSubTable(osTable, Tax.SysInfo.browser.id);
		
		if(!browserRules) {
			return false;
		}
		
		var compatBrowser = Tax.SysReqs.evaluateRules(browserRules, Tax.SysInfo.browser.version);
		
		return compatBrowser;
	},
	
	/**
	 * @private
	 */
	evaluateRules : function(rules, testValue) {
		for(var ruleKey in rules) {
			if(!rules.hasOwnProperty(ruleKey)) {
				continue;
			}
			
			var ruleValue = rules[ruleKey];
			
			var passed = Tax.SysReqs.evaluateRule(ruleKey, ruleValue, testValue);
			
			if(!passed) {
				return false;
			}
		}
		
		return true;
	},
	
	/**
	 * @private
	 */
	evaluateRule : function(ruleKey, ruleValue, testValue) {
		switch(ruleKey) {
			case 'min':
				return testValue >= ruleValue;
			case 'max':
				return testValue <= ruleValue;
			case 'only':
				return testValue == ruleValue;
		}
		
		return false;
	},
	
	/**
	 * @private
	 */
	getSubTable : function(table, key) {
		if(key != 'all') {
			var allTable = Tax.SysReqs.getSubTable(table, 'all');
		}
		else {
			var allTable = false;
		}
		
		// os + all
		if(table.hasOwnProperty(key) && allTable) {
			var fullTable = $.extend(true, {}, allTable, table[key]);
			
			return fullTable;
		}
		// os
		else if(table.hasOwnProperty(key)) {
			return table[key];
		}
		// all
		else if(allTable) {
			return allTable;
		}
		
		return false;
	},
	
	/**
	 * @private
	 */
	setTTO : function() {	 
		// green table
		Tax.SysReqs.compatTables.green = {
			winXP : {
				msie : {only: 8},
				chrome : {min: 4},
				firefox : {min: 11},
				safari : {min: 5}
			},
			winXP64 : {
				msie : {only: 8},
				chrome : {min: 4},
				firefox : {min: 11},
				safari : {min: 5}
			},
			winVista : {
				msie : {min: 8},
				chrome : {min: 4},
				firefox : {min: 11},
				safari : {min: 5}
			},
			winVista64 : {
				msie : {min: 8},
				chrome : {min: 4},
				firefox : {min: 11},
				safari : {min: 5}
			},
			win7 : {
				msie : {min: 8},
				chrome : {min: 4},
				firefox : {min: 11},
				safari : {min: 5}
			},
			win8 : {
				msie : {only: 10},
				chrome: {min: 4},
				firefox : {min: 11},
				safari : {min: 5}
			},
			win8_1 : {
				msie : {min: 11},
				chrome : {min: 4},
				firefox : {min: 11},
				safari : {min: 5}
			},
			mac10_5 : {
				chrome : {min: 4, max: 21},
				firefox : {min: 11, max: 16},
				safari : {only: 5}
			},
			mac10_6 : {
				chrome : {min: 4},
				firefox : {min: 11},
				safari : {min: 5}
			},
			mac10_7 : {
				chrome : {min: 4},
				firefox : {min: 11},
				safari : {min: 5}
			},
			mac10_8 : {
				chrome : {min: 4},
				firefox : {min: 11},
				safari : {min: 6}
			},
			macx : {
				chrome : {min: 4},
				firefox : {min: 11},
				safari : {min: 5}
			},
			ios : {
				ipadsafari : {min : 4},
				iphonesafari : {min : 4},
				ioschrome: {min: 1} // allow all versions
			},
			android : {
				chrome : {min : 4}
			},
			kindlefire : {
				silk : {min: 1}
			},
			chromeos : {
				chrome : {min: 4}
			}
		};
	
		// yellow table
		Tax.SysReqs.compatTables.yellow = {
			win2000 : {
				opera : {min : 11}
			},
			winXP : {
				opera : {min : 11}
			},
			winXP64 : {
				opera : {min : 11}
			},
			winVista : {
				opera : {min : 11}
			},
			winVista64 : {                
				opera : {min : 11}
			},
			win7 : {                
				opera : {min : 11}
			},
			win8 : {                
				opera : {min : 11}
			},
			mac10_5 : {                
				opera : {min : 11}
			},
			mac10_6 : {
				opera : {min : 11}
			},
			mac10_7 : {
				opera : {min : 11}
			},
			mac10_8 : {               
				opera : {min : 11}
			},
			macx : {             
				opera : {min : 11}
			},
			linux : {
				chrome : {min: 4},
				firefox : {min: 11},
				opera : {min: 11}
			},
			ios : {
				operamini : {min: 1},
				firefox : {min: 1},
				skyfire : {min: 1}
			},
			android : {
				operamini : {min: 1},
				firefox : {min: 1},
				skyfire : {min: 1}
			}
		};
		
		// dev/beta table
		Tax.SysReqs.compatTables.beta = {
			all : {

			}
		};
		
		// red table
		Tax.SysReqs.compatTables.red = {
			all : {
				msie_compat : {min: 1},
				msie : {min: 6, max: 7},
				firefox : {min: 1, max: 10},
				aol : {min: 1},
				konqueror : {min: 1},
				camino : {min: 1}
			},
			win2000 : {
				chrome : {min: 1}
			},
			chromeos : {
				firefox : {min: 1},
				safari : {min: 1},
				silk : {min: 1},
				operamini : {min: 1},
				skyfire : {min: 1}
			},
			kindlefire : {
				chrome : {min: 1},
				safari : {min: 1},
				firefox : {min: 1},
				operamini : {min: 1},
				skyfire : {min: 1}
			},
			android : {
				safari : {min: 1}
			}
		};
	}
};

Tax.SysInfo = (function() {
	/* the system specs gatherer class */
	function SysInfo() {
		
		function parseBrowser() {
			var ua = navigator.userAgent;
			var ve = navigator.vendor;
			
			// browser tests and data
			var browsers = [
            {
				'id': 'skyfire',
				'name': 'Skyfire',
				'browser': function () {
					return /Skyfire/.test(ua)
				},
				'version': function () {
					return ua.match(/Skyfire\/(\d+\.\d)/)
				}
			}, { // Chrome for iOS - check before Safari because UA is very similar
				'id': 'ioschrome',
				'name': 'Chrome for iOS',
				'browser': function() {
					return /CriOS/.test(ua);
				},
			    'version': function() {
			        return ua.match(/CriOS\/(\d+\.\d)/);
			    }
			}, { // iPhone Safari
			    'name': 'IphoneSafari',
			    'browser': function () {
			        return /iPhone/.test(ua)
			    },
			    'version': function () {
			        var offset = ua.indexOf("Version/");
			        if (offset == -1) return -1;
			
			        return ['', ua.substring(offset + 8)];
			    }
			}, { // iPad Safari
			    'name': 'IpadSafari',
			    'browser': function () {
			        return /iPad/.test(ua)
			    },
			    'version': function () {
			        var offset = ua.indexOf("Version/");
			        if (offset == -1) return -1;
	
			        return ['', ua.substring(offset + 8)];
			    }
			}, {
				'id': 'operamini',
				'name': 'Opera Mini',
				'browser': function () {
					return /Opera Mini/.test(ua)
				},
				'version': function () {
					return ua.match(/Opera Mini\/(\d+\.\d)/)
				}
			}, { // Opera <http://www.opera.com/>
			    'name': 'Opera',
			    'browser': function () {
			        return window.opera != undefined || /Opera/.test(ua) || /OPR/.test(ua)
			    },
			    'version': function() {
			        // Accurate Opera version
			    	if(/Version/.test(ua)) {
			    		var versionNum = ua.match(/Version\/(\d+\.\d)/);
			    		if (versionNum) return versionNum;
			    	}
			    	
			    	if(/OPR/.test(ua)) {
			    		var versionNum = ua.match(/OPR\/(\d+\.\d)/);
			    		if (versionNum) return versionNum;
			    	}

			        // Opera pretending to be IE or Firefox
			        return ua.match(/Opera\/(\d+\.\d)/);
			    }
			}, { // Chrome (looks alot like safari so it should always be check before safari -austin
			    'name': 'Chrome',
			    'browser': function () {
			        return /Chrome/.test(ua)
			    }
			}, { // Safari <http://www.apple.com/safari/>
			    'name': 'Safari',
			    'browser': function () {
			        return /Apple/.test(ve) && !(/Chrome/.test(ua))
			    },
			    'version': function () {
			        var offset = ua.indexOf("Version/");
			        if (offset == -1) return -1;
	
			        return ['', ua.substring(offset + 8)];
			    }
			}, { // iCab <http://www.icab.de/>
			    'name': 'iCab',
			    'browser': function () {
			        return /iCab/.test(ve)
			    }
			}, { // Konqueror <http://www.konqueror.org/>
				'id': 'konqueror',
			    'name': 'Konqueror',
			    'browser': function () {
			        return /KDE/.test(ve)
			    }
			}, { // AOL Explorer <http://downloads.channel.aol.com/browser>
			    'id': 'aol',
			    'name': 'AOL Explorer',
			    'browser': function () {
			        return /America Online Browser/.test(ua)
			    },
			    'version': function () {
			        return ua.match(/rev(\d+(?:\.\d+)+)/)
			    }
			}, { // Flock <http://www.flock.com/>
			    'name': 'Flock',
			    'browser': function () {
			        return /Flock/.test(ua)
			    }
			}, { // Camino <http://www.caminobrowser.org/>
				'id': 'camino',
			    'name': 'Camino',
			    'browser': function () {
			        return /Camino/.test(ve)
			    }
			}, {
				'id': 'silk',
				'name': 'Silk Browser',
				'browser': function () {
					return /\bSilk\b/.test(ua)
				},
				'version': function () {
					return ua.match(/\bSilk\/([0-9._-]+)\b/)
				}
			}, { // Firefox <http://www.mozilla.com/firefox/>
			    'name': 'Firefox',
			    'browser': function () {
			        return /Firefox/.test(ua)
			    },
			    'version': function () {
			        return ua.match(/Firefox\/(\\d+(?:\\.\\d+)?)/.test(ua))
			    }
			}, { // Netscape <http://browser.netscape.com/>
			    'name': 'Netscape',
			    'browser': function () {
			        return /Netscape/.test(ua)
			    }
			}, { // Compatibility view
				'id': 'msie_compat',
				'name': 'Internet Explorer Compatibility Mode',
				'browser': function () {
					var isIe = /MSIE/.test(ua);
					var ieVersion = ua.match(/MSIE (\d+(?:\.\d+)+(?:b\d*)?)/);
					var hasTrident = /Trident/.test(ua);
					
					return isIe && ieVersion[1] == 7.0 && hasTrident;
				}
			}, { // IE 9. 'Trident/5' is always set for IE9 regardless of compatibility mode
			    'id': 'msie',
			    'name': 'Internet Explorer',
			    'browser': function () {
			        return /Trident\/5/.test(ua)
			    },
			    'version': function () {
			        return ["MSIE 9.0", "9.0"];
			    }
			}, { // IE 9. 'Trident/5' is always set for IE9 regardless of compatibility mode
			    'id': 'msie',
			    'name': 'Internet Explorer',
			    'browser': function () {
			        return /Trident\/7/.test(ua)
			    },
			    'version': function () {
			        return ["MSIE 11.0", "11.0"];
			    }
			}, { // Internet Explorer <http://www.microsoft.com/windows/ie/>
			    //                   <http://www.microsoft.com/mac/ie/>
			    'id': 'msie',
			    'name': 'Internet Explorer',
			    'browser': function () {
			        return /MSIE/.test(ua) || /IE\s/.test(ua)
			    },
			    'version': function () {
			    	var iever = /IE /.test(ua)
			    	var msiever = /MSIE/.test(ua)
			    	
			    	if(iever) {
			    		return ua.match(/IE (\d+\.\d)/)
			    	}
			    	if(msievar) {
			    		return ua.match(/MSIE (\d+(?:\.\d+)+(?:b\d*)?)/)
			    	}
			    }
			}, { // Mozilla <http://www.mozilla.org/products/mozilla1.x/>
			    'name': 'Mozilla',
			    'browser': function () {
			        return /Gecko|Mozilla/.test(ua)
			    },
			    'version': function () {
			        return ua.match(/rv:(\d+(?:\.\d+)+)/)
			    }
			}];
			
			// setup
			for(var i = 0; i < browsers.length; i++) {
				var id = browsers[i].id ? browsers[i].id : browsers[i].name.toLowerCase();
				
				browsers[i].id = id;
			}
			
			// identify browser
			for(var i = 0; i < browsers.length; i++) {
				// match found
				if(browsers[i].browser()) {
		
					this.browser.id = browsers[i].id;
					this.browser.name = browsers[i].name;
					
					var result;
					if(browsers[i].version != undefined && (result = browsers[i].version())) {
						// Use the explicitly set test for browser version.
						this.browser.version = parseFloat( result[1] );
					} 
					else {
						// Otherwise use the default test which searches for the
						// version number after the browser name in the user agent
						// string.
						var re = new RegExp(browsers[i].name + '(?:\\s|\\/)(\\d+(?:\\.\\d+)+(?:(?:a|b)\\d*)?)');
		
						result = ua.match(re);
						if(result != undefined) {
							this.browser.version = parseFloat( result[1] );
						}
					}
		
					// Don't continue checking
					break;
				}
			}		
		}
		
		function parseOS() {
			var ua = navigator.userAgent.toLowerCase();
			
			var os = [ // OS data and tests
	           {
				   'id': 'kindlefire',
				   'name': 'kindlefire',
				   't': 'silk-accelerated'
			   }, {
				   'id': 'win95',
			       'name': 'Windows 95',
			       't': ['win95', 'windows95']
			   }, {
				   'id': 'win98',
			       'name': 'Windows 98',
			       't': ['windows 98', 'win 9x 4.90']
			   }, {
				   'id': 'winNT',
			       'name': 'Windows NT',
			       't': ['winnt4.0', 'windows nt 4.0']
			   }, {
				   'id': 'win2000',
			       'name': 'Windows 2000',
			       't': 'windows nt 5.0'
			   }, {
				   'id': 'winXP',
			       'name': 'Windows XP',
			       't': 'windows nt 5.1'
			   }, {
				   'id': 'winXP64',
			       'name': 'Windows XP 64',
			       't': 'windows nt 5.2'
			   }, {
				   'id': 'winVista',
			       'name': 'Windows Vista',
			       't': 'windows nt 6.0'
			   }, {
				   'id': 'winVista64',
			       'name': 'Windows Vista 64',
			       't': 'win64'
			   }, {
				   'id': 'win7',
			       'name': 'Windows 7',
			       't': 'windows nt 6.1'
			   }, {
				   'id': 'win8',
				   'name': 'Windows 8',
				   't': 'windows nt 6.2'
			   }, {
				   'id': 'win8_1',
				   'name': 'Windows 8.1',
				   't': 'windows nt 6.3'
			   }, {
				   'id': 'ios',
			       'name': 'iOS',
			       't': ['ipad', 'iphone']
			   }, {
				   'id': 'android',
			       'name': 'Android',
			       't': ['android']
			   }, {
				   'id': 'mac10_8',
			       'name': 'Mac OS X 10.8',
			       't': ['mac os x 10.8', 'mac os x 10_8']
			   }, {
				   'id': 'mac10_7',
			       'name': 'Mac OS X 10.7',
			       't': ['mac os x 10.7', 'mac os x 10_7']
			   }, {
				   'id': 'mac10_6',
			       'name': 'Mac OS X 10.6',
			       't': ['mac os x 10.6', 'mac os x 10_6']
			   }, {
				   'id': 'mac10_5',
			       'name': 'Mac OS X 10.5',
			       't': ['mac os x 10.5', 'mac os x 10_5']
			   }, {
				   'id': 'macx',
			       'name': 'Mac OS X',
			       't': 'mac'
			   }, {
				   'id': 'linux',
			       'name': 'Linux',
			       't': 'linux'
			   }, {
				   'id': 'chromeos',
				   'name': 'chromeos',
				   't': 'CrOS',
				   'caseSensitive': true
			   }];
			
			// loop over os's
			for(var  i = 0; i < os.length; i++) {
				var tests = [];
				
				// handle single test string
				if(typeof os[i].t == 'string') {
					tests.push(os[i].t);
				}
				else {
					tests = os[i].t;
				}
				
				for(var j = 0; j < tests.length; j++) {
					var userAgentToTest = ua;
					
					// If caseSenitive is true, get the original user agent
					if(os[i].caseSensitive != undefined && os[i].caseSensitive == true) {
						userAgentToTest = navigator.userAgent;
					}
					
					if(Tax.strContainsSubstr(userAgentToTest, tests[j])) {
						this.os.id = os[i].id;
						this.os.name = os[i].name;
						break;
					}
				}
				
				// end os checks
				if(this.os.id != 'unknown') {
					break;
				}
			}		
		}
		
		/* public interface */
		this.browser = {
			id : 'unknown',
			name : 'unknown',
			version : 0		
		}
		
		this.os = {
			id : 'unknown',
			name : 'unknown'
		}
		
		this.parse = function() {
			parseBrowser.call(this);
			parseOS.call(this);
		}
	}
	
	/* singleton instantiation */
	return new SysInfo();
})();

Tax.SysReqs.loaded();