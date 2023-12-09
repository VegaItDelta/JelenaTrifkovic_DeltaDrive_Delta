function simulateDriverRejection() {
    const randomProbability = Math.random();
    const rejectionProbability = 0.25;

    return randomProbability <= rejectionProbability;
}

module.exports = simulateDriverRejection;