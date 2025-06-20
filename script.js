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

// 각 릴을 회전시키는 함수
function spinReel(reel, delay) {
  let i = 0;
  // 0.1초마다 음식 이미지를 변경하여 회전 효과 생성
  const interval = setInterval(() => {
    reel.style.backgroundImage = `url(${foods[i % foods.length]})`;
    i++;
  }, 100);

  // 지정된 delay 이후에 회전을 멈추고 최종 이미지를 설정
  setTimeout(() => {
    clearInterval(interval);
    reel.style.backgroundImage = `url(${foods[Math.floor(Math.random() * foods.length)]})`;
  }, delay);
}

// 스핀 버튼 클릭 이벤트
spinButton.addEventListener('click', () => {
  // 버튼에 'spinning' 클래스를 추가하여 활성 상태로 변경
  spinButton.classList.add('spinning');

  // 각 릴을 1초 간격으로 순차적으로 멈추도록 호출
  spinReel(reels[0], 1000); // 1초 후에 첫 번째 릴 멈춤
  spinReel(reels[1], 2000); // 2초 후에 두 번째 릴 멈춤
  spinReel(reels[2], 3000); // 3초 후에 세 번째 릴 멈춤

  // 모든 릴이 멈춘 후 버튼을 다시 원래 상태로 복구
  setTimeout(() => {
    spinButton.classList.remove('spinning');
  }, 3000);
});
