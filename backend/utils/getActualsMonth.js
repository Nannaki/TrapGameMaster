
function getActualsMonth() {

    function getMounthInYearUTC(){
        let actualDay = new Date(Date.now())
        let months = []

        while (actualDay.getUTCMonth() < 11) {
            months.push(new Date(actualDay))
            actualDay.setUTCMonth(actualDay.getUTCMonth() + 1);
        }

        months.push(new Date(actualDay.setUTCMonth(actualDay.getUTCMonth())))

        return months
    }

    let getTmpMonth = []
    let finalMonth = []

    getTmpMonth.push(getMounthInYearUTC())

    for (let i = 0; i < getTmpMonth[0].length; i++ ) {
        let tmp = []

        tmp.push(getTmpMonth[0][i])
        finalMonth.push(tmp[0].toLocaleDateString('fr-ch', {month: 'long'}))
    }

    return finalMonth

}
