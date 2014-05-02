/**
 * Define core Tax object
 * 
 * Dependencies:
 * -jQuery.js
 */
var Tax = {
	/**
	 * Reference to window, always use this inside Tax functions to allow for unit testing. 
	 * 
	 * See example in Tax.getUrlPath test cases.
	 */
	wd : window,
	
	priorityCode : null,
	
	segment : null,
	
	/**
	 * Called automatically on Tax object creation
	 */
	loaded : function() {
		
	},
	
	/**
	 * Called automatically on document.ready
	 */
	initialize : function() {
		
	},
	
	/**
	 * Get a named url param value
	 * 
	 * @param key url param to get
	 * @return value of param or null if not found
	 */
	getUrlParam : function(key, otherString) {
		if(otherString) {
			var source = otherString;
		}
		else {
			var source = Tax.wd.location.search;
		}
		
		var regex = new RegExp("[\\?&]" + key + "=([^&#]*)", "i");
		var results = regex.exec(source);
		if (results == null) {
		    return null;
		}
		
		return unescape(results[1].replace(/\+/g, " "));  
	},
	
	/**
	 * Get a semicolon separated param from within the URI component 
	 * or if none is found get a param from the query string.
	 * 
	 * @param key uri param to get
	 * @return value of param or null if not found
	 */
	getParam : function(key, otherString) {
		var qs = Tax.wd.location.href;
		var os = otherString;
		if (os) {
			var fs = os;			
		}
		else {
			var	fs = qs;
		}
		
		fs = fs.substring(0, fs.indexOf('?'));
		
		if(fs.length <= 1) {
			return Tax.getUrlParam(key, otherString);
		}
		
		fs = fs.substring(fs.lastIndexOf('/') + 1);
		
		var params = fs.split(";");
		
		for(pi in params) {
			var kv = params[pi].split('=');
			
			if(kv.length <= 1) {
				continue;
			}
			
			if(kv[0] == key) {
				return kv[1];
			}
		}
		
		return Tax.getUrlParam(key, otherString);
	},
	
	/**
	 * Get the current url path, /my/path/
	 * 
	 * @return url path
	 */
	getUrlPath : function() {
	  	var lastSlashIndex = Tax.wd.location.pathname.lastIndexOf('/');
	  	return (Tax.wd.location.pathname.substring(0, lastSlashIndex) + '/');
	},
	
	/**
	 * Test if param is a function
	 * 
	 * @return true if function, false otherwise
	 */
	isFunction : function(func) {
		return (typeof func === 'function');
	},
	
	/**
	 * Test if given string contains given substring
	 * 
	 * @param string
	 * @param substring
	 * @return true if string contains substring
	 */
	strContainsSubstr : function(string, substring) {
		return string.indexOf(substring) != -1;
	},
	
	/**
	 * Test if this code is running in an iframe
	 * 
	 * @return true if in iframe
	 */
	isInIFrame : function() {
		return window.self !== window.top;
	},
	
	/**
	 * Return a text name consistent with pricing.xml
	 * 
	 * @param pid
	 */
	productIdToName : function(pid) {
		// toString causes js error if pid is undefined
		if (pid == undefined) {
			return 'unknown';
		}
		
		switch(pid.toString()) {
			case '512':
				return 'LEO';
			case '2':
				return 'BASIC';
			case '16':
				return 'DELUXE';
			case '8':
				return 'PREMIER';
			case '32':
				return 'HBIZ';
			case '4':
				return 'FFA';
			case '4096':
				return 'MILITARYE'; // Placeholder until pricing xml is updated
			case '8192':
				return 'MILITARYO'; // Placeholder until pricing xml is updated
			default:
				return 'unknown';
		}
	},
	
	nameToProductId : function(name) {
		if (name == undefined) {
			return 'unknown';
		}
		
		switch(name) {
			case 'LEO':
				return '512';
			case 'BASIC':
				return '2';
			case 'DELUXE':
				return '16';
			case 'PREMIER':
				return '8';
			case 'HBIZ':
				return '32';
			case 'FFA':
				return '4';
			case 'MILITARYE': // Placeholder until pricing xml is updated
				return '4096';
			case 'MILITARYO': // Placeholder until pricing xml is updated
				return '8192';
			default:
				return 'unknown';
		}
	},
	
	getEncodedQueryString: function() {
		queryString = window.location.search;
		
		if (queryString.length > 0) {
			queryString = queryString.substring(queryString.indexOf('?') + 1);
			
			// Split on ampersands first, will give us name/value pairs
			parameters = queryString.split('&');
			
			escapedQS = "";
			
			for (index in parameters) {
				if (escapedQS.length > 0) {
					escapedQS += "&";
				}
				
				splitStr = parameters[index].split('=');
				
				if (splitStr.length > 0) {
					escapedQS += encodeURIComponent(splitStr[0]) + "=";
					
					if (splitStr.length == 2) {
						escapedQS += encodeURIComponent(splitStr[1]);
					}
				}
			}
			
			return escapedQS;
		}
		
		return '';
	}
	
}

/**
 * Define Cookie module
 */
Tax.Cookie = {
	/**
	 * Default options - Change to affect further calls on this page that don't pass their own options
	 * 
	 * - expires : set to '' for session, number for +X days, or date object
	 * - path : set to '' for root
	 * - domain : set to '' for current domain
	 * - secure : set to true for transfer on https only
	 */
	options : {
		expires : '',
		path : '/',
		domain : '.intuit.com',
		secure : false
	},	
		
	/**
	 * Usage: Tax.Cookie.write('the_cookie', 'the_value', { expires: 7, path: '/some/path', domain: 'turbotax.intuit.com', secure: false });
	 * 
	 * @param name
	 * @param value
	 * @param options
	 */
	write : function(name, value, options) {
		if($.isPlainObject(options) == false) {
			options = $.extend({}, Tax.Cookie.options);
		}
		
	    if (value === null) {
	        value = '';
	        options.expires = -1;
	    }
	    
	    var expires = '';
	    
	    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	        var date;
	        if (typeof options.expires == 'number') {
	            date = new Date();
	            date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
	        } else {
	            date = options.expires;
	        }
	        expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
	    }
	    
	    var path = options.path ? '; path=' + (options.path) : '';
	    var domain = options.domain ? '; domain=' + (options.domain) : '';
	    var secure = options.secure ? '; secure' : '';
	    
	    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	},
	
	/**
	 * Read a cookie value
	 * 
	 * @param name
	 * @return value
	 */
	read : function(name) {
		var cookieValue = null;
		
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
	},
	
	/**
	 * Delete a cookie
	 * 
	 * Ensure path and domain options match cookie to be deleted.
	 * 
	 * @param name
	 * @param options
	 */
	remove : function(name, options) {
		Tax.Cookie.write(name, null, options);
	}
}

Tax.loaded();

$(function() {
	Tax.initialize();
});;
	if(Tax.Cookie.read("priorityCode") != null){
		Tax.priorityCode = Tax.Cookie.read("priorityCode");
	}else{
		Tax.priorityCode = "3468337910";
	}
	Tax.segment = "32";
