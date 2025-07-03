import { actualizaDatosVehiculoService } from "../service/actualiza-datos-vehiculo.service.js";

export const actualizaDatosVehiculoController = async (req, res) => {
  await actualizaDatosVehiculoService(req.db, req.params.id, req.body, res);
};

export default { actualizaDatosVehiculoController };
