const generateJSONResponse = (message, result = null) => {
  return (result == null) ? {message: message} : {message: message, result: result};
}

module.exports = { generateJSONResponse };