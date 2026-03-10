export interface LatexSymbol {
    id: string;
    name: string;
    latex: string;
    tags: string[];
    antonym?: string;
    package?: string;
}

export const LATEX_SYMBOLS: LatexSymbol[] = [
    // === ARITHMETIC OPERATORS (算術運算) ===
    { id: 'plus', name: 'Plus', latex: '+', tags: ['operator', 'arithmetic', 'addition'] },
    { id: 'minus', name: 'Minus', latex: '-', tags: ['operator', 'arithmetic', 'subtraction'] },
    { id: 'pm', name: 'Plus-Minus', latex: '\\pm', tags: ['operator', 'arithmetic'] },
    { id: 'mp', name: 'Minus-Plus', latex: '\\mp', tags: ['operator', 'arithmetic'] },
    { id: 'times', name: 'Times', latex: '\\times', tags: ['operator', 'arithmetic', 'multiplication'] },
    { id: 'cdot', name: 'Center Dot', latex: '\\cdot', tags: ['operator', 'arithmetic', 'multiplication'] },
    { id: 'div', name: 'Divide', latex: '\\div', tags: ['operator', 'arithmetic', 'division'] },
    { id: 'ast', name: 'Asterisk', latex: '\\ast', tags: ['operator', 'arithmetic'] },
    { id: 'star', name: 'Star', latex: '\\star', tags: ['operator', 'arithmetic'] },

    // === RELATIONS (關係符號) ===
    { id: 'equal', name: 'Equal', latex: '=', tags: ['relation', 'equality'], antonym: '\\neq' },
    { id: 'neq', name: 'Not Equal', latex: '\\neq', tags: ['relation', 'equality'], antonym: '=' },
    { id: 'le', name: 'Less Than or Equal', latex: '\\le', tags: ['relation', 'inequality'], antonym: '\\nleq' },
    { id: 'ge', name: 'Greater Than or Equal', latex: '\\ge', tags: ['relation', 'inequality'], antonym: '\\ngeq' },
    { id: 'll', name: 'Much Less Than', latex: '\\ll', tags: ['relation', 'inequality'], antonym: '\\gg' },
    { id: 'gg', name: 'Much Greater Than', latex: '\\gg', tags: ['relation', 'inequality'], antonym: '\\ll' },
    { id: 'approx', name: 'Approximately Equal', latex: '\\approx', tags: ['relation', 'similarity'] },
    { id: 'cong', name: 'Congruent', latex: '\\cong', tags: ['relation', 'similarity'] },
    { id: 'equiv', name: 'Equivalent', latex: '\\equiv', tags: ['relation', 'logic'] },
    { id: 'propto', name: 'Proportional To', latex: '\\propto', tags: ['relation'] },
    { id: 'perp', name: 'Perpendicular', latex: '\\perp', tags: ['relation', 'geometry'] },
    { id: 'parallel', name: 'Parallel', latex: '\\parallel', tags: ['relation', 'geometry'] },

    //=== Dots (點號) ===
    { id: 'dots', name: 'Dots', latex: '\\dots', tags: ['operator', 'misc', 'dots'] },
    { id: 'cdots', name: 'Center Dots', latex: '\\cdots', tags: ['operator', 'misc', 'dots'] },
    { id: 'ddots', name: 'Double Dots', latex: '\\ddots', tags: ['operator', 'misc', 'dots'] },
    { id: 'vdots', name: 'Vertical Dots', latex: '\\vdots', tags: ['operator', 'misc', 'dots'] },

    //=== SET THEORY (集合論) ===
    { id: 'in', name: 'Element of', latex: '\\in', tags: ['set', 'membership'] },
    { id: 'notin', name: 'Not element of', latex: '\\notin', tags: ['set', 'membership'] },
    { id: 'subset', name: 'Subset', latex: '\\subset', tags: ['set', 'inclusion'] },
    { id: 'supset', name: 'Superset', latex: '\\supset', tags: ['set', 'inclusion'] },
    { id: 'subseteq', name: 'Subset or Equal', latex: '\\subseteq', tags: ['set', 'inclusion'] },
    { id: 'supseteq', name: 'Superset or Equal', latex: '\\supseteq', tags: ['set', 'inclusion'] },
    { id: 'cup', name: 'Union', latex: '\\cup', tags: ['set', 'operator'] },
    { id: 'cap', name: 'Intersection', latex: '\\cap', tags: ['set', 'operator'] },
    { id: 'varnothing', name: 'Empty Set', latex: '\\varnothing', tags: ['set', 'constant'] },
    { id: 'emptyset', name: 'Empty Set', latex: '\\emptyset', tags: ['set', 'constant'] },
    { id: 'complement', name: 'Complement', latex: '\\complement', tags: ['set', 'operator'] },

    //=== LOGIC (邏輯) ===
    { id: 'forall', name: 'For All', latex: '\\forall', tags: ['logic', 'quantifier'] },
    { id: 'exists', name: 'Exists', latex: '\\exists', tags: ['logic', 'quantifier'], antonym: '\\nexists' },
    { id: 'neg', name: 'Negation', latex: '\\neg', tags: ['logic', 'operator'] },
    { id: 'land', name: 'Logical And', latex: '\\land', tags: ['logic', 'operator'] },
    { id: 'lor', name: 'Logical Or', latex: '\\lor', tags: ['logic', 'operator'] },
    { id: 'therefore', name: 'Therefore', latex: '\\therefore', tags: ['logic', 'inference'] },
    { id: 'because', name: 'Because', latex: '\\because', tags: ['logic', 'inference'] },
    { id: 'vdash', name: 'Proves (Right Turnstile)', latex: '\\vdash', tags: ['logic', 'relation'] },

    // === GEOMETRY (幾何) ===
    { id: 'angle', name: 'Angle', latex: '\\angle', tags: ['geometry', 'angle'] },
    { id: 'degree', name: 'Degree', latex: '^{\\circ}', tags: ['geometry', 'angle', 'unit'] },
    { id: 'triangle', name: 'Triangle', latex: '\\triangle', tags: ['geometry', 'shape'] },
    { id: 'square', name: 'Square', latex: '\\square', tags: ['geometry', 'shape'] },
    { id: 'sim', name: 'Similar To', latex: '\\sim', tags: ['relation', 'geometry', 'similarity'], antonym: '\\cong' },

    // === SHAPES & SPECIAL OPERATORS ===
    { id: 'oplus', name: 'Circle Plus', latex: '\\oplus', tags: ['operator', 'circle'] },
    { id: 'otimes', name: 'Circle Times', latex: '\\otimes', tags: ['operator', 'circle'] },
    { id: 'odot', name: 'Circle Dot', latex: '\\odot', tags: ['operator', 'circle'] },
    { id: 'circ', name: 'Composition / Circle', latex: '\\circ', tags: ['operator', 'circle'] },
    { id: 'bullet', name: 'Bullet', latex: '\\bullet', tags: ['operator', 'circle'] },
    { id: 'diamond', name: 'Diamond', latex: '\\diamond', tags: ['operator', 'shape'] },
    { id: 'smile', name: 'Smile', latex: '\\smile', tags: ['relation', 'misc'] },
    { id: 'frown', name: 'Frown', latex: '\\frown', tags: ['relation', 'misc'] },

    // === Roots (根號) ===
    { id: 'surd', name: 'Surd', latex: '\\surd', tags: ['root'] },
    { id: 'sqrt', name: 'Square Root', latex: '\\sqrt{a}', tags: ['root', 'structural'] },
    { id: 'root_n', name: 'N-th Root', latex: '\\sqrt[n]{a}', tags: ['root', 'structural'] },

    // === Fractions (分數) ===
    { id: 'frac', name: 'Fraction (Standard)', latex: '\\frac{a}{b}', tags: ['fraction', 'structural'] },
    { id: 'tfrac', name: 'Fraction (Small)', latex: '\\tfrac{a}{b}', tags: ['fraction', 'structural'] },
    { id: 'cfrac', name: 'Fraction (Continued)', latex: '\\cfrac{a}{b}', tags: ['fraction', 'structural'] },
    { id: 'dfrac', name: 'Fraction (Display)', latex: '\\dfrac{a}{b}', tags: ['fraction', 'structural'] },

    // === Calculus (微積分) ===
    { id: 'nabla', name: 'Nabla / Gradient', latex: '\\nabla', tags: ['calculus', 'vector'] },
    { id: 'partial', name: 'Partial Derivative', latex: '\\partial', tags: ['calculus', 'derivative'] },
    { id: 'prime', name: 'Prime', latex: '\\prime', tags: ['calculus', 'derivative', 'marker'] },
    { id: 'integral_limits', name: 'Definite Integral', latex: '\\int', tags: ['calculus', 'integral', 'structural'] },
    { id: 'iint', name: 'Double Integral', latex: '\\iint', tags: ['calculus', 'integral', 'structural'] },
    { id: 'iiint', name: 'Triple Integral', latex: '\\iiint', tags: ['calculus', 'integral', 'structural'] },
    { id: 'iiiint', name: 'Quadruple Integral', latex: '\\iiiint', tags: ['amsmath', 'calculus', 'integral', 'structural'], package: 'amsmath' },
    { id: 'idotsint', name: 'N-fold Integral', latex: '\\idotsint', tags: ['amsmath', 'calculus', 'integral', 'structural'], package: 'amsmath' },

    // === (大尺寸運算符號) ===
    { id: 'sum', name: 'Summation', latex: '\\sum', tags: ['operator', 'big'] },
    { id: 'prod', name: 'Product', latex: '\\prod', tags: ['operator', 'big'] },
    { id: 'coprod', name: 'CoProduct', latex: '\\coprod', tags: ['operator', 'big'] },
    { id: 'infty', name: 'Infinity', latex: '\\infty', tags: ['operator', 'infinite'] },
    { id: 'bigcap', name: 'BigCap', latex: '\\bigcap', tags: ['operator', 'big'] },
    { id: 'bigcup', name: 'BigCup', latex: '\\bigcup', tags: ['operator', 'big'] },
    { id: 'biguplus', name: 'BigUplus', latex: '\\biguplus', tags: ['operator', 'big'] },
    { id: 'bigsqcup', name: 'BigSquareplus', latex: '\\bigsqcup', tags: ['operator', 'big'] },
    { id: 'bigcircle', name: 'Big Circle', latex: '\\bigcirc', tags: ['operator', 'o', 'circle', 'big'] },
    { id: 'bigoplus', name: 'Big O Plus', latex: '\\bigoplus', tags: ['operator', 'o', 'circle', 'plus', 'big'] },
    { id: 'bigotimes', name: 'Big O Times', latex: '\\bigotimes', tags: ['operator', 'o', 'circle', 'times', 'big'] },
    { id: 'bigodot', name: 'Big O Dot', latex: '\\bigodot', tags: ['operator', 'o', 'circle', 'dot', 'big'] },
    { id: 'bigvee', name: 'Big Vee', latex: '\\bigvee', tags: ['operator', 'or', 'set', 'logical', 'big'] },
    { id: 'bigwedge', name: 'Big Wedge', latex: '\\bigwedge', tags: ['operator', 'and', 'set', 'logical', 'big'] },

    // === LOEWRCASE GREEK (希臘字母小寫) ===
    { id: 'alpha', name: 'Alpha', latex: '\\alpha', tags: ['greek', 'lowercase'] },
    { id: 'beta', name: 'Beta', latex: '\\beta', tags: ['greek', 'lowercase'] },
    { id: 'gamma', name: 'Gamma', latex: '\\gamma', tags: ['greek', 'lowercase'] },
    { id: 'delta', name: 'Delta', latex: '\\delta', tags: ['greek', 'lowercase'] },
    { id: 'epsilon', name: 'Epsilon', latex: '\\epsilon', tags: ['greek', 'lowercase'] },
    { id: 'zeta', name: 'Zeta', latex: '\\zeta', tags: ['greek', 'lowercase'] },
    { id: 'eta', name: 'Eta', latex: '\\eta', tags: ['greek', 'lowercase'] },
    { id: 'theta', name: 'Theta', latex: '\\theta', tags: ['greek', 'lowercase'] },
    { id: 'iota', name: 'Iota', latex: '\\iota', tags: ['greek', 'lowercase'] },
    { id: 'kappa', name: 'Kappa', latex: '\\kappa', tags: ['greek', 'lowercase'] },
    { id: 'lambda', name: 'Lambda', latex: '\\lambda', tags: ['greek', 'lowercase'] },
    { id: 'mu', name: 'Mu', latex: '\\mu', tags: ['greek', 'lowercase'] },
    { id: 'nu', name: 'Nu', latex: '\\nu', tags: ['greek', 'lowercase'] },
    { id: 'xi', name: 'Xi', latex: '\\xi', tags: ['greek', 'lowercase'] },
    { id: 'pi', name: 'Pi', latex: '\\pi', tags: ['greek', 'lowercase'] },
    { id: 'rho', name: 'Rho', latex: '\\rho', tags: ['greek', 'lowercase'] },
    { id: 'sigma', name: 'Sigma', latex: '\\sigma', tags: ['greek', 'lowercase'] },
    { id: 'tau', name: 'Tau', latex: '\\tau', tags: ['greek', 'lowercase'] },
    { id: 'phi', name: 'Phi', latex: '\\phi', tags: ['greek', 'lowercase'] },
    { id: 'chi', name: 'Chi', latex: '\\chi', tags: ['greek', 'lowercase'] },
    { id: 'psi', name: 'Psi', latex: '\\psi', tags: ['greek', 'lowercase'] },
    { id: 'omega', name: 'Omega', latex: '\\omega', tags: ['greek', 'lowercase'] },

    // === UPPERCASE GREEK (希臘字母大寫) ===
    { id: 'alpha_cap', name: 'Alpha (Cap)', latex: '\\Alpha', tags: ['greek', 'uppercase'] },
    { id: 'beta_cap', name: 'Beta (Cap)', latex: '\\Beta', tags: ['greek', 'uppercase'] },
    { id: 'gamma_cap', name: 'Gamma (Cap)', latex: '\\Gamma', tags: ['greek', 'uppercase'] },
    { id: 'delta_cap', name: 'Delta (Cap)', latex: '\\Delta', tags: ['greek', 'uppercase'] },
    { id: 'epsilon_cap', name: 'Epsilon (Cap)', latex: '\\Epsilon', tags: ['greek', 'uppercase'] },
    { id: 'zeta_cap', name: 'Zeta (Cap)', latex: '\\Zeta', tags: ['greek', 'uppercase'] },
    { id: 'eta_cap', name: 'Eta (Cap)', latex: '\\Eta', tags: ['greek', 'uppercase'] },
    { id: 'theta_cap', name: 'Theta (Cap)', latex: '\\Theta', tags: ['greek', 'uppercase'] },
    { id: 'iota_cap', name: 'Iota (Cap)', latex: '\\Iota', tags: ['greek', 'uppercase'] },
    { id: 'kappa_cap', name: 'Kappa (Cap)', latex: '\\Kappa', tags: ['greek', 'uppercase'] },
    { id: 'lambda_cap', name: 'Lambda (Cap)', latex: '\\Lambda', tags: ['greek', 'uppercase'] },
    { id: 'mu_cap', name: 'Mu (Cap)', latex: '\\Mu', tags: ['greek', 'uppercase'] },
    { id: 'nu_cap', name: 'Nu (Cap)', latex: '\\Nu', tags: ['greek', 'uppercase'] },
    { id: 'xi_cap', name: 'Xi (Cap)', latex: '\\Xi', tags: ['greek', 'uppercase'] },
    { id: 'pi_cap', name: 'Pi (Cap)', latex: '\\Pi', tags: ['greek', 'uppercase'] },
    { id: 'rho_cap', name: 'Rho (Cap)', latex: '\\Rho', tags: ['greek', 'uppercase'] },
    { id: 'sigma_cap', name: 'Sigma (Cap)', latex: '\\Sigma', tags: ['greek', 'uppercase'] },
    { id: 'tau_cap', name: 'Tau (Cap)', latex: '\\Tau', tags: ['greek', 'uppercase'] },
    { id: 'phi_cap', name: 'Phi (Cap)', latex: '\\Phi', tags: ['greek', 'uppercase'] },
    { id: 'chi_cap', name: 'Chi (Cap)', latex: '\\Chi', tags: ['greek', 'uppercase'] },
    { id: 'psi_cap', name: 'Psi (Cap)', latex: '\\Psi', tags: ['greek', 'uppercase'] },
    { id: 'omega_cap', name: 'Omega (Cap)', latex: '\\Omega', tags: ['greek', 'uppercase'] },

    // === Horizontal Arrows (水平箭頭) ===
    { id: 'leftarrow', name: 'Left Arrow', latex: '\\leftarrow', tags: ['arrow', 'direction', 'left'] },
    { id: 'rightarrow', name: 'Right Arrow', latex: '\\rightarrow', tags: ['arrow', 'direction', 'right'] },
    { id: 'longleftarrow', name: 'Long Left Arrow', latex: '\\longleftarrow', tags: ['arrow', 'direction', 'left', 'long'] },
    { id: 'longrightarrow', name: 'Long Right Arrow', latex: '\\longrightarrow', tags: ['arrow', 'direction', 'right', 'long'] },
    { id: 'to', name: 'To', latex: '\\to', tags: ['arrow', 'direction', 'right', 'to', 'calculus'] },

    // === Double Arrows (雙線箭頭 / 邏輯箭頭) ===
    { id: 'Leftarrow', name: 'Left Double Arrow', latex: '\\Leftarrow', tags: ['arrow', 'direction', 'left', 'double'] },
    { id: 'Rightarrow', name: 'Right Double Arrow', latex: '\\Rightarrow', tags: ['arrow', 'direction', 'right', 'double'] },
    { id: 'Longleftarrow', name: 'Long Left Double Arrow', latex: '\\Longleftarrow', tags: ['arrow', 'direction', 'left', 'double', 'long'] },
    { id: 'Longrightarrow', name: 'Long Right Double Arrow', latex: '\\Longrightarrow', tags: ['arrow', 'direction', 'right', 'double', 'long'] },

    // === Harpoons (半箭頭) ===
    { id: 'leftharpoonup', name: 'Left Harpoon Up', latex: '\\leftharpoonup', tags: ['arrow', 'direction', 'left', 'harpoon'] },
    { id: 'rightharpoonup', name: 'Right Harpoon Up', latex: '\\rightharpoonup', tags: ['arrow', 'direction', 'right', 'harpoon'] },
    { id: 'leftharpoondown', name: 'Left Harpoon Down', latex: '\\leftharpoondown', tags: ['arrow', 'direction', 'left', 'harpoon'] },
    { id: 'rightharpoondown', name: 'Right Harpoon Down', latex: '\\rightharpoondown', tags: ['arrow', 'direction', 'right', 'harpoon'] },

    // === Mapping & Hook Arrows (映射與鉤箭頭) ===
    { id: 'hookleftarrow', name: 'Hook Left Arrow', latex: '\\hookleftarrow', tags: ['arrow', 'direction', 'left', 'hook'] },
    { id: 'hookrightarrow', name: 'Hook Right Arrow', latex: '\\hookrightarrow', tags: ['arrow', 'direction', 'right', 'hook'] },
    { id: 'mapsto', name: 'Maps To', latex: '\\mapsto', tags: ['arrow', 'direction', 'right', 'map'] },
    { id: 'longmapsto', name: 'Long Maps To', latex: '\\longmapsto', tags: ['arrow', 'direction', 'right', 'map', 'long'] },

    // === Bidirectional (雙向箭頭) ===
    { id: 'leftrightarrow', name: 'Left Right Arrow', latex: '\\leftrightarrow', tags: ['arrow', 'direction', 'horizontal'] },
    { id: 'longleftrightarrow', name: 'Long Left Right Arrow', latex: '\\longleftrightarrow', tags: ['arrow', 'direction', 'horizontal', 'long'] },
    { id: 'Leftrightarrow', name: 'Left Right Double Arrow', latex: '\\Leftrightarrow', tags: ['arrow', 'direction', 'horizontal', 'double'] },
    { id: 'Longleftrightarrow', name: 'Long Left Right Double Arrow', latex: '\\Longleftrightarrow', tags: ['arrow', 'direction', 'horizontal', 'double', 'long'] },
    { id: 'rightleftharpoons', name: 'Right Left Harpoons', latex: '\\rightleftharpoons', tags: ['arrow', 'direction', 'horizontal', 'harpoon'] },

    // === Vertical Arrows (垂直箭頭) ===
    { id: 'uparrow', name: 'Up Arrow', latex: '\\uparrow', tags: ['arrow', 'direction', 'up'] },
    { id: 'downarrow', name: 'Down Arrow', latex: '\\downarrow', tags: ['arrow', 'direction', 'down'] },
    { id: 'Uparrow', name: 'Up Double Arrow', latex: '\\Uparrow', tags: ['arrow', 'direction', 'up', 'double'] },
    { id: 'Downarrow', name: 'Down Double Arrow', latex: '\\Downarrow', tags: ['arrow', 'direction', 'down', 'double'] },
    { id: 'updownarrow', name: 'Up Down Arrow', latex: '\\updownarrow', tags: ['arrow', 'direction', 'vertical'] },
    { id: 'Updownarrow', name: 'Up Down Double Arrow', latex: '\\Updownarrow', tags: ['arrow', 'direction', 'vertical', 'double'] },

    // === Diagonal Arrows (斜向箭頭) ===
    { id: 'nearrow', name: 'North-East Arrow', latex: '\\nearrow', tags: ['arrow', 'direction', 'diagonal'] },
    { id: 'searrow', name: 'South-East Arrow', latex: '\\searrow', tags: ['arrow', 'direction', 'diagonal'] },
    { id: 'swarrow', name: 'South-West Arrow', latex: '\\swarrow', tags: ['arrow', 'direction', 'diagonal'] },
    { id: 'nwarrow', name: 'North-West Arrow', latex: '\\nwarrow', tags: ['arrow', 'direction', 'diagonal'] },

    // === Standard Brackets (標準括號) ===
    { id: 'parenthesis_l', name: 'Left Parenthesis', latex: '(', tags: ['delimiter', 'bracket', 'opening'] },
    { id: 'parenthesis_r', name: 'Right Parenthesis', latex: ')', tags: ['delimiter', 'bracket', 'closing'] },
    { id: 'bracket_l', name: 'Left Square Bracket', latex: '[', tags: ['delimiter', 'bracket', 'opening'] },
    { id: 'bracket_r', name: 'Right Square Bracket', latex: ']', tags: ['delimiter', 'bracket', 'closing'] },
    { id: 'lBrack', name: 'Left Square Bracket', latex: '\\lbrack', tags: ['delimiter', 'bracket', 'opening'] },
    { id: 'rBrack', name: 'Right Square Bracket', latex: '\\rbrack', tags: ['delimiter', 'bracket', 'closing'] },
    { id: 'brace_l', name: 'Left Curly Brace', latex: '\\{', tags: ['delimiter', 'bracket', 'opening'] },
    { id: 'brace_r', name: 'Right Curly Brace', latex: '\\}', tags: ['delimiter', 'bracket', 'closing'] },
    { id: 'binom', name: 'Binomial Coefficient', latex: '\\binom{n}{k}', tags: ['operator', 'binomial'] },

    // === Special Brackets (特殊括號) ===
    { id: 'langle', name: 'Left Angle Bracket', latex: '\\langle', tags: ['delimiter', 'bracket', 'opening'] },
    { id: 'rangle', name: 'Right Angle Bracket', latex: '\\rangle', tags: ['delimiter', 'bracket', 'closing'] },
    { id: 'lfloor', name: 'Left Floor', latex: '\\lfloor', tags: ['delimiter', 'bracket', 'opening', 'math'] },
    { id: 'rfloor', name: 'Right Floor', latex: '\\rfloor', tags: ['delimiter', 'bracket', 'closing', 'math'] },
    { id: 'lceil', name: 'Left Ceiling', latex: '\\lceil', tags: ['delimiter', 'bracket', 'opening', 'math'] },
    { id: 'rceil', name: 'Right Ceiling', latex: '\\rceil', tags: ['delimiter', 'bracket', 'closing', 'math'] },
    { id: 'ulcorner', name: 'Left Corner', latex: '\\ulcorner', tags: ['delimiter', 'bracket', 'opening', 'math'] },
    { id: 'urcorner', name: 'Right Corner', latex: '\\urcorner', tags: ['delimiter', 'bracket', 'closing', 'math'] },
    { id: 'llcorner', name: 'Left Corner', latex: '\\llcorner', tags: ['delimiter', 'bracket', 'opening', 'math'] },
    { id: 'lrcorner', name: 'Right Corner', latex: '\\lrcorner', tags: ['delimiter', 'bracket', 'closing', 'math'] },

    // === Vertical Bars (垂直線條) ===
    { id: 'vert', name: 'Vertical Bar / Absolute Value', latex: '\\vert', tags: ['delimiter', 'bar', 'absolute'] },
    { id: 'Vert', name: 'Double Vertical Bar / Norm', latex: '\\Vert', tags: ['delimiter', 'bar', 'norm'] },

    // === Slashes & Backslashes (斜線類) ===
    { id: 'slash', name: 'Forward Slash', latex: '/', tags: ['delimiter', 'separator'] },
    { id: 'backslash', name: 'Backslash', latex: '\\backslash', tags: ['delimiter', 'separator'] },

    // === NUMBER SETS (數集) ===
    { id: 'mathbb_N', name: 'Natural Numbers', latex: '\\mathbb{N}', tags: ['set', 'number_set'] },
    { id: 'mathbb_Z', name: 'Integers', latex: '\\mathbb{Z}', tags: ['set', 'number_set'] },
    { id: 'mathbb_Q', name: 'Rational Numbers', latex: '\\mathbb{Q}', tags: ['set', 'number_set'] },
    { id: 'mathbb_R', name: 'Real Numbers', latex: '\\mathbb{R}', tags: ['set', 'number_set'] },
    { id: 'mathbb_C', name: 'Complex Numbers', latex: '\\mathbb{C}', tags: ['set', 'number_set'] },

    // === Trigonometric (三角函數) ===
    { id: 'sin', name: 'Sine', latex: '\\sin', tags: ['operator', 'trig'] },
    { id: 'cos', name: 'Cosine', latex: '\\cos', tags: ['operator', 'trig'] },
    { id: 'tan', name: 'Tangent', latex: '\\tan', tags: ['operator', 'trig'] },
    { id: 'sec', name: 'Secant', latex: '\\sec', tags: ['operator', 'trig'] },
    { id: 'csc', name: 'Cosecant', latex: '\\csc', tags: ['operator', 'trig'] },
    { id: 'cot', name: 'Cotangent', latex: '\\cot', tags: ['operator', 'trig'] },

    // === Inverse Trigonometric (反三角函數) ===
    { id: 'arcsin', name: 'Arcsine', latex: '\\arcsin', tags: ['operator', 'trig', 'inverse'] },
    { id: 'arccos', name: 'Arccosine', latex: '\\arccos', tags: ['operator', 'trig', 'inverse'] },
    { id: 'arctan', name: 'Arctangent', latex: '\\arctan', tags: ['operator', 'trig', 'inverse'] },

    // === Hyperbolic (雙曲函數) ===
    { id: 'sinh', name: 'Hyperbolic Sine', latex: '\\sinh', tags: ['operator', 'trig', 'hyperbolic'] },
    { id: 'cosh', name: 'Hyperbolic Cosine', latex: '\\cosh', tags: ['operator', 'trig', 'hyperbolic'] },
    { id: 'tanh', name: 'Hyperbolic Tangent', latex: '\\tanh', tags: ['operator', 'trig', 'hyperbolic'] },

    // === Logarithms & Exponential (對數與指數) ===
    { id: 'exp', name: 'Exponential', latex: '\\exp', tags: ['operator'] },
    { id: 'log', name: 'Logarithm', latex: '\\log', tags: ['operator'] },
    { id: 'ln', name: 'Natural Logarithm', latex: '\\ln', tags: ['operator'] },

    // === Analysis & Limits (分析與極限) ===
    { id: 'lim', name: 'Limit', latex: '\\lim', tags: ['operator', 'analysis', 'limit'] },
    { id: 'liminf', name: 'Limit Inferior', latex: '\\liminf', tags: ['operator', 'analysis', 'limit'] },
    { id: 'limsup', name: 'Limit Superior', latex: '\\limsup', tags: ['operator', 'analysis', 'limit'] },
    { id: 'inf', name: 'Infimum', latex: '\\inf', tags: ['operator', 'analysis'] },
    { id: 'sup', name: 'Supremum', latex: '\\sup', tags: ['operator', 'analysis'] },

    // === Optimization (最佳化) ===
    { id: 'max', name: 'Maximum', latex: '\\max', tags: ['operator'] },
    { id: 'min', name: 'Minimum', latex: '\\min', tags: ['operator'] },

    // === Modulo (模) ===
    { id: 'mod', name: 'Modulo / BMod', latex: '\\bmod', tags: ['operator', 'modulo'] },
];
