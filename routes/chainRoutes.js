const express = require("express");
const router = express.Router();

const chainController = require("../controllers/chainController");
console.log(chainController);
router.get("/", chainController.dashboard);

router.get("/chains/add", chainController.showAddForm);
router.post("/chains/add", chainController.addChain);

router.get("/chains/edit/:id", chainController.showEditForm);
router.post("/chains/edit/:id", chainController.updateChain);

router.get("/chains/delete/:id", chainController.deleteChain);
router.get("/search",chainController.searchChain);
router.get("/filter", chainController.filterChains);
module.exports = router;