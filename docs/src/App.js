import introduction from '/content/introduction/index.raw.md'
import choices from '/content/choices/index.raw.md'
import gettingStarted from '/content/getting-started/index.raw.md'
import configuration from '/content/configuration/index.raw.md'
import conventions from '/content/conventions/index.raw.md'
import advanced from '/content/advanced/index.raw.md'
import templateRenderers from '/content/template-renderers/index.raw.md'
import importantChanges from '/content/important-changes/index.raw.md'
import server from '/content/server/index.raw.md'
import { basicAuth, serverSideRendering, pageInSubDirectory, isomorphicJavascript, mailTemplates, redirects, singlePageApplication, staticSite, wordpress } from '/content/how-to'
import Menu from '/Menu'
import Content from '/Content'
import PublicPath from '/PublicPath'

const pages = [
  ['', '@kaliber/buid', '-- This is a work in progress --'],
  ['introduction', 'Introduction', introduction],
  ['getting-started', 'Getting started', gettingStarted],
  ['configuration', 'Configuration', configuration],
  ['conventions', 'Conventions', conventions],
  ['how-to', 'How to', [
    ['static-site', 'Static site', staticSite],
    ['server-side-rendering', 'Server side rendering', serverSideRendering],
    ['single-page-application', 'Single page application', singlePageApplication],
    ['page-in-sub-directory', 'Page in a sub-directory', pageInSubDirectory],
    ['isomorphic-javascript', 'Isomorphic (Universal) javascript', isomorphicJavascript],
    ['basic-auth', 'Basic authentication', basicAuth],
    ['mail-templates', 'Mail templates', mailTemplates],
    ['redirects', 'Redirects', redirects],
    ['wordpress', 'Integrate with WordPress', wordpress],
  ]],
  ['template-renderers', 'Template renderers', templateRenderers],
  ['server', 'Server', server],
  ['choices', 'Choices', choices],
  ['important-changes', 'Important changes', importantChanges],
  ['advanced', 'Advanced topics', advanced],
]

const flattenedPages = pages.reduce(
  (result, [id, title, componentOrSubPage]) => [
    ...result,
    ...(
      Array.isArray(componentOrSubPage)
        ? componentOrSubPage.map(([subId, title, component]) => [id + '/' + subId, title, component])
        : [[id, title, componentOrSubPage]]
    )
  ],
  []
)

export default class App extends Component {

  state = {
    pageInfo: []
  }

  render() {
    const { publicPath } = this.props
    const { pageInfo: [page = 'not-found', title = 'Not found', content = 'Sorry'] = [] } = this.state

    return (
      <PublicPath.Provider value={publicPath}>
        <h1>{title}</h1>
        <Menu {...{ pages, page }} />
        <Content>{content}</Content>
      </PublicPath.Provider>
    )
  }

  componentDidMount() {
    const { publicPath } = this.props
    const self = this

    updateLocation()
    window.onpopstate = updateLocation
    const originalPushState = window.history.pushState
    window.history.pushState = pushState

    function pushState(...args) {
      window.scrollTo(0, 0)
      originalPushState.apply(window.history, args)
      updateLocation()
    }

    function updateLocation() {
      const result = pageInfoFromHash() || pageInfoFromPathname()
      if (result) {
        const { location, pageInfo } = result
        self.setState({ pageInfo })
        const [_, title = null] = pageInfo || []
        window.history.replaceState(null, title, publicPath + location)
      }
    }
    function pageInfoFromHash() {
      const [routingHash, userHash] = document.location.hash.slice(1).split('#')
      return routingHash && getPageInfo(routingHash, userHash ? '#' + userHash : '')
    }

    function pageInfoFromPathname() {
      const location = document.location.pathname.replace(publicPath, '')
      return getPageInfo(location, document.location.hash)
    }

    function getPageInfo(extractedLocation, userHash) {
      const location = extractedLocation.endsWith('/') ? extractedLocation : extractedLocation + '/'
      const pageInfo = flattenedPages.find(([page]) =>
        //console.log('searching:', page + '/', location) ||
        page + '/' === location
      )
      return pageInfo && {
        location: (location.startsWith('/') ? location.slice(1) : location) + userHash,
        pageInfo
      }
    }
  }
}
