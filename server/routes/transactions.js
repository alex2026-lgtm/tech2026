const express = require('express');
// SECURITY: Trading bot transaction endpoints disabled
// const transactionController = require('../controllers/transactionController');

const router = new express.Router();

// SECURITY: Trading bot transaction endpoints have been disabled
// router.get('/snipping', transactionController.snipping);
// router.get('/front', transactionController.front);

// Return empty arrays for disabled endpoints to prevent frontend errors
router.get('/snipping', (req, res) => {
  res.status(200).json({
    error: false,
    data: []
  });
});

router.get('/front', (req, res) => {
  res.status(200).json({
    error: false,
    data: []
  });
});

router.get('/nft-stats', (req, res) => {
  try {
    // Mock data – replace with real logic later
    const response = {
      totalNFTs: 142837,
      walletConnected: false, // ← frontend usually controls this, but can be sent if needed
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error in /transactions/nft-stats:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch NFT statistics',
    });
  }
});

module.exports = router;
