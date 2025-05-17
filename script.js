const numberInput = document.getElementById('numberInput');
const displayButton = document.getElementById('displayButton');
const errorMessage = document.getElementById('errorMessage');
const display = document.getElementById('display');

const segmentMap = {
  0: ['a', 'b', 'c', 'd', 'e', 'f'],
  1: ['b', 'c'],
  2: ['a', 'b', 'g', 'e', 'd'],
  3: ['a', 'b', 'g', 'c', 'd'],
  4: ['f', 'g', 'b', 'c'],
  5: ['a', 'f', 'g', 'c', 'd'],
  6: ['a', 'f', 'g', 'e', 'c', 'd'],
  7: ['a', 'b', 'c'],
  8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  9: ['a', 'b', 'c', 'd', 'f', 'g']
};

const isValidInput = (value) => /^\d{1,3}$/.test(value);

const createDigit = (num) => {
  const digit = document.createElement('div');
  digit.classList.add('digit');

  ['a', 'b', 'c', 'd', 'e', 'f', 'g'].forEach(segment => {
    const seg = document.createElement('div');
    seg.classList.add('segment', segment);
    if (segmentMap[num].includes(segment)) {
      seg.classList.add('on');
    }
    digit.appendChild(seg);
  });

  return digit;
};

const renderNumber = (numStr) => {
  display.innerHTML = '';
  numStr.split('').forEach(digit => {
    display.appendChild(createDigit(Number(digit)));
  });
};

const handleDisplay = () => {
  let value = numberInput.value.trim();

  // رقم سالب
  if (value.startsWith('-')) {
    errorMessage.textContent = 'Negative numbers are not allowed.';
    return;
  }

  // إزالة الأصفار من البداية
  value = value.replace(/^0+/, '') || '0';

  // تحقق من الصحة
  if (!isValidInput(value)) {
    errorMessage.textContent = 'Only numbers between 0 and 999 are allowed.';
    return;
  }

  errorMessage.textContent = '';
  renderNumber(value);
  localStorage.setItem('savedNumber', value);
};

// منع الأحرف - فقط أرقام
numberInput.addEventListener('keydown', (e) => {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete','-'];
  if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault();
    Swal.fire({
      icon: 'error',
      title: 'Invalid Entry',
      text: 'Only numbers are allowed from the keyboard!',
      confirmButtonText: 'Done'
    });
  }
});


window.addEventListener('load', () => {
  const saved = localStorage.getItem('savedNumber');
  if (saved && isValidInput(saved)) {
    numberInput.value = saved;
    renderNumber(saved);
  }
});

displayButton.addEventListener('click', handleDisplay);
