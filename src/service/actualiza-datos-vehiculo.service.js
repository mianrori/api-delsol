import { actualizaDatosVehiculoDb } from "../database/actualiza-datos-vehiculo.db.js";

export const actualizaDatosVehiculoService = async (db, id, payload, res) => {
  let result;
  try {
    result = await actualizaDatosVehiculoDb(db, id, payload);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status).json(error);
  }
};

export default { actualizaDatosVehiculoService };
