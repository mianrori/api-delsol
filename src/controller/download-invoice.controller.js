import path from "path";
import fs from "fs";
//const PDF_DIRECTORY = 'C:\\node\\sifen\\electronic-document\\kude\\invoices';
const PDF_DIRECTORY =
  "C:\\Users\\Miguel\\Documents\\Miguel\\Desarrollo\\Proyectos\\sifen\\electronic-document\\kude\\invoices";

export const downloadInvoiceController = async (req, res) => {
  try {
    const fileName = req.params.filename;
    // Usar la ruta absoluta definida
    const filePath = path.join(PDF_DIRECTORY, fileName);

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      return res
        .status(404)
        .json({
          status: 404,
          success: false,
          message: "Archivo no encontrado",
        });
    }

    // Verificar si es un PDF
    if (path.extname(fileName).toLowerCase() !== ".pdf") {
      return res
        .status(400)
        .json({
          status: 400,
          success: false,
          message: "El archivo no es un PDF",
        });
    }

    // Configurar headers para la descarga
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    // Crear stream de lectura y enviarlo al cliente
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    // Manejar errores en el stream
    fileStream.on("error", (error) => {
      res.status(500).json({ status: 500, success: false, message: error });
    });
  } catch (error) {
    res.status(500).json({ status: 500, success: false, message: error });
  }
};

export default { downloadInvoiceController };
