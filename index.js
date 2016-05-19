'use strict'

module.exports = function parseElement (e) {
  const name = e.nodeName
  if (name === '#text') {
    return escapeAttribute(e.value) || ''
  }
  const attr = e.attributes
  const children = e.childNodes
  var html = '<' + name
  if (e.id) {
    html += ` id="${e.id}"`
  }
  if (e.className) {
    html += ` class="${e.className}"`
  }
  if (attr) {
    for (let i = 0, len = attr.length; i < len; i++) {
      let val = attr[i].value
      if (attr[i].name === 'value') {
        val = escapeValue(attr[i].value)
      } else {
        val = escapeAttribute(attr[i].value)
      }
      html += ' ' + attr[i].name + '="' + val + '"'
    }
  }
  if (children && children.length) {
    html += '>'
    for (let i in children) {
      html += parseElement(children[i])
    }
    html += `</${name}>`
  } else {
    if (name === 'textarea') {
      html += `></${name}>`
    } else {
      html += '/>'
    }
  }
  return html
}

function escapeValue (s) {
  return typeof s === 'string' ? s.replace(/&/g, '&amp;') : s
}

function escapeAttribute (s) {
  return typeof s === 'string'
    ? s.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    : s
}
