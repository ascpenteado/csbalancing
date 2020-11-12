function CustomerSuccessBalancing(cs, customers, cs_away) {
    // Sorting Costumers
    const sortedCustomers = customers.sort(scoreAsc);

    // Find CSs away and remove them from CSs array
    const activeCS = cs.filter((x) => !cs_away.includes(x.id)).sort(scoreAsc);

    // Find CSs without minimum Customer Level and remove them
    const qualifiedCS = activeCS.filter((x) => {
        return x.score >= sortedCustomers[0].score;
    });

    // If there's no CSs qualified, return 0
    if (qualifiedCS.length < 1) {
        return 0;
    }

    // let a = qualifiedCS.length + (qualifiedCS.length * sortedCustomers.length);
    // let b = sortedCustomers.length + (qualifiedCS.length * sortedCustomers.length);

    // console.log(`Loop A: ${a}`);
    // console.log(`Loop B: ${b}`);
    // console.log(`B - A : ${b - a}`);

    // For each qualified CS, check Customer Level against CS Score
    for (let i = 0; i < qualifiedCS.length; i++) {
        let totalAccounts = 0;
        for (let k = 0; k < sortedCustomers.length; k++) {
            if (sortedCustomers[k].score <= qualifiedCS[i].score) {
                totalAccounts++;
                sortedCustomers.splice(sortedCustomers[k], 1);
                k--;
            }
        }
        qualifiedCS[i].accounts = totalAccounts;
    }

    // qualifiedCS.

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

module.exports = CustomerSuccessBalancing;
