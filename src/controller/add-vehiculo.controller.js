import { addVehiculoService } from "../service/add-vehiculo.service.js";

export const addVehiculoController = async (req, res) => {
  await addVehiculoService(req.db, req.body, res);
};

export default { addVehiculoController };
