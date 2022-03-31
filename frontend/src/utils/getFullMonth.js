//Fonction pour retourner un tableau comprenant tous les jours d'un mois précis et
//d'une année précise

//Export de la fonction
export function getFullMonth(month, year) {

    //Met les jours d'un mois dans un tableau
    //@params : Mois, année
    function getDaysInMonthUTC(month, year) {
        let date = new Date(Date.UTC(year, month, 1));
        let days = [];
        while (date.getUTCMonth() === month) {
            days.push(new Date(date));
            date.setUTCDate(date.getUTCDate() + 1);
        }
        return days;
    }

    //Variable de bouclement et envoie des jours dans le 1er tableau
    let daysInYear = [];
    let allDaysInMount = [];
    daysInYear.push(getDaysInMonthUTC(month, year));

    //Boucle afin de formater la date selon les format regionnaux
    for (let i = 0; i < daysInYear[0].length; i++) {
        let tmp = [];

        tmp.push(daysInYear[0][i]);
        allDaysInMount.push(tmp[0].toLocaleDateString('fr-ch', {weekday: 'long'}) + " " + tmp[0].getDate() + " " + tmp[0].toLocaleDateString('fr-ch', {month: 'long'}) + " " + tmp[0].getFullYear());
    }

    //Retour du tableau final
    return allDaysInMount
}
