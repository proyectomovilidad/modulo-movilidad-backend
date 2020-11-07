/**
 * Takes a web service error, parses it's content, logs the stack trace 
 * and returns the corresponding status and error message.
 *
  @param {} res
  @param {} e
 */
const sendErrorResponse = (res, e) => {
    try {
      console.error(e)
      let error = typeof e.message === 'string' ? e.message: JSON.parse(e.message)
      res.status(error.status || 500).send({
        errorMsg: error.errorMessage || e.message
      })
    } catch(e) {
      res.status(500).send({
        errorMessage: e.message
      })
    }
  }
  
  /**
   * Creates a custom web service error whose message is a stringified JSON 
   * that contains the status response and error message.
   *
    @param {} status
    @param {} errorMessage
   * @returns
   */
  const getErrorResponse = (status, errorMessage) => {
    return Error(JSON.stringify({
      status, errorMessage
    }))
  }
  
  module.exports = {
    getErrorResponse,
    sendErrorResponse
  }