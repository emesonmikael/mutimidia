import { ethers } from 'ethers';

const CONTRACT_ADDRESS = 'ENDEREÇO_DO_CONTRATO';
const ABI = [
  // Coloque aqui a ABI do seu contrato
];

export const getContract = (providerOrSigner) => {
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, providerOrSigner);
};
