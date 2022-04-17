import a from './utils'
import b from './utils/b'

function h(tag, props, children = []) {
  const dom = document.createElement(tag)

  for (const prop  in props) {
    dom.setAttribute(prop, props[prop])
  }

  children.forEach(child => {
    if(typeof child === 'string') {
      dom.textContent = child
    } else {
      dom.append(child)
    }
  })
  return dom;
}

function getChild(h) {
  return (
    <div class="red">
      hello world
      <p class="text">text</p>
    </div>
  )
}

function main(container = '#app') {
  const dom = document.querySelector(container)

  dom.append(getChild(h))
  dom.append(a(h))
  dom.append(b(h))
}

main()