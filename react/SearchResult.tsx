import classNames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import './styles/styles.css'

const CSS_HANDLES = ['searchResultContainer'] as const

function SearchResult() {
	const { handles } = useCssHandles(CSS_HANDLES)

	return (
		<section className={classNames(handles.searchResultContainer, 'relative w-100')}>
			<h1>Result da página</h1>
		</section>
	)
}

export default SearchResult
