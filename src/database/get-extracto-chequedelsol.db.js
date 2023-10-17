import oracledb from "oracledb";

export const getExtractoChequeDelSolDb = (db, dni) => {
  return new Promise(async (resolve) => {
    try {
      const result = await db.execute(
        `SELECT * FROM TABLE(fun_tab_cheque_sol_extracto(:dni)) a
        ORDER BY a.fecha DESC`,
        [dni]
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      console.log(`Error en getExtractoChequeDelSolDb: ${error}`);
    }
  });
};

export default { getExtractoChequeDelSolDb };