;
Tax.Start = (function() {
	/**
	 * Params Class
	 */
	var Params = function(map) {
		/* Internal map of params */
		var paramMap = {};
		
		var count = 0;
		
		/* has(key) */
		this.has = function(key) {
			return paramMap.hasOwnProperty(key);
		};
		
		/* put(key, value) */
		this.put = function(key, value) {
			paramMap[key] = value;
			
			count++;
		};
		
		/* get(key) */
		this.get = function(key) {
			if(!key) {
				return paramMap;
			}
			
			if(this.has(key)) {
				 return paramMap[key];
			}
			else {
				return null;
			}
		}
		
		/* remove(key) */
		this.remove = function(key) {
			if(this.has(key)) {
				 var r = delete paramMap[key];
				 
				 if(r) {
					 count--;
					 
					 return true;
				 }
			}
			
			return false;
		};
		
		/* empty() */
		this.empty = function() {
			paramMap = {};
			count = 0;
		};
		
		/* each(callback) */
		this.each = function(callback) {
			$.each(paramMap, callback);
		};
		
		/* size() */
		this.size = function() {
			return count;
		};
		
		/* extend() */
		this.extend = function(params) {
			if(params instanceof Params) {
				var pmap = params.get();
			}
			else {
				var pmap = params;
			}
			
			$.each(pmap, function(k, v) {
				if(v instanceof Params) {
					// combine
					if(paramMap.hasOwnProperty(k)) {
						var r = paramMap[k].extend(v);
						paramMap[k] = r;
					}
					else {
						paramMap[k] = v;
					}
				}
				else {
					paramMap[k] = v;
				}
			});
			
			return this;
		};
		
		/* debug() */
		this.debug = function() {
			var out = {};
			
			$.each(paramMap, function(k, v) {
				if(v instanceof Params) {
					out[k] = v.debug();
				}
				else {
					out[k] = v;
				}
			});
			
			return out;
		};
		
		/*
		 * Constructor
		 */
		if(map) {
			paramMap = map;
			
			// < IE9
			if(!Object.keys) {
				this.each(function() {
					count++;
				});
			}
			else {
				count = Object.keys(paramMap).length;
			}
		}
	};
	
	/**
	 * Fields
	 */
	var 
	
	initialized = false,
	
	running = false,
	
	doSubmit = true,

	submitToTopWindow = true,

	authContingency = false,

	urls = {},

	experiences = {},

	listeners = [],
	
	uniqueId = 0,

	/* Merged with plain experience object before handing to callbacks */
	experience = {
		selector : false,
		url : false,
		params : new Params({
			priorityCode 	: Tax.priorityCode,
			productid 		: '',
			abtest			: new Params()
		}),
		onStart : false,
		delay : 0,
		
		/* getParam(k) */
		getParam : function(k) {
			return this.params.get(k);
		},
		
		/* setParam(k, v) */
		setParam : function(k, v) {
			this.params.put(k, v);
		},
		
		/* clearABTest() */
		clearABTest : function() {
			this.params.get('abtest').empty();
		},
		
		/* addABTest() */
		addABTest : function(k, v) {
			if(v) {
				this.params.get('abtest').put(k, v);
			}
			else {
				var params = Tax.Start._.abtestObject(k);
				this.params.get('abtest').extend(params);
			}
		},
		
		/* getABTest() */
		getABTest : function(k) {
			return this.params.get('abtest').get(k);
		}
	};
	
	/**
	 * Back to default state
	 */
	function reset() {
		doSubmit = true;
		authContingency = false;
		urls = {};
		experiences = {};
		listeners = [];
		
		resetExperience();
	};
	
	/**
	 * Clear experience
	 */
	function resetExperience() {
		experience.selector = '';
		experience.url = false;
		experience.params = new Params({
			priorityCode 	: Tax.priorityCode,
			productid 		: '',
			abtest			: new Params()
		});
		experience.onStart = false;
		experience.delay = 0;
	};
	
	/**
	 * Bind to the page
	 */
	function initialize() {
		if(initialized) {
			return;
		}
		
		var globalSelector = getGlobalSelector();
		var $elements = $(globalSelector);
		
		// for each defined experience
		for(var expName in experiences) {
			if(!experiences.hasOwnProperty(expName)) {
				continue;
			}
			
			var exp = experiences[expName];
			
			// for each element matching an experience's selector
			$elements.filter(exp.selector).each(function() {
				if($(this).data('experience') === undefined) {
					$(this).click(clickHandler);
				}
				
				$(this).data('experience', exp);
			});
		}
		
		initialized = true;
	};
	
	/**
	 * Add an experience to the list and optionally bind it if already init'd
	 */
	function addExperience(exp, key) {
		// create a unique key if not passed
		key = key || ('u' + uniqueId++);
		
		experiences[key] = exp;
		
		// do late binding
		if(initialized) {
			var $el = $(exp.selector);
			
			if($el.data('experience') === undefined) {
				$el.click(clickHandler);
			}
			
			$el.data('experience', exp);
		}
	};

    /**
     * Re-binds the given element to the specified experience.
     * Useful for buttons that change dynamically
     */
    function rebindElement(element, newExpName) {
        if (element == null) return;

        var $el = element instanceof jQuery ? element : $(element);

        for (var expName in experiences) {
            if (!experiences.hasOwnProperty(expName) || expName != newExpName)
                continue;

            $el.click(clickHandler);
            $el.data('experience', experiences[expName]);

            break;
        }
    };
	
	/**
	 * @private
	 * 
	 * Listener bound to dom elements
	 */
	function clickHandler() {
		// create a copy of the defined experience
		var exp = $.extend(true, {}, $(this).data('experience'));

		return manual(exp);
	};
	
	/**
	 * Execute given start experience
	 */
	function manual(exp) {
		if(running) {
			return false;
		}
		
		running = true;
		
		// Add expected fields and helpers
		formalizeExperience(exp);
		
		callListeners();
		
		if($.isFunction(experience.onStart)) {
			experience.onStart.call(experience, experience);
		}
		
		if(experience.url != false) {
			
			/* Prevent bfcache (back/forward js state caching) */
			jQuery(window).bind("unload", function(){});
			
			//for post-auth pages, send folks back to dispatcher.  have to code for the landing pages to still work...
			if(window.location.pathname.indexOf('login') != -1 && window.location.pathname.indexOf('login/lp') == -1) {
				experience.url = Tax.Start.urls().dispatcherUrl;
			} else {
				//if loginpage is set, meaning we are sending folks to mytt
				//but dont send productid to mytt - cookie and clear from experience
				var loginpage = experience.getParam('loginpage');
				if(loginpage != null) {
					var pid = experience.getParam('productid');
					if(pid != null) {
						if(pid != '') {
							Tax.Cookie.write('productid',pid);
						}
						//fix to not send product='' to mytt
						experience.params.remove('productid');
					}
				}
			}
			
			// build and submit start form
			var $form = appendTTOStartForm();
			
			if(experience.delay > 0) {
				setTimeout(function(){ $form.submit(); }, experience.delay);
			}
			else {
				$form.submit();
			}
		}
		else {
			running = false;
		}
		
		return false;
	};
	
	/**
	 * Add functions to call on start event
	 */
	function addListener(func) {
		if($.isFunction(func)) {
			listeners.push(func);
		}
	};
	
	/**
	 * Set abtest param
	 * 
	 * Takes one string as 'k=v' or two as k,v
	 * 
	 * Single string allows for 'k1=v1&k2=v2' multiple params
	 */
	function setABTest(key, value) {
		experience.clearABTest();
		experience.addABTest(key, value);
	};
	
	/**
	 * Add an abtest param
	 * 
	 * Takes one string as 'k=v' or two as k,v
	 * 
	 * Single string allows for 'k1=v1&k2=v2' multiple params
	 */
	function addABTest(key, value) {
		experience.addABTest(key, value);
	};
	
	/**
	 * Return an object literal of params
	 */
	function paramMap() {
		var map = {};
		
		experience.params.each(function(k, v) {
			if(k == 'abtest') {
				map[k] = abtestString(v);
			}
			else {
				map[k] = v;
			}
		});
		
		return map;
	};
	
	/**
	 * @private
	 * 
	 * Create jQuery selector string
	 */
	function getGlobalSelector() {
		var selector = '';
		
		for(var expName in experiences) {
			if(!experiences.hasOwnProperty(expName)) {
				continue;
			}
			
			var exp = experiences[expName];
			
			if(exp.hasOwnProperty('selector')) {
				selector += exp.selector + ', ';
			}
		}
		
		var slength = selector.length;
		selector = selector.substring(0, slength - 2);
		
		return selector;
	};
	
	/**
	 * @private
	 */
	function callListeners() {
		for(var i = 0, l = listeners.length; i < l; i++) {
			if($.isFunction(listeners[i])) {
				listeners[i].call(experience, experience);
			}
		}
	};
	
	/**
	 * @private
	 * 
	 * Merge the passed in experience literal with the formal experience object
	 */
	function formalizeExperience(exp) {
		// selector
		if(exp.hasOwnProperty('selector')) {
			experience.selector = exp.selector;
		}
		
		// url
		if(exp.hasOwnProperty('url')) {
			experience.url = exp.url;
		}
		
		// params
		if(exp.hasOwnProperty('params')) {
			// handle abtest
			if(exp.params.hasOwnProperty('abtest')) {
				exp.params.abtest = abtestObject(exp.params.abtest);
				
				// an empty abtest with explicitly set, 
				// this is a shortcut for clearABTest()
				// from an experience literal
				if(exp.params.abtest.size() == 0) {
					experience.clearABTest();
				}
			}
			
			experience.params.extend(exp.params);
		}
		
		// onStart
		if(exp.hasOwnProperty('onStart')) {
			experience.onStart = exp.onStart;
		}
		
		if(exp.hasOwnProperty('delay')) {
			experience.delay = exp.delay;
		}
	};
	
	/**
	 * @private
	 * 
	 * Combine this experience with any values already set
	 */
	function mergeExperience(exp) {
		// url
		url = exp.url;
		
		// additional params
		params.extend(exp.params);
		
		// priorityCode
		if(params.has('priorityCode') == false) {
			params.put('priorityCode', Tax.priorityCode);
		}
		
		// productid
		if(exp.params.has('productid') == false) {
			params.put('productid', '');
		}
	};
	
	/**
	 * @private
	 * 
	 * Takes a Params object
	 */
	function abtestString(params) {
		var pArray = [];
		var pStr = '';
		
		params.each(function(k, v) {
			pArray.push(k + '=' + v);
		});
		
		pStr = pArray.join('&amp;');
		
		return pStr;
	};
	
	/**
	 * @private
	 * 
	 * Returns a Params object
	 */
	function abtestObject(input) {
		if(!input || input == '') {
			return new Params();
		}
		else if($.isPlainObject(input)) {
			return new Params(input);
		}
		
		var params = {};
		
		var pArray = input.split(/&amp;|&/);
		
		for(var i = 0, l = pArray.length; i < l; i++) {
			var pSplit = pArray[i].split('=');
			
			if(pSplit.length == 2) {
				var k = pSplit[0];
				var v = pSplit[1];
				
				params[k] = v;
			}
		}
		
		return new Params(params);
	};
	
	/**
	 * @private
	 * 
	 * Build the form element and append/submit form at the proper window level 
	 * and return wrapped form element for submission
	 */
	function appendTTOStartForm() {
		// Handle to top window jQuery to 
		// append and submit form at proper level
		var jQueryTop = $;
		
		if(authContingency) {
			var generatedForm = '<form action="' + experience.url + '" method="post" id="ttoStartForm">';
			generatedForm = generatedForm + '<input type="hidden" name="customerSource" value="' + experience.params.get('priorityCode') + '" />';
		} 
		else {
			var generatedForm = '<form action="' + experience.url + '" method="get" id="ttoStartForm">';
			generatedForm = generatedForm + '<input type="hidden" name="priorityCode" value="' + experience.params.get('priorityCode') + '" />';
		}
		
		experience.params.each(function(k, v) {
			if(k == 'abtest') {
				v = abtestString(v);
			}
			
			if(k != 'priorityCode') {
				generatedForm += '<input type="hidden" name="' + k + '" value="' + v + '" />';
			}
		});
		
		generatedForm += '<input type="submit" style="display: none;" />';
		generatedForm += '</form>';
		
		if(submitToTopWindow && Tax.isInIFrame()) {
			// Will cause expected js error if no jQuery
			jQueryTop = window.top.$;
		}
		
		jQueryTop("#ttoStartForm").remove();
		jQueryTop("body").append(generatedForm);
		
		jQueryTop('#ttoStartForm').submit(function() {
			running = false;
			
			return doSubmit;
		});
		
		return jQueryTop('#ttoStartForm');
	};
	
	function bypassPrepMethodIfPreviouslyAnswered() {
		var pyp = Tax.Cookie.read('tt_pyp');
		if (pyp != null && pyp !== 'none') {
			var prepMethod = {tt:'turbotax',web:'other_website',ac:'accountant',ts:'tax_service',ft:'first_time',o:'other',skp:'skip'}[pyp];
	        // check prepMethod to send to create vs continue 
			if (prepMethod) {
				this.setParam('lastyearprepmethod', prepMethod);
				
				if (prepMethod == 'turbotax') {
					this.url = Tax.Start.urls().continueUrl;
					this.setParam('loginpage', 'continue');
				}
				else {
					this.url = (this.params['productid'] == '512') ? Tax.Start.urls().startUrlFree : Tax.Start.urls().startUrlPaid;
					this.setParam('loginpage', 'start');												
				}
			}
		}
	};
	
	/**
	 * API
	 */
	return {
		/** 
		 * Public 
		 **/
		submitToTopWindow 	: function(arg) { if(arguments.length > 0) { submitToTopWindow = arg; } else { return submitToTopWindow; } },
		authContingency 	: function(arg) { if(arguments.length > 0) { authContingency = arg; } else { return authContingency; } },
		urls 				: function(arg) { if(arguments.length > 0) { urls = arg; } else { return urls; } },
		experiences 		: function(arg) { if(arguments.length > 0) { experiences = arg; } else { return experiences; } },
		url 				: function(arg) { if(arguments.length > 0) { experience.url = arg; } else { return experience.url; } },
		params 				: function(arg) { if(arguments.length > 0) { params = new Params(arg); } else { return experience.params; } },
		experience			: function() 	{ return experience },
		
		reset 				: reset,
		resetExperience 	: resetExperience,
		initialize 			: initialize,
		addExperience		: addExperience,
        rebindElement       : rebindElement,
		addListener 		: addListener,
		manual 				: manual,
		addABTest			: addABTest,
		setABTest			: setABTest,
		paramMap			: paramMap,
		
		/** 
		 * Private 
		 **/
		_ : {
			initialized			: function() { return initialized; },
			running 			: function() { return running; },
			doSubmit 			: function(arg) { if(arguments.length > 0) { doSubmit = arg; } else { return doSubmit; } },
			listeners 			: function(arg) { if(arguments.length > 0) { listeners = arg; } else { return listeners; } },
			
			getGlobalSelector 	: getGlobalSelector,
			clickHandler 		: clickHandler,
			callListeners 		: callListeners,
			formalizeExperience : formalizeExperience,
			mergeExperience 	: mergeExperience,
			appendTTOStartForm 	: appendTTOStartForm,
			abtestString		: abtestString,
			abtestObject		: abtestObject,
			bypassPrepMethodIfPreviouslyAnswered : bypassPrepMethodIfPreviouslyAnswered,
			
			Params				: Params
		}
	};
})();
;

//
$(Tax.Start.initialize);
           

		Tax.Start.setABTest('');	
	
		
		Tax.Start.urls({
			dispatcherUrl    : "https://"+appVars.domain.estore+"/services/authentication/dispatcher.jsp",
			startUrlPaid 	 : "/mytt_login/createAccount.jsp",
			startUrlFree 	 : "/mytt_login/createAccount.jsp",
			startUrlFFA  	 : "/mytt_login/createAccount.jsp",
			continueUrl  	 : "/mytt_login/index.jsp",
			createAccountUrl : "/mytt_login/createAccount.jsp",
			startUrlEze 	 : "/mytt_login/createAccount.jsp"
		});
		
		Tax.Start.authContingency(false);
	



