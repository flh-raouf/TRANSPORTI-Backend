import cron from 'node-cron';
import clearAccidentTable from './Util/Util/clearAccidentTable.js'; // Chemin vers votre fichier clearAccidentTable.js

// Configuration du cron job pour s'exécuter au début de chaque mois
cron.schedule('0 0 1 * *', async () => {
    console.log('Running the clearAccidentTable job...');
    await clearAccidentTable();
});

export default cron;
