import { getExtractoSolService } from "../service/get-extracto-sol.service.js";

export const getExtractoSolController = async (req, res) => {
  let datoExtractoSol = {};
  try {
    datoExtractoSol = await getExtractoSolService(
      req.db,
      req.params.dni,
      req.params.periodo,
      req.params.tipo
    );
    res.status(200).json({
      success: true,
      data: datoExtractoSol,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: error,
    });
  }
};

export default { getExtractoSolController };
