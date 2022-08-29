/** Generate boilerplate response object
 * 
 * @param {String} message Response result string (i.e. if status 200 then message SUCCESS)
 * @param {Object} result 
 * 
 * @returns Object of structure: { message: ___ , result: ___ }
 */
const generateJSONResponse = (message, result = null) => {
  return (result == null) ? {message: message} : {message: message, result: result};
}

module.exports = { generateJSONResponse };