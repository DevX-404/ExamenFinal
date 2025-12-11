const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();


async function procesarArchivo() {
    try {

        const contenido = await fs.readFile(path.join(__dirname, 'entrada.txt'), 'utf8');

        const totalCaracteres = contenido.length;
        const totalPalabras = contenido.trim().split(/\s+/).filter(palabra => palabra.length > 0).length;
        const totalLineas = contenido.split('\n').length;

        const estadisticas = `--- Estadisticas de Entrada.txt ---
        Total de Caracteres: ${totalCaracteres}
        Total de Palabras: ${totalPalabras}
        Total de Lineas: ${totalLineas}`;

        await fs.writeFile(path.join(__dirname, 'estadísticas.txt'), estadisticas, 'utf8');

        console.log('Procesamiento completado. Resultados guardados en estadísticas.txt');
    } catch (error) {
        console.error('Error: El archivo entrada.txt no existe o no se pudo procesar.');
    }
}

procesarArchivo();

if (module.parent === null) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Servidor ejecutándose en el puerto ${port}`);
    });
} else {
    if (module.parent.id === '.') {
        console.log('Servidor ejecutándose en el puerto 3000');
    }
}