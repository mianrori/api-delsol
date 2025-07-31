export const getTiposSolesDb = (db) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT a.id,
                a.descripcion,
                a.orden_uso,
                NVL(a.activo, 'N') activo,
                NVL(a.por_defecto, 'N') por_defecto,
                NVL(a.transferible, 'N') transferible,
                NVL(a.origen_banco, 'N') bancario,
                NVL(a.valid_for_parking, 'N') valid_for_parking,
                NVL(a.valid_for_store, 'N') valid_for_store
            FROM cf_tipo_sol a
          ORDER BY a.id`
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1].trim();
      console.log(`Error en getTiposSolesDb: ${error.message}`);
      reject({
        success: false,
        message,
      });
    }
  });
};

export default {
  getTiposSolesDb,
};
