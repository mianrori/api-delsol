import { getDatoSocioService } from "../service/get-dato-socio.service.js";

export const getDatoSocioController = async (req, res) => {
  let datoSocio = {};
  try {
    datoSocio = await getDatoSocioService(req.db, req.params.dni);
    let status = 200;
    if (Object.keys(datoSocio).length === 0) {
      status = 404;
    }
    res.status(status).json({
      status,
      success: status === 200 ? true : false,
      data: datoSocio,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      data: {},
      message: error,
    });
  }
};

export default { getDatoSocioController };
