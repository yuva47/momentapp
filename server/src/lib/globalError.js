export default function errorHandler(error, req, res, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    return res.status(409).send({ message: `Already Exists ${error.message.split("key:")[1]}` })
  }


  const code = error.code || 500;

  res.status(code).send({ message: error.message });

}


