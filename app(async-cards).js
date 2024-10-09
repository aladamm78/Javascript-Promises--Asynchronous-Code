document.addEventListener('DOMContentLoaded', async () => {
  const baseURL = 'https://deckofcardsapi.com/api/deck';

  // 1. Request a single card
  try {
    const response = await fetch(`${baseURL}/new/draw/`);
    const data = await response.json();
    const { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  } catch (error) {
    console.error('Error fetching single card:', error);
  }

  // 2. Request two cards from the same deck
  try {
    const firstResponse = await fetch(`${baseURL}/new/draw/`);
    const firstData = await firstResponse.json();
    const firstCard = firstData.cards[0];
    const deckId = firstData.deck_id;

    const secondResponse = await fetch(`${baseURL}/${deckId}/draw/`);
    const secondData = await secondResponse.json();
    const secondCard = secondData.cards[0];

    [firstCard, secondCard].forEach(card => {
      console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
    });
  } catch (error) {
    console.error('Error fetching two cards:', error);
  }

  // 3. HTML page with a button to draw cards
  let deckId = null;
  const $btn = document.querySelector('button');
  const $cardArea = document.getElementById('card-area');

  try {
    const shuffleResponse = await fetch(`${baseURL}/new/shuffle/`);
    const shuffleData = await shuffleResponse.json();
    deckId = shuffleData.deck_id;
    $btn.style.display = 'block'; // Show button
  } catch (error) {
    console.error('Error shuffling deck:', error);
  }

  $btn.addEventListener('click', async () => {
    try {
      const drawResponse = await fetch(`${baseURL}/${deckId}/draw/`);
      const drawData = await drawResponse.json();
      const cardSrc = drawData.cards[0].image;
      const angle = Math.random() * 90 - 45;
      const randomX = Math.random() * 40 - 20;
      const randomY = Math.random() * 40 - 20;

      const img = document.createElement('img');
      img.src = cardSrc;
      img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
      img.style.transition = 'transform 0.5s ease';
      $cardArea.appendChild(img);

      if (drawData.remaining === 0) {
        $btn.remove();
      }
    } catch (error) {
      console.error('Error drawing a card:', error);
    }
  });
});
