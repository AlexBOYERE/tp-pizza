const getData = require('./getData');

async function main() {
    try {
        console.log("Début de l'opération de récupération des données");
        const data = await getData();
        console.log(data);
        console.log("Fin de l'opération");
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
}

main();