export const getMatriculasDb = (db) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT a.id,a.dni,a.matricula,a.marca,a.modelo,a.color,NVL(a.debito_automatico,'N') debito_automatico
          FROM cf_socio_vehiculo a
         WHERE NVL(a.activo,'N')='S'
         ORDER BY a.id`
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      reject(
        `Error en getMatriculasDb: ${error.message.replace(/['"]+/g, "")}`
      );
    }
  });
};

export default {
  getMatriculasDb,
};
