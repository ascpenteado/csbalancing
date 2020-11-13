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

    csSearch(array, target) {
        let startIndex = 0;
        let endIndex = array.length - 1;

        while (startIndex <= endIndex) {
            if (target <= array[startIndex].score) {
                return array[startIndex].id;
            }

            let middleIndex = Math.floor((startIndex + endIndex) / 2);
            let nextIndex = middleIndex + 1;
            let prevIndex = middleIndex - 1;

            if (nextIndex > endIndex) {
                nextIndex = endIndex;
            }

            if (prevIndex < startIndex) {
                prevIndex = startIndex;
            }

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
            } else {
                return 0;
            }
        }
    }

    checkForTie(array) {
        for (let i = 0; i < array.length; i++) {
            if (i > 0) {
                if (array[i].accounts !== array[i - 1].accounts) {
                    break;
                } else {
                    return 0;
                }
            }
        }
    }

    getCSM(array) {
        const tie = this.checkForTie(array);
        if (tie === 0) {
            return 0;
        }
        return array.sort(this.accountDesc)[0].id;
    }

    execute() {
        const sortedCustomers = this.customers.sort(this.scoreAsc);

        const activeCS = this.cs.filter((x) => !this.cs_away.includes(x.id)).sort(this.scoreAsc);

        const qualifiedCS = activeCS
            .map((aCS) => {
                let newAcs = Object.assign({}, aCS);
                newAcs.accounts = 0;
                return newAcs;
            })
            .filter((x) => x.score >= sortedCustomers[0].score);

        if (qualifiedCS.length < 1) {
            return 0;
        }

        // For each customer associate a CSM
        sortedCustomers.forEach((customer) => {
            const csm = this.csSearch(qualifiedCS, customer.score);
            if (csm === 0) {
                return 0;
            }
            qualifiedCS.find((qCS) => qCS.id === csm).accounts++;
        });

        // Return CSM
        return this.getCSM(qualifiedCS);
    }
}

module.exports = CustomerSuccessBalancing;
