import { ethers } from 'ethers';
const CONTRACT_ABI = [
    // "function name() view returns (string)",
    //"function symbol() view returns (string)",
    //"function balanceOf(address) view returns (uint)",
    //"function decimals() public view returns (uint8)",
    //"function totalSupply() public view returns (uint256)",
    //"function transfer(address to, uint amount)",
    //"event Transfer(address indexed from, address indexed to, uint amount)"
    "function decimals() external pure returns (uint8)",
    "function symbol() external pure returns (string memory)",
    "function name() external pure returns (string memory)",
    "function balanceOf(address account) public view returns (uint256)",
    "function transfer(address recipient, uint256 amount) external returns (bool)",
    "function transferFrom(address sender,address recipient,uint256 amount) external returns (bool)"
];

 
async function getMetaMaskProvider() {
    if (!window.ethereum) throw new Error(`No MetaMask found!`);
    await window.ethereum.send('eth_requestAccounts');
 
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) window.location.reload();
    });
    return provider;
}
export async function getTransaction(hash){
    const provider = await getMetaMaskProvider();
    const tx = await provider.getTransactionReceipt(hash);
    return tx;
}
 export async function getTokenBalance(address, contractAddress, decimals = 9) {
    const provider = await getMetaMaskProvider();
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);
    const balance = await contract.balanceOf(address)
    return ethers.utils.formatUnits(balance, decimals);
}

export async function transferToken(toAddress, contractAddress, quantity, decimals = 9) {
    const provider = await getMetaMaskProvider();
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);
    const contractSigner = contract.connect(signer);
    ethers.utils.getAddress(toAddress);//valida endereço
    const tx = await contractSigner.transfer(toAddress, ethers.utils.parseUnits(quantity, decimals));
    return tx;
}
export async function getBnbBalance(address) {
    const provider = await getMetaMaskProvider();
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance.toFixed());
}
 
export async function transferBnb(toAddress, quantity) {
    const provider = await getMetaMaskProvider();
    const signer = provider.getSigner();
    ethers.utils.getAddress(toAddress);//valida endereço
 
    const tx = await signer.sendTransaction({
        to: toAddress,
        value: ethers.utils.parseEther(quantity)
    })
 
    return tx;
}