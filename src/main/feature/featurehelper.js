import { RazerDeviceType } from '../device/razerdevicetype';
import { FeatureBattery } from './featurebattery';
import { FeatureBreathe } from './featurebreathe';
import { FeatureBrightness } from './featurebrightness';
import { FeatureIdentifier } from './featureidentifier';
import { FeatureMouseBrightness } from './featuremousebrightness';
import { FeatureMouseDPI } from './featuremousedpi';
import { FeatureMousePollRate } from './featuremousepollrate';
import { FeatureNone } from './featurenone';
import { FeatureOldMouseEffects } from './featureoldmouseeffects';
import { FeatureReactive } from './featurereactive';
import { FeatureReactiveWaves } from './featurereactivewaves';
import { FeatureRipple } from './featureripple';
import { FeatureSpectrum } from './featurespectrum';
import { FeatureStarlight } from './featurestarlight';
import { FeatureStatic } from './featurestatic';
import { FeatureWaveExtended } from './featurewaveextended';
import { FeatureWaveSimple } from './featurewavesimple';
import { FeatureWheel } from './featurewheel';

export class FeatureHelper {

  static createFeatureFrom(featureConfig) {
    const featureIdentifier = Object.keys(featureConfig)[0];
    const configuration = featureConfig[featureIdentifier];
    switch (featureIdentifier) {
      case FeatureIdentifier.NONE: return new FeatureNone(configuration);
      case FeatureIdentifier.STATIC: return new FeatureStatic(configuration);
      case FeatureIdentifier.WAVE_SIMPLE: return new FeatureWaveSimple(configuration);
      case FeatureIdentifier.WAVE_EXTENDED: return new FeatureWaveExtended(configuration);
      case FeatureIdentifier.SPECTRUM: return new FeatureSpectrum(configuration);
      case FeatureIdentifier.REACTIVE: return new FeatureReactive(configuration);
      case FeatureIdentifier.REACTIVE_WAVES: return new FeatureReactiveWaves(configuration);
      case FeatureIdentifier.BREATHE: return new FeatureBreathe(configuration);
      case FeatureIdentifier.STARLIGHT: return new FeatureStarlight(configuration);
      case FeatureIdentifier.BRIGHTNESS: return new FeatureBrightness(configuration);
      case FeatureIdentifier.RIPPLE: return new FeatureRipple(configuration);
      case FeatureIdentifier.WHEEL: return new FeatureWheel(configuration);
      case FeatureIdentifier.OLD_MOUSE_EFFECTS: return new FeatureOldMouseEffects(configuration);
      case FeatureIdentifier.MOUSE_BRIGHTNESS: return new FeatureMouseBrightness(configuration);
      case FeatureIdentifier.POLL_RATE: return new FeatureMousePollRate(configuration);
      case FeatureIdentifier.MOUSE_DPI: return new FeatureMouseDPI(configuration);
      case FeatureIdentifier.BATTERY: return new FeatureBattery(configuration);
      default:
        throw featureIdentifier+' is not a valid feature identifier!'
    }
  }

  static getDefaultFeaturesFor(mainType) {
    switch (mainType) {
      case RazerDeviceType.KEYBOARD:
        return [
          new FeatureNone(),
          new FeatureStatic(),
          new FeatureWaveExtended(),
          new FeatureSpectrum(),
          new FeatureReactive(),
          new FeatureBreathe(),
          new FeatureStarlight(),
          new FeatureRipple(),
          new FeatureReactiveWaves(),
          new FeatureWheel(),
          new FeatureBrightness(),
        ];
      case RazerDeviceType.MOUSE:
        return [
          new FeatureNone(),
          new FeatureStatic(),
          new FeatureWaveSimple(),
          new FeatureSpectrum(),
          new FeatureReactive(),
          new FeatureBreathe(),
          new FeatureOldMouseEffects(),
          new FeatureMouseBrightness(),
          new FeatureMousePollRate(),
          new FeatureMouseDPI(),
          new FeatureBattery(),
        ];
      case RazerDeviceType.MOUSEDOCK:
        return [
          new FeatureNone(),
          new FeatureStatic(),
          new FeatureSpectrum(),
          new FeatureBreathe(),
          new FeatureBattery(),
        ];
      case RazerDeviceType.MOUSEMAT:
        return [
          new FeatureNone(),
          new FeatureStatic(),
          new FeatureWaveSimple(),
          new FeatureSpectrum(),
          new FeatureBreathe(),
          new FeatureBrightness()
        ];
      case RazerDeviceType.EGPU:
        return [
          new FeatureNone(),
          new FeatureStatic(),
          new FeatureWaveSimple(),
          new FeatureSpectrum(),
          new FeatureBreathe(),
        ];
      case RazerDeviceType.HEADPHONE:
        return [
          new FeatureNone(),
          new FeatureStatic(),
          new FeatureSpectrum(),
          new FeatureBreathe(),
        ];
      case RazerDeviceType.ACCESSORY:
        return [
          new FeatureNone(),
          new FeatureStatic(),
          new FeatureWaveExtended(),
          new FeatureSpectrum(),
          new FeatureBreathe(),
        ];
      default:
        console.warn("Unknown mainType "+mainType+". Can't detect feature set.");
        return [];
    }
  }
}