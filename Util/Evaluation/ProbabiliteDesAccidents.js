function FrequenceDesAccidents(expression) {
    const result = {
        'Fréquente': 5,
        'Moyenne': 3,
        'Faible': 1
    };
    return result[expression] || '';
}

function GraviteDesAccidents(expression) {
    const result = {
        'Bléssure mineure': 1,
        'Bléssure modérée': 2,
        'Bléssure grave': 3,
        'Bléssure très grave': 4,
        'Bléssure critique': 4,
        'Décès': 5
    };
    return result[expression] || '';
}

/*********************************************************************************** */

function ProbabiliteDesAccidents(expression1, expression2) {
    const frequence = FrequenceDesAccidents(expression1);
    const gravite = GraviteDesAccidents(expression2);

    const result = frequence * 0.6 + gravite * 0.4;
    return +result.toFixed(2);
}

export default ProbabiliteDesAccidents;
