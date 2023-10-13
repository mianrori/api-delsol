export const getHistorialTransferenciaChequeSolDb = (db, dni) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT a.fecha,
        a.doc_a a_dni,
        LOWER(b.name) a_nombre,
        LOWER(b.last_name) a_apellido,
        a.importe
   FROM cf_transf_chequesol a, cf_compradores b
  WHERE a.doc_a = b.cod_comprador
    AND nvl(a.anulado, 'N') = 'N'
    AND a.doc_de = :dni
 UNION ALL
 SELECT d.fecha, null, LOWER(e.nombre_fantasia), null, d.importe
   FROM cf_transf_chequesol_loc d, cc_clientes e
  WHERE d.cod_cliente = e.cod_cliente
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
      console.log(
        `Error en getHistorialTransferenciaChequeSolDb: ${error.message}`
      );
      reject({
        success: false,
        message,
      });
    }
  });
};

export default {
  getHistorialTransferenciaChequeSolDb,
};
