const { ethers } = require('ethers');
const axios = require('axios');

const baseMainnetRpcUrl = "https://base-mainnet.g.alchemy.com/v2/hdPovnYpO6ln8pEpaZOtPBI4i3XwqmMp";
const provider = new ethers.providers.JsonRpcProvider(baseMainnetRpcUrl);
const ARBITRAGE_BOT_ABI = [{"inputs": [{"internalType": "address","name": "initialOwner","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [{"internalType": "address","name": "owner","type": "address"}],"name": "OwnableInvalidOwner","type": "error"},{"inputs": [{"internalType": "address","name": "account","type": "address"}],"name": "OwnableUnauthorizedAccount","type": "error"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"inputs": [{"internalType": "uint256","name": "_amount18","type": "uint256"},{"internalType": "uint256","name": "_amountOutMinDec18","type": "uint256"},{"internalType": "uint256","name": "_amountOutMinDec6","type": "uint256"}],"name": "ScaleToPantheonToUsdc","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_amount6","type": "uint256"},{"internalType": "uint256","name": "_amountOutMinDec18","type": "uint256"}],"name": "UsdcToPantheonToScale","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "_owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_scaleAmount","type": "uint256"}],"name": "getPantheonWithScale","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_usdcAmount","type": "uint256"}],"name": "getPantheonWithUsdc","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pantheonAmount","type": "uint256"}],"name": "getScaleWithPantheon","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pantheonAmount","type": "uint256"}],"name": "getUsdcWithPantheon","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "pantheonAddress","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "routerAddress","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "scaleAddress","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "usdcAddress","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"}]; // Replace with the ABI of your ARBITRAGE_BOT contract
const PANTHEON_ABI = [{"inputs":[{"internalType":"address","name":"_feeAddress","type":"address"}],"stateMutability":"payable","type":"constructor"},{"inputs":[],"name":"EthTransferFailed","type":"error"},{"inputs":[],"name":"MustTradeOverMin","type":"error"},{"inputs":[],"name":"ZeroAddressNotAllowed","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newFeeAddress","type":"address"}],"name":"FeeAddressUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"time","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"recieved","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"sent","type":"uint256"}],"name":"PriceAfterMint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"time","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"recieved","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"sent","type":"uint256"}],"name":"PriceAfterRedeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"totalEthEmergencyFixed","type":"uint256"}],"name":"TotalEthFixed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyFixTotalEth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getMintPantheon","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getRedeemPantheon","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pantheon","type":"uint256"}],"name":"redeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]; // Replace with the ABI of your PANTHEON contract
const ARBITRAGE_BOT_ADDRESS = "0x4e8aea36a11b94058b8c6308472cba8c1d1baf1d"; // Replace with your ARBITRAGE_BOT contract address
const PANTHEON_ADDRESS = "0x993cd9c0512cfe335bc7eF0534236Ba760ea7526";
const arbContract = new ethers.Contract(ARBITRAGE_BOT_ADDRESS, ARBITRAGE_BOT_ABI, provider);
const pantheonContract = new ethers.Contract(PANTHEON_ADDRESS, PANTHEON_ABI, provider);
const profitFromMintGas = 743688;
const profitFromRedeemGas = 746748;
const usdcToPantheonToScaleGas = 918562;
const scaleToPantheonToUsdcGas = 914252;


async function getMintPriceInUSDC() {
    try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
  
        // Extract the Ethereum price from the response data
        const price = response.data.ethereum.usd;
  
        // Update the state with the Ethereum price
        const mintPrice = await getMintPrice();
        const mintPriceUSD = parseFloat(mintPrice) * parseFloat(price);
        return mintPriceUSD;
      } catch (error) {
        console.error('Error fetching Ethereum price:', error);
        return 0;
    }
}

async function getEthPriceInUSDC(amount_eth) {
    try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
  
        // Extract the Ethereum price from the response data
        const price = response.data.ethereum.usd;
  
        // Update the state with the Ethereum price
        const PriceUSD = parseFloat(amount_eth) * parseFloat(price);
        return PriceUSD;
      } catch (error) {
        console.error('Error fetching Ethereum price:', error);
        return 0;
    }
}

