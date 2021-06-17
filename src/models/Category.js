import { readFileSync, writeFileSync, accessSync } from 'fs';

const filePath = `${process.cwd()}/data/categories.json`;

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

const storeCategory = (data) => {
    // get the data
    const existingData = getFileContents();

    const newCategory = {
        decription: data.decription || '',
        name: data.name || '',
    };
    // append to it the new category
    existingData.push(newCategory);

    // save the new data
    saveFile(existingData);
}

const getAllCategories = () => {
    return getFileContents();
}

const getCAtegoryById = (id) => {
    const categories = getAllCategories();

    return categories[id];
}

const updateCategory = (id, category, newData) => {
    category.name = newData.name || '';
    category.description = newData.description || '';

    const categories = getAllCategories();
    categories[id] = category;

    saveFile(categories);
}

const deleteCategory = (id) => {
    const categories = getAllCategories();
    categories.splice(id, 1);

    saveFile(categories);
}

export { storeCategory, getAllCategories, 
    getCAtegoryById, updateCategory, deleteCategory };