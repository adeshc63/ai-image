
import React, { useState } from 'react';
import { generateImage } from '../services/imageService';
import { PromptInput } from './PromptInput';
import { AdvancedSettings } from './AdvancedSettings';
import { ImageDisplay } from './ImageDisplay';
import { validateSettings } from '../utils/validation';
import { DEFAULT_SETTINGS } from '../utils/settings';
import toast from 'react-hot-toast';

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    const errors = validateSettings(settings);
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    setLoading(true);
    try {
      const imageData = await generateImage(prompt, settings);
      setGeneratedImage(imageData);
      toast.success('Image generated successfully!');
    } catch (error) {
      const errorMessage = error.message || 'Failed to generate image';
      toast.error(errorMessage);
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  const Navbar = () => {
    return (
      <nav className="bg-black text-white border-b-2 border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-3xl font-mono font-bold uppercase tracking-tighter">
                Marval zod
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-white hover:bg-white hover:text-black border border-white px-3 py-1 text-sm uppercase font-mono"
              >
                Home
              </a>
              <a
                href="#"
                className="text-white hover:bg-white hover:text-black border border-white px-3 py-1 text-sm uppercase font-mono"
              >
                Generate
              </a>
              <a
                href="#"
                className="text-white hover:bg-white hover:text-black border border-white px-3 py-1 text-sm uppercase font-mono"
              >
                Gallery
              </a>
            </div>

            <div className="hidden md:block">
              <button className="border-2 border-white px-4 py-2 uppercase font-mono text-sm hover:bg-white hover:text-black transition-all">
                Login
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="pt-2 pb-3 space-y-1">
                <a
                  href="#"
                  className="text-white block px-3 py-2 border-b border-white uppercase font-mono"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-white block px-3 py-2 border-b border-white uppercase font-mono"
                >
                  Generate
                </a>
                <a
                  href="#"
                  className="text-white block px-3 py-2 border-b border-white uppercase font-mono"
                >
                  Gallery
                </a>
                <button className="w-full text-white block px-3 py-2 border-b border-white uppercase font-mono text-left">
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto p-6 space-y-8 w-full px-4">
        {/* <h1 className="text-4xl md:text-5xl font-mono font-bold text-center uppercase tracking-tighter border-b-2 border-black pb-4">
          AI Image Forge
        </h1> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              loading={loading}
              onSubmit={handleSubmit}
            />
            {generatedImage && <ImageDisplay image={generatedImage} />}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <AdvancedSettings settings={settings} setSettings={setSettings} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
