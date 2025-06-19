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

const reels = [
  document.querySelector('.reel1'),
  document.querySelector('.reel2'),
  document.querySelector('.reel3')
];

const spinButton = document.getElementById('spin-button');

// 버튼 인터랙션
spinButton.addEventListener('mouseover', () => {
  spinButton.src = 'button_hover.png';
});
spinButton.addEventListener('mouseout', () => {
  spinButton.src = 'button_default.png';
});
spinButton.addEventListener('mousedown', () => {
  spinButton.src = 'button_pressed.png';
});
spinButton.addEventListener('mouseup', () => {
  spinButton.src = 'button_default.png';
});

spinButton.addEventListener('click', () => {
  // 릴에 애니메이션 적용
  let intervals = [];

  for (let i = 0; i < 3; i++) {
    let reel = reels[i];
    let count = 0;
    
    intervals[i] = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * foods.length);
      reel.style.backgroundImage = `url(${foods[randomIndex]})`;
      count++;
    }, 100);
  }

  // 1초 간격으로 릴 멈춤
  setTimeout(() => clearInterval(intervals[0]), 1000);
  setTimeout(() => clearInterval(intervals[1]), 2000);
  setTimeout(() => clearInterval(intervals[2]), 3000);
});
