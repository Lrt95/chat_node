/**
 * @namespace Tools
 */
/**
 * Handle HTTP status code and body content to return in a response to Front team
 * For GET request.
 * @function
 * @memberOf Tools
 * @name getHandler
 * @param {{success: object}|{error: string}} data - object with success or error data
 * @param {string} [notFoundMsg="error"] - message displayed if we got a success without data
 * @param {int} [codeErr=400] - code to send if there is an error
 * @returns {{code: number, body: {error: string}}|{code: number, body: *}}
 */
function getHandler(data, notFoundMsg="error, can't find this in database", codeErr=400){
    if (data["success"]===null) {
        return {code: 404, body: {error: notFoundMsg}}
    } else if (data["success"]) {
        return {code: 200, body: data}
    } else if (data["error"]) {
        return {code: codeErr, body: data}
    } else {
        return {code: 520, body: {error: "repository error"}}
    }
}

/**
 * Handle HTTP status code and body content to return in a response to Front team
 * For POST request (when adding a document).
 * @function
 * @memberOf Tools
 * @name updateDbHandler
 * @param {{success: object}|{error: string}} data - object with success or error data
 * @param {string} [notFoundMsg="error"] - message displayed if we got a success without data
 * @param {int} [codeErr=400] - code to send if there is an error
 * @returns {{code: number, body: {error: string}}|{code: number, body: *}}
 */
function updateDbHandler(data, notFoundMsg="error, can't add this in database", codeErr=400){
    if (data["success"]===null) {
        return {code: 404, body: {error: notFoundMsg}}
    } else if (data["success"]) {
        return {code: 201, body: data}
    } else if (data["error"]) {
        return {code: codeErr, body: data}
    } else {
        return {code: 520, body: {error: "repository error"}}
    }
}


module.exports = {getHandler, updateDbHandler}
