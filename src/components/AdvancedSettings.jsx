import React from 'react';
import { NumberInput } from './NumberInput';
import {
  generateRandomSeed,
  clampValue,
  ASPECT_RATIO_PRESETS,
} from '../utils/settings';

export const AdvancedSettings = ({ settings, setSettings }) => {
  const handleSettingChange = (key, value) => {
    let finalValue = value;

    switch (key) {
      case 'width':
      case 'height':
        // Remove strict 64 divisibility, just clamp between min and max
        finalValue = clampValue(Math.round(value), 64, 2048);
        break;
      case 'numInferenceSteps':
        finalValue = clampValue(Math.round(value), 1, 50);
        break;
      case 'seed':
        finalValue = Math.max(0, Math.round(value));
        break;
    }

    setSettings((prev) => ({ ...prev, [key]: finalValue }));
  };

  const handleRandomSeed = () => {
    handleSettingChange('seed', generateRandomSeed());
  };

  const handlePresetChange = (preset) => {
    if (preset.width && preset.height) {
      setSettings((prev) => ({
        ...prev,
        width: preset.width,
        height: preset.height,
        selectedPreset: preset.name,
      }));
    }
  };

  return (
    <div className="brutalist-panel">
      <h2 className="text-xl font-bold uppercase mb-6">Advanced Settings</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold uppercase mb-2">
            Image Size Presets
          </label>
          <div className="grid grid-cols-2 gap-2">
            {ASPECT_RATIO_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handlePresetChange(preset)}
                className={`brutalist-button text-sm py-2 ${
                  settings.selectedPreset === preset.name ? 'bg-blue-600' : ''
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold uppercase mb-2">Seed</label>
          <div className="flex gap-2">
            <NumberInput
              value={settings.seed}
              onChange={(value) => handleSettingChange('seed', value)}
              min={0}
              className="flex-1"
            />
            <button
              onClick={handleRandomSeed}
              className="brutalist-panel px-3"
              type="button"
              title="Generate random seed"
            >
              🎲
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold uppercase mb-2">
            Width
          </label>
          <NumberInput
            value={settings.width}
            onChange={(value) => handleSettingChange('width', value)}
            min={64}
            max={2048}
          />
        </div>

        <div>
          <label className="block text-sm font-bold uppercase mb-2">
            Height
          </label>
          <NumberInput
            value={settings.height}
            onChange={(value) => handleSettingChange('height', value)}
            min={64}
            max={2048}
          />
        </div>

        <div>
          <label className="block text-sm font-bold uppercase mb-2">
            Inference Steps
          </label>
          <NumberInput
            value={settings.numInferenceSteps}
            onChange={(value) =>
              handleSettingChange('numInferenceSteps', value)
            }
            min={1}
            max={50}
          />
        </div>
      </div>
    </div>
  );
};
