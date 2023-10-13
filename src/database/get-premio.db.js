export const getPremioDb = (db, dni) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT a.id,
          UPPER(LTRIM(RTRIM(b.descripcion))) descripcion,
          a.cantidad,
          a.cod_cliente,
          a.cod_grupo_local,
          a.cod_articulo,
          TO_CHAR(a.vigencia, 'dd/mm/yyyy hh24:mi') vigencia,
          TO_CHAR(a.vencimiento, 'dd/mm/yyyy hh24:mi') vencimiento
     FROM cf_premio_dir_reserva a, st_articulos b
    WHERE b.cod_articulo = a.cod_articulo
      AND NVL(a.estado, 'P') = 'P'
      AND a.dni = :dni
    ORDER BY 1`,
        [dni]
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      reject(`Error en getPremioDb: ${error.message.replace(/['"]+/g, "")}`);
    }
  });
};

export default {
  getPremioDb,
};
