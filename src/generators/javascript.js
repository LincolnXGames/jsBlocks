/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */


// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
const jsGenerator = Blockly.JavaScript
export const forBlock = Object.create(null);

forBlock['custom_ternary'] = function (block, generator) {
  const value_if = generator.valueToCode(block, 'IF', jsGenerator.ORDER_CONDITIONAL) || 'false';
  const value_then = generator.valueToCode(block, 'THEN', jsGenerator.ORDER_CONDITIONAL) || 'null';
  const value_else = generator.valueToCode(block, 'ELSE', jsGenerator.ORDER_CONDITIONAL) || 'null';

  // TODO: Assemble javascript into the code variable.
  const code = value_if + ' ? ' + value_then + ' : ' +  value_else;
  // TODO: Change Order.NONE to the correct operator precedence strength
  return [code, jsGenerator.ORDER_CONDITIONAL];
};

forBlock['add_text'] = function (block, generator) {
  const text = generator.valueToCode(block, 'TEXT', jsGenerator.ORDER_ATOMIC) || "''";
  const addText = generator.provideFunction_(
    'addText',
    `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text) {

  // Add text to the output area.
  const outputDiv = document.getElementById('output');
  const textEl = document.createElement('p');
  textEl.innerText = text;
  outputDiv.appendChild(textEl);
}`,
  );
  // Generate the function call for this block.
  const code = `${addText}(${text});\n`;
  return code;
};

forBlock['text_input'] = function (block, generator) {
  const text_text = block.getFieldValue('TEXT');
  const quote = (string) => {
    string = string
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\\n')
      .replace(/'/g, "\\'");
    return "'" + string + "'";
  }
  const code = quote(text_text);
  return [code, jsGenerator.ORDER_ATOMIC];
};
