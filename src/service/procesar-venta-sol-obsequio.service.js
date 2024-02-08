import { procesarVentaSolObsequioDb } from "../database/procesar-venta-sol-obsequio.db.js";

export const procesarVentaSolObsequioService = async (db, payload, res) => {
  let result;
  try {
    if (payload) {
      result = await procesarVentaSolObsequioDb(db, payload);
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { procesarVentaSolObsequioService };
