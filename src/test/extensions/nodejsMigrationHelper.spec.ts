import * as _ from "lodash";
import { expect } from "chai";

import * as nodejsMigrationHelper from "../../extensions/nodejsMigrationHelper";

const NODE8_SPEC = {
  name: "test",
  displayName: "Old",
  description: "descriptive",
  version: "1.0.0",
  license: "MIT",
  resources: [
    {
      name: "resource1",
      type: "firebaseextensions.v1beta.function",
      description: "desc",
      properties: { runtime: "nodejs8" },
    },
  ],
  author: { authorName: "Tester" },
  contributors: [{ authorName: "Tester 2" }],
  billingRequired: true,
  sourceUrl: "test.com",
  params: [],
};

const NODE10_SPEC = {
  name: "test",
  displayName: "Old",
  description: "descriptive",
  version: "1.0.0",
  license: "MIT",
  resources: [
    {
      name: "resource1",
      type: "firebaseextensions.v1beta.function",
      description: "desc",
      properties: { runtime: "nodejs10" },
    },
  ],
  author: { authorName: "Tester" },
  contributors: [{ authorName: "Tester 2" }],
  billingRequired: true,
  sourceUrl: "test.com",
  params: [],
};

describe("nodejsMigrationHelper", () => {
  describe("displayNodejsBillingNotice", () => {
    it("should notify the user if the runtime is being upgraded to nodejs10", () => {
      const curSpec = _.cloneDeep(NODE8_SPEC);
      const newSpec = _.cloneDeep(NODE10_SPEC);

      const loggedLine = nodejsMigrationHelper.displayNodejsBillingNotice(newSpec, curSpec);

      let expected =
        "This update includes an upgrade to Node.js 10 from Node.js 8, which is no longer maintained. Your project must be on the Blaze (pay as you go) plan to deploy Node.js 10 functions.\n";
      expected +=
        "\nStarting with this update, you will be charged a small amount when you deploy this extension, including when you make configuration changes and apply future updates.\n";
      expect(loggedLine).to.eql(expected);
    });

    it("should notify the user if the new spec requires nodejs10 runtime", () => {
      const newSpec = _.cloneDeep(NODE10_SPEC);

      const loggedLine = nodejsMigrationHelper.displayNodejsBillingNotice(newSpec);

      let expected =
        "This update includes an upgrade to Node.js 10 from Node.js 8, which is no longer maintained. Your project must be on the Blaze (pay as you go) plan to deploy Node.js 10 functions.\n";
      expected +=
        "\nStarting with this update, you will be charged a small amount when you deploy this extension, including when you make configuration changes and apply future updates.\n";
      expect(loggedLine).to.eql(expected);
    });

    it("should display nothing if the runtime isn't being upgraded to nodejs10", () => {
      const curSpec = _.cloneDeep(NODE8_SPEC);
      const newSpec = _.cloneDeep(NODE8_SPEC);

      const loggedLine = nodejsMigrationHelper.displayNodejsBillingNotice(newSpec, curSpec);

      const expected = "";
      expect(loggedLine).to.eql(expected);
    });

    it("should display nothing if the runtime was already on nodejs10", () => {
      const curSpec = _.cloneDeep(NODE10_SPEC);
      const newSpec = _.cloneDeep(NODE10_SPEC);

      const loggedLine = nodejsMigrationHelper.displayNodejsBillingNotice(newSpec, curSpec);

      const expected = "";
      expect(loggedLine).to.eql(expected);
    });
  });

  describe("displayNodejsChangeNotice", () => {
    it("should notify the user if the runtime is being upgraded to nodejs10", () => {
      const curSpec = _.cloneDeep(NODE8_SPEC);
      const newSpec = _.cloneDeep(NODE10_SPEC);

      const loggedLine = nodejsMigrationHelper.displayNodejsChangeNotice(newSpec, curSpec);

      const expected =
        "Node.js 8 has been deprecated. It’s recommended to update this extension to ensure it is running on Node.js 10.";
      expect(loggedLine).to.eql(expected);
    });

    it("should notify the user if the new spec requires nodejs10 runtime", () => {
      const newSpec = _.cloneDeep(NODE10_SPEC);

      const loggedLine = nodejsMigrationHelper.displayNodejsChangeNotice(newSpec);

      const expected =
        "Node.js 8 has been deprecated. It’s recommended to update this extension to ensure it is running on Node.js 10.";
      expect(loggedLine).to.eql(expected);
    });

    it("should display nothing if the runtime isn't being upgraded to nodejs10", () => {
      const curSpec = _.cloneDeep(NODE8_SPEC);
      const newSpec = _.cloneDeep(NODE8_SPEC);

      const loggedLine = nodejsMigrationHelper.displayNodejsChangeNotice(newSpec, curSpec);

      const expected = "";
      expect(loggedLine).to.eql(expected);
    });

    it("should display nothing if the runtime was already on nodejs10", () => {
      const curSpec = _.cloneDeep(NODE10_SPEC);
      const newSpec = _.cloneDeep(NODE10_SPEC);

      const loggedLine = nodejsMigrationHelper.displayNodejsChangeNotice(newSpec, curSpec);

      const expected = "";
      expect(loggedLine).to.eql(expected);
    });
  });
});
