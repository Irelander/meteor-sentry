import * as Sentry from '@sentry/browser';


const SentryClient = (sentryConfig, options)=>{

    Sentry.init(sentryConfig)
    Sentry.setTag("from", "client")

    return {
        rawSentry : Sentry
    }

}

export default SentryClient
