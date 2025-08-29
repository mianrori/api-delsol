import { procesarVentaSolParkingService } from "../service/procesar-venta-sol-parking.service.js";

export const procesarVentaSolParkingController = async (req, res) => {
  await procesarVentaSolParkingService(req.db, req.body, res);
};

export default { procesarVentaSolParkingController };
