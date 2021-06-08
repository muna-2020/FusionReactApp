
/**
 * @name RunEditorPolyfills
 * @summary this method execute all the polyfills available for editor.
 */
export function RunEditorPolyfills() {
    try {
        if (document != "undefined" && document !== null && Element != "undefined" && Element != null) {
            if (!Element.prototype.matches) {
                Element.prototype.matches = Element.prototype.msMatchesSelector ||
                    Element.prototype.webkitMatchesSelector;
            }
            if (!Element.prototype.closest) {
                Element.prototype.closest = function (s) {
                    var el = this;

                    do {
                        if (el.matches(s)) return el;
                        el = el.parentElement || el.parentNode;
                    } while (el !== null && el.nodeType === 1);
                    return null;
                };
            }
            if (!Element.prototype.next) {
                Element.prototype.next = function (s) {
                    let elem = this;

                    if (s === "" || s === null || s === undefined) {
                        return elem.nextSibling;
                    } else {
                        do {
                            if (elem.matches(s)) return elem;
                            elem = elem.nextSibling || elem.nextElementSibling;
                        } while (elem !== null && elem.nodeType === 1);
                        return null;
                    }

                }
            }
            if (!Element.prototype.prev) {
                Element.prototype.prev = function (s) {
                    let elem = this;
                    if (s === "" || s === null || s === undefined) {
                        return elem.previousSibling;
                    } else {
                        do {
                            if (elem.matches(s)) return elem;
                            elem = elem.previousSibling || elem.previousElementSibling;
                        } while (elem !== null && elem.nodeType === 1);
                        return null;
                    }
                }
            }
            if (!Element.prototype.prevNode) {
                Element.prototype.prevNode = function (s) {
                    let element = this;
                    if (s === "" || s === null || s === undefined) {
                        return element.previousSibling;
                    } else {
                        let prevElement = element.previousSibling;
                        while (prevElement != null) {
                            if (prevElement.matches(s)) {
                                break;
                            } else {
                                prevElement = prevElement.previousSibling;
                            }
                        }
                        return prevElement

                    }
                }
            }
            if (!Element.prototype.nextNode) {
                Element.prototype.nextNode = function (s) {
                    let element = this;
                    if (s === "" || s === null || s === undefined) {
                        return element.nextSibling;
                    } else {
                        let nextElement = element.nextSibling;
                        while (nextElement != null) {
                            if (nextElement.matches(s)) {
                                break;
                            } else {
                                nextElement = nextElement.nextSibling;
                            }
                        }
                        return nextElement
                    }
                }
            }
            if (!Element.prototype.isAncestor) {
                Element.prototype.isAncestor = function (s) {
                    let element = this;
                    let parent = s;
                    let blnIsParent = false;
                    while (parent && parent != null) {
                        if (parent.isSameNode(element)) {
                            blnIsParent = true;
                            break;
                        }
                        parent = parent.parentElement;
                    }
                    return blnIsParent;
                }
            }
        }
    } catch (err) {
        throw err;
    }
}





