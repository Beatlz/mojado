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
  const bodyElement = <HTMLParagraphElement>document.querySelector(`[data-id="article-body"]`)
  const authorElement = <HTMLDivElement>document.querySelector(`[data-id="article-author"]`)
  const excerptElement = <HTMLParagraphElement>document.querySelector(`[data-id="article-excerpt]`)

  console.log(article)

  titleElement.innerText = article.title
  authorElement.innerHTML = `<p class="uk-article-meta">Written by <a href="#">${article.byline}</a> on 12 April 2012. Posted in <a href="#">${article.siteName}</a></p>`
  bodyElement.innerHTML = article.content
  excerptElement.innerText = article.excerpt

  return article
}

export default generateReaderMode
