const listsContains = {
  "type": "lists_contains",
  "tooltip": "Returns true if the list contains an item, false if not.",
  "helpUrl": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes",
  "message0": "%1 contains %2",
  "args0": [
    {
      "type": "input_value",
      "name": "LIST",
      "check": "Array"
    },
    {
      "type": "input_value",
      "name": "ITEM"
    }
  ],
  "output": "Boolean",
  "style": "list_blocks",
  "inputsInline": true,
};
const listsNumbers = {
  "type": "lists_numbers",
  "tooltip": "Creates a list of numbers ranging from the 'from' value to the 'to' value. Reverses order if 'from' is greater than 'to'.",
  "helpUrl": "",
  "message0": "list of numbers from %1 to %2",
  "args0": [
    {
      "type": "input_value",
      "name": "FROM",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "TO",
      "check": "Number"
    }
  ],
  "output": "Array",
  "style": "list_blocks",
  "inputsInline": true,
}

export const listsBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  listsContains,
  listsNumbers,
]);
