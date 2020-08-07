import * as _ from "lodash";

import * as extensionsApi from "./extensionsApi";
import * as logger from "../logger";

const changeMsg =
  "Node.js 8 has been deprecated. It’s recommended to update this extension to ensure it is running on Node.js 10.";
const billingMsg = `This update includes an upgrade to Node.js 10 from Node.js 8, which is no longer maintained. Your project must be on the Blaze (pay as you go) plan to deploy Node.js 10 functions.

Starting with this update, you will be charged a small amount when you deploy this extension, including when you make configuration changes and apply future updates.
`;

function hasRuntime(resource: extensionsApi.Resource, runtime: string): boolean {
  return resource.properties?.runtime == runtime;
}

function displayMessage(
  msg: string,
  newSpec: extensionsApi.ExtensionSpec,
  curSpec?: extensionsApi.ExtensionSpec
): string {
  const newResources = newSpec.resources;
  const curResources = curSpec?.resources || [];

  if (
    newResources.some((r) => hasRuntime(r, "nodejs10")) &&
    (curSpec == undefined || curResources.some((r) => hasRuntime(r, "nodejs8")))
  ) {
    logger.info(msg);
    return msg;
  }
  return "";
}

/**
 * Displays nodejs10 migration changelogs if the update contains a change to nodejs10 runtime.
 *
 * @param curSpec A current extensionSpec
 * @param newSpec A extensionSpec to compare to
 * @return Displayed message
 */
export function displayNodejsChangeNotice(
  newSpec: extensionsApi.ExtensionSpec,
  curSpec?: extensionsApi.ExtensionSpec
): string {
  return displayMessage(changeMsg, newSpec, curSpec);
}

/**
 * Displays nodejs10 billing changes if the update contains a change to nodejs10 runtime.
 *
 * @param curSpec A current extensionSpec
 * @param newSpec A extensionSpec to compare to
 * @return Displayed message
 */
export function displayNodejsBillingNotice(
  newSpec: extensionsApi.ExtensionSpec,
  curSpec?: extensionsApi.ExtensionSpec
): string {
  return displayMessage(billingMsg, newSpec, curSpec);
}
