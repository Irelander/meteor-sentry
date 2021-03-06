// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by meteor-sentry.js.
import { name as packageName } from "meteor/meteor-sentry";

// Write your tests here!
// Here is an example.
Tinytest.add('meteor-sentry - example', function (test) {
  test.equal(packageName, "meteor-sentry");
});
