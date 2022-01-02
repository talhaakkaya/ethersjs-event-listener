import { ethers } from "ethers";
import ABI from "./StakingRewards.json";

const CONTRACT_ADDRESS = "0x88afdaE1a9F58Da3E68584421937E5F564A0135b";
const RPC = "https://api.avax.network/ext/bc/C/rpc";

const provider = new ethers.providers.JsonRpcProvider(RPC);

const main = async (): Promise<void> => {
	const stakingRewards = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

	process.stdout.write("Watching...\n");

	// event Staked(address user, uint256 amount)
	stakingRewards.on("Staked", (user: string, amount: ethers.BigNumber) => {
		process.stdout.write(
			`Stake: (${user} - ${ethers.utils.formatUnits(amount, 18)})\n`
		);
	});

	// event Withdrawn(address user, uint256 amount)
	stakingRewards.on("Withdrawn", (user: string, amount: ethers.BigNumber) => {
		process.stdout.write(
			`Withdraw: (${user} - ${ethers.utils.formatUnits(amount, 18)})\n`
		);
	});
};

main().catch((err: Error) => {
	process.stderr.write(err + "\n");
	process.exit(1);
});
