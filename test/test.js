const assert = require("chai").assert;
const balancer = require("../index.js");

// Array to Map Helper
function array_to_map(arr) {
    let out = [];
    arr.forEach((el, ind) => {
        out.push({ id: ind + 1, score: el });
    });

    return out;
}

// Test scenarios
describe("Customer Success Balancing", function () {
    it("test_scenario_one should return 1", function () {
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

        assert.equal(balancer(css, customers, [2, 4]), 1);
    });

    it("test_scenario_two should return 0", function () {
        let css = array_to_map([11, 21, 31, 3, 4, 5]);

        let customers = array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);

        assert.equal(balancer(css, customers, []), 0);
    });

    it("test_scenario_three should return 999", function () {
        this.timeout(1000)
        let customer_success = new Array(1000, 0);
        customer_success[998] = 100;

        let customers = new Array(10000, 10);

        assert.equal(balancer(array_to_map(customer_success), array_to_map(customers), [1000]), 999);
    });

    it("test_scenario_four should return 0", function () {
        assert.equal(balancer(array_to_map([1, 2, 3, 4, 5, 6]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), []), 0);
    });
        
    it("test_scenario_five should return 1", function () {
        let result = balancer(array_to_map([100, 2, 3, 3, 4, 5]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), []);
        assert.equal(result, 1);
    });

    it("test_scenario_six should return 0", function () {
        let result = balancer(array_to_map([100, 99, 88, 3, 4, 5]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), [1, 3, 2]);
        assert.equal(result, 0)
    });

    it("test_scenario_seven should return 3", function () {
        let result = balancer(array_to_map([100, 99, 88, 3, 4, 5]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), [4, 5, 6])
        assert.equal(result, 3);
    });
});