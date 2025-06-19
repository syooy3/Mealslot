const foods = [
  'chicken.png',
  'kimbap.png',
  'hamburger.png',
  'pasta.png',
  'ramen.png',
  'salad.png',
  'tteokbokki.png',
  'gukbap.png',
  'sushi.png',
  'taco.png',
  'pizza.png'
];

function spinReel(reelClass, delay) {
  const reel = document.querySelector(reelClass);
  let i = 0;
  const interval = setInterval(() => {
    reel.style.backgroundImage = `url(${foods[i % foods.length]})`;
    i++;
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    reel.style.backgroundImage = `url(${foods[Math.floor(Math.random() * foods.length)]})`;
  }, delay);
}

document.getElementById('spin-button').addEventListener('click', () => {
  spinReel('.reel1', 1000);
  spinReel('.reel2', 2000);
  spinReel('.reel3', 3000);
});
