const path = require("path");
const { generateTheme } = require("antd-theme-generator");

const options = {
    stylesDir: path.join(__dirname, "../src/styles"),
    antDir: path.join(__dirname, "../node_modules/antd"),
    varFile: path.join(__dirname, "../src/styles/variables.less"),
    mainLessFile: path.join(__dirname, "../src/styles/index.less"),
    themeVariables: [
        "@primary-color",
        "@secondary-color",
        "@text-color",
        "@text-color-secondary",
        "@heading-color",
        "@layout-body-background",
        "@layout-header-background",
        "@border-radius-base"
    ],
    outputFilePath: path.join(__dirname, "../public/color.less")
};

generateTheme(options)
    .then(less => {
        console.log("Theme generated successfully");
    })
    .catch(error => {
        console.log("Error", error);
    });
