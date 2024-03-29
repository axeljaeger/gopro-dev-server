/* tslint:disable */
/* eslint-disable */
/**
 * OpenGoPro HTTP API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime.js';
/**
 * 
 * @export
 * @interface OGPWEBCAMVERSION200Response
 */
export interface OGPWEBCAMVERSION200Response {
    /**
     * Does the webcam support Max Lens Mod?
     * @type {boolean}
     * @memberof OGPWEBCAMVERSION200Response
     */
    maxLensSupport?: boolean;
    /**
     * Is the webcam USB 3.1 compatible?
     * @type {boolean}
     * @memberof OGPWEBCAMVERSION200Response
     */
    usb31Compatible?: boolean;
    /**
     * Current webcam version
     * @type {number}
     * @memberof OGPWEBCAMVERSION200Response
     */
    version?: number;
}

/**
 * Check if a given object implements the OGPWEBCAMVERSION200Response interface.
 */
export function instanceOfOGPWEBCAMVERSION200Response(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function OGPWEBCAMVERSION200ResponseFromJSON(json: any): OGPWEBCAMVERSION200Response {
    return OGPWEBCAMVERSION200ResponseFromJSONTyped(json, false);
}

export function OGPWEBCAMVERSION200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): OGPWEBCAMVERSION200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'maxLensSupport': !exists(json, 'max_lens_support') ? undefined : json['max_lens_support'],
        'usb31Compatible': !exists(json, 'usb_3_1_compatible') ? undefined : json['usb_3_1_compatible'],
        'version': !exists(json, 'version') ? undefined : json['version'],
    };
}

export function OGPWEBCAMVERSION200ResponseToJSON(value?: OGPWEBCAMVERSION200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'max_lens_support': value.maxLensSupport,
        'usb_3_1_compatible': value.usb31Compatible,
        'version': value.version,
    };
}

