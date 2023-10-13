export const basicAuthHelper = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Basic ") === -1
  ) {
    return res.status(401).json({
      status: false,
      message: "Falta el encabezado Authorization",
    });
  }
  const base64Credentials = req.headers.authorization.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [userName, password] = credentials.split(":");
  try {
    if (
      userName !== process.env.API_USER ||
      password !== process.env.API_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Credenciales de autenticación no válidas",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }

  return next();
};

export default { basicAuthHelper };
