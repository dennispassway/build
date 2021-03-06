import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light'
import prism from 'react-syntax-highlighter/styles/prism/prism'

import js from 'react-syntax-highlighter/languages/prism/javascript'
import css from 'react-syntax-highlighter/languages/prism/css'
import jsx from 'react-syntax-highlighter/languages/prism/jsx'
import php from 'react-syntax-highlighter/languages/prism/php'
import markupTemplating from 'react-syntax-highlighter/languages/prism/markup-templating'
import json from 'react-syntax-highlighter/languages/prism/json'

registerLanguage('js', js)
registerLanguage('css', css)
registerLanguage('jsx', jsx)
registerLanguage('php', php)
registerLanguage('markup-templating', markupTemplating) // for php
registerLanguage('json', json)

export default function CodeBlock({ language, value, ...props }) {
  return <SyntaxHighlighter language={language} style={prism} {...props}>{value}</SyntaxHighlighter>
}

export function JavaScript({ children, ...props }) {
  return <CodeBlock language='js' value={children} {...props} />
}

export function Css({ children, ...props }) {
  return <CodeBlock language='css' value={children} {...props} />
}
