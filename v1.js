class CustomerSuccessBalancing {
    constructor(cs, customers, cs_away) {
        this.cs = cs;
        this.customers = customers;
        this.cs_away = cs_away;
    }

    // Sorting Helpers
    scoreAsc(a, b) {
        return a.score - b.score;
    }

    accountDesc(a, b) {
        return b.account - a.account;
    }

    execute() {
        const sortedCustomers = this.customers.sort(this.scoreAsc);

        const activeCS = this.cs.filter((x) => !this.cs_away.includes(x.id)).sort(this.scoreAsc);

        const qualifiedCS = activeCS.filter((x) => x.score >= sortedCustomers[0].score);

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
            // console.log(qualifiedCS[i]);
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
        return qualifiedCS.sort(this.accountDesc)[0].id;
    }
}

module.exports = CustomerSuccessBalancing;