Tax.Start.experiences({
// regular tto skus
free : {
	selector : '.getstarted_free',
	url : Tax.Start.urls().startUrlFree,
	params : {
		productid : '512',
		loginpage: 'start'
	}
},
basic : {
	selector : '.getstarted_basic',
	url : Tax.Start.urls().startUrlPaid,
	params : {
		productid : '2',
		loginpage: 'start'
	}
},
deluxe : {
	selector : '.getstarted_deluxe',
	url : Tax.Start.urls().startUrlPaid,
	params : {
		productid : '16',
		loginpage: 'start'
	}
},
premier : {
	selector : '.getstarted_premier',
	url : Tax.Start.urls().startUrlPaid,
	params : {
		productid : '8',
		loginpage: 'start'
	}
},
homebiz : {
	selector : '.getstarted_homebiz',
	url : Tax.Start.urls().startUrlPaid,
	params : {
		productid : '32',
		loginpage: 'start'
	}
},
enlisted : {
	selector : '.getstarted_enlisted',
	url : Tax.Start.urls().startUrlPaid,
	params : {
		productid : '4096',
		loginpage : 'start'
	}
},
officer: {
	selector : '.getstarted_officer',
	url : Tax.Start.urls().startUrlPaid,
	params : {
		productid : '8192',
		loginpage : 'start'
	}
},

// regular tto skus secondary start
free2 : {
	selector : '.getstarted_free2',
	url : Tax.Start.urls().startUrlFree,
	params : {
		productid : '512',
		loginpage: 'start'
	}
},
basic2 : {
	selector : '.getstarted_basic2',
	url : Tax.Start.urls().startUrlPaid,
	params : {
		productid : '2',
		loginpage: 'start'
	}
},
deluxe2 : {
	selector : '.getstarted_deluxe2',
	url : Tax.Start.urls().startUrlPaid,
	params : {
		productid : '16',
		loginpage: 'start'
	}
},
premier2 : {
	selector : '.getstarted_premier2',
	url : Tax.Start.urls().startUrlPaid,
	params : {
		productid : '8',
		loginpage: 'start'
	}
},
homebiz2 : {
	selector : '.getstarted_homebiz2',
	url : Tax.Start.urls().startUrlPaid,
	params : {
		productid : '32',
		loginpage: 'start'
	}
},

// other
noproduct : {
	selector : '.getstarted_noproduct',
	url : Tax.Start.urls().startUrlPaid,
	params : {
		loginpage: 'start'
	}
},
noproduct2 : {
	selector : '.getstarted_noproduct2',
	url : Tax.Start.urls().startUrlPaid,
	params : {
		loginpage: 'start'
	}
},

// continue
continueReturn : {
	selector : '.continue_return',
	url : Tax.Start.urls().continueUrl,
	params : {
		loginpage: 'continue'
	}
},

// create account
createAccount : {
	selector : '.create_account',
	url : Tax.Start.urls().createAccountUrl,
	params : {
		loginpage: 'create'
	}
},

// baseline ez extension
eze : {
		selector : '.ezeStart',
		url : Tax.Start.urls().startUrlEze,
		params : {
			eze: true,
			referrer: 'TT',
			productid: '2048'
		}
//		,
//		onStart : function() {
//			if(Tax.SysReqs.isYellow == true){
//				this.url = "/system_requirements_check.jsp";
//			}
//			
//		}
},

// ffa ez extension
ezeFFA : {
		selector : '.ezeStartFFA',
		url : Tax.Start.urls().startUrlEze,
		params : {
			eze: true,
			referrer: 'FFA',
			productid: '2048'
		}
//		,
//		onStart : function(exp) {
//			if(Tax.SysReqs.isYellow == true){
//				this.url = "/system_requirements_check.jsp";
//			}
//			
//		}
},

/**
 * FFA starts - with priority codes
 * (3468342228 is the default FFA pcode, so we run our abtests on it) 
 */
ffa : {
	selector : '.getstarted_ffa,.getstarted_ffa_return',
	url : Tax.Start.urls().startUrlFFA,
	params : {
		productid : '4', 
		abtest : '', 
		priorityCode : '3468342228',
		loginpage: 'create'
	}
},

ffacal : {
	selector : '.getstarted_ffacal,.getstarted_ffacal_return',
	url : Tax.Start.urls().startUrlFFA,
	params : {
		productid : '4', 
		abtest : '', 
		priorityCode : '3468343755',
		loginpage: 'start'
	}
},

ffade : {
	selector : '.getstarted_ffade,.getstarted_ffade_return',
	url : Tax.Start.urls().startUrlFFA,
	params : {
		productid : '4', 
		abtest : '', 
		priorityCode : '4596900000',
		loginpage: 'start'
	}
},

// FFA starts - no priority code
ffa_nopcode_override : {
	selector : '.getstarted_ffa_nopcode_override,.getstarted_ffa_return_nopcode_override',
	url : Tax.Start.urls().startUrlFFA,
	params : {
		productid : '4', 
		abtest : '',
		loginpage: 'start'
	}
},

// FFA continues - with priority codes
continue_ffa_return : {
	selector : '.continue_ffa_return',
	url : Tax.Start.urls().continueUrl,
	params : {
		productid: '4',
		abtest: '',
		priorityCode: '3468342228',
		loginpage: 'continue'
	}
},
continue_ffacal_return : {
	selector : '.continue_ffacal_return',
	url : Tax.Start.urls().continueUrlUrlMyTT,
	params : {
		productid: '4',
		abtest: '',
		priorityCode: '3468343755',
		loginpage: 'continue'
	}
},
continue_ffaups_return : {
	selector : '.continue_ffaups_return',
	url : Tax.Start.urls().continueUrl,
	params : {
		abtest : '',
		priorityCode : '3468342229',
		loginpage: 'continue'
	}
},
continue_ffade_return : {
	selector : '.continue_ffade_return',
	url : Tax.Start.urls().continueUrl,
	params : {
		productid: '4',
		abtest: '',
		priorityCode: '4596900000',
		loginpage: 'continue'
	}
},

// FFA continues - no priority codes
continue_ffa_return_nopcode_override : {
	selector : '.continue_ffa_return_nopcode_override',
	url : Tax.Start.urls().continueUrl,
	params : {
		productid: '4',
		abtest: '',
		loginpage: 'continue'
	}
},

// ffa upsell
basic_ffaups : {
	selector : '.getstarted_basic_ffaups',
	url : Tax.Start.urls().startUrlFFA,
	params : {
		productid : '2', 
		priorityCode : '3468342229',
		loginpage: 'start'
	}
},
deluxe_ffaups : {
	selector : '.getstarted_deluxe_ffaups',
	url : Tax.Start.urls().startUrlFFA,
	params : {
		productid : '16', 
		priorityCode : '3468342229',
		loginpage: 'start'
	}
},
premier_ffaups : {
	selector : '.getstarted_premier_ffaups',
	url : Tax.Start.urls().startUrlFFA,
	params : {
		productid : '8', 
		priorityCode : '3468342229',
		loginpage: 'start'
	}
},
homebiz_ffaups : {
	selector : '.getstarted_homebiz_ffaups',
	url : Tax.Start.urls().startUrlFFA,
	params : {
		productid : '32', 
		priorityCode : '3468342229',
		loginpage: 'start'
	}
},
ffaups_return : {
	selector : '.getstarted_ffaups_return',
	url : Tax.Start.urls().startUrlFFA,
	params : {
		productid : '', 
		priorityCode : '3468342229',
		loginpage: 'start'
	}
},

goto_questionnaire : {
    selector : '.goto_questionnaire',
    url : '/personal-taxes/get-started/questionnaire.jsp'
},
goto_prepmethod_free : {
    selector : '.goto_prepmethod_free',
    url : '/personal-taxes/get-started/prepmethod.jsp',
    params : { productid : '512' },
	onStart : function() {
		Tax.Start._.bypassPrepMethodIfPreviouslyAnswered.call(this);
	}
},
goto_prepmethod_basic : {
    selector : '.goto_prepmethod_basic',
    url : '/personal-taxes/get-started/prepmethod.jsp',
    params : { productid : '2' },
	onStart : function() {
		Tax.Start._.bypassPrepMethodIfPreviouslyAnswered.call(this);
	}
},
goto_prepmethod_deluxe : {
    selector : '.goto_prepmethod_deluxe',
    url : '/personal-taxes/get-started/prepmethod.jsp',
    params : { productid : '16' },
	onStart : function() {
		Tax.Start._.bypassPrepMethodIfPreviouslyAnswered.call(this);
	}
},
goto_prepmethod_premier : {
    selector : '.goto_prepmethod_premier',
    url : '/personal-taxes/get-started/prepmethod.jsp',
    params : { productid : '8' },
	onStart : function() {
		Tax.Start._.bypassPrepMethodIfPreviouslyAnswered.call(this);
	}
},
goto_prepmethod_homebiz : {
    selector : '.goto_prepmethod_homebiz',
    url : '/personal-taxes/get-started/prepmethod.jsp',
    params : { productid : '32' },
	onStart : function() {
		Tax.Start._.bypassPrepMethodIfPreviouslyAnswered.call(this);
	}
},
goto_prepmethod_enlisted : {
    selector : '.goto_prepmethod_enlisted',
    url : '/personal-taxes/get-started/prepmethod.jsp',
    params : { productid : '4096' },
	onStart : function() {
		Tax.Start._.bypassPrepMethodIfPreviouslyAnswered.call(this);
	}
},
goto_prepmethod_officer : {
    selector : '.goto_prepmethod_officer',
    url : '/personal-taxes/get-started/prepmethod.jsp',
    params : { productid : '8192' },
	onStart : function() {
		Tax.Start._.bypassPrepMethodIfPreviouslyAnswered.call(this);
	}
},
goto_prepmethod_null : {
    selector : '.goto_prepmethod_null',
    url : '/personal-taxes/get-started/prepmethod.jsp',
    params : { productid : '' },
	onStart : function() {
		Tax.Start._.bypassPrepMethodIfPreviouslyAnswered.call(this);
	}
},
prepmethod_continue : {
	selector : '.prepmethod_continue',
	url : (Tax.getUrlParam('productid') == '512') ? Tax.Start.urls().startUrlFree : Tax.Start.urls().startUrlPaid,
	params : {
		loginpage: 'start'
	},
	onStart : function() {
		var prepMethod = $('input[name="prep_method"]:checked').val();
		var isNotCompat = Tax.Cookie.read('ttoReady').indexOf("Yellow") !== -1 || Tax.Cookie.read('ttoReady').indexOf("Red") !== -1;
		
		if(prepMethod == 'turbotax') {
			if(isNotCompat == true) {
				this.url = 'https://' + appVars.domain.estore + '/system_requirements_check.jsp';
			} else {
				this.url = Tax.Start.urls().continueUrl;
			}
			
			this.setParam('loginpage', 'continue');
		} else {
			if(isNotCompat == true) {
				this.url = 'https://' + appVars.domain.estore + '/system_requirements_check.jsp';
			}
		}
		
		this.setParam('productid', Tax.getUrlParam('productid'));
	}
},
prepmethod_skip : {
	selector : '.prepmethod_skip',
	url : (Tax.getUrlParam('productid') == '512') ? Tax.Start.urls().startUrlFree : Tax.Start.urls().startUrlPaid,
	params : {
		loginpage: 'start'
	},
	onStart : function() {
        this.setParam('productid', Tax.getUrlParam('productid'));
        var isNotCompat = Tax.Cookie.read('ttoReady').indexOf("Yellow") !== -1 || Tax.Cookie.read('ttoReady').indexOf("Red") !== -1;

		if(isNotCompat == true) {
			this.url = 'https://' + appVars.domain.estore + '/system_requirements_check.jsp';
		}
        
		this.setParam('lastyearprepmethod', 'skip');
	}
},

prepmethod_rt_continue : {
	selector : '.prepmethod_rt_continue',
	url : '/personal-taxes/get-started/continue.jsp',
	params : {},
	onStart : function(){

		var pid = Tax.getUrlParam('productid');
		var prepMethod = $('input[name="prep_method"]:checked').val();
		var doContinue = false;
		
		this.setParam('productid', pid);

		
		if(prepMethod){
			this.setParam('lastyearprepmethod', prepMethod);

			if( prepMethod == 'turbotax'){
				doContinue = true;
			}
			
		}else{
			this.setParam('lastyearprepmethod', 'skip');
		}

		
		if( pid == '512'){
			if(doContinue){
				this.url = Tax.Start.urls().continueUrl;
				this.setParam('loginpage', 'continue');
			}else{
				this.url = Tax.Start.urls().startUrlFree;
				this.setParam('loginpage','start');
			}
		}

		
		if(pid == '2'){
			if(doContinue){
				this.url = Tax.Start.urls().continueUrl;
				this.setParam('loginpage', 'continue');
			}else{
				this.url = Tax.Start.urls().startUrlPaid;
				this.setParam('loginpage','start');
			}
		}
			
	}
},
prepmethod_rt_skip : {
	selector : '.prepmethod_rt_skip',
	url : '/personal-taxes/get-started/continue.jsp',
	params : {},
	onStart: function(){

		var pid = Tax.getUrlParam('productid');

		this.setParam('productid', pid);
		this.setParam('lastyearprepmethod', 'skip');

		
		if(pid == '512'){
			this.url = Tax.Start.urls().startUrlFree;
		}

		
		if(pid == '2'){
			this.url = Tax.Start.urls().startUrlPaid;
		}
	}
},
rt_expired_continue : {
	selector : '.rt_expired_continue',
	url : Tax.Start.urls().startUrlPaid,
	params : {
		loginpage: 'start'
	},
	onStart : function(){

		var pid = Tax.getUrlParam('productid');
		var lastyearprep = Tax.getUrlParam('lastyearprepmethod');

		
		if(lastyearprep == 'turbotax'){
			this.url = Tax.Start.urls().continueUrl;
			this.setParam('loginpage','continue');
		}

		
		var expDate = new Date();  
	    expDate.setDate(expDate.getDate() - 1);
		Tracking.setCookie('ttc_tms', '', expDate, '/', "intuit.com");
		
		this.setParam('productid', pid);
		this.setParam('lastyearprepmethod', lastyearprep);
	}
},
rt_expired_reselect : {
	selector : '.rt_expired_reselect',
	url : '/personal-taxes/index.jsp',
	params: {},
	onStart : function(){
		
		this.setParam('productid', '');
		this.setParam('lastyearprepmethod', Tax.getUrlParam('lastyearprepmethod'));
		
		var expDate = new Date();  
	    expDate.setDate(expDate.getDate() - 1);
		Tracking.setCookie('ttc_tms', '', expDate, '/', "intuit.com");
	}
},

soo_start_free : {
    selector : '.soo_start_free',
    url : Tax.Start.urls().startUrlPaid,
    params : {
        productid: '512'
    }
},
soo_start_free_with_state : {
    selector : '.soo_start_free_with_state',
    url : Tax.Start.urls().startUrlPaid,
    params : {
        productid: '512',
        abtest: 'soo=B'
    }
},
soo_start_basic : {
    selector : '.soo_start_basic',
    url : Tax.Start.urls().startUrlPaid,
    params : {
        productid: '2'
    }
},
soo_start_basic_with_state : {
    selector : '.soo_start_basic_with_state',
    url : Tax.Start.urls().startUrlPaid,
    params : {
        productid: '2',
        abtest: 'soo=B'
    }
},
soo_start_deluxe : {
    selector : '.soo_start_deluxe',
    url : Tax.Start.urls().startUrlPaid,
    params : {
        productid: '16'
    }
},
soo_start_deluxe_with_state : {
    selector : '.soo_start_deluxe_with_state',
    url : Tax.Start.urls().startUrlPaid,
    params : {
        productid: '16',
        abtest: 'soo=B'
    }
},
soo_start_premier : {
    selector : '.soo_start_premier',
    url : Tax.Start.urls().startUrlPaid,
    params : {
        productid: '8'
    }
},
soo_start_premier_with_state : {
    selector : '.soo_start_premier_with_state',
    url : Tax.Start.urls().startUrlPaid,
    params : {
        productid: '8',
        abtest: 'soo=B'
    }
},
soo_start_homebiz : {
    selector : '.soo_start_homebiz',
    url : Tax.Start.urls().startUrlPaid,
    params : {
        productid: '32'
    }
},
soo_start_homebiz_with_state : {
    selector : '.soo_start_homebiz_with_state',
    url : Tax.Start.urls().startUrlPaid,
    params : {
        productid: '32',
        abtest: 'soo=B'
    }
}
});


