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

const strRegExp = /^\s*'([^']|\\')*'\s*$/;

const forceString = (value) => {
  if (strRegExp.test(value)) {
    return value;
  }
  return 'String(' + value + ')';
};

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

forBlock['num_text'] = function (block, generator) {
  const text_text = block.getFieldValue('TEXT');
  const numerable = (string) => {
    const coercedValue = Number(string);
    if (!isNaN(coercedValue) && isFinite(coercedValue)) {
      return true;
    }
    return false;
  }
  const quote = (string, end) => {
    string = string
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\\n')
      .replace(/'/g, "\\'");
    return !end ? "'" + string + "'" : string;
  }
  const code = quote(text_text, numerable(text_text));
  return [code, jsGenerator.ORDER_ATOMIC];
};

forBlock['join_text'] = function (block, generator) {
  const value_a = generator.valueToCode(block, 'A', jsGenerator.ORDER_NONE) || '';
  const value_b = generator.valueToCode(block, 'B', jsGenerator.ORDER_NONE) || '';
  const code = forceString(value_a) + ' + ' + forceString(value_b);
  return [code, jsGenerator.ORDER_ADDITION];
};
