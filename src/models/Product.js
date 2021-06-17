import { readFileSync, writeFileSync, accessSync } from 'fs';

const filePath = `${process.cwd()}/data/articles.json`;

const getFileContents = () => {
    try {
        accessSync(filePath);

        return JSON.parse(readFileSync(filePath, 'utf8'));
    } catch (err) {
        console.error(err);
    }

    return '';
}

const saveFile = (newContent) => {
    try {
        accessSync(filePath);

        writeFileSync(filePath, JSON.stringify(newContent));
    } catch (err) {
        console.error(err);
    }
}

const storeArticle = (data) => {
    // get the data
    const existingData = getFileContents();

    const newArticle = {
        decription: data.decription || '',
        name: data.name || '',
        author: data.author || '',
    };
    // append to it the new article
    existingData.push(newArticle);

    // save the new data
    saveFile(existingData);
}

const getAllArticles = () => {
    return getFileContents();
}

const getArticleById = (id) => {
    const articles = getAllArticles();

    return articles[id];
}

const updateArticle = (id, article, newData) => {
    article.name = newData.name || '';
    article.description = newData.description || '';
    article.author = newData.author || '';

    const articles = getAllArticles();
    articles[id] = article;

    saveFile(articles);
}

const deleteArticle = (id) => {
    const articles = getAllArticles();
    articles.splice(id, 1);

    saveFile(articles);
}

export { storeArticle, getAllArticles, 
    getArticleById, updateArticle, deleteArticle };