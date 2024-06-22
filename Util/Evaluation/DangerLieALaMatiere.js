

function NatureDuDanger (expression) {
    const results = {
        'Classe 1': 5,
        'Classe 2': 5,
        'Classe 3': 4,
        'Classe 4.1': 4,
        'Classe 4.2': 4,
        'Classe 4.3': 3,
        'Classe 5.1': 4,
        'Classe 5.2': 4,
        'Classe 6.1': 5,
        'Classe 6.2': 2,
        'Classe 7': 5,
        'Classe 8': 3,
        'Classe 9': 1
    };
    return results[expression] || '';
}

function TypeDemballage (expression){
    const results = {
        'Type 1': 5,
        'Type 2': 3,
        'Type 3': 2
    };
    return results[expression] || '';
} 


function Quantity (expression){
    const result = {
        'Le tier' : 1 ,
        'Deux tiers' : 3 ,
        'Complet' : 5 
    };
    return result[expression] || '';
}

/*********************************************************************************** */
function DangerLieALaMatiere (expression1 , expression2 , expression3){
    const natureDuDanger = NatureDuDanger(expression1);
    const typeDemballage = TypeDemballage(expression2);
    const quantity = Quantity(expression3);

    const result = natureDuDanger*0.3 + typeDemballage*0.5 + quantity*0.2;
    return +result.toFixed(2);
}


export default DangerLieALaMatiere;