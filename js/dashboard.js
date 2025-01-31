// Remove the entire night mode related code:
// function toggleNightMode() {
//   const body = document.body;
//   body.classList.toggle('night-mode');
//   
//   // Save preference to localStorage
//   const isNightMode = body.classList.contains('night-mode');
//   localStorage.setItem('nightMode', isNightMode);
// }
//
// // Apply saved preference on page load
// document.addEventListener('DOMContentLoaded', () => {
//   const isNightMode = localStorage.getItem('nightMode') === 'true';
//   if (isNightMode) {
//     document.body.classList.add('night-mode');
//   }
// }); 