const DEFAULT_COLOR = "#FAD247";
const PURPLE = "#A646F0";
const RED = "#D95134";
const GREEN = "#44F13A";
const BLUE = "#34A9D9";

const NEW_NOTE = {
    id: 0,
    title: "",
    text: "",
    color: DEFAULT_COLOR
};

const NEW_MODE = "new"; //переменная для создания новой заметки
const EDIT_MODE = "edit"; //переменная для редактирования заметки

module.exports = { DEFAULT_COLOR, PURPLE, RED, GREEN, BLUE, NEW_NOTE, NEW_MODE, EDIT_MODE };