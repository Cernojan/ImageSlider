function showHelp() {
    document.getElementById("help").style.display = 'block';
    document.getElementById("gameData").style.display = 'none';
    document.getElementById("buttons").style.display = 'none';
    document.getElementById("gameSettings").style.display = "none";
}
  
function goBackToMenu() {
    document.getElementById("help").style.display = 'none';
    document.getElementById("gameData").style.display = 'block';
    document.getElementById("buttons").style.display = 'block';
    document.getElementById("gameSettings").style.display = "block";
}

document.getElementById("startGame").addEventListener('click', () => {
    setTimeout(() => {
        document.getElementById("buttons").style.display = 'none';
        document.getElementById("gameSettings").style.display = "none";
    }, 1000);

    setTimeout(() => {
        const slidingImage = new SlidingImage(1, parseInt(document.querySelector(".active").value));
        
        slidingImage.start();
    }, 2000);
  }, { once: true });
  
  document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("help").style.display = 'none';
});

function exitGame() {
    window.location = 'index.html';
  }
  
let prevButton = document.getElementById("level2");
const wrapper = document.getElementById("gameSettings");
  
  wrapper.addEventListener('click', (e) => {
  
    const isButton = e.target.nodeName === 'BUTTON'; 
    
    if (!isButton) {
      return;
    }
    
    e.target.classList.add('active'); 
  
    if(prevButton !== null) {
      prevButton.classList.remove('active');
    }
    
    prevButton = e.target;
  
});