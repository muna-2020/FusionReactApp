
(function (jQuery, window, undefined) {
   
    var core_strundefined = typeof undefined;

    function getWindow(elem) {
        return jQuery.isWindow(elem) ?
            elem :
            elem.nodeType === 9 ?
                elem.defaultView || elem.parentWindow :
                false;
    }

       function GetZoomFactor () {
            var factor = 1;
            if (document.body.getBoundingClientRect) {
                    // rect is only in physical pixel size in IE before version 8 
                var rect = document.body.getBoundingClientRect ();
                var physicalW = rect.right - rect.left;
                var logicalW = document.body.offsetWidth;

                    // the zoom level is always an integer percent value
                factor = Math.round ((physicalW / logicalW) * 100) / 100;
            }
            return factor;
        }

       function GetOffset (object, offset) {
            if (!object)
                return;
            offset.x += object.offsetLeft;
            offset.y += object.offsetTop;

            GetOffset (object.offsetParent, offset);
        }


    jQuery.fn.offset = function (options) {
        if (arguments.length) {
            return options === undefined ?
                this :
                this.each(function (i) {
                    jQuery.offset.setOffset(this, options, i);
                });
        }

        var docElem, win,
            box = { top: 0, left: 0 },
            elem = this[0],
            doc = elem && elem.ownerDocument;

        if (!doc) {
            return;
        }

        docElem = doc.documentElement;

        // Make sure it's not a disconnected DOM node
        if (!jQuery.contains(docElem, elem)) {
            return box;
        }

        // If we don't have gBCR, just use 0,0 rather than error
        // BlackBerry 5, iOS 3 (original iPhone)
        if (typeof elem.getBoundingClientRect !== core_strundefined) {
            box = elem.getBoundingClientRect();
        }
	var ZoomFactor = GetZoomFactor();
        win = getWindow(doc);

	var offset = {x : 0, y : 0};
        GetOffset (elem, offset);


        return {
		top: offset.y,
		left: offset.x
            //top: box.top + (win.pageYOffset || docElem.scrollTop || document.body.scrollTop) - (docElem.clientTop || 0),
            //left: box.left + (win.pageXOffset || docElem.scrollLeft || document.body.scrollLeft) - (docElem.clientLeft || 0)		
        };
    };

})(jQuery, window);
