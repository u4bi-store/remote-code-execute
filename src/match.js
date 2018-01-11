var patternEscape = (pattern) => pattern.replace(/[\?\&\.]/g, '\\$&');
var expression = (pattern) => new RegExp(`^${ pattern.replace(/\:[^\/\&\.\?]+/g, '([^\/]+)').replace(/\)\?/, ')\\?') }$`);

var getKeys = (pattern) => {
    try {
        return pattern.match(/\:([^\?\/\\]+)/g).map(e => e.slice(1));
    } catch(e) {
        return null;
    };
};

var getMatch = (url, keys, regex) => url.match(regex);

var isMatch = (pattern, state, children = {} ) => {
    return { pattern : pattern, state : state, children : children };
};

var match = (pattern, url) => {
    if (pattern === url) return isMatch(pattern, true);
    
    let esPattern = patternEscape(pattern);

    let keys = getKeys(esPattern),
        results = getMatch(url, keys, expression(esPattern));

    if(!keys || !results ) return isMatch(false);

    return isMatch(pattern, true, results.splice(1, keys.length)
                                .reduce((obj, e, index) => {
                                    obj[keys[index]] = e;
                                    return obj;
                                }, {} ));
};

export default match;