async function getTotalEth() {
  const totalEth = await pantheonContract.getTotalEth();
  const formattedTotalEth = parseFloat(ethers.utils.formatUnits(totalEth, 18));
  return formattedTotalEth;
}

async function getTotalSupply() {
  const totalSupply = await pantheonContract.totalSupply();
  const formattedTotalSupply = parseFloat(ethers.utils.formatUnits(totalSupply, 18));
  return formattedTotalSupply;
}

async function getMintPrice() {
  const totalEth = await getTotalEth();
  const totalSupply = await getTotalSupply();
  const mintPrice = (1 * totalEth) / totalSupply * 1.10;
  return getEthPriceInUSDC(mintPrice);
}

async function getRedeemPrice() {
    const redeemPrice = parseFloat(ethers.utils.formatEther(await pantheonContract.getRedeemPantheon(ethers.utils.parseEther('1'))))
    return getEthPriceInUSDC(redeemPrice);
}

async function getEthBalance(){
  let ethBalance = await arbContract.getEthBalance();
  ethBalance = parseFloat(ethers.utils.formatUnits(ethBalance, 18));
  return ethBalance;
}
async function getPantheonBalance(){
  let panthBalance = await arbContract.getPantheonBalance();
  panthBalance = parseFloat(ethers.utils.formatUnits(panthBalance, 18));
  return panthBalance;
}
async function getScaleBalance(){
  let scaleBalance = await arbContract.getScaleBalance();
  scaleBalance = parseFloat(ethers.utils.formatUnits(scaleBalance, 18));
  return scaleBalance;
}
async function getUsdcBalance(){
  let usdcBalance = await arbContract.getUsdcBalance();
  usdcBalance = parseFloat(ethers.utils.formatUnits(usdcBalance, 6));
  return usdcBalance;
}

async function getGasInDollars(gasAmount){
  gasPrice = await provider.getGasPrice()
  gasReturn = await getEthPriceInUSDC(parseFloat(ethers.utils.formatUnits(gasPrice, 18)));
  console.log(gasReturn * gasAmount)
  return gasReturn;
}




// scaleToPantheonToUSDC
async function scaleToPantheonToUSDC(amountIn18, amountOutMinDec18, amountOutMinDec6){
    const tx = await arbContract.ScaleToPantheonToUsdc(amountIn18, amountOutMinDec18, amountOutMinDec6);
    await tx.wait();
}

// UsdcToPantheonToScal
async function UsdcToPantheonToScale(amountIn6, amountOutMinDec18){
    const tx = await arbContract.UsdcToPantheonToScale(amountIn6, amountOutMinDec18);
    await tx.wait();
}

// mint profit
async function ProfitFromMint(ethers_amount, pantheonAmount){
    const tx = await arbContract.ProfitFromMint(ethers_amount, pantheonAmount);
    await tx.wait();
}

// redeem profit
async function ProfitFromRedeem(usdcAmount, pantheonAmount){
    const tx = await arbContract.ProfitFromRedeem(usdcAmount, pantheonAmount);
    await tx.wait();
}


