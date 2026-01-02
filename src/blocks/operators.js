const mathMod = {
  "type": "math_mod",
  "tooltip": "%{BKY_MATH_MODULO_TOOLTIP}",
  "helpUrl": "%{BKY_MATH_MODULO_HELPURL}",
  "message0": "%1 mod %2",
  "args0": [
    {
      "type": "input_value",
      "name": "DIVIDEND",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "DIVISOR",
      "check": "Number"
    }
  ],
  "output": "Number",
  "style": "math_blocks"
  "inputsInline": true
}

export const operatorsBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  mathMod,
]);
