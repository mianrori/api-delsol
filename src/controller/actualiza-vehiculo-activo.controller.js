import { actualizaVehiculoActivoService } from "../service/actualiza-vehiculo-activo.service.js";

export const actualizaVehiculoActivoController = async (req, res) => {
  await actualizaVehiculoActivoService(
    req.db,
    req.params.id,
    req.body.activo,
    res
  );
};

export default { actualizaVehiculoActivoController };
