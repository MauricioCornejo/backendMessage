const statusMessages = {
  '200': 'Done',
  '201': 'Created',
  '400': 'Invalid format',
  '500': 'Internal error'
}


exports.success = function (req, res, message, status){
  let statusCode = status
  let statusMessage = message

  if(!status){
    status = 200;
  }
  if(!message){
    statusMessage = statusMessages[status]
  }

  res.status(statusCode).send({
    error: "",
    body: statusMessage
  })
}
exports.error = function (req, res, error, status, details ){
  let statusErrorCode = status
  let statusErrorDetails = details 

  if(!status){
    status = 500;
  }
  if(!details ){
    statusErrorDetails = statusErrorDetails[details]
  }
  console.error('[response error] ' + details)
  
  res.status(statusErrorCode).send({
    error: error,
    body: ""
  })
}