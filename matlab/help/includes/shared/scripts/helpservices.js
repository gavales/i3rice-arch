window.initDeferred = $.Deferred();
window.helpService = {
    "callbacks" : {},
    
    "callMessageService" : function(channel, data, callback) {
        var msgDeferred = $.Deferred();
        msgDeferred.then(callback);
        var id = channel + "_" + new Date().getTime();
        
        this.registerCallbackDeferred(msgDeferred, id);
        var messageObj = {
            "channel" : channel,
            "data" : data,
            "id" : id
        }
        window.helpserviceframe.postMessage(messageObj, window.location.origin);        
    },

    "registerCallbackDeferred" : function(deferredObj, id) {
        var cb = this.callbacks;
        cb[id] =  deferredObj;
        
        setTimeout(function() {
            if (cb[id] && deferredObj.state() === "pending") {
                delete cb[id];
                deferredObj.reject();
            }
        }, 10000);
    },    
    
    "receiveMessage" : function(msgEvt) {
        var id = msgEvt.data.id;
        if (this.callbacks[id]) {
            this.callbacks[id].resolve(msgEvt.data.data);
            delete this.callbacks[id];
        }
    }
}

$(document).ready(initHelpServices);

function initHelpServices() {
    if (window.parent && window.parent.location != window.location) {
        // We are in an iframe, presumably the JavaScript Help Browser's
        // help panel.
        window.helpserviceframe = window.parent;
        setupFinished();
    } else if (window.location.origin.match(/^https?:\/\/localhost.*/)) {
        // This looks like local doc served by the connector but not
        // in the JavaScript Help Browser.
        window.helpserviceframe = createHelpServiceFrame();
        handleMatlabLinks();
    }
}

function createHelpServiceFrame() {
    var ifrm = document.createElement("iframe");
    var hsUrl = window.location.origin + "/ui/help/helpbrowser/helpbrowser/helpservices.html";
    ifrm.setAttribute("src", hsUrl);
    ifrm.setAttribute("onLoad", "setupFinished();");
    ifrm.style.width = "0px";
    ifrm.style.height = "0px";
    document.body.appendChild(ifrm);
    return $(ifrm).get(0).contentWindow;
}

function handleMatlabLinks() {
    $(window).bind("click","a",function(evt) {
        var href = evt.target.getAttribute("href");
        if (href && href.match(/^\s*matlab:.*/)) {
            evt.preventDefault;
            callMessageService("matlab", {"url":href}, function() {});
        }
    });
}

function setupFinished() {
    window.initDeferred.resolve();
    window.addEventListener("message", function(msgEvt) {
        this.helpService.receiveMessage(msgEvt);
    });
}

function requestHelpService(params, services, callback, errorhandler) {
    var servicePrefs;
    try {
        servicePrefs = $.parseJSON(sessionStorage.getItem("help_preferred_services"));
    } catch (e) {
        servicePrefs = null;
    }
    
    if (!servicePrefs) {
        // TODO: We must be able to do better here.
        if (window.helpserviceframe) {
            callMessageService("servicepref", document.location.href, function(data) {
                sessionStorage.setItem("help_preferred_services", JSON.stringify(data));
                doServiceRequest(data, params, services, callback, errorhandler);
            });
        } else {
            var servicePrefs = document.location.protocol.match(/https?/) ? ["webservice","requesthandler"] : ["requesthandler"];
            sessionStorage.setItem("help_preferred_services", JSON.stringify(servicePrefs));
            doServiceRequest(servicePrefs, params, services, callback, errorhandler);
        }
    } else {
        doServiceRequest(servicePrefs, params, services, callback, errorhandler);
    }
}

function doServiceRequest(servicePrefs, params, services, callback, errorhandler) {
    for (var i = 0; i < servicePrefs.length; i++) {
        var svc = servicePrefs[i];
        if (services[svc]) {
            // TODO: It would be great to detect errors and continue falling back.
            switch (svc) {
                case "messagechannel" :
                    var channel = services[svc];
                    callMessageService(channel, params, callback);
                    return;
                case "webservice" :
                    var url = services.webservice;
                    var qs = $.param(params);
                    if (qs && qs.length > 0) {
                        url += url.indexOf("?") > 0 ? "&" : "?";
                        url += qs;
                    }
                    jqxhr = $.get(url);
                    jqxhr.done(callback);
                    if (errorhandler) {
                        jqxhr.fail(errorhandler);
                    }
                    return;
                case "requesthandler" :
                    var requestHandlerUrl = services.requesthandler + "?" + $.param(params);
                    document.location = requestHandlerUrl;
                    return;
            }
        }
    }
}

function callMessageService(channel, data, callback) {
    window.initDeferred.done(function() {
        window.helpService.callMessageService(channel, data, callback);
    });
}

function loadUrl(url) {
    document.location = url;
}