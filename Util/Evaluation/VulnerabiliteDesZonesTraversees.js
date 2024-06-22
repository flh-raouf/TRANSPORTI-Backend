function DensiteHabitation (expression){
    const result = {
        'Forte' : 5 ,
        'Moyenne' : 3,
        'Faible': 1
    }

    return result[expression] || '';
}

function PresenseInfrasCritiquesSitesSensibles (expression){
    const result = {
        'Forte' : 5 ,
        'Moyenne' : 3,
        'Faible': 1
    }

    return result[expression] || '';
}	

function TypesDeZonesEnvCritiques (expression){
    const result = {
        'Zones Humides' : 2 ,
        'Forets' : 3,
        'Zones fertiles agricoles': 4,
        'Zones montagneuses': 5,
    }

    return result[expression] || '';
}	

/*********************************************************************************** */

function VulnerabiliteDesZonesTraversees (expression1 , expression2 , expression3){
    const densiteHabitation = DensiteHabitation(expression1);
    const presenseInfrasCritiquesSitesSensibles = PresenseInfrasCritiquesSitesSensibles(expression2);
    const typesDeZonesEnvCritiques = TypesDeZonesEnvCritiques(expression3);
    
    const result = densiteHabitation*0.5 + presenseInfrasCritiquesSitesSensibles*0.3 + typesDeZonesEnvCritiques*0.2;
    return +result.toFixed(2);
}

export default VulnerabiliteDesZonesTraversees;