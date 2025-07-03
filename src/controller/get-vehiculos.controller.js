import { getVehiculosService } from "../service/get-vehiculos.service.js";

export const getVehiculosController = async (req, res) => {
  await getVehiculosService(req, res);
};

export default { getVehiculosController };
