

export const getProcessUrl = (url, methodType = false,UseFullName=false) => {
	 let urlParts = url.split('/');
  
    if (!UseFullName) {
        let Entity = url;
        if (urlParts.length >= 2) {
            if (methodType)
                Entity = urlParts[urlParts.length - 1];
            else
                Entity = urlParts[urlParts.length - 2];
        }
        return Entity;
    }
    else {
        let NewEntity = "";
        if (urlParts.length >= 2) {
            NewEntity = urlParts[1];
            for (let i = 2; i < urlParts.length; i++) {
                NewEntity += "_"+urlParts[i];
            }
            return NewEntity;
        }
    }
    return "";
} 

export const processUrl = (url) => {
    let urlParts = url.split('/');
    let Entity = url;
    if (urlParts.length >= 2) {
        Entity = urlParts[urlParts.length - 2];
    }
    return Entity;
} 