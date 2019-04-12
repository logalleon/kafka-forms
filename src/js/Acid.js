function update(element, multiplier) {
  const scale = multiplier / 40;
  const baseFrequency = 100 / multiplier;
  element.innerHTML = `<svg><filter id="noise" x="0%" y="0%" width="100%" height="100%"><feTurbulence baseFrequency="${baseFrequency + ' ' + baseFrequency}" result="NOISE" numOctaves="1" /><feDisplacementMap in="SourceGraphic" in2="NOISE" scale="${scale}" xChannelSelector="R" yChannelSelector="R"></feDisplacementMap></filter></svg>`;
}

function Acid() {
  console.log('Acid');
  var acid = document.createElement('div');
  document.body.appendChild(acid);
  window.addEventListener('scroll', () => {
    console.log('scroll');
    update(acid, window.scrollY/100);
  });
}


module.exports = Acid;