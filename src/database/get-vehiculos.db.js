export const getVehiculosDb = (db, dni) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT a.id,a.matricula,a.marca,a.modelo,a.color,NVL(a.debito_automatico,'N') debito_automatico
          FROM cf_socio_vehiculo a
         WHERE a.dni = :dni
           AND NVL(a.activo,'N')='S'
         ORDER BY a.id`,
        [dni]
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      reject(`Error en getVehiculosDb: ${error.message.replace(/['"]+/g, "")}`);
    }
  });
};

export default {
  getVehiculosDb,
};
