function calcAge(d1, m1, y1) {
  let date = new Date()
  let d2 = date.getDate()
  let m2 = 1 + date.getMonth()
  let y2 = date.getFullYear()
  let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (d1 > d2) {
    d2 = d2 + month[m2 - 1]
    m2 = m2 - 1
  }
  if (m1 > m2) {
    m2 = m2 + 12
    y2 = y2 - 1
  }
  d = d2 - d1
  m = m2 - m1
  y = y2 - y1

  myBirthday = [d1, m1]
  Birthday = new Date(date.getFullYear(), myBirthday[1] - 1, myBirthday[0])
  if (date.getTime() > Birthday.getTime()) {
    Birthday.setFullYear(Birthday.getFullYear() + 1)
  }
  diff = Birthday.getTime() - date.getTime()
  days = Math.floor(diff / (1000 * 60 * 60 * 24))
  return { d, m, y, days }
}
let farah = calcAge(31, 1, 2005)
document.getElementById('f_age').innerHTML =
  ' ' + farah.y + ' سنه ' + 'و' + farah.m + ' شهور ' + 'و' + farah.d + ' يوم'
document.getElementById(
  'f_next_birthday'
).innerHTML = `ناقص ${days} علي عيد ميلادك`
let yossef = calcAge(5, 6, 2005)

document.getElementById('y_age').innerHTML =
  ' ' + yossef.y + ' سنه ' + 'و' + yossef.m + ' شهور ' + 'و' + yossef.d + ' يوم'
document.getElementById(
  'y_next_birthday'
).innerHTML = `ناقص ${days} علي عيد ميلادي`

let us = calcAge(8, 12, 2019)

document.getElementById('year_number').innerHTML =
  ' ' + us.y + ' سنه ' + 'و' + us.m + ' شهور ' + 'و' + us.d + ' يوم '

document.getElementById('month_number').innerHTML = `${us.y * 12 + us.m} شهر ${
  us.d
} يوم  `

document.getElementById('day_number').innerHTML = `${Math.round(
  (us.y * 12 + us.m) * 30.4167 + us.d
)} يوم `
document.getElementById('hour_number').innerHTML = `${
  Math.round((us.y * 12 + us.m) * 30.4167 + us.d) * 24
} ساعه `

/* add small circles with random position and background color */
/*function to generate random  background color*/
setBg = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)
  return randomColor
}
/* function to generate random number between two numbers*/
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
let circles = document.querySelectorAll('.small_circle')

circles.forEach((e) => {
  for (let i = 0; i < 20; i++) {
    let small_circles = document.createElement('div')
    small_circles.classList.add('little_circle')
    let height_width = randomNumber(30, 100)
    small_circles.style.cssText = `
    position:absolute; top:${randomNumber(0, 100)}%; left:${randomNumber(
      0,
      100
    )}%;
    z-index:-99;height:${height_width}px;width: ${height_width}px;background: #${setBg()}30;`
    e.appendChild(small_circles)
  }
})
/* swibe 100vh */
;(function () {
  'use strict'
  var pnls = document.querySelectorAll('.article').length,
    scdir,
    hold = false

  function _scrollY(obj) {
    var slength,
      plength,
      pan,
      step = 100,
      vh = window.innerHeight / 100,
      vmin = Math.min(window.innerHeight, window.innerWidth) / 100
    if (
      (this !== undefined && this.id === 'container') ||
      (obj !== undefined && obj.id === 'container')
    ) {
      pan = this || obj
      plength = parseInt(pan.offsetHeight / vh)
    }
    if (pan === undefined) {
      return
    }
    plength = plength || parseInt(pan.offsetHeight / vmin)
    slength = parseInt(pan.style.transform.replace('translateY(', ''))
    if (scdir === 'up' && Math.abs(slength) < plength - plength / pnls) {
      slength = slength - step
    } else if (scdir === 'down' && slength < 0) {
      slength = slength + step
    } else if (scdir === 'top') {
      slength = 0
    }
    if (hold === false) {
      hold = true
      pan.style.transform = 'translateY(' + slength + 'vh)'
      setTimeout(function () {
        hold = false
      }, 1000)
    }
  }

  function _swipe(obj) {
    var swdir,
      sX,
      sY,
      dX,
      dY,
      threshold = 100,
      /*[min distance traveled to be considered swipe]*/
      slack = 50,
      /*[max distance allowed at the same time in perpendicular direction]*/
      alT = 500,
      /*[max time allowed to travel that distance]*/
      elT /*[elapsed time]*/,
      stT /*[start time]*/
    obj.addEventListener(
      'touchstart',
      function (e) {
        var tchs = e.changedTouches[0]
        swdir = 'none'
        sX = tchs.pageX
        sY = tchs.pageY
        stT = new Date().getTime()
      },
      false
    )

    obj.addEventListener(
      'touchmove',
      function (e) {
        e.preventDefault()
      },
      false
    )

    obj.addEventListener(
      'touchend',
      function (e) {
        var tchs = e.changedTouches[0]
        dX = tchs.pageX - sX
        dY = tchs.pageY - sY
        elT = new Date().getTime() - stT
        if (elT <= alT) {
          if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
            swdir = dX < 0 ? 'left' : 'right'
          } else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
            swdir = dY < 0 ? 'up' : 'down'
          }
          if (obj.id === 'container') {
            if (swdir === 'up') {
              scdir = swdir
              _scrollY(obj)
            } else if (
              swdir === 'down' &&
              obj.style.transform !== 'translateY(0)'
            ) {
              scdir = swdir
              _scrollY(obj)
            }
            e.stopPropagation()
          }
        }
      },
      false
    )
  }

  var container = document.getElementById('container')
  container.style.transform = 'translateY(0)'
  container.addEventListener('wheel', function (e) {
    if (e.deltaY < 0) {
      scdir = 'down'
    }
    if (e.deltaY > 0) {
      scdir = 'up'
    }
    e.stopPropagation()
  })
  container.addEventListener('wheel', _scrollY)
  _swipe(container)
})()
var splide = new Splide('.splide', {
  type: 'loop',
})

splide.mount()
