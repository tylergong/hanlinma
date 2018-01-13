/*alertify.js*/
(function () {
    "use strict";
    var TRANSITION_FALLBACK_DURATION = 500;
    var hideElement = function (el) {
        if (!el) {
            return;
        }
        var removeThis = function () {
            if (el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        };
        el.classList.remove("show");
        el.classList.add("hide");
        el.addEventListener("transitionend", removeThis);
        setTimeout(removeThis, TRANSITION_FALLBACK_DURATION);
    };

    function Alertify() {
        var _alertify = {
            version: "1.0.8",
            defaultOkLabel: "Ok",
            okLabel: "Ok",
            defaultCancelLabel: "Cancel",
            cancelLabel: "Cancel",
            defaultMaxLogItems: 2,
            maxLogItems: 2,
            promptValue: "",
            promptPlaceholder: "",
            closeLogOnClick: false,
            closeLogOnClickDefault: false,
            delay: 5000,
            defaultDelay: 5000,
            logContainerClass: "alertify-logs",
            logContainerDefaultClass: "alertify-logs",
            dialogs: {
                buttons: {
                    holder: "<nav>{{buttons}}</nav>",
                    ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
                    cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
                },
                input: "<input type='text'>",
                message: "<p class='msg'>{{message}}</p>",
                log: "<div class='{{class}}'>{{message}}</div>"
            },
            defaultDialogs: {
                buttons: {
                    holder: "<nav>{{buttons}}</nav>",
                    ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
                    cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
                },
                input: "<input type='text'>",
                message: "<p class='msg'>{{message}}</p>",
                log: "<div class='{{class}}'>{{message}}</div>"
            },
            build: function (item) {
                var btnTxt = this.dialogs.buttons.ok;
                var html = "<div class='dialog'>" + "<div>" + this.dialogs.message.replace("{{message}}", item.message);
                if (item.type === "confirm" || item.type === "prompt") {
                    btnTxt = this.dialogs.buttons.cancel + this.dialogs.buttons.ok;
                }
                if (item.type === "prompt") {
                    html += this.dialogs.input;
                }
                html = (html + this.dialogs.buttons.holder + "</div>" + "</div>")
                    .replace("{{buttons}}", btnTxt)
                    .replace("{{ok}}", this.okLabel)
                    .replace("{{cancel}}", this.cancelLabel);
                return html;
            },
            setCloseLogOnClick: function (bool) {
                this.closeLogOnClick = !!bool;
            },
            close: function (elem, wait) {
                if (this.closeLogOnClick) {
                    elem.addEventListener("click", function (ev) {
                        hideElement(ev.srcElement);
                    });
                }
                wait = wait && !isNaN(+wait) ? +wait : this.delay;
                if (wait < 0) {
                    hideElement(elem);
                } else if (wait > 0) {
                    setTimeout(function () {
                        hideElement(elem);
                    }, wait);
                }
            },
            dialog: function (message, type, onOkay, onCancel) {
                return this.setup({
                    type: type, message: message, onOkay: onOkay, onCancel: onCancel
                });
            },
            log: function (message, type, click) {
                var existing = document.querySelectorAll(".alertify-logs > div");
                if (existing) {
                    var diff = existing.length - this.maxLogItems;
                    if (diff >= 0) {
                        for (var i = 0, _i = diff + 1; i < _i; i++) {
                            this.close(existing[i], -1);
                        }
                    }
                }
                this.notify(message, type, click);
            },
            setLogPosition: function (str) {
                this.logContainerClass = "alertify-logs " + str;
            },
            setupLogContainer: function () {
                var elLog = document.querySelector(".alertify-logs");
                var className = this.logContainerClass;
                if (!elLog) {
                    elLog = document.createElement("div");
                    elLog.className = className;
                    document.body.appendChild(elLog);
                }
                if (elLog.className !== className) {
                    elLog.className = className;
                }
                return elLog;
            },
            notify: function (message, type, click) {
                var elLog = this.setupLogContainer();
                var log = document.createElement("div");
                log.className = (type || "default");
                if (_alertify.logTemplateMethod) {
                    log.innerHTML = _alertify.logTemplateMethod(message);
                } else {
                    log.innerHTML = message;
                }
                if ("function" === typeof click) {
                    log.addEventListener("click", click);
                }
                elLog.appendChild(log);
                setTimeout(function () {
                    log.className += " show";
                }, 10);
                this.close(log, this.delay);
            },
            setup: function (item) {
                var el = document.createElement("div");
                el.className = "alertify hide";
                el.innerHTML = this.build(item);
                var btnOK = el.querySelector(".ok");
                var btnCancel = el.querySelector(".cancel");
                var input = el.querySelector("input");
                var label = el.querySelector("label");
                if (input) {
                    if (typeof this.promptPlaceholder === "string") {
                        if (label) {
                            label.textContent = this.promptPlaceholder;
                        } else {
                            input.placeholder = this.promptPlaceholder;
                        }
                    }
                    if (typeof this.promptValue === "string") {
                        input.value = this.promptValue;
                    }
                }

                function setupHandlers(resolve) {
                    if ("function" !== typeof resolve) {
                        resolve = function () {
                        };
                    }
                    if (btnOK) {
                        btnOK.addEventListener("click", function (ev) {
                            if (item.onOkay && "function" === typeof item.onOkay) {
                                if (input) {
                                    item.onOkay(input.value, ev);
                                } else {
                                    item.onOkay(ev);
                                }
                            }
                            if (input) {
                                resolve({
                                    buttonClicked: "ok", inputValue: input.value, event: ev
                                });
                            } else {
                                resolve({
                                    buttonClicked: "ok", event: ev
                                });
                            }
                            hideElement(el);
                        });
                    }
                    if (btnCancel) {
                        btnCancel.addEventListener("click", function (ev) {
                            if (item.onCancel && "function" === typeof item.onCancel) {
                                item.onCancel(ev);
                            }
                            resolve({
                                buttonClicked: "cancel", event: ev
                            });
                            hideElement(el);
                        });
                    }
                }

                var promise;
                if (typeof Promise === "function") {
                    promise = new Promise(setupHandlers);
                } else {
                    setupHandlers();
                }
                document.body.appendChild(el);
                setTimeout(function () {
                    el.classList.remove("hide");
                    if (input && item.type && item.type === "prompt") {
                        input.select();
                        input.focus();
                    } else {
                        if (btnOK) {
                            btnOK.focus();
                        }
                    }
                }, 100);
                return promise;
            },
            okBtn: function (label) {
                this.okLabel = label;
                return this;
            },
            setDelay: function (time) {
                var dur = parseInt(time || 0, 10);
                this.delay = isNaN(dur) ? this.defultDelay : time;
                return this;
            },
            cancelBtn: function (str) {
                this.cancelLabel = str;
                return this;
            },
            setMaxLogItems: function (num) {
                this.maxLogItems = parseInt(num || this.defaultMaxLogItems);
            },
            theme: function (themeStr) {
                switch (themeStr.toLowerCase()) {
                    case "bootstrap":
                        this.dialogs.buttons.ok = "<button class='ok btn btn-primary' tabindex='1'>{{ok}}</button>";
                        this.dialogs.buttons.cancel = "<button class='cancel btn btn-default' tabindex='2'>{{cancel}}</button>";
                        this.dialogs.input = "<input type='text' class='form-control'>";
                        break;
                    case "purecss":
                        this.dialogs.buttons.ok = "<button class='ok pure-button' tabindex='1'>{{ok}}</button>";
                        this.dialogs.buttons.cancel = "<button class='cancel pure-button' tabindex='2'>{{cancel}}</button>";
                        break;
                    case "mdl":
                    case "material-design-light":
                        this.dialogs.buttons.ok = "<button class='ok mdl-button mdl-js-button mdl-js-ripple-effect' tabindex='1'>{{ok}}</button>";
                        this.dialogs.buttons.cancel = "<button class='cancel mdl-button mdl-js-button mdl-js-ripple-effect' tabindex='2'>{{cancel}}</button>";
                        this.dialogs.input = "<div class='mdl-textfield mdl-js-textfield'><input class='mdl-textfield__input'><label class='md-textfield__label'></label></div>";
                        break;
                    case "angular-material":
                        this.dialogs.buttons.ok = "<button class='ok md-primary md-button' tabindex='1'>{{ok}}</button>";
                        this.dialogs.buttons.cancel = "<button class='cancel md-button' tabindex='2'>{{cancel}}</button>";
                        this.dialogs.input = "<div layout='column'><md-input-container md-no-float><input type='text'></md-input-container></div>";
                        break;
                    case "default":
                    default:
                        this.dialogs.buttons.ok = this.defaultDialogs.buttons.ok;
                        this.dialogs.buttons.cancel = this.defaultDialogs.buttons.cancel;
                        this.dialogs.input = this.defaultDialogs.input;
                        break;
                }
            },
            reset: function () {
                this.theme("default");
                this.okBtn(this.defaultOkLabel);
                this.cancelBtn(this.defaultCancelLabel);
                this.setMaxLogItems();
                this.promptValue = "";
                this.promptPlaceholder = "";
                this.delay = this.defaultDelay;
                this.setCloseLogOnClick(this.closeLogOnClickDefault);
                this.setLogPosition("bottom left");
                this.logTemplateMethod = null;
            },
            injectCSS: function () {
                if (!document.querySelector("#alertifyCSS")) {
                    var head = document.getElementsByTagName("head")[0];
                    var css = document.createElement("style");
                    css.type = "text/css";
                    css.id = "alertifyCSS";
                    css.innerHTML = "";
                    head.insertBefore(css, head.firstChild);
                }
            },
            removeCSS: function () {
                var css = document.querySelector("#alertifyCSS");
                if (css && css.parentNode) {
                    css.parentNode.removeChild(css);
                }
            }
        };
        _alertify.injectCSS();
        return {
            _$$alertify: _alertify, reset: function () {
                _alertify.reset();
                return this;
            }, alert: function (message, onOkay, onCancel) {
                return _alertify.dialog(message, "alert", onOkay, onCancel) || this;
            }, confirm: function (message, onOkay, onCancel) {
                return _alertify.dialog(message, "confirm", onOkay, onCancel) || this;
            }, prompt: function (message, onOkay, onCancel) {
                return _alertify.dialog(message, "prompt", onOkay, onCancel) || this;
            }, log: function (message, click) {
                _alertify.log(message, "default", click);
                return this;
            }, theme: function (themeStr) {
                _alertify.theme(themeStr);
                return this;
            }, success: function (message, click) {
                _alertify.log(message, "success", click);
                return this;
            }, error: function (message, click) {
                _alertify.log(message, "error", click);
                return this;
            }, cancelBtn: function (label) {
                _alertify.cancelBtn(label);
                return this;
            }, okBtn: function (label) {
                _alertify.okBtn(label);
                return this;
            }, delay: function (time) {
                _alertify.setDelay(time);
                return this;
            }, placeholder: function (str) {
                _alertify.promptPlaceholder = str;
                return this;
            }, defaultValue: function (str) {
                _alertify.promptValue = str;
                return this;
            }, maxLogItems: function (num) {
                _alertify.setMaxLogItems(num);
                return this;
            }, closeLogOnClick: function (bool) {
                _alertify.setCloseLogOnClick(!!bool);
                return this;
            }, logPosition: function (str) {
                _alertify.setLogPosition(str || "");
                return this;
            }, setLogTemplate: function (templateMethod) {
                _alertify.logTemplateMethod = templateMethod;
                return this;
            }, clearLogs: function () {
                _alertify.setupLogContainer().innerHTML = "";
                return this;
            }, version: _alertify.version
        };
    }

    if ("undefined" !== typeof module && !!module && !!module.exports) {
        module.exports = function () {
            return new Alertify();
        };
        var obj = new Alertify();
        for (var key in obj) {
            module.exports[key] = obj[key];
        }
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return new Alertify();
        });
    } else {
        window.alertify = new Alertify();
    }
}());