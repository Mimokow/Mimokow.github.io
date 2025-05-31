document.addEventListener('DOMContentLoaded', () => {
    
  // 1) Inkrementacja licznika wizyt tylko raz na sesję
  if (!sessionStorage.getItem('visited')) {
    let cnt = parseInt(localStorage.getItem('visitCount') || '0', 10);
    localStorage.setItem('visitCount', ++cnt);
    sessionStorage.setItem('visited', '1');
  }
  document.getElementById('visits').textContent =
    localStorage.getItem('visitCount');

  // 2) Zapamiętanie startu sesji
  if (!sessionStorage.getItem('sessionStart')) {
    sessionStorage.setItem('sessionStart', Date.now());
  }

  // 3) Aktualizacja timera co sekundę
  function updateTimer() {
    const start = parseInt(sessionStorage.getItem('sessionStart'), 10);
    const diff = Date.now() - start;
    const hrs = Math.floor(diff / 3_600_000);
    const mins = Math.floor((diff % 3_600_000) / 60_000);
    const secs = Math.floor((diff % 60_000) / 1000);
    const pad = n => String(n).padStart(2, '0');
    document.getElementById('timeSpent').textContent =
      `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }
  setInterval(updateTimer, 1000);
  updateTimer();
});
