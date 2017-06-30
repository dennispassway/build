import Test2 from './Test2'
import styles from './test.css'
import json from './test.json'

const extra = { x: 'x' }

export default class Test extends Component {

  state = { counter: 0, ...extra }

  render() {
    return (
      <div>
        {this.props.soep}
        {this.state.counter}
        <Test2 />
      </div>
    )
  }

  componentDidMount() {
    console.log(this.state)
    console.log(json)
    console.log(new (getDecorator())().x)
    this.interval = setInterval(() => this.setState(({ counter }) => ({ counter: counter + 1 })), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }
}

function getDecorator() {
  return @decorator class Check {}

  function decorator(Class) {
    return class Decorator { x = 'a decorator' }
  }
}