// Allow enabling/disabling of EULA popup for different flows.
Tax.Start.params.postponeDelayedAuthEULA = true;
Tax.Start.params.postponeCreateAccountEULA = true;

//

Tax.TTOCart = {
		
	productFamily : null,
		
	items : null,
	
	cookieName : null,
		
	cookieOptions : {
		expires : '',
		path : '/',
		domain : 'turbotax.intuit.com',
		secure : false
	},
	
	productFamilies : {},
	
	/**
	 * 
	 */
	initialize : function() {
		Tax.TTOCart.parseCookie();
	},
	
	/**
	 * 
	 */
	containsItem : function(item) {
		for(var i = 0; i < Tax.TTOCart.items.length; i++) {
			if(Tax.TTOCart.items[i] == item) {
				return true;
			}
		}
		
		return false;
	},
	
	/**
	 * addItem(item);
	 * addItem(productFamily, item1, [item2, ...]);
	 * addItem(productFamily, array<string> items);
	 */
	addItem : function(productFamilyOrItem) {
		var args = Array.prototype.slice.call(arguments); 
		
		// first arg is a product family
		if(Tax.TTOCart.isValidProductFamily(productFamilyOrItem)) {
			var productFamily = productFamilyOrItem;
			
			// do not accept pfamily with no items
			if(args.length == 1) {
				return;
			}
			
			// remove pfamily
			args.shift();
			
			Tax.TTOCart.changeProductFamily(productFamily);
		}
		
		// items are given as array
		if(args.length == 1 && typeof args[0] == 'object') {
			args = args[0];
		}
		
		for(var i = 0; i < args.length; i++) {
			var validItem = Tax.TTOCart.validateAndFormatItem(args[i]);
			
			// valid and not already added
			if(validItem && !Tax.TTOCart.containsItem(validItem)) {
				Tax.TTOCart.items.push(validItem);
			}
		}
		
		Tax.TTOCart.writeCookie();
	},
	
	/**
	 * 
	 */
	changeProductFamily : function(productFamily) {
		var uProductFamily = productFamily.toUpperCase();
		
		if(Tax.TTOCart.productFamily != uProductFamily && Tax.TTOCart.isValidProductFamily(uProductFamily)) {
			Tax.TTOCart.productFamily = uProductFamily;
			
			Tax.TTOCart.revalidateItems();
			
			Tax.TTOCart.writeCookie();
		}
	},
	
	/**
	 * 
	 */
	removeItem : function(item, skipValidate) {
		var args = Array.prototype.slice.call(arguments); 
		
		var itemList = [];
		
		// set skipValidate param
		if(typeof args[args.length - 1] == 'boolean') {
			skipValidate = args[args.length - 1];
			args.pop();
		}
		
		// set itemList
		if(args.length == 1 && typeof args[0] == 'object') {
			itemList = args[0];
		}
		else {
			itemList = args;
		}
		
		// each item param
		for(var i = 0; i < itemList.length; i++) {
			var validItem = null;
			
			if(!skipValidate) {
				validItem = Tax.TTOCart.validateAndFormatItem(itemList[i]);
				
				if(!validItem || !Tax.TTOCart.containsItem(validItem)) {
					continue;
				}
			}
			else {
				validItem = itemList[i];
			}
			
			// find stored item
			for(var j = 0; j < Tax.TTOCart.items.length; j++) {
				if(Tax.TTOCart.items[j] == validItem) {
					// remove
					Tax.TTOCart.items.splice(j, 1);
					
					break;
				}
			}
		}
		
		Tax.TTOCart.writeCookie();
	},
	
	/**
	 * 
	 */
	removeAllItems : function() {
		Tax.TTOCart.items = [];
		
		Tax.TTOCart.productFamily = null;
		
		Tax.TTOCart.writeCookie();
	},
	
	/**
	 * @private
	 */
	isValidProductFamily : function(name) {
		var uName = name.toUpperCase();
		
		for(var productFamilyName in Tax.TTOCart.productFamilies) {
			if(uName == productFamilyName) {
				return true;
			}
		}
		
		return false;
	},
	
	/**
	 * @private
	 */
	isValidItem : function(item) {
		if(!Tax.TTOCart.productFamilies.hasOwnProperty(Tax.TTOCart.productFamily)) {
			return false;
		}
		
		var itemList = Tax.TTOCart.productFamilies[Tax.TTOCart.productFamily];
		for(var i = 0; i < itemList.length; i++) {
			if(item == itemList[i]) {
				return true;
			}
		}
		
		return false;
	},
	
	/**
	 * @private
	 */
	validateAndFormatItem : function(item) {
		var lItem = item.toLowerCase();
		
		if(!Tax.TTOCart.productFamilies.hasOwnProperty(Tax.TTOCart.productFamily)) {
			return false;
		}
		
		var itemList = Tax.TTOCart.productFamilies[Tax.TTOCart.productFamily];
		for(var i = 0; i < itemList.length; i++) {
			if(lItem == itemList[i].toLowerCase()) {
				return itemList[i];
			}
		}
		
		return false;
	},
	
	/**
	 * @private
	 */
	revalidateItems : function() {
		for(var i = 0; i < Tax.TTOCart.items.length; i++) {
			if(!Tax.TTOCart.isValidItem(Tax.TTOCart.items[i])) {
				Tax.TTOCart.removeItem(Tax.TTOCart.items[i], true);
			}
		}
	},
	
	/**
	 * @private
	 */
	writeCookie : function() {
		var finalStr = '';
		var itemsStr = Tax.TTOCart.items.toString().replace(/,/g, ';');		
		
		// add product family
		if(Tax.TTOCart.productFamily != null) {
			finalStr = Tax.TTOCart.productFamily;
		}
		
		// add items too
		if(itemsStr.length > 0) {
			if(finalStr.length > 0) {
				finalStr += ';' + itemsStr;
			}
			else {
				finalStr = itemsStr;
			}
		}
		
		Tax.Cookie.write(Tax.TTOCart.cookieName, finalStr, Tax.TTOCart.cookieOptions);
	},
	
	/**
	 * @private
	 */
	parseCookie : function() {
		if(Tax.TTOCart.items != null) {
			return;
		}
		
		Tax.TTOCart.items = [];
		
		var c = Tax.Cookie.read(Tax.TTOCart.cookieName);
		
		if(!c) {
			return;
		}
		
		var names = c.split(';');
		
		if(names.length != 0 && Tax.TTOCart.isValidProductFamily(names[0])) {
			Tax.TTOCart.productFamily = names[0];
			
			// remove first item (product family)
			names.shift();
		}
		else {
			Tax.TTOCart.productFamily = null;
		}
		
		Tax.TTOCart.items = names;
	}
}

$(function() {
	Tax.TTOCart.initialize();
});
;

		// 
		Tax.TTOCart.cookieName = "tax.ttocart";

		Tax.TTOCart.productFamilies = {BASIC:['US','STATE','SvcAuditDefense','SvcBankProduct','STATEWITHRC'],DELUXE:['US','STATE','SvcAuditDefense','SvcBankProduct','STATEWITHRC'],PREMIER:['US','STATE','SvcAuditDefense','SvcBankProduct','STATEWITHRC','PRFEDPREPB'],HBIZ:['US','STATE','SvcAuditDefense','SvcBankProduct','STATEWITHRC'],FFA:['US','STATE','SvcAuditDefense','SvcBankProduct'],LEO:['US','STATE','SvcAuditDefense','SvcBankProduct','SvcPWYC','STATEWITHRC']};

		// Automatically bind to start experiences
		if(Tax.Start) {
			Tax.Start.addListener(function() {
				if(this.getParam('productid') == '') {
					Tax.TTOCart.removeAllItems();
				}
				else {
					var pname = Tax.productIdToName(this.getParam('productid'));
					Tax.TTOCart.addItem(pname, 'US');
				}
			});
		}
		// 
	;
/* Dynamically binds onclick event to subnav links for sending metrics 
 * EXAMPLE:
 *     <a href="#foo">blah</a>
 * turns in to
 *     <a href="#foo" onclick="sendClickEvent(pageName + '#foo')">blah</a>
 * sendClickEvent() lives in s_code_remote.js
 */

/* out due to ABYS
$("a[href^='#']").click(function(){
	var pageNameToSend=s_pageName + " " + $(this).attr("href"); 
	sendClickEvent(pageNameToSend);
});
*/

