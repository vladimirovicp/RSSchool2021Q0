const rippleButton = document.querySelector('.ripple')

if (rippleButton) {

    rippleButton.addEventListener('click', function (e) {

      const circle = document.createElement('span')
      circle.classList.add('circle')
      circle.style.top = e.layerY + 'px'
      circle.style.left = e.layerX + 'px'

      this.appendChild(circle)
      setTimeout(() => circle.remove(), 500)
      
    })

}