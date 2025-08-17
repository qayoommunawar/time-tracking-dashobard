const dailyBtn = document.querySelector('.daily');
const weeklyBtn = document.querySelector('.weekly');
const monthlyBtn = document.querySelector('.monthly');
const headerBtn = document.querySelectorAll(".main-header--btn");


headerBtn.forEach(btn => {

  btn.addEventListener('click', () => {
    headerBtn.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  })
})

fetch('data.json')
  .then(res => res.json())
  .then(data => {

    function render(timeframe) {
      data.forEach(item => {
        const className = item.title.toLowerCase().replace(' ', '-');
        const card = document.querySelector(`.${className}`);

        if (card) {
          const hoursElem = card.querySelector('h2');
          const prevElem = card.querySelector('.last-date');

          hoursElem.textContent = `${item.timeframes[timeframe].current}hrs`;
          prevElem.textContent = `Previous - ${item.timeframes[timeframe].previous}hrs`;
        }
      });
    }


    dailyBtn.addEventListener('click', () => render('daily'));
    weeklyBtn.addEventListener('click', () => render('weekly'));
    monthlyBtn.addEventListener('click', () => render('monthly'));

    render('daily');
  })
  .catch(err => console.error('Error loading data:', err));
