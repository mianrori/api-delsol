import { procesarVentaSolParkingDb } from "../database/procesar-venta-sol-parking.db.js";

export const procesarVentaSolParkingService = async (db, payload, res) => {
  let result;
  try {
    if (payload) {
      result = await procesarVentaSolParkingDb(db, payload);
      res.status(result.status).json(result);
    }
  } catch (error) {
    res.status(error.status).json(error);
  }
};

export default { procesarVentaSolParkingService };
