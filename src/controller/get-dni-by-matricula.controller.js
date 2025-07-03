import { getDniByMatriculaService } from "../service/get-dni-by-matricula.service.js";

export const getDniByMatriculaController = async (req, res) => {
  let datoSocio = {};
  try {
    datoSocio = await getDniByMatriculaService(req.db, req.params.matricula);
    let status = 200;
    if (Object.keys(datoSocio).length === 0) {
      status = 404;
    }
    if (status === 200) {
      res.status(status).json({
        status,
        success: true,
        dni: datoSocio.dni,
        debitoAutomatico: datoSocio.debitoAutomatico,
      });
    } else {
      res.status(status).json({
        status,
        success: false,
        message: "No se ha encontrado DNI con el número de matrícula proveído.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      data: {},
      message: error,
    });
  }
};

export default { getDniByMatriculaController };
