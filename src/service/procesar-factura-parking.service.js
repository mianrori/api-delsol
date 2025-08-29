import { procesarFacturaParkingDb } from "../database/procesar-factura-parking.db.js";

export const procesarFacturaParkingService = async (db, payload, res) => {
  let result;
  try {
    if (payload) {
      result = await procesarFacturaParkingDb(db, payload);
      res.status(result.status).json(result);
    }
  } catch (error) {
    res.status(error.status).json(error);
  }
};

export default { procesarFacturaParkingService };
