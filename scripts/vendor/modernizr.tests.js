//Test for IE10
Modernizr.addTest('ie10', function(){
    return (/*@cc_on!@*/false && document.documentMode === 10);
});
