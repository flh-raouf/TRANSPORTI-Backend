function EstimRique (DangerLieALaMatiere , ProbabiliteDesAccidents , Trajet , VulnerabiliteDesZonesTraversees){
    const result = DangerLieALaMatiere * 0.3 + ProbabiliteDesAccidents * 0.2 + Trajet * 0.25 + VulnerabiliteDesZonesTraversees * 0.25;
    return +result.toFixed(2);
}

export default EstimRique;