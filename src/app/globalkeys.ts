
declare var $: any

const factory = () => {
  let handlers = new Map()
  let ordered = []
  console.log('Constructor')

  let instance = {
    addHandler,
    removeHandler,
    handleKeyDown,
    reset
  }


  return instance

  function reset () {
    handlers.clear()
    ordered.length = 0
  }

  function addHandler (id, priority, handler) {
    // logger.debug('addHandler', id, priority)
    let wasSize = handlers.size
    handlers.set(id, { priority, handler })
    ordered.push({ id, priority })
    ordered.sort(priorityOrder)

    if (wasSize === 0) {
      $('body').on('keydown.globalkeys', handleKeyDown)
    }
  }

  function removeHandler (id) {
    let value = handlers.get(id)
    if (value) {
      ordered = ordered.filter(o => o.id !== id)
    }
    handlers.delete(id)

    if (handlers.size === 0) {
      $('body').off('keydown.globalkeys')
    }
  }

  // Descending order
  function priorityOrder (a, b) {
    if (a.priority < b.priority) {
      return 1
    }

    if (a.priority > b.priority) {
      return -1
    }

    return 0
  }

  function handleKeyDown (event) {
    // Run any handlers in priority order until we run out or it returns false
    // wrap in promises
    let p = Promise.resolve(false)
    ordered.forEach(o => {
      // logger.debug('handleKeyDown handler id', o.id)
      let info = handlers.get(o.id)
      if (info) {
        p = p.then(handled => {
          if (handled) {
            // logger.debug('Handled!')
            event.preventDefault()
            event.stopPropagation()
            return true
          }
          let result = info.handler(event)
          // logger.debug('...handled?', o.id, result)
          return result
        })
      }
    })

    return p
      .then(handled => {
        if (handled) {
          // logger.debug('stop')
          if (event) {
            event.preventDefault()
            event.stopPropagation()
          }
        }
      })
  }
}

export default factory()
