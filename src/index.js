/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {blocks} from './blocks/text.js';
import {controlsBlocks} from './blocks/controls.js';
import {operatorsBlocks} from './blocks/operators.js';
import {listsBlocks} from './blocks/lists.js';
import {forBlock} from './generators/javascript.js';
import {save, load} from './serialization.js';
import {toolbox} from './toolbox.js';
import {theme} from './renderers/jsBlocksTheme.js';
import './renderers/jsBlocksZelos.js'

const javascriptGenerator = Blockly.JavaScript;

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
Blockly.common.defineBlocks(controlsBlocks);
Blockly.common.defineBlocks(operatorsBlocks);
Blockly.common.defineBlocks(listsBlocks);
Object.assign(javascriptGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode').firstChild;
const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = Blockly.inject(blocklyDiv, {
  toolbox,
  renderer: 'jsBlocks_renderer',
  theme,
});

function recolor(blockName, newColor) {
  var oldInit = Blockly.Blocks[blockName].init;
  Blockly.Blocks[blockName].init = function() {
    oldInit.call(this);
    this.setStyle(newColor);
  };
}

recolor('controls_if', 'loop_blocks');
recolor('controls_if_if', 'loop_blocks');
recolor('controls_if_elseif', 'loop_blocks');
recolor('controls_if_else', 'loop_blocks');
recolor('logic_compare', 'math_blocks');
recolor('logic_operation', 'math_blocks');
recolor('logic_negate', 'math_blocks');
recolor('logic_boolean', 'math_blocks');
recolor('logic_null', 'math_blocks');

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
  const code = javascriptGenerator.workspaceToCode(ws);
  codeDiv.innerText = code;

  outputDiv.innerHTML = '';

  eval(code);
};

// Load the initial state from storage and run the code.
load(ws);
runCode();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  // UI events are things like scrolling, zooming, etc.
  // No need to save after one of these.
  if (e.isUiEvent) return;
  save(ws);
});

// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
  // Don't run the code when the workspace finishes loading; we're
  // already running it once when the application starts.
  // Don't run the code during drags; we might have invalid state.
  if (
    e.isUiEvent ||
    e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()
  ) {
    return;
  }
  runCode();
});
