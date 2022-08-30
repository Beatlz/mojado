import validateString from "./utility/validateString";
import generateReaderMode from "./modules/article/generateReaderMode";

const goToArticle = (): void => {
  const articleInputElement = <HTMLInputElement>document.querySelector(`[data-id="article-url"]`)
  const articleURL = articleInputElement.value;
  const cachedURL = `http://webcache.googleusercontent.com/search?q=cache:${articleURL}&num=1`;
  const isURL = validateString(articleURL, `url`);

  if (!isURL) {
    throw new TypeError(`Not a valid URL`);
  }

  console.log("generating");

  generateReaderMode(cachedURL);
};

((): void => {
  const buttonElement = document.querySelector(`[data-id="goto-article"]`);

  buttonElement?.addEventListener("click", (): void => {
    goToArticle();
  });
})();
