import { getDatoSocioService } from "../service/get-dato-socio.service.js";

export const getDatoSocioController = async (req, res) => {
  let datoSocio = {};
  try {
    datoSocio = await getDatoSocioService(req.db, req.params.dni);
    res.status(200).json({
      success: true,
      data: datoSocio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: error,
    });
  }
};

export default { getDatoSocioController };
