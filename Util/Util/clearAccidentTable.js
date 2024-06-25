import pool from '../../DB/connect.js';

const clearAccidentTable = async () => {
    try {
        const sql = 'TRUNCATE TABLE accident_table';
        await pool.query(sql);
        console.log('accident_table has been cleared.');
    } catch (error) {
        console.error('Error clearing accident_table:', error.message);
    }
};

export default clearAccidentTable;
