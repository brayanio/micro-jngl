import btn from './btn.js'

export default text => btn( text || 'Exit', () => fetch('http://localhost:4404') )