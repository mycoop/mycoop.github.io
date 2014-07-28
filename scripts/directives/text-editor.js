angular.module('directives.textEditor', []).
    directive('textEditor', function (TextEditor) {

        return {
            restrict: 'A',
            scope: {
                fileId: '='
            },
            link: function (scope, element, attributes) {
                $('<div id="iframeEditor" />').appendTo(element);
                TextEditor.getConfig(scope.fileId, function(data){
                    var docEditor;
                    var fileName = data.fileName;
                    var fileType = data.documentType;

                    var innerAlert = function (message) {
                        if (console && console.log)
                            console.log(message);
                    };

                    var onReady = function () {
                        innerAlert("Document editor ready");
                    };

                    var onBack = function () {
                        location.href = "default.aspx";
                    };

                    var onDocumentStateChange = function (event) {
                        var title = document.title.replace(/\*$/g, "");
                        document.title = title + (event.data ? "*" : "");
                    };

                    var onDocumentSave = function (event) {
                        SaveFileRequest(fileName, fileType, event.data);
                    };

                    var onError = function (event) {
                        if (console && console.log && event)
                            console.log(event.data);
                    };

                    setTimeout(function(){
                        docEditor = new DocsAPI.DocEditor("iframeEditor",
                            {
                                width: "100%",
                                height: "100%",

                                type: 'desktop',
                                documentType: "text",
                                document: {
                                    title: fileName,
                                    url: data.fileUri,
                                    fileType: fileType,
                                    key: data.key,
                                    vkey: data.validateKey,
                                    info: {
                                        author: "Me",
                                        created: "7/20/2014"
                                    },

                                    permissions: {
                                        edit: "True" == "True",
                                        download: true
                                    }
                                },
                                editorConfig: {
                                    mode: 'edit',
                                    canBackToFolder: "True" == "True",

                                    lang: "en",

                                    canCoAuthoring: false,
                                },
                                events: {
                                    'onReady': onReady,
                                    'onBack': onBack,
                                    'onDocumentStateChange': onDocumentStateChange,
                                    'onSave': onDocumentSave,
                                    'onError': onError
                                }
                            });

                    },100);

                    function getXmlHttp() {
                        var xmlhttp;
                        try {
                            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
                        } catch (e) {
                            try {
                                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                            } catch (ex) {
                                xmlhttp = false;
                            }
                        }
                        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
                            xmlhttp = new XMLHttpRequest();
                        }
                        return xmlhttp;
                    }

                    function SaveFileRequest(fileName, fileType, fileUri) {
                        var req = getXmlHttp();
                        if (console && console.log) {
                            req.onreadystatechange = function () {
                                if (req.readyState == 4) {
                                    console.log(req.statusText);
                                    if (req.status == 200) {
                                        console.log(req.responseText);
                                    }
                                }
                            };
                        }

                        var requestAddress = "webeditor.ashx"
                            + "?type=save"
                            + "&filename=" + encodeURIComponent(fileName)
                            + "&filetype=" + encodeURIComponent(fileType)
                            + "&fileuri=" + encodeURIComponent(fileUri);
                        req.open('get', requestAddress, true);

                        req.send(fileUri);
                    }
                });

            }
        }
    });
