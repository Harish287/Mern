const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox',
  client_id:
    'ATN7_PKEOFD-E2qVrWQ58wdai9TKbzcDzFftMj7vpoRdgbms1QY3T1ncyL8VroH3dIPwCjL9e282A6RC',
  client_secret:
    'EH-ocCFIxfFNUGH_-zOluIexr7RFp3Vsm0-N_xxAiLAKokntRKciTicsfR-8NuXG7p3kShTGv6R5L_Lc',
});

module.exports = paypal;
