const stripe = Stripe(
  'pk_test_51L2fxSLEtbr6x2oBeAhQtpN3ESzvMR9laoCKL2sxLoyKZdhi30gss35dYiEivHdv8um28sNm9mx5NkIkZs1Fx4Bx00uAr42uQR'
);
const elements = stripe.elements();

const cardElement = elements.create('card');
cardElement.mount('#card-element');

function initializePayment() {
  return fetch('/payments', { method: 'POST' }) //
    .then((res) => res.json())
    .then((data) => data);
}

async function confirmPayment(clientSecret) {
  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
    },
  });
  if (result.error) {
    console.error(result.error);
  } else {
    alert('Payment Confirmed!');
  }
}

document.getElementById('pay-button').addEventListener('click', async () => {
  const { clientSecret } = await initializePayment();
  confirmPayment(clientSecret);
});
