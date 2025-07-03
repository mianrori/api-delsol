import { actualizaVehiculoActivoDb } from "../database/actualiza-vehiculo-activo.db.js";

export const actualizaVehiculoActivoService = async (db, id, activo, res) => {
  let result;
  try {
    if (id && (activo || !activo)) {
      result = await actualizaVehiculoActivoDb(db, id, activo);
      res.status(result.status).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status).json(error);
  }
};

export default { actualizaVehiculoActivoService };
