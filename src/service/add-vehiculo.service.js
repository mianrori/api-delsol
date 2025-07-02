import { addVehiculoDb } from "../database/add-vehiculo.db.js";

export const addVehiculoService = async (db, payload, res) => {
  let result;
  try {
    if (payload) {
      result = await addVehiculoDb(db, payload);
      res.status(result.status).json(result);
    }
  } catch (error) {
    res.status(error.status).json(error);
  }
};

export default { addVehiculoService };
