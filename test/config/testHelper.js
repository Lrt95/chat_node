/**
 * @namespace Test_helper
 */
/**
 * This test file requires {@link module:./config/launcher}.
 * @requires module:./config/launcher
 */
const { request, url} = require("./launcher")

//region functions adding expects
/**
 * Add Expects where response object has a key containing field defined by expectedKeys array.
 * If there should be some keys to avoid, we describe the exceptKeys, like for user's password.
 * @function
 * @memberOf Test_helper
 * @name expectExcept
 * @param {array} resKeys - an array containing keys from the response
 * @param {array} expectedKeys - an array containing expected keys (if adding username, we should find this field)
 * @param {array} [exceptKeys=[]]  - an array with exception keys, that we don't wan't to check
 */
function expectExcept(resKeys, expectedKeys, exceptKeys=[]){
    for (let key of expectedKeys){
        if (!exceptKeys.includes(key)) {
            expect(resKeys).toContain(key)
        }
    }
}

/**
 * Add an Expect status 201, and check if the response body.success contains user & post keys
 * When updating a document.
 * @function
 * @memberOf Test_helper
 * @name expectedResponseOnUserUpsert
 * @param {object} response - an object containing response's data
 */
function expectedResponseOnUserUpsert(response){
    expectedStatus(response, 201)
    expectExcept(  Object.keys(getBodyRes(response)), [ "user", "post"] )
}

/**
 * Add an Expect status defined by codeErr.
 * @function
 * @memberOf Test_helper
 * @name expectedStatus
 * @param {object} response - an object containing response's data
 * @param {int} [status=200] - expected status code
 */
function expectedStatus(response, status= 200){
    expect(response.status).toBe(status);
}

//endregion

//region other functions
//region getter of object path (defined by our postModel architecture)
/**

 * Return the body from a response, use if a day we change response body structure.
 * This way, it will be easy to set the body content.
 * @function
 * @memberOf Test_helper
 * @name getBodyRes
 * @param {object} response - response from api
 * @returns {SrvPoller.success|{post, user, token}|string|boolean|Event|null}
 */
function getBodyRes(response){
    try {
        return response.body.success
    }catch (e) {
        return null
    }
}


/**
 * Get user activities from a response.
 * @function
 * @memberOf Test_helper
 * @name getUserActivities
 * @param {object} res - response from api
 * @returns {object}
 */
function getUserActivities(res){
    return getBodyRes(res).user.activities
}
//endregion



/**
 * Prepare a request on a defined url that need a token authorization.
 * @function
 * @memberOf Test_helper
 * @name prepareReqWithCookie
 * @param {object} user - user's data from a response
 * @param {object} completeUrl - the target url
 * @returns {*}
 */
function prepareReqWithCookie(user, completeUrl){

    return request.post(completeUrl)
        .set('Cookie', [`token-user=${user.body.token}`])
}
//endregion

module.exports = {expectExcept, getBodyRes, expectedStatus, prepareReqWithCookie}
