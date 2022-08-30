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
  const authorElement = <HTMLSpanElement>document.querySelector(`[data-id="article-author"]`)
  const srcElement = <HTMLSpanElement>document.querySelector(`[data-id="article-src"]`)

  titleElement.innerText = article.title
  bodyElement.innerHTML = article.content
  authorElement.innerText = article.byline
  srcElement.innerText = article.siteName

  return article
}

export default generateReaderMode
