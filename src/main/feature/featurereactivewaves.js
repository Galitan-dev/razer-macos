import { Feature } from './feature';
import { FeatureIdentifier } from './featureidentifier';

export class FeatureReactiveWaves extends Feature {
  constructor(config) {
    super(FeatureIdentifier.REACTIVE_WAVES, config);
  }

  getDefaultConfiguration() {
    return {
      rows: -1,
      cols: -1,
    }
  }
}