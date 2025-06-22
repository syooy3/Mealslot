const hoverSound = document.getElementById('hover-sound');
const clickSound = document.getElementById('active-sound');
const spinSound = document.getElementById('spin-sound');
const reel1Sound = document.getElementById('reel1-sound');
const reel2Sound = document.getElementById('reel2-sound');
const reel3Sound = document.getElementById('reel3-sound');
const jackpotSound = document.getElementById('jackpot-sound');
const doubleSound = document.getElementById('double-sound');
const nomatchSound = document.getElementById('nomatch-sound');

class MealSlot {
  constructor() {
    this.foods = [
    'sushi.png', 
    'pizza.png', 
    'kimbap.png', 
    'taco.png', 
    'ramen.png', 
    'pasta.png', 
    'tteokbokki.png', 
    'gukbap.png', 
    'chicken.png', 
    'salad.png', 
    'hamburger.png'
  ];
    this.reels = document.querySelectorAll('.reel');
    this.spinButton = document.getElementById('spin-button');
    this.resultMessage = document.getElementById('result-message');
    this.jackpotAnimation = document.getElementById('jackpot-animation');
    this.confettiContainer = document.getElementById('confetti-container');
    this.stoppedReels = 0;
    this.results = [];
    
    this.init();
  }

  init() {
    this.spinButton.addEventListener('click', () => this.spin());
    this.setupInitialReels();

    this.spinButton.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
    });

    this.spinButton.addEventListener('mousedown', () => {
    clickSound.currentTime = 0;
    clickSound.play();
    });

    console.log('MealSlot initialized');
  }

  setFoodImage(foodItem, imageUrl) {
    // Clear previous content
    foodItem.innerHTML = '';
    
    // Create and configure image element
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Food item';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    img.style.borderRadius = '4px';
    
    // Handle image loading errors
    img.onerror = () => {
      console.warn('Failed to load image:', imageUrl);
      // Fallback to emoji if image fails to load
      foodItem.innerHTML = '🍽️';
      foodItem.style.fontSize = '3.5rem';
      foodItem.style.display = 'flex';
      foodItem.style.alignItems = 'center';
      foodItem.style.justifyContent = 'center';
    };
    
    // Add image to container
    foodItem.appendChild(img);
  }

  setupInitialReels() {
    this.reels.forEach((reel, index) => {
      const foodItem = reel.querySelector('.food-item');
      const randomFood = this.foods[Math.floor(Math.random() * this.foods.length)];
      this.setFoodImage(foodItem, randomFood);
    });
  }

  spin() {
    spinSound.pause();
    spinSound.currentTime = 0;
    
    spinSound.currentTime = 0;
    spinSound.play();
    this.stoppedReels = 0;

    if (this.isSpinning) return;
    
    console.log('Starting spin...');
    this.isSpinning = true;
    this.spinButton.disabled = true;
    this.results = [];
    this.stoppedReels = 0;
    this.resultMessage.classList.remove('active');
    
    // Reset any previous jackpot animation
    this.jackpotAnimation.classList.remove('active');
    this.confettiContainer.innerHTML = '';
    
    // Start spinning animation for all reels
    this.reels.forEach((reel, index) => {
      reel.classList.add('spinning');
      this.startSpinningReel(reel, index);
    });
    
    // Stop spinning after different delays for each reel
    setTimeout(() => this.stopReel(0), 1500);
    setTimeout(() => this.stopReel(1), 2000);
    setTimeout(() => this.stopReel(2), 2500);
    
    // Check results after all reels stop
    setTimeout(() => this.checkResults(), 3500);
  }

  startSpinningReel(reel, index) {
    const foodItem = reel.querySelector('.food-item');
    
    // Create spinning effect by rapidly changing the food items
    const spinInterval = setInterval(() => {
      const randomFood = this.foods[Math.floor(Math.random() * this.foods.length)];
      this.setFoodImage(foodItem, randomFood);
    }, 100);
    
    // Store interval for later cleanup
    reel.spinInterval = spinInterval;
  }

  stopReel(reelIndex) {
    const reel = this.reels[reelIndex];
    const foodItem = reel.querySelector('.food-item');

    switch (reelIndex) {
    case 0:
      reel1Sound.currentTime = 0;
      reel1Sound.play();
      break;
    case 1:
      reel2Sound.currentTime = 0;
      reel2Sound.play();
      break;
    case 2:
       reel3Sound.currentTime = 0;
      reel3Sound.play();
      break;
    }
      this.stoppedReels++;
  
  
    if (this.stoppedReels === this.reels.length) {
      // 모든 릴이 멈췄을 때 실행
      spinSound.pause();
      spinSound.currentTime = 0;
      this.checkResults(); // 결과 확인
      this.isSpinning = false;
      this.spinButton.disabled = false;
      console.log('All reels stopped, spin reset');
}
    }
    
    // Clear the spinning interval
    clearInterval(reel.spinInterval);
    
    // Remove spinning class and add stopping class
    reel.classList.remove('spinning');
    reel.classList.add('stopping');
    
    // Set final random result
    const finalFood = this.foods[Math.floor(Math.random() * this.foods.length)];
    this.setFoodImage(foodItem, finalFood);
    
    // Store the result for checking
    this.results[reelIndex] = finalFood;
    
    console.log(`Reel ${reelIndex + 1} stopped with: ${finalFood}`);
    
    // Remove stopping class after animation
    setTimeout(() => {
      reel.classList.remove('stopping');
    }, 600);
  }

  updateMessage(text, color = 'white') {
  const messageElement = this.resultMessage.querySelector('.message-text');
  messageElement.textContent = text;
  messageElement.style.color = color;

  // 애니메이션 재시작을 위해 클래스 재설정
  this.resultMessage.classList.remove('active');
  void this.resultMessage.offsetWidth; // reflow
  this.resultMessage.classList.add('active');
}

  // MealSlot 클래스 내부에 추가
