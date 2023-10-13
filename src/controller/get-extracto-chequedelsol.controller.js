import { getExtractoChequeDelSolService } from "../service/get-extracto-chequedelsol.service.js";

export const getExtractoChequeDelSolController = async (req, res) => {
  let datoExtractoChequeDelSol = {};
  try {
    datoExtractoChequeDelSol = await getExtractoChequeDelSolService(
      req.db,
      req.params.dni
    );
    res.status(200).json({
      success: true,
      data: datoExtractoChequeDelSol,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: error,
    });
  }
};

export default { getExtractoChequeDelSolController };
