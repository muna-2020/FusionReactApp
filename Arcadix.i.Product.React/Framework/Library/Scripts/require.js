
(function () {
    "use strict";    
    var applicationUrl = JConfiguration.BaseUrl;
    var requiredPackages = ["react", "react-dom", "redux", "react-redux", "react-router", "react-router-dom", "redux-logger", "redux-devtools-extension", "object-assign", "scheduler"];
    var replacePath = {
        "@root": applicationUrl,
        "@shared": applicationUrl + 'BusinessLogic/',
        "@themes": applicationUrl + 'Themes/'
    }
    // Verify we're on HTTP/HTTPS
    if (!window.location.protocol.match(/^https?:$/)) {
        throw new Error("`require` can only be used on HTTP/HTTPS");
    }


    function getUriDir(uri) {
        return !uri ? "" : (uri = uri.split("#")[0].split("?")[0]).slice(0, uri.lastIndexOf("/") + 1);
    }

    function getDocumentBaseURI() {
        var tmp,
            baseURI = getUriDir(document.baseURI);
        if (!baseURI && (tmp = document.getElementsByTagName("base")).length && (tmp = tmp[0].href)) {
            baseURI = getUriDir(tmp);
        }
        return baseURI || getUriDir(window.location.href);
    }

    var __baseURI__ = getDocumentBaseURI();
    var __origin__ = __baseURI__.slice(0, __baseURI__.indexOf("/", __baseURI__.indexOf("://") + 3));


    function arrayIndexOf(arr, item) {
        if (arr && arr.length) {
            if (arr.indexOf) {
                return arr.indexOf(item);
            }
            // else...
            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i] === item) {
                    return i;
                }
            }
        }
        return -1;
    }

    function dirname(path) {
        return (path && path.slice(0, path.lastIndexOf("/") + 1)) || "/";
    }

    function getModuleSync(resolvedPath, modulePath) {
        var resolvedUri = "";// = __origin__ + resolvedPath;
        var fileType="";
        //differentiate between file and module import and add correct origins. also, all file import will have same origin - / 
        if (requiredPackages.indexOf(modulePath) != -1) {
            //resolvedUri = applicationUrl + "Scripts/" + modulePath + ".js";
            resolvedUri = applicationUrl + "Framework/Library/Scripts/" + modulePath + ".js";
            fileType="js";
        }
        else {
            var resolvedModulePath = "";
            var arrModulePath = modulePath.split('/');
            var fileName= arrModulePath[arrModulePath.length -1];
            var fileName = fileName.split('.');
            var projectName = arrModulePath[0];
            if (projectName == "@root" || projectName == "@shared" || projectName == "@themes" )
                arrModulePath.splice(0, 1);
            resolvedModulePath = arrModulePath.join('/');
            if (fileName[1] == undefined){
                resolvedUri = replacePath[projectName] + resolvedModulePath + ".js";
                fileType="js";  
            }
            else{
                resolvedUri = replacePath[projectName] + resolvedModulePath;
                fileType= fileName[1]
            }
        }
       
        var req = new XMLHttpRequest();
        req.open('GET', resolvedUri, false);
        req.send(null);

        if (req.status >= 200 && req.status < 400) {
            var objReturn = {
                fileType:fileType,
                scriptText:req.responseText,
                resolvedUri:resolvedUri
            }
            return objReturn; 
            //return req.responseText;
        }
        throw new Error("Module not found! URI: " + resolvedUri);
    }

    function isNotPlainObject(obj) {
        var plainObj = {};
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop) && !plainObj.hasOwnProperty(prop)) {
                return true;
            }
        }
        return false;
    }

    function evaluateModule(__dirname, __filename, __parentModule__, __moduleScriptText__) {
        /* jshint unused:false */

        var module = {
            exports: {},
            id: __filename,
            filename: __filename,
            loaded: false,
            parent: __parentModule__,
            children: [],
            require: null
        };
        var exports = module.exports;

        var require = module.require = new __Require__(__dirname, __filename, module);

        
        var babelOptions =  {
            "filename": applicationUrl + __filename, 
            "presets": ["react", "es2015"],
            "plugins": ["transform-class-properties", "transform-object-rest-spread", "transform-flow-strip-types"],
            "sourceMaps": "inline",
            "compact": false 
        }
        var transformedScript = Babel.transform(__moduleScriptText__, babelOptions)
        eval(transformedScript.code);

        if (isNotPlainObject(exports)) {
            module.exports = exports;
        }
        module.loaded = true;
        return module;
    }

    var __requireCache__ = {};

    function __Require__(__dirname, __filename, __parentModule__) {
        function require(path) {
            var resolvedPath = require.resolve(path);
            var module = require.cache[resolvedPath];
            if (module == null) {
                var objReturn  = getModuleSync(resolvedPath,path);
                var scriptText = objReturn.scriptText;
                
                if(objReturn.fileType == "js"){
                    module = evaluateModule(dirname(resolvedPath), resolvedPath, __parentModule__, scriptText);
                    require.cache[resolvedPath] = module;
                    if (__parentModule__ != null && arrayIndexOf(__parentModule__.children, module) === -1) {
                        __parentModule__.children.push(module);
                    }
                    return module.exports;
                }
                else if(objReturn.fileType == "css"){
                    var head  = document.getElementsByTagName('head')[0];
                    var link  = document.createElement('link');
                    link.setAttribute('rel','stylesheet');
                    link.setAttribute('type','text/css');
                    link.setAttribute('href', objReturn.resolvedUri)
                    link.setAttribute('media','all')
                    head.appendChild(link);

                    return true;
                }
                else if(objReturn.fileType == "json"){
                    console.log("json file");
                    var arrResolvedUri = objReturn.resolvedUri.split('/');
                    var jsonFileName = arrResolvedUri[arrResolvedUri.length -1];
                    var variableName = jsonFileName.split('.')[0];
                    var scriptTag = `const  ${variableName} = ${objReturn.scriptText} ; export default ${variableName}; `;
                    module = evaluateModule(dirname(resolvedPath), resolvedPath, __parentModule__, scriptTag);
                    require.cache[resolvedPath] = module;
                    return module.exports.default;
                }
                else{
                    console.log(" file");
                    return true;
                }
                
            }
            else{
                return module.exports;
            }
            
        }
        require.resolve = function (modulePath) {

            var path = ""
            path = "./" + modulePath + ".js";
           
            
            if (typeof path !== "string") {
                throw new TypeError("`path`was not a string");
            }
            if (!path) {
                throw new TypeError("`path`was an empty string");
            }
            if (path.slice(0, 1) !== "/" && path.slice(0, 2) !== "./" && path.slice(0, 3) !== "../") {
                throw new TypeError("`path`must be a relative path");
            }

            /*var longPath = (path.slice(0, 1) === "/" ? path : __dirname + path).slice(1);
            var longPathParts = longPath.split("/");
            for (var i = longPathParts.length; i--;) {
                switch (longPathParts[i]) {
                    case "":
                    case ".":
                        longPathParts.splice(i, 1);
                        break;
                    case "..":
                        if (i === 0) {
                            throw new TypeError("`path`has an invalid parent dir traversal at the root position ");
                        }
                        longPathParts.splice(--i, 2);
                        break;
                    default:
                        break;
                }
            }
            return "/" + longPathParts.join("/");*/
            var resolvedUri = "";// = __origin__ + resolvedPath;
            var fileType="";
            //differentiate between file and module import and add correct origins. also, all file import will have same origin - / 
            if (requiredPackages.indexOf(modulePath) != -1) {
                //resolvedUri = applicationUrl + "Scripts/" + modulePath + ".js";
                resolvedUri = applicationUrl + "Framework/Library/Scripts/" + modulePath + ".js";
                fileType="js";
            }
            else {
                var resolvedModulePath = "";
                var arrModulePath = modulePath.split('/');
                var fileName= arrModulePath[arrModulePath.length -1];
                var fileName = fileName.split('.');
            
                var projectName = arrModulePath[0];
                if (projectName == "@root" || projectName == "@shared" || projectName == "@themes")
                    arrModulePath.splice(0, 1);
                resolvedModulePath = arrModulePath.join('/');
                if (fileName[1] == undefined){
                    resolvedUri = replacePath[projectName] + resolvedModulePath + ".js";
                    fileType="js";  
                }
                else{
                    resolvedUri = replacePath[projectName] + resolvedModulePath
                    fileType= fileName[1]
                }
            }
            return resolvedUri;
        };
        require.cache = __requireCache__;
        require.main = typeof __mainModule__ !== "undefined" ? __mainModule__ : null;
        return require;
    }

    //
    // Main Module
    //
    var __dirname = __baseURI__.slice(__baseURI__.indexOf("/", __baseURI__.indexOf("://") + 3));
    var __filename = __dirname + window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1);

    var __mainModule__ = evaluateModule(__dirname, __filename, null, "");
    __mainModule__.require.main = __mainModule__;

    //
    // Export
    //
    window.require = __mainModule__.require;

})();