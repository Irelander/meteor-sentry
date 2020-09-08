Package.describe({
  name: 'meteor-sentry',
  version: '0.0.1',
  summary: 'Sentry integration Meteor package.',
  git: 'https://github.com/Irelander/meteor-sentry.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.11');
  api.use('ecmascript');
  api.use('seba:method-hooks@3.0.2');
  api.mainModule('meteor-sentry-server.js', 'server');
  api.mainModule('meteor-sentry-client.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteor-sentry');
  api.mainModule('meteor-sentry-tests.js');
});

Npm.depends({
  "@sentry/browser" : "5.22.3",
  "@sentry/node" : "5.22.3"
})
