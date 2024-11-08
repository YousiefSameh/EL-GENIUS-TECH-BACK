const express = require('express');
const router = express.Router();



router.get('/change-lang/:lang', (req, res) => {
  const newLang = req.params.lang;
  res.cookie('lang', newLang);
  res.setLocale(newLang);
  console.log("Language set to:", res.getLocale());  
  res.json({ message: res.__('welcome_message') });
});


module.exports = router;
