/**
 *
 * @typedef {Object} Tag
 * @property {string} name - tag name
 * @property {any} value - tag value
 *
 *
 * @typedef {Object} LoggingOptions
 * @property {Object} extra
 * @property {Tag[]} tags
 *
 */

const generateCommonMethod = (Sentry)=>{

    const scopeWrapper = ({type, message}, {extras, tags})=>{

        Sentry.withScope( scope => {
            scope.setLevel(type);
            if (extras){
                scope.setExtras(extras)
            }

            if (tags && Array.isArray(tags)){
                for(let tag of tags){
                    let { name, value } = tag;
                    scope.setTag(name, value);
                }
            }

            Sentry.captureMessage(message);
        });
    }

    return {
        /**
         * @param {string} message
         * @param {LoggingOptions} options
         */
        info(message, options = {}){
            scopeWrapper({type : "info", message}, options);
        },
        /**
         * @param {string} message
         * @param {LoggingOptions} options
         */
        warning(message, options = {}){
            scopeWrapper({type : "warning", message}, options);
        },
        /**
         * @param {string} message
         * @param {LoggingOptions} options
         */
        log(message, options = {}){
            scopeWrapper({type : "log", message}, options);
        },
        /**
         * @param {string} message
         * @param {LoggingOptions} options
         */
        fatal(message, options = {}){
            scopeWrapper({type : "fatal", message}, options);
        },
        /**
         * @param {string} message
         * @param {LoggingOptions} options
         */
        error(message, options = {}){
            scopeWrapper({type : "error", message}, options);
        },
        /**
         * @param {string} message
         * @param {LoggingOptions} options
         */
        debug(message, options = {}){
            scopeWrapper({type : "debug", message}, options);
        },
        /**
         * @param {string} message
         * @param {LoggingOptions} options
         */
        critical(message, options = {}){
            scopeWrapper({type : "critical", message}, options);
        }
    }

}


export { generateCommonMethod }
