const assert = require("chai").assert;
const CustomerSuccessBalancing = require("../index.js");

// Array to Map Helper
function array_to_map(arr) {
    const out = [];
    arr.forEach((el, ind) => {
        out.push({ id: ind + 1, score: el });
    });

    return out;
}

// Test scenarios
describe("Customer Success Balancing", function () {
    it("test_scenario_one should return 1", function () {
        const css = [
            { id: 1, score: 60 },
            { id: 2, score: 20 },
            { id: 3, score: 95 },
            { id: 4, score: 75 },
        ];

        const customers = [
            { id: 1, score: 90 },
            { id: 2, score: 20 },
            { id: 3, score: 70 },
            { id: 4, score: 40 },
            { id: 5, score: 60 },
            { id: 6, score: 10 },
        ];
        const balancer = new CustomerSuccessBalancing(css, customers, [2, 4]);
        const result = balancer.execute();
        assert.equal(result, 1);
    });

    it("test_scenario_two should return 0", function () {
        const css = array_to_map([11, 21, 31, 3, 4, 5]);

        const customers = array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);

        const balancer = new CustomerSuccessBalancing(css, customers, []);
        const result = balancer.execute();

        assert.equal(result, 0);
    });

    it("test_scenario_three should return 999", function () {
        this.timeout(1000);
        const customer_success = new Array(1000, 0);
        customer_success[998] = 100;

        const customers = new Array(10000, 10);

        const balancer = new CustomerSuccessBalancing(array_to_map(customer_success), array_to_map(customers), [1000]);
        const result = balancer.execute();

        assert.equal(result, 999);
    });

    it("test_scenario_four should return 0", function () {
        const balancer = new CustomerSuccessBalancing(
            array_to_map([1, 2, 3, 4, 5, 6]),
            array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]),
            []
        );
        const result = balancer.execute();

        assert.equal(result, 0);
    });

    it("test_scenario_five should return 1", function () {
        const balancer = new CustomerSuccessBalancing(
            array_to_map([100, 2, 3, 3, 4, 5]),
            array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]),
            []
        );
        const result = balancer.execute();
        assert.equal(result, 1);
    });

    it("test_scenario_six should return 0", function () {
        const balancer = new CustomerSuccessBalancing(
            array_to_map([100, 99, 88, 3, 4, 5]),
            array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]),
            [1, 3, 2]
        );
        const result = balancer.execute();
        assert.equal(result, 0);
    });

    it("test_scenario_seven should return 3", function () {
        const balancer = new CustomerSuccessBalancing(
            array_to_map([100, 99, 88, 3, 4, 5]),
            array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]),
            [4, 5, 6]
        );
        const result = balancer.execute();
        assert.equal(result, 3);
    });
});
