Package.describe({
  name: 'irelander:meteor-sentry',
  version: '0.0.3',
  summary: 'Sentry integration Meteor package.',
  git: 'https://github.com/Irelander/meteor-sentry.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.11');
  api.use('ecmascript@0.10.0');
  api.use('seba:method-hooks@3.0.2');
  api.mainModule('meteor-sentry-server.js', 'server');
  api.mainModule('meteor-sentry-client.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('irelander:meteor-sentry');
  api.mainModule('meteor-sentry-tests.js');
});

Npm.depends({
  "@sentry/browser" : "5.22.3",
  "@sentry/node" : "5.22.3"
})
