export interface LatexColor {
    id: string;
    name: string;
    latex: string;
    hex: string;
    package?: string;
}

export const LATEX_COLORS: LatexColor[] = [
    // --- 紅、粉、紅紫系 (Red, Pink, Red-Violet) ---
    { id: 'maroon', name: 'Maroon', latex: '\\color{Maroon}', hex: '#AF3235', package: 'xcolor' },
    { id: 'red', name: 'Red', latex: '\\color{Red}', hex: '#ED1B23', package: 'xcolor' },
    { id: 'brickred', name: 'BrickRed', latex: '\\color{BrickRed}', hex: '#B6321C', package: 'xcolor' },
    { id: 'mahogany', name: 'Mahogany', latex: '\\color{Mahogany}', hex: '#A9341F', package: 'xcolor' },
    { id: 'bittersweet', name: 'Bittersweet', latex: '\\color{Bittersweet}', hex: '#C04F17', package: 'xcolor' },
    { id: 'redorange', name: 'RedOrange', latex: '\\color{RedOrange}', hex: '#F26035', package: 'xcolor' },
    { id: 'salmon', name: 'Salmon', latex: '\\color{Salmon}', hex: '#F69289', package: 'xcolor' },
    { id: 'pink', name: 'Pink', latex: '\\color{pink}', hex: '#FFC0CB' }, // 原有基礎色
    { id: 'carnationpink', name: 'CarnationPink', latex: '\\color{CarnationPink}', hex: '#F282B4', package: 'xcolor' },
    { id: 'rhodamine', name: 'Rhodamine', latex: '\\color{Rhodamine}', hex: '#EF559F', package: 'xcolor' },
    { id: 'wildstrawberry', name: 'WildStrawberry', latex: '\\color{WildStrawberry}', hex: '#EE2967', package: 'xcolor' },
    { id: 'rubinered', name: 'RubineRed', latex: '\\color{RubineRed}', hex: '#ED017D', package: 'xcolor' },

    // --- 橙、黃、棕色系 (Orange, Yellow, Brown) ---
    { id: 'orange', name: 'Orange', latex: '\\color{Orange}', hex: '#F58137', package: 'xcolor' },
    { id: 'burntorange', name: 'BurntOrange', latex: '\\color{BurntOrange}', hex: '#F7921D', package: 'xcolor' },
    { id: 'yelloworange', name: 'YellowOrange', latex: '\\color{YellowOrange}', hex: '#FAA21A', package: 'xcolor' },
    { id: 'apricot', name: 'Apricot', latex: '\\color{Apricot}', hex: '#FBB982', package: 'xcolor' },
    { id: 'peach', name: 'Peach', latex: '\\color{Peach}', hex: '#F7965A', package: 'xcolor' },
    { id: 'melon', name: 'Melon', latex: '\\color{Melon}', hex: '#F89E7B', package: 'xcolor' },
    { id: 'dandelion', name: 'Dandelion', latex: '\\color{Dandelion}', hex: '#FDBC42', package: 'xcolor' },
    { id: 'goldenrod', name: 'Goldenrod', latex: '\\color{Goldenrod}', hex: '#FFDF42', package: 'xcolor' },
    { id: 'yellow', name: 'Yellow', latex: '\\color{Yellow}', hex: '#FFF200', package: 'xcolor' },
    { id: 'olivegreen', name: 'OliveGreen', latex: '\\color{OliveGreen}', hex: '#3C8031', package: 'xcolor' },
    { id: 'olive', name: 'Olive', latex: '\\color{olive}', hex: '#808000' },
    { id: 'rawsienna', name: 'RawSienna', latex: '\\color{RawSienna}', hex: '#974006', package: 'xcolor' },
    { id: 'sepia', name: 'Sepia', latex: '\\color{Sepia}', hex: '#671800', package: 'xcolor' },
    { id: 'brown', name: 'Brown', latex: '\\color{Brown}', hex: '#792500', package: 'xcolor' },
    { id: 'tan', name: 'Tan', latex: '\\color{Tan}', hex: '#DA9D76', package: 'xcolor' },

    // --- 綠色系 (Green) ---
    { id: 'greenyellow', name: 'GreenYellow', latex: '\\color{GreenYellow}', hex: '#DFE674', package: 'xcolor' },
    { id: 'yellowgreen', name: 'YellowGreen', latex: '\\color{YellowGreen}', hex: '#98CC70', package: 'xcolor' },
    { id: 'springgreen', name: 'SpringGreen', latex: '\\color{SpringGreen}', hex: '#C6DC67', package: 'xcolor' },
    { id: 'limegreen', name: 'LimeGreen', latex: '\\color{LimeGreen}', hex: '#8DC73E', package: 'xcolor' },
    { id: 'lime', name: 'Lime', latex: '\\color{lime}', hex: '#00FF00' },
    { id: 'green', name: 'Green', latex: '\\color{Green}', hex: '#00A64F', package: 'xcolor' },
    { id: 'forestgreen', name: 'ForestGreen', latex: '\\color{ForestGreen}', hex: '#009B55', package: 'xcolor' },
    { id: 'pinegreen', name: 'PineGreen', latex: '\\color{PineGreen}', hex: '#008B72', package: 'xcolor' },
    { id: 'emerald', name: 'Emerald', latex: '\\color{Emerald}', hex: '#00A99D', package: 'xcolor' },
    { id: 'junglegreen', name: 'JungleGreen', latex: '\\color{JungleGreen}', hex: '#00A99A', package: 'xcolor' },
    { id: 'seagreen', name: 'SeaGreen', latex: '\\color{SeaGreen}', hex: '#3FBC9D', package: 'xcolor' },
    { id: 'teal', name: 'Teal', latex: '\\color{teal}', hex: '#008080' },

    // --- 藍、青色系 (Blue, Cyan, Aqua) ---
    { id: 'tealblue', name: 'TealBlue', latex: '\\color{TealBlue}', hex: '#00AEB3', package: 'xcolor' },
    { id: 'aquamarine', name: 'Aquamarine', latex: '\\color{Aquamarine}', hex: '#00B5BE', package: 'xcolor' },
    { id: 'bluegreen', name: 'BlueGreen', latex: '\\color{BlueGreen}', hex: '#00B3B8', package: 'xcolor' },
    { id: 'turquoise', name: 'Turquoise', latex: '\\color{Turquoise}', hex: '#00B4CE', package: 'xcolor' },
    { id: 'cyan', name: 'Cyan', latex: '\\color{Cyan}', hex: '#00AEEF', package: 'xcolor' },
    { id: 'aqua', name: 'Aqua', latex: '\\color{aqua}', hex: '#00FFFF' },
    { id: 'processblue', name: 'ProcessBlue', latex: '\\color{ProcessBlue}', hex: '#00B0F0', package: 'xcolor' },
    { id: 'skyblue', name: 'SkyBlue', latex: '\\color{SkyBlue}', hex: '#46C5DD', package: 'xcolor' },
    { id: 'cerulean', name: 'Cerulean', latex: '\\color{Cerulean}', hex: '#00A2E3', package: 'xcolor' },
    { id: 'cornflowerblue', name: 'CornflowerBlue', latex: '\\color{CornflowerBlue}', hex: '#41B0E4', package: 'xcolor' },
    { id: 'royalblue', name: 'RoyalBlue', latex: '\\color{RoyalBlue}', hex: '#0071BC', package: 'xcolor' },
    { id: 'blue', name: 'Blue', latex: '\\color{Blue}', hex: '#2D2F92', package: 'xcolor' },
    { id: 'navyblue', name: 'NavyBlue', latex: '\\color{NavyBlue}', hex: '#006EB8', package: 'xcolor' },
    { id: 'midnightblue', name: 'MidnightBlue', latex: '\\color{MidnightBlue}', hex: '#006795', package: 'xcolor' },
    { id: 'navy', name: 'Navy', latex: '\\color{navy}', hex: '#000080' },

    // --- 紫、紫色系 (Purple, Violet) ---
    { id: 'blueviolet', name: 'BlueViolet', latex: '\\color{BlueViolet}', hex: '#473992', package: 'xcolor' },
    { id: 'periwinkle', name: 'Periwinkle', latex: '\\color{Periwinkle}', hex: '#7977B8', package: 'xcolor' },
    { id: 'cadetblue', name: 'CadetBlue', latex: '\\color{CadetBlue}', hex: '#74729A', package: 'xcolor' },
    { id: 'violet', name: 'Violet', latex: '\\color{Violet}', hex: '#58429B', package: 'xcolor' },
    { id: 'royalpurple', name: 'RoyalPurple', latex: '\\color{RoyalPurple}', hex: '#613F99', package: 'xcolor' },
    { id: 'purple', name: 'Purple', latex: '\\color{Purple}', hex: '#99479B', package: 'xcolor' },
    { id: 'darkorchid', name: 'DarkOrchid', latex: '\\color{DarkOrchid}', hex: '#A4538A', package: 'xcolor' },
    { id: 'orchid', name: 'Orchid', latex: '\\color{Orchid}', hex: '#AF72B0', package: 'xcolor' },
    { id: 'plum', name: 'Plum', latex: '\\color{Plum}', hex: '#92268F', package: 'xcolor' },
    { id: 'magenta', name: 'Magenta', latex: '\\color{Magenta}', hex: '#EC008C', package: 'xcolor' },
    { id: 'fuchsia', name: 'Fuchsia', latex: '\\color{Fuchsia}', hex: '#8C368C', package: 'xcolor' },
    { id: 'redviolet', name: 'RedViolet', latex: '\\color{RedViolet}', hex: '#A1246B', package: 'xcolor' },
    { id: 'violetred', name: 'VioletRed', latex: '\\color{VioletRed}', hex: '#EF58A0', package: 'xcolor' },
    { id: 'thistle', name: 'Thistle', latex: '\\color{Thistle}', hex: '#D883B7', package: 'xcolor' },
    { id: 'mulberry', name: 'Mulberry', latex: '\\color{Mulberry}', hex: '#A93C93', package: 'xcolor' },
    { id: 'lavender', name: 'Lavender', latex: '\\color{Lavender}', hex: '#F49EC4', package: 'xcolor' },

    // --- 無彩色 / 中性色 (Grayscale) ---
    { id: 'white', name: 'White', latex: '\\color{White}', hex: '#FFFFFF', package: 'xcolor' },
    { id: 'lightgray', name: 'LightGray', latex: '\\color{lightgray}', hex: '#D3D3D3' },
    { id: 'silver', name: 'Silver', latex: '\\color{silver}', hex: '#C0C0C0' },
    { id: 'gray', name: 'Gray', latex: '\\color{Gray}', hex: '#949698', package: 'xcolor' },
    { id: 'darkgray', name: 'DarkGray', latex: '\\color{darkgray}', hex: '#A9A9A9' },
    { id: 'black', name: 'Black', latex: '\\color{Black}', hex: '#221E1F', package: 'xcolor' }
];