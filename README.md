## MeteorSentry(irelander:meteor-sentry Meteor Package )

#### ##Import ! Don't use production level.

This package is a wrapper for sentry library. It allows you to simply use latest Sentry SDK on both client and a server in your meteor application.

This package is MIT Licensed.

## Installation

```shell script
meteor add irelander:meteor-sentry
```

## Usage

The same interface can be used on a client and server.

#### Initialization (client/server)

```javascript
import MeteorSentry from 'meteor/irelander:meteor-sentry';
```

## API

### MeteorSentry.init(sentryConfig, options)

To use this package, call the init function as early as possible in your app. 

-  `sentryConfig` - Configuration options for the Sentry. Checkout detail options. [client](https://getsentry.github.io/sentry-javascript/interfaces/browser.browseroptions-2.html) / [server](https://getsentry.github.io/sentry-javascript/interfaces/node.nodeoptions-1.html)

- `options` - The use of optional parameters depends on where they can be used.
     -  `inactiveLogging` - inactive each logging.
		- `methods(boolean)` - (Server only)inactive meteor method tracking.
	- `methodOptions` - (Server only)Meteor method logging options
		- `logLevel( 'all' | 'error' )` - default `all`. if you set error, only caputureMessage when occurred error.
		- `excludesMethodList(String[])` - list of method name. Those methods will not be logged.
		- `excludesArguments(boolean)` - if you set true, the arguments will not be logged .
		- `excludesResult(boolean)` - if you set true, method return result will not be logged.

\### Example

```javascript
import MeteorSentry from 'meteor/irelander:meteor-sentry';

const sentryConfig = {
	dsn : "http://86578021937043139c825c9861781c9a@localhost/2",
	...
};

const options = {
	methodOptions : {
		excludesMethodList : [ "checkExpiredToken" ] // if method name checkExpiredToken will not be logged.
	}
}

Meteor.startup(()=>{
	MeteorSentry.init(sentryConfig, options);
});

```

### MeteorSentry.info(message, options);

Logging with level `info`

 - `message(string)` - logging message.
 - `options` - Sentry Loggin Optons
	 - `extras(object)` - Equal to setExtras
	 - `tags(Array)` - Equal to setTag.
		 - `name(string)` - tag name.
		 - `value(any)` - tag value.

### MeteorSentry.warning(message, options);

Logging with level `warning`

 - `message(string)` - logging message.
 - `options` - Sentry Loggin Optons
	 - `extras(object)` - Equal to setExtras
	 - `tags(Array)` - Equal to setTag.
		 - `name(string)` - tag name.
		 - `value(any)` - tag value.


### MeteorSentry.log(message, options);

Logging with level `log`

 - `message(string)` - logging message.
 - `options` - Sentry Loggin Optons
	 - `extras(object)` - Equal to setExtras
	 - `tags(Array)` - Equal to setTag.
		 - `name(string)` - tag name.
		 - `value(any)` - tag value.


### MeteorSentry.fatal(message, options);

Logging with level `fatal`

 - `message(string)` - logging message.
 - `options` - Sentry Loggin Optons
	 - `extras(object)` - Equal to setExtras
	 - `tags(Array)` - Equal to setTag.
		 - `name(string)` - tag name.
		 - `value(any)` - tag value.


### MeteorSentry.error(message, options);

Logging with level `error`

 - `message(string)` - logging message.
 - `options` - Sentry Loggin Optons
	 - `extras(object)` - Equal to setExtras
	 - `tags(Array)` - Equal to setTag.
		 - `name(string)` - tag name.
		 - `value(any)` - tag value.


### MeteorSentry.debug(message, options);

Logging with level `debug`

 - `message(string)` - logging message.
 - `options` - Sentry Loggin Optons
	 - `extras(object)` - Equal to setExtras
	 - `tags(Array)` - Equal to setTag.
		 - `name(string)` - tag name.
		 - `value(any)` - tag value.


### MeteorSentry.critical(message, options);

Logging with level `critical`

 - `message(string)` - logging message.
 - `options` - Sentry Loggin Optons
	 - `extras(object)` - Equal to setExtras
	 - `tags(Array)` - Equal to setTag.
		 - `name(string)` - tag name.
		 - `value(any)` - tag value.


## Todo

- Client Integration add ( Vue / React )
- Internal Method Tracking
- Server route logging
