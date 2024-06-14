import db from '../DB/connect.js';

const getCamion =  async (req, res) => {
  try {    
    const numCarteGrise = req.body.numCarteGrise;
    console.log(numCarteGrise);
    let sql = 'SELECT * FROM camion WHERE num_carte_grise = ?'; 
    //let sql4 = 'SELECT * FROM chaffeur WHERE num_carte_grise = ? AND camion_id = ?';


    const result = await db.query(sql,[numCarteGrise]);
    //const result2 = await db.query(sql2,[result3[0]]);
    //const result4 = await db.query(sql4,[numCarteGrise,camion_id]); 

    console.log(result[0]);
    const {
      camion_id 
    }= result[0][0];
    
    let sql2 = 'SELECT * FROM chaffeur WHERE  camion_id = ?';
    const result2 = await db.query(sql2,[camion_id ]);

    let sql3 = 'SELECT * FROM matiere WHERE  camion_id = ?';
    const result3 = await db.query(sql3,[camion_id ]);
   
    res.status(200).send({info_camion : result[0], info_chaffeur : result2[0] , info_matiere : result3[0]});
    res.status(200).send(result2[0]);

    


  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
}

export default getCamion;