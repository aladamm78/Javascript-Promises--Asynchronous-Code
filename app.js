document.addEventListener('DOMContentLoaded', async () => {
  const favNumber = 78;
  const baseURL = "http://numbersapi.com";

  // 1. Request a single fact about a favorite number
  try {
    const response = await fetch(`${baseURL}/${favNumber}?json`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching fact about favorite number:', error);
  }

  // 2. Request facts for multiple favorite numbers
  const favNumbers = [7, 11, 22];
  try {
    const response = await fetch(`${baseURL}/${favNumbers}?json`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching multiple number facts:', error);
  }

  // 3. Request four facts about a favorite number
  const facts = [];
  try {
    for (let i = 0; i < 4; i++) {
      const response = await fetch(`${baseURL}/${favNumber}?json`);
      const data = await response.json();
      facts.push(data.text);
    }

    facts.forEach(fact => {
      document.getElementById('facts-area').insertAdjacentHTML('beforeend', `<p class="fact">${fact}</p>`);
    });
  } catch (error) {
    console.error('Error fetching multiple facts about favorite number:', error);
  }
});
