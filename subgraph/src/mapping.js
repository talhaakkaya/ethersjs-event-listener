"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWithdrawn = exports.handleStaked = exports.handleRewardsDurationUpdated = exports.handleRewardPaid = exports.handleRewardAdded = exports.handleRecovered = exports.handleOwnershipTransferred = void 0;
const graph_ts_1 = require("@graphprotocol/graph-ts");
const schema_1 = require("../generated/schema");
function handleOwnershipTransferred(event) { }
exports.handleOwnershipTransferred = handleOwnershipTransferred;
function handleRecovered(event) { }
exports.handleRecovered = handleRecovered;
function handleRewardAdded(event) { }
exports.handleRewardAdded = handleRewardAdded;
function handleRewardPaid(event) {
    let user = schema_1.User.load(event.params.user.toHexString());
    if (!user)
        return;
    let paidRewards = user.paidRewards;
    user.paidRewards = paidRewards.plus(event.params.reward);
    user.save();
}
exports.handleRewardPaid = handleRewardPaid;
function handleRewardsDurationUpdated(event) { }
exports.handleRewardsDurationUpdated = handleRewardsDurationUpdated;
function handleStaked(event) {
    let user = schema_1.User.load(event.params.user.toHexString());
    if (!user) {
        user = new schema_1.User(event.params.user.toHexString());
    }
    user.stakedAmount = event.params.amount;
    user.paidRewards = graph_ts_1.BigInt.zero();
    user.save();
}
exports.handleStaked = handleStaked;
function handleWithdrawn(event) {
    let user = schema_1.User.load(event.params.user.toHexString());
    if (!user)
        return;
    let userAmount = user.stakedAmount;
    user.stakedAmount = userAmount.minus(event.params.amount);
    user.save();
}
exports.handleWithdrawn = handleWithdrawn;
