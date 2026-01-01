/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */


// Create a custom block called 'add_text' that adds
// text to the output div on the sample app.
// This is just an example and you should replace this with your
// own custom blocks.
const addText = {
  type: 'add_text',
  message0: 'print %1',
  args0: [
    {
      type: 'input_value',
      name: 'TEXT',
      check: 'String',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  style: 'text_blocks',
  tooltip: '',
  helpUrl: '',
};
const textInput = {
  "type": "text_input",
  "tooltip": "",
  "helpUrl": "",
  "message0": "%1 %2",
  "args0": [
    {
      "type": "field_input",
      "name": "TEXT",
      "text": ""
    },
    {
      "type": "input_dummy",
      "name": "NAME"
    }
  ],
  "output": "String",
  "style": "text_blocks",
  "extensions": ['parent_tooltip_when_inline'],
};
const numText = {
  "type": "num_text",
  "tooltip": "Returns a text or number based on the input.",
  "helpUrl": "",
  "message0": "%1 %2",
  "args0": [
    {
      "type": "field_input",
      "name": "TEXT",
      "text": ""
    },
    {
      "type": "input_dummy",
      "name": "NAME"
    }
  ],
  "output": [
    "String",
    "Number"
  ],
  "style": "text_blocks",
  "extensions": ['parent_tooltip_when_inline'],
}
const textJoin = {
  "type": "join_text",
  "tooltip": "Create a piece of text by joining together two items.",
  "helpUrl": "",
  "message0": "join %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "A"
    },
    {
      "type": "input_value",
      "name": "B"
    }
  ],
  "output": "String",
  "style": "text_blocks",
  "inputsInline": true
}
// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  addText,
  textInput,
  numText,
  textJoin,
]);
