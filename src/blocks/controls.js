const customTernary = {
  "type": "custom_ternary",
  "tooltip": "Check the condition in 'if'. If the condition is true, returns the 'then' value; otherwise returns the 'else' value.",
  "helpUrl": "%{BKY_LOGIC_TERNARY_HELPURL}",
  "message0": "if %1 then %2 else %3",
  "args0": [
    {
      "type": "input_value",
      "name": "IF",
      "check": "Boolean"
    },
    {
      "type": "input_value",
      "name": "THEN"
    },
    {
      "type": "input_value",
      "name": "ELSE"
    }
  ],
  "output": null,
  "style": "loop_blocks",
  "inputsInline": true
}

export const controlsBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  customTernary,
]);
