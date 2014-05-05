(function() {
	
	"use strict";
	
	var errorHandlers = [];
	
	window.errorHandlerUtil = {
			
		isLoggingEnabled: appVars.csLogging.enabled,

		/**
		 * @param errorHandler
		 * 			The error handler function to invoke when an error occurs
		 */
		addErrorHandler: function(errorHandler) {
			if(errorHandler) {
				errorHandlers.push(errorHandler);
				
				window.onerror = _.partial(function(errorHandlers, errorMessage, url, lineNumber) {
					var clonedErrorHandlers,
						currentErrorHandler,
						retVal;
					
					if(errorHandlers.length) {
						clonedErrorHandlers = _.clone(errorHandlers);
						
						while(clonedErrorHandlers.length && !retVal) {
							currentErrorHandler = clonedErrorHandlers.pop();
							
							if(currentErrorHandler && typeof(currentErrorHandler) === "function") {
								retVal = currentErrorHandler(errorMessage, url, lineNumber);
							}
						}
					}
					
					return retVal || false;
				}, errorHandlers);
			}
		}, 
		
		/**
		 * @param options
		 * 			The options that should be associated with the invocation of this error handler instance
		 * @returns {Function} The default error handler. This default handler fires an event to the configured service endpoint. 
		 */
		createErrorHandlerFromBaseHandler: function(options) {
			return _.partial(ssErrorLoggingBaseHandler, options || {});
		}
			
	};
	
	function initializeOnErrorHandler() {
		if(window.onerror) {
			errorHandlers.push(window.onerror);
		}
		
		window.errorHandlerUtil.addErrorHandler(window.errorHandlerUtil.createErrorHandlerFromBaseHandler({
			url: "/api/v1/cse/jsError",
			prettyMessage: "Client-side JavaScript error detected!",
			logKey: "clientSideJsError",
			logValue: "genericError"
		}));
	}
	
	function ssErrorLoggingBaseHandler(options, errorMessage, errorUrl, lineNumber) {
		options = _.extend({
			prettyMessage: "",
			logKey: "",
			logValue: "",
			errorMessage: errorMessage || "",
			lineNumber: lineNumber || -1,
			userAgent: (navigator && navigator.userAgent) ? navigator.userAgent : "",
			errorUrl: errorUrl || ""
		}, options);
		
		if($ && options.url && window.errorHandlerUtil.isLoggingEnabled) {
			$.post(options.url, options);
		}
		
		return false;
	}
	
	initializeOnErrorHandler();
	
})();