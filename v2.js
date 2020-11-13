function CustomerSuccessBalancing(cs, customers, cs_away) {
    const sortedCustomers = customers.sort(scoreAsc);

    const activeCS = cs.filter((x) => !cs_away.includes(x.id)).sort(scoreAsc);

    const qualifiedCS = activeCS.filter((x) => x.score >= sortedCustomers[0].score);

    if (qualifiedCS.length < 1) {
        return 0;
    }

    const csSearch = (array, target) => {
        let startIndex = 0;
        let endIndex = array.length - 1;

        while (startIndex <= endIndex) {
            if (target <= array[startIndex].score) {
                array[startIndex].accounts = array[startIndex].accounts + 1;
                console.log(array[startIndex]);
                return array[startIndex].id;
            }

            let middleIndex = Math.floor((startIndex + endIndex) / 2);
            let nextIndex = middleIndex + 1;
            let prevIndex = middleIndex - 1;

            if (target === array[middleIndex].score) {
                return array[middleIndex].id;
            }

            if (target > array[middleIndex].score && target <= array[nextIndex].score) {
                return array[nextIndex].id;
            }

            if (target < array[middleIndex].score && target >= array[prevIndex].score) {
                return array[middleIndex].id;
            }

            if (target > array[middleIndex].score) {
                startIndex = middleIndex + 1;
            }

            if (target < array[middleIndex].score) {
                endIndex = middleIndex - 1;
            }
        }

        return 0;
    };

    for (let i = 0; i < sortedCustomers.length; i++) {
        let totalAccounts = 0;

        let csID = csSearch(qualifiedCS, sortedCustomers[i].score);

        // for (let k = 0; k < sortedCustomers.length; k++) {
        //     if (sortedCustomers[k].score <= qualifiedCS[i].score) {
        //         totalAccounts++;
        //         sortedCustomers.splice(sortedCustomers[k], 1);
        //         k--;
        //     }
        // }
        // qualifiedCS[i].accounts = totalAccounts;
    }

    // For each qualified CS, check Customer Level against CS Score
    // for (let i = 0; i < qualifiedCS.length; i++) {
    //     let totalAccounts = 0;
    //     for (let k = 0; k < sortedCustomers.length; k++) {
    //         if (sortedCustomers[k].score <= qualifiedCS[i].score) {
    //             totalAccounts++;
    //             sortedCustomers.splice(sortedCustomers[k], 1);
    //             k--;
    //         }
    //     }
    //     qualifiedCS[i].accounts = totalAccounts;
    // }

    // Check for a tie
    for (let i = 0; i < qualifiedCS.length; i++) {
        if (i > 0) {
            if (qualifiedCS[i].accounts !== qualifiedCS[i - 1].accounts) {
                break;
            } else {
                return 0;
            }
        }
    }

    // Return CSM with the highest accounts number
    return qualifiedCS.sort(accountDesc)[0].id;

    // Sorting Helpers
    function scoreAsc(a, b) {
        return a.score - b.score;
    }

    function accountDesc(a, b) {
        return b.account - a.account;
    }
}

let css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
];

let customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
];

CustomerSuccessBalancing(css, customers, []);
