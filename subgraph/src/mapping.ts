import { BigInt } from "@graphprotocol/graph-ts";
import {
  StakingRewards,
  OwnershipTransferred,
  Recovered,
  RewardAdded,
  RewardPaid,
  RewardsDurationUpdated,
  Staked,
  Withdrawn,
} from "../generated/StakingRewards/StakingRewards";
import { User } from "../generated/schema";

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleRecovered(event: Recovered): void {}

export function handleRewardAdded(event: RewardAdded): void {}

export function handleRewardPaid(event: RewardPaid): void {
  let user = User.load(event.params.user.toString());

  if (!user) return;

  let paidRewards = user.paidRewards;
  user.paidRewards = paidRewards.plus(event.params.reward);
  user.save();
}

export function handleRewardsDurationUpdated(
  event: RewardsDurationUpdated
): void {}

export function handleStaked(event: Staked): void {
  let user = User.load(event.params.user.toString());

  if (!user) {
    user = new User(event.params.user.toString());
  }

  user.stakedAmount = event.params.amount;
  user.paidRewards = BigInt.zero();
  user.save();
}

export function handleWithdrawn(event: Withdrawn): void {
  let user = User.load(event.params.user.toString());

  if (!user) return;

  let userAmount = user.stakedAmount;
  user.stakedAmount = userAmount.minus(event.params.amount);
  user.save();
}