extractFileName(url) {
    if (!url || typeof url !== 'string') {
        console.warn('Invalid URL:', url);
        return 'unknown';
    }
    
    try {
        // 쿼리 파라미터나 프래그먼트 제거
        const cleanUrl = url.split('?')[0].split('#')[0];
        
        // 슬래시로 분할하여 마지막 부분 가져오기
        const parts = cleanUrl.split('/');
        const lastPart = parts[parts.length - 1];
        
        // 점으로 분할하여 확장자 제거
        const nameParts = lastPart.split('.');
        const fileName = nameParts[0];
        
        return fileName || 'unknown';
    } catch (error) {
        console.error('Error extracting filename:', error);
        return 'unknown';
    }
}

  checkResults() {
    this.results = ['gukbap.png', 'gukbap.png', 'gukbap.png'];
    console.log('Checking results:', this.results);
    
    // Check for winning combinations
    if (this.results[0] === this.results[1] && this.results[1] === this.results[2]) {
      // Triple match - Jackpot!
      const tripleFileName = this.results[0].split('/').pop().split('.')[0];
      
      jackpotSound.currentTime = 0;
      jackpotSound.play();
      
      let message = '';
      switch (tripleFileName) {
        case 'sushi':
          message = '';
          break;
        case 'pizza':
          message = '';
          break;
        case 'ramen':
          message = 'Economical!';
          break;
        case 'hamburger':
          message = 'Burger King';
          break;
        case 'gukbap':
          message = 'K-ajossi Core';
          break;
        case 'pasta':
          message = 'Italiana?';
          break;
        case 'salad':
          message = '#Eatgreen';
          break;
        case 'kimbap':
          message = 'Picnic Day';
          break;
        case 'tteokbokki':
          message = 'I love K-food';
          break;
        case 'taco':
          message = '';
          break;
        
      }
      
      this.updateMessage(message, 'black');
      this.showJackpot(); {
      function createBurstConfetti(count = 30) {
      const container = document.getElementById('jackpot-confetti');
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.setProperty('--confetti-color', getRandomColor());
      confetti.style.left = `${centerX}px`;
      confetti.style.top = `${centerY}px`;
      const angle = Math.random() * 2 * Math.PI;
      const distance = 100 + Math.random() * 100; // 퍼지는 반경
      const offsetX = Math.cos(angle) * distance;
      const offsetY = Math.sin(angle) * distance;

      confetti.animate([
      {
        transform: 'translate(0, 0) scale(1)',
        opacity: 1
      },
      {
        transform: `translate(${offsetX}px, ${offsetY}px) scale(0.8)`,
        opacity: 0.1
      }
      ], {
        duration: 1200 + Math.random() * 800,
        easing: 'ease-out',
        fill: 'forwards'
      });

      container.appendChild(confetti);
      setTimeout(() => container.removeChild(confetti), 2000);
       }
      }

    function getRandomColor() {
    const colors = ['#FFD700', '#FF69B4', '#00FFFF', '#ADFF2F', '#FFA500'];
    return colors[Math.floor(Math.random() * colors.length)];
    }

      createBurstConfetti(40);
      console.log('JACKPOT!');
      } 
      
    } else if (this.results[0] === this.results[1] || 
               this.results[1] === this.results[2] || 
               this.results[0] === this.results[2]) {
      // Double match
      doubleSound.currentTime = 0;
      doubleSound.play();
      let matchingFood;
      if (this.results[0] === this.results[1]) matchingFood = this.results[0];
      else if (this.results[1] === this.results[2]) matchingFood = this.results[1];
      else matchingFood = this.results[0];
      
      const fileName = this.extractFileName(matchingFood);
      console.log('matchingFood =', matchingFood);
      console.log('fileName =', fileName);
      
      this.updateMessage(`Wow! Two ${fileName}s in a day!`, '#90EE90');
    } 
    
    else {
      // No match
       nomatchSound.currentTime = 0;
       nomatchSound.play();
      const messages = [
        'Good Combination!',
        'Perfect Nutrition Balance!',
        'Nice Choice!'
      ];
      this.updateMessage(messages[Math.floor(Math.random() * messages.length)], 'white');
      console.log('No match');
    }
    
    spinSound.pause();
    spinSound.currentTime = 0;
    this.isSpinning = false;
    this.spinButton.disabled = false;
    console.log('Spin complete, button re-enabled');
  }

  showJackpot() {
    this.jackpotAnimation.classList.add('active');
    this.createConfetti();
    
    // Hide jackpot animation after 3 seconds
    setTimeout(() => {
      this.jackpotAnimation.classList.remove('active');
    }, 3000);
  }

  createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff69b4'];
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        
        this.confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
          }
        }, 5000);
      }, i * 30);
    }
  }


// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing MealSlot...');
  const game = new MealSlot();
  
  // Add some debug info
  window.mealSlot = game;
});

// Add some background floating animation
function createFloatingFood() {
  const foods = [
    'sushi.png', 
    'pizza.png', 
    'kimbap.png', 
    'taco.png', 
    'ramen.png', 
    'pasta.png', 
    'tteokbokki.png', 
    'gukbap.png', 
    'chicken.png', 
    'salad.png', 
    'hamburger.png'
  ];

  const foodContainer = document.createElement('div');
  foodContainer.style.position = 'fixed';
  foodContainer.style.width = '40px';
  foodContainer.style.height = '40px';
  foodContainer.style.opacity = '0.1';
  foodContainer.style.pointerEvents = 'none';
  foodContainer.style.zIndex = '-1';
  foodContainer.style.left = Math.random() * 100 + '%';
  foodContainer.style.top = '100vh';
  foodContainer.style.animation = `fall ${Math.random() * 10 + 15}s linear forwards`;
  
  // Create image for floating food
  const img = document.createElement('img');
  img.src = foods[Math.floor(Math.random() * foods.length)];
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'contain';
  
  // Fallback if image fails to load
  img.onerror = () => {
    foodContainer.innerHTML = '🍽️';
    foodContainer.style.fontSize = '1.5rem';
    foodContainer.style.display = 'flex';
    foodContainer.style.alignItems = 'center';
    foodContainer.style.justifyContent = 'center';
  };
  
  foodContainer.appendChild(img);
  document.body.appendChild(foodContainer);
  
  setTimeout(() => {
    if (foodContainer.parentNode) {
      foodContainer.parentNode.removeChild(foodContainer);
    }
  }, 25000);
}

// Create floating food periodically
setInterval(createFloatingFood, 4000);

// Add initial floating food
setTimeout(createFloatingFood, 1000);
