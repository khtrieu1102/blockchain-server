const bodyParser = require("body-parser");
const express = require("express");
const _ = require("lodash");
const cors = require("cors");
const mongoose = require("mongoose");
const blockchain = require("./blockchain/blockchain");
const p2p = require("./blockchain/p2p");
const logger = require("morgan");
const transactionPool = require("./blockchain/transactionPool");
const wallet = require("./blockchain/wallet");
const httpPort = parseInt(process.env.HTTP_PORT) || 3001;
const p2pPort = parseInt(process.env.P2P_PORT) || 6001;

require("./middlewares/passport");
require("express-async-errors");

const initHttpServer = (myHttpPort) => {
	const app = express();
	app.use(cors());
	app.use(bodyParser.json());
	app.use(logger("dev"));
	// Connect to database
	mongoose
		.connect("mongodb://localhost:27017/Blockchain", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		.then(() => {
			console.log("Successfully connected to the database");
		})
		.catch((err) => {
			console.log(
				"Could not connected to the database. Exiting now...",
				err
			);
			process.exit();
		});
	app.use((err, req, res, next) => {
		if (err) {
			res.status(400).send(err.message);
		}
	});

	app.use("/api/auth", require("./routes/auth.route"));
	app.get("/blocks", (req, res) => {
		res.send(blockchain.getBlockchain());
	});
	app.get("/block/:hash", (req, res) => {
		const block = _.find(blockchain.getBlockchain(), {
			hash: req.params.hash,
		});
		res.send(block);
	});
	app.get("/transaction/:id", (req, res) => {
		const tx = _(blockchain.getBlockchain())
			.map((blocks) => blocks.data)
			.flatten()
			.find({ id: req.params.id });
		res.send(tx);
	});
	app.get("/address/:address", (req, res) => {
		const unspentTxOuts = _.filter(
			blockchain.getUnspentTxOuts(),
			(uTxO) => uTxO.address === req.params.address
		);
		res.send({ unspentTxOuts: unspentTxOuts });
	});
	app.get("/unspentTransactionOutputs", (req, res) => {
		res.send(blockchain.getUnspentTxOuts());
	});
	app.get("/myUnspentTransactionOutputs", (req, res) => {
		res.send(blockchain.getMyUnspentTransactionOutputs());
	});
	app.post("/mineRawBlock", (req, res) => {
		if (req.body.data == null) {
			res.send("data parameter is missing");
			return;
		}
		const newBlock = blockchain.generateRawNextBlock(req.body.data);
		if (newBlock === null) {
			res.status(400).send("could not generate block");
		} else {
			res.send(newBlock);
		}
	});
	app.post("/mineBlock", (req, res) => {
		const newBlock = blockchain.generateNextBlock();
		if (newBlock === null) {
			res.status(400).send("could not generate block");
		} else {
			res.send(newBlock);
		}
	});
	app.get("/balance", (req, res) => {
		const balance = blockchain.getAccountBalance();
		res.send({ balance: balance });
	});
	app.get("/address", (req, res) => {
		const address = wallet.getPublicFromWallet();
		res.send({ address: address });
	});
	app.post("/mineTransaction", (req, res) => {
		const address = req.body.address;
		const amount = req.body.amount;
		try {
			const resp = blockchain.generatenextBlockWithTransaction(
				address,
				amount
			);
			res.send(resp);
		} catch (e) {
			console.log(e.message);
			res.status(400).send(e.message);
		}
	});
	app.post("/sendTransaction", (req, res) => {
		try {
			const address = req.body.address;
			const amount = req.body.amount;
			if (address === undefined || amount === undefined) {
				throw Error("invalid address or amount");
			}
			const resp = blockchain.sendTransaction(address, amount);
			res.send(resp);
		} catch (e) {
			console.log(e.message);
			res.status(400).send(e.message);
		}
	});
	app.get("/transactionPool", (req, res) => {
		res.send(transactionPool.getTransactionPool());
	});
	app.get("/peers", (req, res) => {
		res.send(
			p2p
				.getSockets()
				.map(
					(s) => s._socket.remoteAddress + ":" + s._socket.remotePort
				)
		);
	});
	app.post("/addPeer", (req, res) => {
		p2p.connectToPeers(req.body.peer);
		res.send();
	});
	app.post("/stop", (req, res) => {
		res.send({ msg: "stopping server" });
		process.exit();
	});
	app.listen(myHttpPort, () => {
		console.log("Listening http on port: " + myHttpPort);
	});
};
initHttpServer(httpPort);
p2p.initP2PServer(p2pPort);
wallet.initWallet();
