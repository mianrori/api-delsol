import { getDniByMatriculaDb } from "../database/get-dni-by-matricula.db.js";

export const getDniByMatriculaService = async (db, matricula) => {
  let result = {};
  const socioData = await getDniByMatriculaDb(db, matricula);
  try {
    if (socioData) {
      result = {
        dni: socioData["DNI"],
        debitoAutomatico: socioData["DEBITO_AUTOMATICO"] === "S" ? true : false,
      };
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default { getDniByMatriculaService };