/* Dynamically binds onclick event to thickbox links for sending metrics */
 if(typeof Tracking == 'undefined') {
	 Tracking = {};
 }
 Tracking.trackThickbox = function() {
	 var pageName=$(this).attr("href");
		var beginningOfJhtmlParams=pageName.indexOf(';');
		if (beginningOfJhtmlParams > -1){
			pageName=pageName.substring(0, beginningOfJhtmlParams);
		}
		var beginningOfUrlParameters=pageName.indexOf('?');
		if (beginningOfUrlParameters > -1){
			pageName=pageName.substring(0, beginningOfUrlParameters);
		}
		pageName=pageName + "  " + s_prop7;
		sendClickEvent(pageName);
 } 
 
$("a.thickbox, a.poppy, a.fta-lm").click(Tracking.trackThickbox);;
var Tax = Tax || {};
window.s_omniture = window.s;	// save s due to overwrite
 
Tax.SelfHelp = function(){
	var internalState = {
		question: null,
		phoneChannel: {
		},
		chatChannel: {
		},
		category: null,
		bucket: null,
		instantAnswerUri: null,
		answersResponse: null,
		show_ssp_results: true,
		firstTypeEventFired: false,
		firstPredictiveAskResultsEventFired: false,
		predictiveAskResultSelected: false,
		instantAnswerShownId: null,
		articlesShown: [],
		new_site: false
	}

	function resetInternalState() {
		internalState.question = null;
		internalState.instantAnswerUri = null;
		internalState.phoneChannel = {};
		internalState.chatChannel = {};
		internalState.category = null;
		internalState.bucket = null;
		internalState.show_ssp_results = true;
		internalState.answersResponse = null;
		//firstTypeEventFired = false;
		//firstPredictiveAskResultsEventFired = false;
		//predictiveAskResultSelected = false;
		internalState.instantAnswerShownId = null;
		internalState.articlesShown = [];		
	}
	
	function setBucket(category_string) {
		internalState.bucket = 'UN'; // default is Unknown
		$.each(constants.categoryMap,function (key,val) {
			if (val == category_string) {
				internalState.bucket = key;
			}
		});
	}
	
	function setCategory(category) {
		internalState.category = category;
		setBucket(category);
	}
	
	var endpoints = {
		autocomplete_endpoint: "/support/autocomplete/",	
		feedback_endpoint: "/support/documentfeedbackitem/",
		answers_endpoint: "/support/includes/answer.jsp",
		srs_endpoint: "/support/services/srs/srs-search.jsp",
		chat_endpoint: "/support/contact/forms/chat-forward.jsp"
	};
	
	var options = {
		questionSelector: ".question",
		voteUpSelector: ".voteup",
		voteDownSelector: ".votedown",
		askButtonSelector: ".ask",
		answersContainerSelector: "#answer",
		contactUsIdSelector: "#contactUs",
		helpContainerSelector: "#help-container",
		chatNowSelector: "#chat-now-btn",
		phoneSelector: "#phone-btn",
		contactFormContainer: "#contact-forms",
		articleLinkSelector: ".article-link",
		articleContainer: "#article-container",
		contentContainer: "#abys-content",
		supportLinksSelector: 'a[href^="/support/contact/index.jsp"]',
		hideContainerOnSearch: null,
		showContainerOnSearch: null,
		loadingIcon: "/tax-answers/loading-icon.gif",
		autocomplete_threshold: 0,
		phone: {
			display: true,
			traffic: 100,
			form: "/support/contact/forms/call_form.jsp"
		},
		chat: {
			display: true,
			traffic: 100,
			form: "/support/contact/forms/chat_form.jsp"
		},
		searchStarting: function() {},
		searchEnded: function() {}, 
		voteUpCallback: function() {
		},
		voteDownCallback: function() {
		},
		autocomplete_position: {},
		autocompleteMinRank: 0.00,
		autocomplete_ssp: {
			maxresults: 5,
			prefixenable: true,
			ledenable: false,
			maxdistance: 1,
			model: ["abys_lang_model"],
			stupidbackoff: 0.5,
			ledpenaltyfactor: 0.25,
			maxbigramcount: 4,
			maxunigramcount: 4
		},
		debug: false,
		new_site: false,
		display_article: false,
		show_all_results: true // Shows FAQs template all the time, even if there are Instant Answers. 
	};
	
	var constants = {
		voteUp: "up",
		voteDown: "down",
		supportCookie: "answersSupport",
		instantAnswer: "InstantAnswer",
		resetContainers: [options.answersContainerSelector, options.articleContainer, options.helpContainerSelector, options.contactFormContainer],
		offeringId: "Intuit.cg.webteam.turbotax.selfhelp",
		categoryMap: {'SB':'Shop Buy','GS':'Getting Started','DI':'Download Install','PF':'Print File','WOMR':'WOMR','AU':'Audit','TA':'Tax Advice','UN':'Unknown'}
	}
	
	var analyticsFunctions = {
		firstTypeEvent: function(field_id) {
			// First time the user types in text box
			s = window.s_omniture;
			Tracking.clearVars();
			s.events = "event36:TT.com:" + field_id;
			Tracking.sendAnalyticsEvent();
		},
		firstPredictiveAskResultsEvent: function() {
			// The first time Predictive ask returns suggestions that we show
			s = window.s_omniture;
			Tracking.clearVars();
			s.events = "event25:TT.com";
			Tracking.sendAnalyticsEvent();
		},
		predictiveAskResultsClickEvent: function(suggestion, questionFieldText) {
			// User clicks on a predictive ask suggestion
			s = window.s_omniture;
			Tracking.clearVars();
			s.prop24 = questionFieldText;
			s.eVar46 = "TT.com>>" + suggestion; 
			Tracking.sendAnalyticsEvent();
		},
		SearchedWithoutPredictiveAskResultClickEvent: function(questionFieldText) {
			// User searched without clicking a predictive ask result (hit enter or clicked Ask button)
			s = window.s_omniture;
			Tracking.clearVars();
			s.eVar46 = "TT.com>M>" + questionFieldText;
			Tracking.sendAnalyticsEvent();
		},
		instantAnswerShownEvent: function(docId) {
			// An instant answer is shown to the user
			// The id of the instant answer is stored in internalState.instantAnswerShownId
			s = window.s_omniture;
			Tracking.clearVars();
			s.events = "event34:ias";
			s.prop14 = s.eVar41 = "IA " + docId + "~TT.com";
			Tracking.sendAnalyticsEvent();
		},
		instantAnswerSurvey: function(vote_direction, docId) {
			// User offers feedback on instant answer
			// Instant answer id is stored in internalState.instantAnswerShownId
			s = window.s_omniture;
			Tracking.clearVars();
			var yes_or_no = vote_direction == constants.voteUp ? "Yes" : "No";
			s.events = "event33:ias_" + yes_or_no;
			s.prop14 = "IA Survey: " + yes_or_no;
			s.eVar41 = "IA " + docId + "~TT.com~Survey: " + yes_or_no;
			Tracking.sendAnalyticsEvent();
		},
		articlesReturnedEvent: function() {
			// internalState.articlesShown is an array of strings of article ids
			// ['GEN####', 'GEN####', 'GEN####']
			s = window.s_omniture;
			Tracking.clearVars();
			s.prop14 = internalState.articlesShown;
			Tracking.sendAnalyticsEvent();	
		},
		articleClickedEvent: function(article_id) {
			// Article ID will be GEN#####, rank will be 1,2,3...
			s = window.s_omniture;
			Tracking.clearVars();
			var rank = internalState.articlesShown.indexOf(article_id) + 1; // Gives us 1,2,3...
			s.prop14 = "Answers Page Click/" + article_id + "/" + rank;
			Tracking.sendAnalyticsEvent();
		},
		contactExpertButtonClicked: function(category, phone_wait, chat_wait) {
			// All parameters are strings
			//FIX call_form.jsp NOT BEACONING
			s = window.s_omniture;
			Tracking.clearVars();
			s.events = "event32:TT.com";
			s.prop14 = "Answers Contact Us~" + category;
			Tracking.sendAnalyticsEvent();		

			// CAPTURE category from this call in prop14
			// "Answers Contact Us~" + category
			// /support/services/srs/srs-search.jsp?statement=test&fmt=json&productFamily=101&getSearch=false&resultCount=0
		}		
	}

	var stateTimestamps = [];
	var stateFunctions = {
		pushState: function() {
			if (privateFunctions.isOnAnswersHome()) {
				var title = "TurboTax - Get Answers";
				if (internalState.question) {
					title += " - " + internalState.question;
				}
				var state = stateFunctions.getPageState();
				stateTimestamps[state.timestamp] = state.timestamp;
				
				var state_string = "?state=" + state.timestamp;

				History.pushState(state,title,state_string);
			}
		},
		getPageState: function() {
			state = {
				internalStateObj: internalState,
				abysHomeVisible: $("#ABYS-home").is(":visible"),
				abysContent: $("#abys-content").html(),
				timestamp: new Date().getTime()
			}
			
			return state;
		},
		restoreState: function(state) {
			if (privateFunctions.isOnAnswersHome()) {
				if(state.data.timestamp in stateTimestamps) {
					delete stateTimestamps[state.data.timestamp];
				} 
				else {
					if ((typeof state.data.abysHomeVisible == "undefined") || (state.data.abysHomeVisible)) {
						answersFunctions.resetPageState();
						resetInternalState();
						$("#ABYS-home").show();
						$("#ABYS-secondary").hide();
					}
					else {
						internalState = state.data.internalStateObj;
						$("#ABYS-home").hide();
						$("#ABYS-secondary").show();
						$("#abys-content").html(state.data.abysContent);
					}
				}
			}
		}
	}
	
	var privateFunctions = {
		bind: function() {
			function askButtonClickHandler(e) {
				e.preventDefault();
				resetInternalState();
				// initiating a search, reset first key typed for beaconing to fix next entry in search box
				internalState.firstTypeEventFired = false;
				// reset first results beacon boolean so it fires the first result found
				internalState.firstPredictiveAskResultsEventFired = false;
				
				// Find nearest text box
				var questionField = $(this).parent('div').find(options.questionSelector);
				
				// Make sure question field has a question
				var value = questionField.val();
				if (!value || value == questionField.attr('placeholder')) {
					//return;
					window.location = "/tax-answers/";
					return;
				}
				// Make sure that we're on the tax-answers home page. If not, go there with the question in the URL
				if (!privateFunctions.isOnAnswersHome() || privateFunctions.isDirectInstantAnswer()) {
					qsObj = {
						q: questionField.val(),
						pars: internalState.predictiveAskResultSelected
					}
					
					window.location = "/tax-answers/?" + $.param(qsObj);
					return;
				}
				
				$(this).addClass('loading');
				internalState.question = questionField.val();
				if (!internalState.predictiveAskResultSelected) {
					analyticsFunctions.SearchedWithoutPredictiveAskResultClickEvent(internalState.question);
				}
				answersFunctions.findAnswerForQuestion(internalState.question);
			}
			
			$(options.questionSelector).each(function(){
				var elementId = $(this).attr('id');
                var $headerElement = $("#header");
				
				// This if statement is a hack for IE7 since it doesn't do z-index right. We have to put it in the header otherwise, it shows up behind the header.
				if (elementId == "abysHeaderQuestion" && $headerElement.length) {
					$headerElement.append("<div id='"+ elementId + "-results'></div>");
				}
				else{
					$("body").append("<div id='"+ elementId + "-results'></div>");
				}
				var autocomplete_options = {
					source: function(request, response) {
						var query = options.autocomplete_ssp;
						query.prefix = request.term;
						
						//api-e2e.ssp.intuit.com for QA server, api.ssp.intuit.com for prod server
				        $.getJSON(window.location.protocol + "//api.ssp.intuit.com/action/lmtypeahead?callback=?", $.param(query, true), function(data){
					        if (data.hasOwnProperty('results')) {
								var questions = [];
								var debugContents = "";
								
								if (data.results != null) {
									$.each(data.results, function(index, value){
										if (options.debug) {
											debugContents += "<ul>Suggestion: <strong>" + value.suggestion + "</strong>&nbsp;&nbsp;Rank:<strong>"+ value.rank +"</strong>&nbsp;&nbsp;Model:<strong>"+value.model+"</strong></ul>"
										}
										
										if (value.rank >= options.autocompleteMinRank) {
											questions.push(value.suggestion);
										}
									});
									
									if (questions.length == 0) {
										questions = [];
									}
									else {
										if (!internalState.firstPredictiveAskResultsEventFired) {
											internalState.firstPredictiveAskResultsEventFired = true;
											analyticsFunctions.firstPredictiveAskResultsEvent();
										}										
									}
									
									if (options.debug) {
										$("#debug-contents").empty().append("<ol>"+ debugContents +"</ol>");
									}									
								}
								
								//If SSP is slow to respond, and answer is already shown, show nothing in autocomplete
								if (!internalState.show_ssp_results) {
									questions = [];
								}
								
								response(questions);
						    }
					    });
				    },
					minLength: 2,
					select: answersFunctions.autocompleteSelected,
					appendTo: "#" + elementId + "-results",
					open: function( event, ui ) {},
					focus: function( event, ui ) { return false; }
				}
				
				if (options.autocomplete_position.hasOwnProperty(elementId)) {
					autocomplete_options['position'] = options.autocomplete_position[elementId];
				}
				
				$(this).autocomplete(autocomplete_options);
			});
			
			$(options.questionSelector).on( "autocompleteopen", function( event, ui ) { $(this).data("autocomplete").menu.element.addClass('typeahead dropdown-menu'); } );
			
			$(document).on("click", options.voteUpSelector, function(e){
				e.preventDefault();
				feedbackFunctions.voteUp(internalState.instantAnswerUri);
				var template = Handlebars.compile($("#helpful-feedback").html());
				$(".feedback").hide();
				//$(options.helpContainerSelector).empty().append(template({}));
				$(template({})).appendTo("#content-wrap");
			});
			
			
			$(document).on("click", options.voteDownSelector, function(e){
				e.preventDefault();
				feedbackFunctions.voteDown(internalState.instantAnswerUri);
				//supportFns.contactUsClicked(e);
				$(".feedback").empty().append('<p>Thanks for your feedback.<br /><span>We\'ll use it to improve our answer.</span></p>');
			});
			
			$(options.askButtonSelector).click(askButtonClickHandler);
			$(options.questionSelector).keypress(function(e){
				if (!internalState.firstTypeEventFired) {
					internalState.firstTypeEventFired = true;
					internalState.predictiveAskResultSelected = false;
					analyticsFunctions.firstTypeEvent($(this).attr('id'));
				}
				
				if (e.which == 13) {
					
					e.preventDefault();
					
					$(this).blur().autocomplete("close");
					internalState.question = $(this).val();
					$(this).parent('div').find(options.askButtonSelector).click();
				}
			});
			
			$(document).on("click", options.contactUsIdSelector, supportFns.contactUsClicked);
			
			$(document).on("click", options.chatNowSelector, supportFns.chatFormButtonClicked);

			$(document).on("click", options.phoneSelector, supportFns.phoneButtonClicked);

			$(document).on("click", options.articleLinkSelector, answersFunctions.documentViewHandler);
			
			$(document).on("click", options.supportLinksSelector, supportFns.contactUsClicked);
			
			$(options.questionSelector).focus(function(){
				internalState.show_ssp_results = true;
			});
						
			if (!Modernizr.input.placeholder) {
				// Simulate placeholder text
				$(options.questionSelector).each(function(){
					var placeholder = $(this).attr('placeholder');
					$(this).val(placeholder);
					
					$(this).focus(function(){
						if ($(this).val() == placeholder) {
							$(this).val('');
						}
					});
					
					$(this).focusout(function() {
						if ($(this).val().replace(/\s+/g, '') == "") {
							$(this).val(placeholder);
						}
					});
				});
			}
			
			
			$("#rank").focusout(function(){
				options.autocompleteMinRank = parseFloat($(this).val());
			});
			
			$("#prefix").click(function(){
				options.autocomplete_ssp.prefixenable = $(this).is(':checked') ? true : false;
			}); 
			
			$("#ledenable").click(function(){
				options.autocomplete_ssp.ledenable = $(this).is(':checked') ? true : false;
			});
			
			$("#led").focusout(function() {
				options.autocomplete_ssp.maxdistance = parseInt($(this).val());
			});
			
			$("#maxresults").focusout(function(){
				options.autocomplete_ssp.maxresults = parseInt($(this).val());
			});
			
			$(".model").click(function(){
				var id = $(this).attr('id');
				var index = options.autocomplete_ssp.model.indexOf(id);
				if ($(this).is(':checked')) {
					// Add to list of models
					if (index == -1) { 
						options.autocomplete_ssp.model.push(id); 
					}
				}
				else {
					// Remove from list of models
					if (index != -1) {
						options.autocomplete_ssp.model.splice(index, 1);
					}
				}				
			});
			
			$("#bigram").focusout(function(){
				options.autocomplete_ssp.maxbigramcount = parseInt($(this).val());
			});
			
			$("#unigram").focusout(function(){
				options.autocomplete_ssp.maxunigramcount = parseInt($(this).val());
			});
			
			// If there's a question in the query string, search for it now
			var urlQuestion = Tax.getUrlParam('q');
			if (urlQuestion) {
				var pars = Tax.getUrlParam('pars');
				if (pars != null) {
					internalState.predictiveAskResultSelected = pars === "true" ? true : false;
				}
				// Fill in the question and click on the ask button
				$(options.questionSelector + ":first").val(urlQuestion).parent('div').find(options.askButtonSelector).click();
			}
			
			if (options.display_article) {
				internalState.question = $("#article-title").text();
			}
		},
		calculateSupportLevel: function() {
			var phoneLevel = Math.floor(Math.random()*99);
			var chatLevel = Math.floor(Math.random()*99);
			var cValue = "";
			
			cValue += phoneLevel <= options.phone.traffic ? 1 : 0;
			cValue += ":";
			cValue += chatLevel <= options.chat.traffic ? 1 : 0;
			
			Tax.Cookie.write(constants.supportCookie, cValue);
		},
		appendDebugWindow: function() {
			$("body").append('<div id="debug-window" style="position: absolute; top: 5px; right: 5px; width: 40%; min-height: 100px; background-color: #EEEEEE; border: 1px solid #999999;"><p><strong>Debug Window</strong></p><p id="debug-contents"></p></div>');
		},
		appendContentContainers: function() {
			var contentContainer = $(options.contentContainer);
			for (var i = 0; i < constants.resetContainers.length; i++) {
				if (options.display_article && (constants.resetContainers[i] == options.articleContainer)) {
					// Don't append article container if we're displaying the article on load. It'll already be on the page
				}
				else {
					contentContainer.append($("<div id='"+ constants.resetContainers[i].replace('#', '') +"'></div>"))	
				}				
			}
		},
		isOnAnswersHome: function() {
			return window.location.pathname.match(/^\/tax-answers/);
		},
		isDirectInstantAnswer: function() {
			return window.location.pathname.match(/^\/tax-answers\/instant/);
		}
	};

	var feedbackFunctions = {
		vote: function(uri, direction, callback) {
			callback();
			
			$.post(endpoints.feedback_endpoint, {
					documentfeedbackitem: JSON.stringify({ voteDirection: direction, pageUri: uri, query: internalState.question })
				}
			);
			
			analyticsFunctions.instantAnswerSurvey(direction, internalState.instantAnswerShownId);
		},
		voteUp: function(uri) {
			this.vote(uri, constants.voteUp, options.voteUpCallback);
		},
		voteDown: function(uri) {
			this.vote(uri, constants.voteDown, options.voteDownCallback);
		}
	};

	var answersFunctions = {
		autocompleteSelected: function(event, ui) {
			internalState.question = ui.item.label;
			internalState.predictiveAskResultSelected = true;
			var questionFieldText = $(this).parent('div').find(options.questionSelector).val();
			analyticsFunctions.predictiveAskResultsClickEvent(internalState.question, questionFieldText);
		},
		findAnswerForQuestion: function(question) {
			// Initiating search, don't show any autocomplete results that may be late.
			internalState.show_ssp_results = false;
			options.searchStarting();
			$.getJSON(endpoints.answers_endpoint, { query: internalState.question, offeringId: constants.offeringId }, this.answerFoundCallback);
		},
		answerFoundCallback: function(data) {
			answersFunctions.resetPageState();
			internalState.question = data.query;
			internalState.answersResponse = data;
			
			Modernizr.input.placeholder ? $(options.questionSelector).val('') : 
				$(options.questionSelector).each(function(){ $(this).val($(this).attr('placeholder')); });

			options.searchEnded();
			$(options.askButtonSelector).removeClass('loading');
			
			if (options.hideContainerOnSearch != null) {
				$(options.hideContainerOnSearch).hide();
			}
			if (options.showContainerOnSearch != null) {
				$(options.showContainerOnSearch).show();
			}
			
			var faqs = [];
			var answersContainer = $(options.answersContainerSelector);
			
			if (data.hasOwnProperty('answerList')) {				
				// We have answers. 
				for (var i = 0; i < data.answerList.length; i++) {
					if (data.answerList[i].source == constants.instantAnswer) {
						if (!options.show_all_results) {
							var ia = data.answerList[i];
							// Create object with ia as a key
							var templateVars = { instantAnswer: ia, question: data.query };
							
							internalState.instantAnswerUri = ia.uri;
							
							var template = Handlebars.compile($("#instant-answer-template").html());
							answersContainer.empty().append(template(templateVars));
							stateFunctions.pushState();
							internalState.instantAnswerShownId = ia.docId;
							analyticsFunctions.instantAnswerShownEvent(ia.docId);
							window.scrollTo(0,0);
							supportFns.contactUsClicked(e); //added for 569
							return;
						}
						else{
							faqs.push(data.answerList[i]);
							internalState.articlesShown.push(data.answerList[i].docId);
						}
					}
					else {
						faqs.push(data.answerList[i]);
						internalState.articlesShown.push(data.answerList[i].docId);
					}
				}

				// We haven't displayed an instantanswer, display other results
				var context = { 'faqs': faqs, question: data.query };
				var template = Handlebars.compile($("#faqs-template").html());
				
				answersContainer.empty().show().append(template(context));
				if (data.answerList.length > 0) {
					analyticsFunctions.articlesReturnedEvent();
				}
			}
			else {
				//alert("No answers found");
			}
			
			//added for 569
			$.get(
					endpoints.srs_endpoint, 
					{ 
						statement: internalState.question,
						fmt: 'json',
						productFamily: 101,
						getSearch: 'false',
						resultCount: 0
					},
					supportFns.contactInformationCallback
				).always(stateFunctions.pushState);
			window.scrollTo(0,0);
			
			//commented out for 569
			//stateFunctions.pushState();
		},
		documentViewHandler: function(e) {
			e.preventDefault();
			
			var templateVars = { article_title: $(this).text(), article_id: $(this).attr('data-article-id') };
			analyticsFunctions.articleClickedEvent(templateVars.article_id);

			if ($(this).attr('data-source') == constants.instantAnswer) {
				// Show instant answer template
				for (var i = 0; i < internalState.answersResponse.answerList.length; i++) {
					if (internalState.answersResponse.answerList[i].docId == templateVars.article_id) {
						var templateVars = { instantAnswer: internalState.answersResponse.answerList[i], question: internalState.question, article_title: internalState.answersResponse.answerList[i].title, article_id: internalState.answersResponse.answerList[i].docId };
						internalState.instantAnswerUri = internalState.answersResponse.answerList[i].uri;
						
						var template = Handlebars.compile($("#instant-answer-template").html());
						$(options.answersContainerSelector).empty().append(template(templateVars));
						stateFunctions.pushState();
						window.scrollTo(0,0);
						supportFns.contactUsClicked(e); //added for 569
					}
				}
			}
			else {
				$.get($(this).attr('href'), { helpdrawer: "true" }, function(data){
					var template = Handlebars.compile($("#article-template").html());
					templateVars['content'] = data;				
					answersFunctions.resetPageState();
					$(options.articleContainer).empty().append(template(templateVars));
					stateFunctions.pushState();
					window.scrollTo(0,0);
					supportFns.contactUsClicked(e); //added for 569
				});	
			}
		},
		resetPageState: function() {
			for (var i = 0; i < constants.resetContainers.length; i++) {
				$(constants.resetContainers[i]).empty().show();
			}
			
			if ($("#ABYS-home").hasClass("loading")) {
				$("#ABYS-home").removeClass("loading");
			}
		}
	};

	var supportFns = {
		getAnswersSupportCookie: function() {
			return Tax.Cookie.read(constants.supportCookie).split(":");
		},
		shouldDisplayPhone: function() {
			var phoneCookie = parseInt(this.getAnswersSupportCookie()[0]);
			if (!phoneCookie) { return false; }
			
			if (internalState.phoneChannel.hasOwnProperty("emergencyShutoff") && internalState.phoneChannel.emergencyShutoff) {
				return false;
			}
			else if (internalState.phoneChannel.hasOwnProperty("isWithinOperatingHours") && internalState.phoneChannel.isWithinOperatingHours) {
				return options.phone.display;
			}
			
			return false;
		},
		shouldDisplayChat: function() {
			var chatCookie = parseInt(this.getAnswersSupportCookie()[1]);
			if (!chatCookie) { return false; }
			
			if (internalState.chatChannel.hasOwnProperty("emergencyShutoff") && internalState.chatChannel.emergencyShutoff) {
				return false;
			}
			else if (internalState.chatChannel.hasOwnProperty("isWithinOperatingHours") && internalState.chatChannel.isWithinOperatingHours) {
				return options.chat.display;
			}
			
			return false;
		},
		contactUsClicked: function(e) {
			e.preventDefault();
			$.get(
				endpoints.srs_endpoint, 
				{ 
					statement: internalState.question,
					fmt: 'json',
					productFamily: 101,
					getSearch: 'false',
					resultCount: 0
				}, 
				supportFns.contactInformationCallback
			);			
		},
		contactInformationCallback: function(data) {
			$(options.contactUsIdSelector).hide();
			//$(".feedback").empty();
			
			// Use canned data for now
			supportFns.processContactInformation(data);
			
			var displayChat = supportFns.shouldDisplayChat();
			var displayPhone = supportFns.shouldDisplayPhone();
			
			if (displayChat && displayPhone) {
				// Load phone and chat template
				var template = Handlebars.compile($("#phone-and-chat").html());
				$(options.helpContainerSelector).empty().append(template(internalState));
			}
			else if (displayChat) {
				var template = Handlebars.compile($("#chat-only").html());
				$(options.helpContainerSelector).empty().append(template(internalState));
			}
			else if (displayPhone) {
				var template = Handlebars.compile($("#phone-only").html());
				$(options.helpContainerSelector).empty().append(template(internalState));
			}
			else {
				var template  = Handlebars.compile($("#no-phone-no-chat").html());
				$(options.helpContainerSelector).empty().append(template(internalState));
			}
			
			var phoneWaitTime = internalState.phoneChannel.hasOwnProperty("waitTime") ? internalState.phoneChannel.waitTime : "";
			var chatWaitTime = internalState.chatChannel.hasOwnProperty("waitTime") ? internalState.chatChannel.waitTime : "";
			
			analyticsFunctions.contactExpertButtonClicked(internalState.category, phoneWaitTime, chatWaitTime);
		},
		processContactInformation: function(data) {			
			if (data.hasOwnProperty('channels')) {
				for (var i = 0; i < data.channels.length; i++) {
					var channel = data.channels[i];
					// channel.isWithinOperatingHours = false;
					switch (channel.channelName)
					{
						case "Phone":
							$.extend(internalState.phoneChannel, channel);
							break;
						case "Chat":
							$.extend(internalState.chatChannel, channel);
							break;
					}
				}
			}
			
			setCategory(data.category);
		},
		chatFormButtonClicked: function(e) {
			e.preventDefault();
			// Function that executes when user chooses chat option to retrieve the chat form submission
			$(options.helpContainerSelector).hide();
			
			var qsObj = { 
				ISDeptId: 			internalState.chatChannel.instantSvcDeptId, 
				formId: 			internalState.chatChannel.instantSvcFormId, 
				customerCategory:	internalState.category,
				workgroup: 			internalState.chatChannel.ininWorkgroupName,
				chatWaitTime: 		internalState.chatChannel.waitTime,
				subject:			internalState.question
			};

			// Hack for support team. They need spaces encoded as %20 instead of +
			var qs = $.param(qsObj).replace(/\+/g, '%20');
			var template = Handlebars.compile($("#support_form").html());
			$(options.contactFormContainer).append(template({ iframe_src: options.chat.form + "?" + qs }));
			
			$("#support_iframe").load(supportFns.resizeIframe);
		},
		phoneButtonClicked: function(e) {
			e.preventDefault();
			
			$(options.helpContainerSelector).hide();
			
			// Process the phone number first
			var phoneNumber = internalState.phoneChannel.phoneNumber.replace(/[^\d]/g, '');
			
			if (phoneNumber.length == 11) {
				// remove the prefix
				phoneNumber = phoneNumber.substring(1, phoneNumber.length);
			}
			
			var qsObj = { 
				phoneNumber: phoneNumber.split("").reverse().join(""), 
				ISDeptId: 			internalState.phoneChannel.instantSvcDeptId, 
				workgroup: 			internalState.phoneChannel.ininWorkgroupName, 
				phoneWaitTime:		internalState.phoneChannel.waitTime,
				customerCategory:	internalState.category, 
				bucketIdType: 		internalState.bucket, 
				productId: 			101,
				subject: 			internalState.question
			}
			
			// Hack for support team. They need spaces encoded as %20 instead of +
			var qs = $.param(qsObj).replace(/\+/g, '%20');
			var template = Handlebars.compile($("#support_form").html());
			$(options.contactFormContainer).append(template({ iframe_src: options.phone.form + "?" + qs }));
			
			$("#support_iframe").load(supportFns.resizeIframe);
		},
		resizeIframe: function() {
			var supportIframe = $("#support_iframe");
			supportIframe.height(supportIframe.contents().find("html").height());
		}
	}

	this.public_interface = {
		init: function(custom_options) {
			$.extend(options, custom_options);
			
			privateFunctions.bind();
			privateFunctions.calculateSupportLevel();
			privateFunctions.appendContentContainers();
			if (options.debug) {
				privateFunctions.appendDebugWindow();
			}
			
			if (privateFunctions.isOnAnswersHome()) {
				History.Adapter.bind(window,'statechange',function() {
					var state = History.getState();
					stateFunctions.restoreState(state);
				});
				
				// Need to restore state in case user navigated away and came back.
				// statechange does not fire in this case
				if (Tax.getUrlParam('state')) {
					stateFunctions.restoreState(History.getState());
				}
			}
		}
	}
	
	return this.public_interface;
}();

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj, start) {
	     for (var i = (start || 0), j = this.length; i < j; i++) {
	         if (this[i] === obj) { return i; }
	     }
	     return -1;
	}	
}
;

			   		$(function(){
			   			Tax.SelfHelp.init({});
			   		});
			   ;

			   Tax.Bento = {
						
						$handle : null,
							
						settings : {
							height : 450,
							width : 675,
							heightOffset : -6,
							widthOffset : 0,
							modal : true,
							allowTransparency : false,
							dialogClass : 'standardBento',
							containerId : 'standard-overlay',
							inlineId : null,
							overlayClickable: true,
							title: '',
							autoOpen: false,
							beforeClose: function(event, ui){
								//ie fix for memory leak
								Tax.Bento.$handle.children('iframe').attr('src',"javascript:false;");
								
								if (Tax.Bento.$handle.children('iframe').length > 0) {
									Tax.Bento.$handle.remove();
								}
								
								Tax.Bento.$handle = null;
							}
							
						},
						
						/**
						 * Open the bento
						 */
						open : function(url, options) {
							if(Tax.Bento.$handle) {
								Tax.Bento.close();
							}
							
							var settings = {};
							
							if(options) {
								$.extend(settings, Tax.Bento.settings, options);
							}
							else {
								$.extend(settings, Tax.Bento.settings);
							}
							
							if(url) {
								settings.height = parseFloat(Tax.getUrlParam("height", url)) || settings.height;
								settings.width = parseFloat(Tax.getUrlParam("width", url)) || settings.width;
								settings.inlineId = Tax.getUrlParam('inlineId', url);
							}
							else if(!settings.inlineId) {
								//Tax.logError('Attempted to open thickbox with no url or inline content');
								return;
							}

							var content = settings.inlineId ? 
										'#' + settings.inlineId : 
										Tax.Bento.buildFrame(settings.containerId, settings.allowTransparency, (settings.height + settings.heightOffset), (settings.width + settings.widthOffset));
									
							Tax.Bento.$handle = $(content).dialog(settings);

							//src needs to not be set on the tag (breaks ie)
							Tax.Bento.$handle.children('iframe').attr('src', url);
							Tax.Bento.$handle.dialog('open');

							if(settings.overlayClickable) {
								//close bento when clicking on overlay
								$('.ui-widget-overlay').click(Tax.Bento.close);	
							}
						},
						
						/**
						 * Close the bento
						 */
						close : function() {
							if(!Tax.Bento.$handle) {
								return;
							}
							
							Tax.Bento.$handle.dialog('close');
							
							Tax.Bento.$handle = null;
						},
						
						/**
						 * @private
						 */
						buildFrame : function(id, transparent, height, width) {
							return '<div id="' + id + '"><iframe frameborder="0" allowtransparency ="' + transparent + '" height="' + height + '" width="' + width + '" src="javascript:false;"></iframe></div>';
						}
					};

					$(function(){
						$(document).on("click", ".thickbox, .poppy:not(.helpMeChoose)", function() {
							var url = $(this).attr('href');
							
							Tax.Bento.open(url);
							
							return false;
						});
						
						$(document).on("click", ".helpMeChoose", function(){
							var url = $(this).attr('href');
							
							var options = {
								height : 660,
								width : 790,
								heightOffset : -31,
								allowTransparency : true,
								dialogClass : 'helpMeChoose'
							};
							
							Tax.Bento.open(url, options);
							
							return false;
						});
					});;
					$(function(){
						
						/*******************  FTA OVERLAY POP UP THICKBOX ******************/

						$('.fta-lm').click(function() {
							var url = $(this).attr('href');
							
							var options = {
								height : 470,
								width : 890,
								heightOffset : 0,
								allowTransparency : true,
								dialogClass : 'fta-dialog',
								containerId : 'fta-overlay'
							};
							
							Tax.Bento.open(url, options);
							
							return false;
						});
						
							
						/******************* END: FTA OVERLAY POP UP THICKBOX ******************/
							
					});;
					/*-------------------------- Auto Button ----------------------------*/
					var Tax = Tax || {};

					Tax.autobtn = function(){	
						$('.autobtn, .autobtn-wide, .autobtn-thin').each(function(){
							var imgText = $(this).text();
							$(this).text("");
							$(this).append("<span class=\"btn-left\"></span><span class=\"btn-mid bold white large\">"+imgText+"</span><span class=\"btn-right\"></span>");		
						});
						$('.autobtn ,.autobtn-wide, .autobtn-thin').hover(function(){
							$(this).addClass('abtn-hover');
						},function(){
							$(this).removeClass('abtn-hover');
						});	
					};

					$(function(){
						Tax.autobtn();
						// end Auto Button code
					});	
					;
					/////// Session Id Functions Begin ////////////////////
					function getSessionId(){
						// Get a sessionid, cookie, qs, generate
						var ttsid = "";	// Omniture session id
						// check cookie
						ttsid = getCookie("ttsid");
						if ((ttsid == "") || (ttsid == null)){
							// check url querystring
							var fullPageUrl = window.location.search;
							ttsid = getQueryStringValue(fullPageUrl, "ttsid");
						}
						if ((ttsid == "") || (ttsid == null)){
							// generate sessionid from guid
							ttsid = getGuid(20);
						}
						return ttsid;
					}
					function storeSessionId(ttsid){
						var expireDays = 220;
						var expireStamp = new Date(new Date().getTime() + expireDays * 24 * 3600 * 1000);
						setCookie("ttsid", ttsid, expireStamp, "/",sessionDomain);
					}
					function initSessionId(){
						var ttsid = getSessionId();
						storeSessionId(ttsid);
						return ttsid;
					}
					function getGuid(n){
						var t = new Date().getTime()+""; //milliseconds since 1 January 1970
						n = n - t.length;
						var g = t;
						for(var i = 0; i < n; i++) {
							g += Math.floor(Math.random() * 0xF).toString(0xF) + (i == 8 || i == 12 || i == 16 || i == 20 ? "-" : "");
						}
						return g;
					}
					/////// Session Id Functions End /////////////////
					/////// Session Id Main Start ////////////////////
					var sessionDomain=".intuit.com";
					var ttsid = initSessionId();
					var today = new Date();
					var timeString = today.getTime();
					/////// Session Id Main End ////////////////////

					function getQueryStringValue(sourceUrl, key) {
					  var u = sourceUrl;
					  var parmValue = "";
					  u = u.slice(1);
					  parms = u.split("&");
					  var parmArray = [];
					  for ( var i = 0; i < parms.length; i++){
					    parmArray.push(parms[i].split("="));
					  }
					  for (var i=0;i<parmArray.length; i++) {
					    if (parmArray[i][0] == key) {
					      parmValue = parmArray[i][1];
					    }
					  }
					  return parmValue;
					}

					// Cookie management
					function getCookie(name) {
						var dc = document.cookie;
						var prefix = name + "=";
						var begin = dc.indexOf("; " + prefix);
						if (begin == -1) {
							begin = dc.indexOf(prefix);
							if (begin != 0) return null;
						} else begin += 2;
						var end = document.cookie.indexOf(";", begin);
						if (end == -1) end = dc.length;
						return unescape(dc.substring(begin + prefix.length, end));
					}

					function setCookie(name, value, expires, path, domain, secure) {
						var curCookie = name + "=" + escape(value) +
						((expires) ? "; expires=" + expires.toGMTString() : "") +
						((path) ? "; path=" + path : "") +
						((domain) ? "; domain=" + domain : "") +
						((secure) ? "; secure" : "");
						document.cookie = curCookie;	
					}
					/////////////// ASA launch /////////////////////
					var asaWindowRef = null;
					function launchASA (){
						var topic = '';
						if (arguments.length>0) {
							topic = arguments[0];
						} else if (typeof(contactTopic) != 'undefined' && contactTopic != null) {
							topic = contactTopic;
						}	
						if (asaWindowRef != null) {
							if (asaWindowRef.closed) {
								asaWindowRef = OpenCenteredWindow('/support/asa/mainpage.jsp?topic=' + topic, 'tina', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes', '600', '525', true)
							}
							asaWindowRef.focus();
						} else {
							asaWindowRef = OpenCenteredWindow('/support/asa/mainpage.jsp?topic=' + topic, 'tina', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes', '600', '525', true)
						}
					}
					function OpenCenteredWindow(theURL,winName,features, myWidth, myHeight, isCenter) { //v3.0
						if (document.winName) { alert('exists'); }
					  if(window.screen)if(isCenter)if(isCenter==true){
					    var myLeft = (screen.width-myWidth)/2;
					    var myTop = (screen.height-myHeight)/2;
					    features+=(features!='')?',':'';
					    features+=',left='+myLeft+',top='+myTop;
					  }
					  return window.open(theURL,winName,features+((features!='')?',':'')+'width='+myWidth+',height='+myHeight);
					}
					/* Fix Thickbox disappear bug */
					window.onunload = function(){};;
					/*
					 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
					 *
					 * Uses the built In easIng capabilities added In jQuery 1.1
					 * to offer multiple easIng options
					 *
					 * Copyright (c) 2007 George Smith
					 * Licensed under the MIT License:
					 *   http://www.opensource.org/licenses/mit-license.php
					 */

					// t: current time, b: begInnIng value, c: change In value, d: duration
					jQuery.easing['jswing'] = jQuery.easing['swing'];

					jQuery.extend( jQuery.easing,
					{
						def: 'easeOutQuad',
						swing: function (x, t, b, c, d) {
							//alert(jQuery.easing.default);
							return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
						},
						easeInQuad: function (x, t, b, c, d) {
							return c*(t/=d)*t + b;
						},
						easeOutQuad: function (x, t, b, c, d) {
							return -c *(t/=d)*(t-2) + b;
						},
						easeInOutQuad: function (x, t, b, c, d) {
							if ((t/=d/2) < 1) return c/2*t*t + b;
							return -c/2 * ((--t)*(t-2) - 1) + b;
						},
						easeInCubic: function (x, t, b, c, d) {
							return c*(t/=d)*t*t + b;
						},
						easeOutCubic: function (x, t, b, c, d) {
							return c*((t=t/d-1)*t*t + 1) + b;
						},
						easeInOutCubic: function (x, t, b, c, d) {
							if ((t/=d/2) < 1) return c/2*t*t*t + b;
							return c/2*((t-=2)*t*t + 2) + b;
						},
						easeInQuart: function (x, t, b, c, d) {
							return c*(t/=d)*t*t*t + b;
						},
						easeOutQuart: function (x, t, b, c, d) {
							return -c * ((t=t/d-1)*t*t*t - 1) + b;
						},
						easeInOutQuart: function (x, t, b, c, d) {
							if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
							return -c/2 * ((t-=2)*t*t*t - 2) + b;
						},
						easeInQuint: function (x, t, b, c, d) {
							return c*(t/=d)*t*t*t*t + b;
						},
						easeOutQuint: function (x, t, b, c, d) {
							return c*((t=t/d-1)*t*t*t*t + 1) + b;
						},
						easeInOutQuint: function (x, t, b, c, d) {
							if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
							return c/2*((t-=2)*t*t*t*t + 2) + b;
						},
						easeInSine: function (x, t, b, c, d) {
							return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
						},
						easeOutSine: function (x, t, b, c, d) {
							return c * Math.sin(t/d * (Math.PI/2)) + b;
						},
						easeInOutSine: function (x, t, b, c, d) {
							return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
						},
						easeInExpo: function (x, t, b, c, d) {
							return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
						},
						easeOutExpo: function (x, t, b, c, d) {
							return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
						},
						easeInOutExpo: function (x, t, b, c, d) {
							if (t==0) return b;
							if (t==d) return b+c;
							if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
							return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
						},
						easeInCirc: function (x, t, b, c, d) {
							return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
						},
						easeOutCirc: function (x, t, b, c, d) {
							return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
						},
						easeInOutCirc: function (x, t, b, c, d) {
							if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
							return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
						},
						easeInElastic: function (x, t, b, c, d) {
							var s=1.70158;var p=0;var a=c;
							if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
							if (a < Math.abs(c)) { a=c; var s=p/4; }
							else var s = p/(2*Math.PI) * Math.asin (c/a);
							return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
						},
						easeOutElastic: function (x, t, b, c, d) {
							var s=1.70158;var p=0;var a=c;
							if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
							if (a < Math.abs(c)) { a=c; var s=p/4; }
							else var s = p/(2*Math.PI) * Math.asin (c/a);
							return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
						},
						easeInOutElastic: function (x, t, b, c, d) {
							var s=1.70158;var p=0;var a=c;
							if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
							if (a < Math.abs(c)) { a=c; var s=p/4; }
							else var s = p/(2*Math.PI) * Math.asin (c/a);
							if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
							return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
						},
						easeInBack: function (x, t, b, c, d, s) {
							if (s == undefined) s = 1.70158;
							return c*(t/=d)*t*((s+1)*t - s) + b;
						},
						easeOutBack: function (x, t, b, c, d, s) {
							if (s == undefined) s = 1.70158;
							return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
						},
						easeInOutBack: function (x, t, b, c, d, s) {
							if (s == undefined) s = 1.70158; 
							if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
							return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
						},
						easeInBounce: function (x, t, b, c, d) {
							return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
						},
						easeOutBounce: function (x, t, b, c, d) {
							if ((t/=d) < (1/2.75)) {
								return c*(7.5625*t*t) + b;
							} else if (t < (2/2.75)) {
								return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
							} else if (t < (2.5/2.75)) {
								return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
							} else {
								return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
							}
						},
						easeInOutBounce: function (x, t, b, c, d) {
							if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
							return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
						}
					});;
					/* ============================================================
					 * bootstrap-dropdown.js v2.2.2
					 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
					 * ============================================================
					 * Copyright 2012 Twitter, Inc.
					 *
					 * Licensed under the Apache License, Version 2.0 (the "License");
					 * you may not use this file except in compliance with the License.
					 * You may obtain a copy of the License at
					 *
					 * http://www.apache.org/licenses/LICENSE-2.0
					 *
					 * Unless required by applicable law or agreed to in writing, software
					 * distributed under the License is distributed on an "AS IS" BASIS,
					 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
					 * See the License for the specific language governing permissions and
					 * limitations under the License.
					 * ============================================================ */


					!function ($) {

					  "use strict"; // jshint ;_;


					 /* DROPDOWN CLASS DEFINITION
					  * ========================= */

					  var toggle = '[data-toggle=dropdown]'
					    , Dropdown = function (element) {
					        var $el = $(element).on('click.dropdown.data-api', this.toggle)
					        $('html').on('click.dropdown.data-api', function () {
					          $el.parent().removeClass('open')
					        })
					      }

					  Dropdown.prototype = {

					    constructor: Dropdown

					  , toggle: function (e) {
					      var $this = $(this)
					        , $parent
					        , isActive

					      if ($this.is('.disabled, :disabled')) return

					      $parent = getParent($this)

					      isActive = $parent.hasClass('open')

					      clearMenus()

					      if (!isActive) {
					        $parent.toggleClass('open')
					      }

					      $this.focus()

					      return false
					    }

					  , keydown: function (e) {
					      var $this
					        , $items
					        , $active
					        , $parent
					        , isActive
					        , index

					      if (!/(38|40|27)/.test(e.keyCode)) return

					      $this = $(this)

					      e.preventDefault()
					      e.stopPropagation()

					      if ($this.is('.disabled, :disabled')) return

					      $parent = getParent($this)

					      isActive = $parent.hasClass('open')

					      if (!isActive || (isActive && e.keyCode == 27)) return $this.click()

					      $items = $('[role=menu] li:not(.divider):visible a', $parent)

					      if (!$items.length) return

					      index = $items.index($items.filter(':focus'))

					      if (e.keyCode == 38 && index > 0) index--                                        // up
					      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
					      if (!~index) index = 0

					      $items
					        .eq(index)
					        .focus()
					    }

					  }

					  function clearMenus() {
					    $(toggle).each(function () {
					      getParent($(this)).removeClass('open')
					    })
					  }

					  function getParent($this) {
					    var selector = $this.attr('data-target')
					      , $parent

					    if (!selector) {
					      selector = $this.attr('href')
					      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
					    }

					    $parent = $(selector)
					    $parent.length || ($parent = $this.parent())

					    return $parent
					  }


					  /* DROPDOWN PLUGIN DEFINITION
					   * ========================== */

					  var old = $.fn.dropdown

					  $.fn.dropdown = function (option) {
					    return this.each(function () {
					      var $this = $(this)
					        , data = $this.data('dropdown')
					      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
					      if (typeof option == 'string') data[option].call($this)
					    })
					  }

					  $.fn.dropdown.Constructor = Dropdown


					 /* DROPDOWN NO CONFLICT
					  * ==================== */

					  $.fn.dropdown.noConflict = function () {
					    $.fn.dropdown = old
					    return this
					  }


					  /* APPLY TO STANDARD DROPDOWN ELEMENTS
					   * =================================== */

					  $(document)
					    .on('click.dropdown.data-api touchstart.dropdown.data-api', clearMenus)
					    .on('click.dropdown touchstart.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
					    .on('touchstart.dropdown.data-api', '.dropdown-menu', function (e) { e.stopPropagation() })
					    .on('click.dropdown.data-api touchstart.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
					    .on('keydown.dropdown.data-api touchstart.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

					}(window.jQuery);;


					