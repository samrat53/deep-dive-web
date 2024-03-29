const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = Account.findOne({
    userId: req.userId,
  });
  res.status(200).json({ balance: account.balance });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { to, amount } = req.body;

  const fromAccount = await Account.findOne({ userId: req.userId });
  if (!fromAccount || fromAccount.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "insufficient balance" });
  }

  const toAccount = await Account.findOne({ userId: to });
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({ message: " account doesnot exist" });
  }

  await Account.updateOne({ userId: to }, { $inc: { balance: amount } });
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  );

  await session.commitTransaction();
  res.status(200).json({ message: "transfer successfull" });
});

module.exports=router;