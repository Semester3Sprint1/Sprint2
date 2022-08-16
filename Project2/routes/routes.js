const express = require("express");
const router = express.Router();
router.use(express.static("public"));

const RecordsDal = require("../services/customer.dal");

router.get("/:id", async (req, res) => {
  let customer = await customerDal.getCustomerRentalsById(req.params.id);
  if (customer.length === 0) res.render("norecord");
  else {
    res.render("customerRentals.ejs", { customer });
  }
});

module.exports = router;
