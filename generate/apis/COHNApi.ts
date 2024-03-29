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


import * as runtime from '../runtime.js';
import type {
  GPCAMERACREATEHOMENETWORKCERTRequest,
  GPCAMERAGETHOMENETWORKSTATUS200Response,
  GPCAMERASETHOMENETWORKSETTINGRequest,
} from '../models/index.js';
import {
    GPCAMERACREATEHOMENETWORKCERTRequestFromJSON,
    GPCAMERACREATEHOMENETWORKCERTRequestToJSON,
    GPCAMERAGETHOMENETWORKSTATUS200ResponseFromJSON,
    GPCAMERAGETHOMENETWORKSTATUS200ResponseToJSON,
    GPCAMERASETHOMENETWORKSETTINGRequestFromJSON,
    GPCAMERASETHOMENETWORKSETTINGRequestToJSON,
} from '../models/index.js';

export interface GPCAMERACREATEHOMENETWORKCERTOperationRequest {
    gPCAMERACREATEHOMENETWORKCERTRequest?: GPCAMERACREATEHOMENETWORKCERTRequest;
}

export interface GPCAMERASETHOMENETWORKSETTINGOperationRequest {
    gPCAMERASETHOMENETWORKSETTINGRequest?: GPCAMERASETHOMENETWORKSETTINGRequest;
}

/**
 * 
 */
export class COHNApi extends runtime.BaseAPI {

    /**
     *   ---  Supported Cameras:   - HERO12 Black   ---  Supported Protocols:   - WIFI - USB 
     * Delete COHN Certificates
     */
    async gPCAMERACLEARHOMENETWORKCERTRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/gopro/cohn/cert/clear`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     *   ---  Supported Cameras:   - HERO12 Black   ---  Supported Protocols:   - WIFI - USB 
     * Delete COHN Certificates
     */
    async gPCAMERACLEARHOMENETWORKCERT(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.gPCAMERACLEARHOMENETWORKCERTRaw(initOverrides);
        return await response.value();
    }

    /**
     * This creates the Camera On the Home Network SSL/TLS certs certs. The created certificate(s) can be obtained via [Get COHN Certificate](#operation/GPCAMERA_GET_HOME_NETWORK_CERT) and used for SSL/TLS communications   ---   Supported Cameras:   - HERO12 Black   ---  Supported Protocols:   - WIFI - USB 
     * Create the COHN Certificates
     */
    async gPCAMERACREATEHOMENETWORKCERTRaw(requestParameters: GPCAMERACREATEHOMENETWORKCERTOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/gopro/cohn/cert/create`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GPCAMERACREATEHOMENETWORKCERTRequestToJSON(requestParameters.gPCAMERACREATEHOMENETWORKCERTRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * This creates the Camera On the Home Network SSL/TLS certs certs. The created certificate(s) can be obtained via [Get COHN Certificate](#operation/GPCAMERA_GET_HOME_NETWORK_CERT) and used for SSL/TLS communications   ---   Supported Cameras:   - HERO12 Black   ---  Supported Protocols:   - WIFI - USB 
     * Create the COHN Certificates
     */
    async gPCAMERACREATEHOMENETWORKCERT(requestParameters: GPCAMERACREATEHOMENETWORKCERTOperationRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.gPCAMERACREATEHOMENETWORKCERTRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     *   ---  Supported Cameras:   - HERO12 Black   ---  Supported Protocols:   - WIFI - USB 
     * Get COHN Certificate
     */
    async gPCAMERAGETHOMENETWORKCERTRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/GoProRootCA.crt`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     *   ---  Supported Cameras:   - HERO12 Black   ---  Supported Protocols:   - WIFI - USB 
     * Get COHN Certificate
     */
    async gPCAMERAGETHOMENETWORKCERT(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.gPCAMERAGETHOMENETWORKCERTRaw(initOverrides);
        return await response.value();
    }

    /**
     *   ---  Supported Cameras:   - HERO12 Black   ---  Supported Protocols:   - WIFI - USB 
     * Get COHN Status
     */
    async gPCAMERAGETHOMENETWORKSTATUSRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GPCAMERAGETHOMENETWORKSTATUS200Response>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/gopro/cohn/status`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GPCAMERAGETHOMENETWORKSTATUS200ResponseFromJSON(jsonValue));
    }

    /**
     *   ---  Supported Cameras:   - HERO12 Black   ---  Supported Protocols:   - WIFI - USB 
     * Get COHN Status
     */
    async gPCAMERAGETHOMENETWORKSTATUS(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GPCAMERAGETHOMENETWORKSTATUS200Response> {
        const response = await this.gPCAMERAGETHOMENETWORKSTATUSRaw(initOverrides);
        return await response.value();
    }

    /**
     *   ---  Supported Cameras:   - HERO12 Black   ---  Supported Protocols:   - WIFI - USB 
     * Configure COHN Settings
     */
    async gPCAMERASETHOMENETWORKSETTINGRaw(requestParameters: GPCAMERASETHOMENETWORKSETTINGOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/gopro/cohn/setting`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GPCAMERASETHOMENETWORKSETTINGRequestToJSON(requestParameters.gPCAMERASETHOMENETWORKSETTINGRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     *   ---  Supported Cameras:   - HERO12 Black   ---  Supported Protocols:   - WIFI - USB 
     * Configure COHN Settings
     */
    async gPCAMERASETHOMENETWORKSETTING(requestParameters: GPCAMERASETHOMENETWORKSETTINGOperationRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.gPCAMERASETHOMENETWORKSETTINGRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
