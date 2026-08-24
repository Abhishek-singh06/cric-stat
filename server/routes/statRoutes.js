const express = require('express');
const router = express.Router();
const {
  getAllStats,
  getStatsByPlayer,
  createStat,
  updateStat,
  deleteStat,
} = require('../controllers/statController');

router.get('/', getAllStats);
router.get('/player/:playerId', getStatsByPlayer);
router.post('/', createStat);
router.put('/:id', updateStat);
router.delete('/:id', deleteStat);

module.exports = router;
