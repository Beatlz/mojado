import { Readability } from "@mozilla/readability"
import IsArticle from "@/types/IsArticle"

const emptyArticleObject: IsArticle = {
  title: 'Article returned null',
  byline: '',
  dir: '',
  content: '',
  textContent: '',
  length: 0,
  excerpt: '',
  siteName: '',
}

const generateReaderMode = async(url: string): Promise<IsArticle> => {
  const response = await fetch(url)
  const html = await response.text()
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const articleObject = new Readability(doc).parse()
  const article = articleObject || emptyArticleObject
  const titleElement = <HTMLTitleElement>document.querySelector(`[data-id="article-title"]`)
  const bodyElement = <HTMLDivElement>document.querySelector(`[data-id="article-body"]`)
  const authorElement = <HTMLDivElement>document.querySelector(`[data-id="article-author"]`)

  titleElement.innerText = article.title
  authorElement.innerHTML = `
  <h5>By <span data-id="article-author">${article.byline}</span> from <span data-id="article-src">${article.siteName}</span></h5>
  `
  bodyElement.innerHTML = article.content

  return article
}

export default generateReaderMode
