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
 * @interface OGPWEBCAMSTATUS200Response
 */
export interface OGPWEBCAMSTATUS200Response {
    /**
     * Current webcam error (if status was not successful)
     * 
     * | Code | Status |
     * | ---- | ------ |
     * | 0 | None  |
     * | 1 | Set Preset |
     * | 2 | Set Window Size |
     * | 3 | Exec Stream |
     * | 4 | Shutter  |
     *  | 5 | Com timeout |
     * | 6 | Invalid param |
     * | 7 | Unavailable |
     * | 8 | Exit  |
     * 
     * @type {number}
     * @memberof OGPWEBCAMSTATUS200Response
     */
    error?: OGPWEBCAMSTATUS200ResponseErrorEnum;
    /**
     * Current webcam status
     * 
     * | Code | Status |
     * | ---- | ------ |
     * | 0 | Off  |
     * | 1 | Idle |
     * | 2 | High Power Preview |
     * | 3 | Low Power Preview |
     * 
     * @type {number}
     * @memberof OGPWEBCAMSTATUS200Response
     */
    status?: OGPWEBCAMSTATUS200ResponseStatusEnum;
}


/**
 * @export
 */
export const OGPWEBCAMSTATUS200ResponseErrorEnum = {
    NUMBER_0: 0,
    NUMBER_1: 1,
    NUMBER_2: 2,
    NUMBER_3: 3,
    NUMBER_4: 4,
    NUMBER_5: 5,
    NUMBER_6: 6,
    NUMBER_7: 7,
    NUMBER_8: 8
} as const;
export type OGPWEBCAMSTATUS200ResponseErrorEnum = typeof OGPWEBCAMSTATUS200ResponseErrorEnum[keyof typeof OGPWEBCAMSTATUS200ResponseErrorEnum];

/**
 * @export
 */
export const OGPWEBCAMSTATUS200ResponseStatusEnum = {
    NUMBER_0: 0,
    NUMBER_1: 1,
    NUMBER_2: 2,
    NUMBER_3: 3
} as const;
export type OGPWEBCAMSTATUS200ResponseStatusEnum = typeof OGPWEBCAMSTATUS200ResponseStatusEnum[keyof typeof OGPWEBCAMSTATUS200ResponseStatusEnum];


/**
 * Check if a given object implements the OGPWEBCAMSTATUS200Response interface.
 */
export function instanceOfOGPWEBCAMSTATUS200Response(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function OGPWEBCAMSTATUS200ResponseFromJSON(json: any): OGPWEBCAMSTATUS200Response {
    return OGPWEBCAMSTATUS200ResponseFromJSONTyped(json, false);
}

export function OGPWEBCAMSTATUS200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): OGPWEBCAMSTATUS200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'error': !exists(json, 'error') ? undefined : json['error'],
        'status': !exists(json, 'status') ? undefined : json['status'],
    };
}

export function OGPWEBCAMSTATUS200ResponseToJSON(value?: OGPWEBCAMSTATUS200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'error': value.error,
        'status': value.status,
    };
}

