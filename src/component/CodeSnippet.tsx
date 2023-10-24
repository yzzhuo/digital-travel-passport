export const CodeSnippet = ({
  title,
  code = '',
}: {
  title: string
  code: string
}) => (
  <div className='code-snippet'>
    <span className='code-snippet__title'>{title}</span>
    <div className='code-snippet__container'>
      <div className='code-snippet__wrapper'>
        <pre className='code-snippet__body'>{code}</pre>
      </div>
    </div>
  </div>
)
