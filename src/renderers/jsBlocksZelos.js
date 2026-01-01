class CustomConstantProvider extends Blockly.zelos.ConstantProvider {
  constructor() {
    super();
  }

  init() {
    super.init();
  }

  shapeFor(connection) {
    let checks = connection.getCheck();
    if (!checks && connection.targetConnection) {
      checks = connection.targetConnection.getCheck();
    }
    let outputShape;
    switch (connection.type) {
      case Blockly.INPUT_VALUE:
      case Blockly.OUTPUT_VALUE:
        outputShape = connection.getSourceBlock().getOutputShape();
        // If the block has an output shape set, use that instead.
        if (outputShape !== null) {
          switch (outputShape) {
            case this.SHAPES.HEXAGONAL:
              return this.HEXAGONAL;
            case this.SHAPES.ROUND:
              return this.ROUNDED;
            case this.SHAPES.SQUARE:
              return this.SQUARED;
          }
        }
        // Includes doesn't work in IE.
        if (checks && checks.includes('Boolean')) {
          return this.HEXAGONAL;
        }
        if (checks && checks.includes('Number')) {
          return this.ROUNDED;
        }
        if (checks && checks.includes('String')) {
          return this.ROUNDED;
        }
        if (checks && checks.includes('Array')) {
          return this.SQUARED;
        }
        return this.ROUNDED;
      case Blockly.PREVIOUS_STATEMENT:
      case Blockly.NEXT_STATEMENT:
        return this.NOTCH;
      default:
        throw Error('Unknown type');
    }
  }
}

class CustomRenderer extends Blockly.zelos.Renderer {
  constructor() {
    super();
  }
  makeConstants_() {
    return new CustomConstantProvider();
  }
}

Blockly.blockRendering.register('jsBlocks_renderer', CustomRenderer);
