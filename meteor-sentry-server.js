// Write your package code here!
import { Meteor } from 'meteor/meteor';
import * as Sentry from '@sentry/node';
import { generateCommonMethod } from './meteor-sentry-common';

/**
 *
 * @typedef {Object} MethodOptions
 *
 * @property {('all' | 'error')='all'} logLevel
 * @property {boolean} excludesMethodList
 * @property {boolean} excludesArguments
 * @property {boolean} excludesResult
 * @property {boolean} excludesInternalMethodHistory
 *
 */


/**
 *
 * @param {MethodOptions} options
 */
const initializeMethods = (options = {})=>{

    const {
        logLevel,
        excludesMethodList,
        excludesArguments,
        excludesResult,
        excludesInternalMethodHistory,
    } = options;

    function beforeAllMethods(){

        this.logging = true;

        if ( Array.isArray(excludesMethodList) ){
            this.logging = !excludesMethodList.includes(this._methodName);
        }

        if (!excludesArguments){
            // #1. Set Arguments
            this.params = [...arguments].map( arg => arg )
        }

        // #2. Execute Times
        this.executeTime = new Date().getTime();

    }

    function afterAllMethods(){

        if (this.logging){

            Sentry.withScope((scope) => {

                // #0. Default Params
                scope.setTag("type", "methods")

                if (this.connection) {

                    const {
                        id: connectionID,
                        httpHeaders: {
                            'x-forwarded-for': clientIP
                        }
                    } = this.connection
                    scope.setTag("connectionId", connectionID);
                    scope.setTag("realIP", clientIP);
                }


                // Extra Data
                let data = {}
                // #1. Execute Times
                this.executeTime = new Date().getTime() - this.executeTime;
                data.executeTime = `${this.executeTime / 1000}(s)`

                if (!excludesArguments){
                    data.argments = this.params;
                }

                // #3. Result
                if (!excludesResult){
                    data.result = this.result;
                }

                if (!excludesInternalMethodHistory){
                    if (this.randomStream) {
                        data.internalMethods = Object.keys(this.randomStream.sequences).map( rpc => rpc.split('/rpc/')[1] )
                    }
                }

                scope.setExtras(data);



                // #4. Error
                if (this.error) {
                    Sentry.captureException(this.error)
                }else {

                    if (logLevel != "error"){
                        scope.setLevel('debug');
                        Sentry.captureMessage(`[Method : ${this._methodName}]`);
                    }
                }

            })

        }
    }

    Meteor.beforeAllMethods(beforeAllMethods);
    Meteor.afterAllMethods(afterAllMethods);

}

const SentryServer = {

    /**
     *
     * @param {Object}  sentryConfig
     * @param {Object}  options
     * @param {Object}  options.inactiveLogging
     * @param {boolean} options.inactiveLogging.methods
     * @param {MethodOptions}  options.methodOptions
     */
    init(sentryConfig, options = {}){

        Sentry.init(sentryConfig);
        Sentry.setTag("from", "server");

        const {
            inactiveLogging = {},
            methodOptions,
        } = options;

        const {
            methods
        } = inactiveLogging


        if (!methods){
            initializeMethods(methodOptions);
        }

        this.rawSentry = Sentry;
        this._initialized = true;

    },
    ...generateCommonMethod(Sentry),
    rawSentry : Sentry
}

export default SentryServer
