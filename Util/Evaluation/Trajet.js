function TypeDeRoute(expression) {
    const result = {
        'Autoroute': 1,
        'Nationale': 2,
        'Wilayal': 3,
        'Communal': 4,
        'Rural': 5
    };

    return result[expression] || '';
}

function Meteo(expression) {
    const result = {
        'Ensoleillé': 1,
        'Pluvieux': 4,
        'Nuageux': 2,
        'Venteux': 3,
        'Neigeux': 5
    };

    return result[expression] || '';
}

function EtatDeLaRoute(expression) {
    const result = {
        'Bon': 1,
        'Moyen': 3,
        'Mauvais': 5
    };

    return result[expression] || '';
}

/*********************************************************************************** */

function Trajet(expression1, expression2, expression3) {
    const typeRoute = TypeDeRoute(expression1);
    const meteo = Meteo(expression2);
    const etatRoute = EtatDeLaRoute(expression3);

    const result = typeRoute * 0.5 + meteo * 0.3 + etatRoute * 0.2;
    return +result.toFixed(2);
}

export default Trajet;
