
function IndicePlusImportant(Probabilite, exporTrajet, vulnerabilite) {
    const probabiliteCoef = Probabilite * 0.25;
    const expoTrajetCoef = exporTrajet * 0.25;
    const vulnerabiliteCoef = vulnerabilite * 0.2;

    const maxValue = Math.max(vulnerabiliteCoef, expoTrajetCoef, probabiliteCoef);

    if (maxValue === vulnerabiliteCoef) {
        return "Vulnérabilité";
    } else if (maxValue === expoTrajetCoef) {
        return "Exposition et trajet";
    } else if (maxValue === probabiliteCoef) {
        return "Probabilité";
    }

    return '';
}

export default IndicePlusImportant;