export default function Queue () {
  this.items = []

  Queue.prototype.enqueue = item => {
    this.items.push(item)
  }

  Queue.prototype.dequeue = () => {
    return this.items.shift()
  }

  Queue.prototype.front = () => {
    return this.items[0]
  }

  Queue.prototype.isEmpty = () => {
    return this.items.length === 0
  }

  Queue.prototype.size = () => {
    return this.items.length
  }
}
