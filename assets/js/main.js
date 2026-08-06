document.querySelectorAll('.side a').forEach(function (link) {link.addEventListener('click', function (event) {event.preventDefault(); document.querySelectorAll('.side a').forEach(function (item) {item.classList.remove('active');}); link.classList.add('active');});});

document.querySelectorAll('[data-scroll]').forEach(function (button) {button.addEventListener('click', function () {var target = document.querySelector(button.dataset.scroll); if (target) {target.scrollIntoView({behavior:'smooth'});}});});

var composer = document.querySelector('#composer');
if (composer) {composer.addEventListener('keydown', function (event) {if (event.key === 'Enter' && composer.value.trim()) {event.preventDefault(); alert('작성 기능은 현재 데모 화면입니다.'); composer.value = '';}});}

var subscribe = document.querySelector('.subscribe');
if (subscribe) {subscribe.addEventListener('submit', function (event) {event.preventDefault(); var email = subscribe.querySelector('input'); var button = subscribe.querySelector('button'); if (!email.value || !email.validity.valid) {email.focus(); return;} button.textContent = '구독 완료'; button.disabled = true;});}
