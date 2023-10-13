export const getCuponDb = (db, dni) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT LOWER(f.descripcion) descripcion, count(e.nro_cupon) cantidad
          FROM cf_grupo_cupones d, cf_canje_cupones_det e, cf_promociones_det f
         WHERE e.cod_empresa = d.cod_empresa
           AND e.cod_promocion = d.cod_promocion
           AND e.nro_item = d.nro_item
           AND e.cod_rango = d.cod_rango
           AND f.cod_empresa = d.cod_empresa
           AND f.cod_promocion = d.cod_promocion
           AND f.nro_item = d.nro_item
           AND f.fecha_hasta >= SYSDATE
           AND d.dni_participante = :dni
         GROUP BY LOWER(f.descripcion)`,
        [dni]
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      reject(`Error en getCuponDb: ${error.message.replace(/['"]+/g, "")}`);
    }
  });
};

export default {
  getCuponDb,
};