async function getPricesFromPools() {
  const pantheonScaleUrl = "https://api.geckoterminal.com/api/v2/networks/base/pools/0x1948Bd09a8777023d4F15E29880930eD5bA0Daf2";
  const pantheonUsdcUrl = "https://api.geckoterminal.com/api/v2/networks/base/pools/0x36e05b7ad2f93816068c831415560ae872024f27";

  try {
    const [response1, response2] = await Promise.all([
      axios.get(pantheonScaleUrl),
      axios.get(pantheonUsdcUrl)
    ]);

    const data1 = response1.data;
    const data2 = response2.data;

    const pantheonPriceInPantheonScale = data1.data.attributes.quote_token_price_usd;
    const scalePriceInPantheon = data1.data.attributes.base_token_price_quote_token;
    const pantheonPriceInScale = data1.data.attributes.quote_token_price_base_token;

    const usdcPriceInPantheonUsdc = data2.data.attributes.quote_token_price_usd;
    const pantheonPriceInPantheonUsdc = data2.data.attributes.base_token_price_quote_token;
    const pantheonPriceInUsdc = data2.data.attributes.quote_token_price_base_token;

    return [pantheonPriceInPantheonScale, pantheonPriceInPantheonUsdc];
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}

async function getAllPrices(){
  return [prices[1], prices[0], prices[2]]
}


// проверка на прибыльность

const interval = 600000; // 10 min

async function mainLoop() {
  try {
    const prices = await getAllPrices(); // Fetch prices
    let amountIn18 = await getScaleBalance();
    let dollarGasUsdcToPantheonToScale = await getGasInDollars(usdcToPantheonToScaleGas);
    let dollarGasScaleToPantheonToUsdc = await getGasInDollars(scaleToPantheonToUsdcGas); 
    let dollarGasProfitFromMint = await getGasInDollars(profitFromMintGas); 
    let dollarGasProfitFromRedeem = await getGasInDollars(profitFromRedeemGas); 



    amountIn18 = amountIn18 * 0.1;
    amountIn18 = ethers.utils.parseUnits(`${amountIn18}`, 18);
  
    let pantheonAmount = await getPantheonBalance();
    pantheonAmount = amountIn18 * 0.1;
    pantheonAmount = ethers.utils.parseUnits(`${pantheonAmount}`, 18);

    let amountIn6 = await getUsdcBalance();
    amountIn6 = amountIn6 * 0.1;
    amountIn6 = ethers.utils.parseUnits(`${amountIn6}`, 6);
    amountIn6_float = parseFloat(ethers.utils.formatUnits(amountIn6, 6));
    let usdcAmount = amountIn6;

    let ethers_amount = await getEthBalance();
    ethers_amount = ethers_amount * 0.01;
    ethers_amount = ethers.utils.parseUnits(`${ethers_amount}`, 18);
    ethers_amount_float = parseFloat(ethers.utils.formatUnits(ethers_amount, 18));

    let pantheonAmountForMint = ethers.utils.parseUnits(`${(await getEthPriceInUSDC(ethers_amount_float)) / prices[0]}`, 18);
    let pantheonAmountForRedeem = ethers.utils.parseUnits(`${usdcAmount * prices[2] / prices[0]}`, 18);

    //let eth_amount_for_redeem = ethers.utils.parseUnits(pantheonAmount * prices[0] / (await getEthPriceInUSDC(1)), 18);



    // Compare panthen_usdc[1] and panthen_scale[0]
    if (prices[0] > prices[1] && prices[0] - prices[1 > dollarGasScaleToPantheonToUsdc]) {
      // Call scaleToPantheonToUSDC
      await scaleToPantheonToUSDC(amountIn18, 0, 0);
    } else if (prices[0] < prices[1] && prices[1] - prices[0] > dollarGasUsdcToPantheonToScale){
      // Call UsdcToPantheonToScale
      await UsdcToPantheonToScale(amountIn6, 0);
    }

    // Compare getMintPrice and panthen_usdc[1]
    const mintPrice = await getMintPrice();
    if (mintPrice < prices[0] && prices[0] - mintPrice > dollarGasProfitFromMint) {
      // Call ProfitFromMint
      await ProfitFromMint(ethers_amount, pantheonAmountForMint);
    }

    // Compare getRedeemPrice and panthen_usdc[1]
    const redeemPrice = await getRedeemPrice();
    if (prices[0] < redeemPrice && redeemPrice - prices[0] > dollarGasProfitFromRedeem) {
      // Call ProfitFromRedeem
      await ProfitFromRedeem(usdcAmount, pantheonAmountForRedeem);
    }
  } catch (error) {
    console.error('Error in main loop:', error.message);
  }
}

setInterval(mainLoop, interval);