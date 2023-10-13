import oracledb from "oracledb";

export const getSolBancoDb = (db, dni) => {
  return new Promise(async (resolve) => {
    try {
      const result = await db.execute(
        `BEGIN
            pro_get_sol_banco(:dni);
         END;`,
        {
          dni: {
            dir: oracledb.BIND_IN,
            val: dni,
            type: oracledb.STRING,
          },
        }
      );
      resolve();
    } catch (error) {
      console.log(`Error en getSolBancoDb: ${error}`);
    }
  });
};

export default { getSolBancoDb };
