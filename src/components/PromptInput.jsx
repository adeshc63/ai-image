import React from 'react';

export const PromptInput = ({ prompt, setPrompt, loading, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="brutalist-panel">
      <div className="space-y-4">
        <label className="block text-lg font-bold uppercase">
          Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="DESCRIBE YOUR IMAGE HERE..."
          className="brutalist-input"
          rows="4"
        />
        <button
          type="submit"
          disabled={loading}
          className="brutalist-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'GENERATING...' : 'GENERATE IMAGE'}
        </button>
      </div>
    </form>
  );
};