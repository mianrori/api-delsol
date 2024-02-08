export const getExtractoSolDb = (db, dni, periodo, tipo) => {
  return new Promise(async (resolve) => {
    try {
      const result = await db.execute(
        `SELECT * FROM TABLE(fun_tab_historial_sol(:dni,:periodo,:tipo))`,
        [dni, periodo, tipo]
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      console.log(`Error en getExtractoSolDb: ${error}`);
    }
  });
};

export default { getExtractoSolDb };
