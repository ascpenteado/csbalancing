function CustomerSuccessBalancing(cs, customers, cs_away) {
    const sortedCustomers = customers.sort(scoreAsc);

    const activeCS = cs.filter((x) => !cs_away.includes(x.id)).sort(scoreAsc);

    const qualifiedCS = activeCS.filter((x) => {
        return x.score >= sortedCustomers[0].score;
    });

    if (qualifiedCS.length < 1) {
        return 0;
    }

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
