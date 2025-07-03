export const getDniByMatriculaDb = (db, matricula) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT a.dni, NVL(a.debito_automatico,'N') debito_automatico
          FROM cf_socio_vehiculo a
         WHERE lower(a.matricula) = lower(:matricula)
           AND NVL(a.activo,'N')='S'`,
        { matricula }
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows[0]);
      }
    } catch (error) {
      reject(
        `Error en getDniByMatriculaDb: ${error.message.replace(/['"]+/g, "")}`
      );
    }
  });
};

export default {
  getDniByMatriculaDb,
};
