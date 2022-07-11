// This file isn't required to run the plugin.
// It's used only to generate the json file list for the ui.html
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const path = require("path");
const fs = require("fs");
const rootPath = path.join(__dirname, 'icons');
function getFilePath(directory) {
    const paths = [];
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
        const directoryPath = path.join(directory, file);
        paths.push(directoryPath);
    });
    return paths;
}
(() => __awaiter(this, void 0, void 0, function* () {
    const json = [];
    const categories = [];
    const files = getFilePath(rootPath);
    files.forEach((file) => {
        categories.push(file.split("\\").pop());
    });
    categories.forEach((category) => {
        const folder = path.join(rootPath, category);
        const files = getFilePath(folder);
        const icons = files.map((file) => {
            console.log(file);
            try {
                const code = fs.readFileSync(file);
                const name = file.split("\\").pop();
                const tags = [];
                category.replace('&', '').replace('  ', ' ').split(" ").forEach((category) => {
                    tags.push(category.toLowerCase());
                });
                name.replace('&', '').replace(".svg", "").replace("-", " ").split(" ").forEach((name) => {
                    tags.push(name.toLowerCase());
                });
                return { name: name, file: code.toString(), tags: tags };
            }
            catch (e) {
                console.log(e);
            }
        });
        json.push({ category: category, icons: icons });
    });
    console.log(json);
    fs.writeFileSync('icons.json', JSON.stringify(json), { flag: 'w+' });
}))();
