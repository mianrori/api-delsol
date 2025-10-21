import { getMatriculasDb } from "../database/get-matriculas.db.js";

export const getMatriculasService = async (req, res) => {
  let result = [];
  let vehiculosData = await getMatriculasDb(req.db);
  try {
    for (let i = 0; i < vehiculosData?.length; i++) {
      result.push({
        id: vehiculosData[i]["ID"],
        dni: vehiculosData[i]["DNI"],
        matricula: vehiculosData[i]["MATRICULA"],
        marca: vehiculosData[i]["MARCA"],
        modelo: vehiculosData[i]["MODELO"],
        color: vehiculosData[i]["COLOR"],
        debitoAutomatico:
          vehiculosData[i]["DEBITO_AUTOMATICO"] === "S" ? true : false,
      });
    }
    let status = 200;
    if (result.length === 0) {
      status = 404;
    }
    res
      .status(status)
      .json({ status, success: status === 200 ? true : false, data: result });
  } catch (error) {
    res.status(500).json({ status: 500, success: false, message: error });
  }
};

export default { getMatriculasService };
