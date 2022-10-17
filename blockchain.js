let provider = new ethers.providers.Web3Provider(window.ethereum)

let signer

async function connectMetamask() {
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    console.log("Account address:", await signer.getAddress());

    const balance = await signer.getBalance()
    const convertToEth = 1e18;
    console.log("account's balance in ether:", balance.toString() / convertToEth)

}


async function claimTokens() {
    const runTokenContractAddress = "0x0950a2e33520D15b02A7d666fA017D98947aAEc2";
    const runTokenContractAbi = [
            "function mintTokens(address account, uint256, amount) public"
    ];

    const runTokenContract = new ethers.Contract(runTokenContractAddress, runTokenContractAbi, provider);
    let convertToWei = 1000000000
    let amountToClaim = window.totalGweiScore * convertToWei
    await runTokenContract.connect(signer).mintTokens(signer.getAddress(), amountToClaim.toString())
}

async function claimNFT() {
    const nftContractAddress = "0xD9B50248fdcFd297770e89cf318D71E2B63d1c01";
    const mintContractAbi = [
        "function mint(uint256 amount) public"
    ];
        const nftContract = new ethers.Contract(nftContractAddress, mintContractAbi, provider)
        await nftContract.connect(signer).mint(window.totalNFTScore.toString())
}