const path = require('path')
const ROOT = require('../ROOT')

exports.resolve = file => path.join(process.cwd(), file)

exports.dependencies = module => path.join(ROOT, `node_modules/${module}`)

function getType (val) {
  return val
    ? Object(val).constructor.name
    : Object.prototype.toString.call(val).match(/\[object (.*)]/)[1]
}
function isObject (val) {
  return getType(val) === 'Object'
}
function isBoolean (val) {
  return getType(val) === 'Boolean'
}
function isArray (val) {
  return getType(val) === 'Array'
}

/**
 * $.extend
 */
function extend (...args) {
  let target = args[0],
    i = 1,
    deep = false

  // Handle a deep copy situation
  if (isBoolean(target)) {
    deep = target

    // Skip the boolean and the target
    target = Object(args[ i++ ])
  }
  for (; i < args.length; ++i) {
    const nextSource = args[i]
    // Skip over if null/undefined
    if (nextSource !== undefined && nextSource !== null) {
      for (let nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          let from = nextSource[nextKey],
            to = target[nextKey]

          if (
            deep &&
            getType(to) === getType(from) &&
            (isObject(to) || isArray(to))
          ) {
            extend(deep, to, from)
          } else {
            target[nextKey] = from
          }
        }
      }
    }
  }
  return target
}

exports.extend = extend
