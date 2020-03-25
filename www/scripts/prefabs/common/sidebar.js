import Layout from '../layout/module.js'

export default (t2, t1, nav, ...panel) => Layout.Join(
  Layout.Header(t1, t2),
  Layout.Container('div', ['panel'],
    Layout.Nav(...nav),
    Layout.Container('div', ['links', 'panel'],
      ...panel
    )
  )
)