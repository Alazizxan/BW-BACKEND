const {Router} = require('express');
const {createWallet, getWallet} = require("../controllers/wallet-controller");

const walletRouter = Router();


walletRouter.post('/create', createWallet);
walletRouter.get('/get/:id', getWallet);


module.exports = walletRouter;