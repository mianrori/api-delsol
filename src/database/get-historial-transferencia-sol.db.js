export const getHistorialTransferenciaSolDb = (db, dni) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT a.fecha,
        a.doc_a a_dni,
        LOWER(b.name) a_nombre,
        LOWER(b.last_name) a_apellido,
        LOWER(c.descripcion) tipo_sol,
        a.cantidad
   FROM cf_transferencia_sol a, cf_compradores b, cf_tipo_sol c
  WHERE a.doc_a = b.cod_comprador
    AND c.id = a.id_tipo_sol
    AND nvl(a.anulado, 'N') = 'N'
    AND a.doc_de = :dni
 UNION ALL
 SELECT d.fecha,
        null,
        LOWER(e.nombre_fantasia),
        null,
        LOWER(f.descripcion) tipo_sol,
        d.cantidad
   FROM cf_transf_sol_loc d, cc_clientes e, cf_tipo_sol f
  WHERE d.cod_cliente = e.cod_cliente
    AND f.id = d.id_tipo_sol
    AND nvl(d.anulado, 'N') = 'N'
    AND d.doc_de = :dni
  ORDER BY 1 DESC`,
        [dni]
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      let { message } = error;
      message = message.split("\n")[0].split(":")[1].trim();
      console.log(`Error en getHistorialTransferenciaSolDb: ${error.message}`);
      reject({
        success: false,
        message,
      });
    }
  });
};

export default {
  getHistorialTransferenciaSolDb,
};
