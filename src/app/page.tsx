'use client'

import { useState, useEffect } from 'react'
import { 
  Edit3, 
  Sparkles, 
  Save, 
  Download, 
  Share2, 
  Settings, 
  Menu,
  X,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Undo,
  Redo,
  Zap
} from 'lucide-react'

export default function SmartEditorPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [content, setContent] = useState('')
  const [isAIProcessing, setIsAIProcessing] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    // Count words
    const words = content.trim().split(/\s+/).filter(word => word.length > 0)
    setWordCount(words.length)
  }, [content])

  useEffect(() => {
    // Check if PWA is installable
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  const handleAIAssist = async () => {
    setIsAIProcessing(true)
    // Simulate AI processing
    setTimeout(() => {
      setIsAIProcessing(false)
      // Here you would integrate with your AI service
    }, 2000)
  }

  const formatText = (command: string) => {
    document.execCommand(command, false, undefined)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Edit3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                SmartEditor AI
              </h1>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleAIAssist}
                disabled={isAIProcessing}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50"
              >
                {isAIProcessing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>{isAIProcessing ? 'Processing...' : 'AI Assist'}</span>
              </button>
              
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Save className="w-5 h-5" />
              </button>
              
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-3 space-y-3">
              <button
                onClick={handleAIAssist}
                disabled={isAIProcessing}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50"
              >
                {isAIProcessing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>{isAIProcessing ? 'Processing...' : 'AI Assist'}</span>
              </button>
              
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Save className="w-5 h-5" />
                  <span>Save</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Formatting Toolbar */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 py-2 overflow-x-auto">
            <button
              onClick={() => formatText('bold')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('italic')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('underline')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <Underline className="w-4 h-4" />
            </button>
            
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
            
            <button
              onClick={() => formatText('justifyLeft')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('justifyCenter')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('justifyRight')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <AlignRight className="w-4 h-4" />
            </button>
            
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
            
            <button
              onClick={() => formatText('insertUnorderedList')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('insertOrderedList')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
            
            <button
              onClick={() => formatText('undo')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('redo')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Untitled Document
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {wordCount} words
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Saved</span>
            </div>
          </div>

          {/* Editor Content */}
          <div className="p-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your masterpiece... ✨"
              className="w-full h-96 resize-none border-none outline-none text-gray-900 dark:text-white bg-transparent text-lg leading-relaxed placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        </div>

        {/* AI Suggestions Panel */}
        {isAIProcessing && (
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Assistant is thinking...
              </h3>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        )}
      </main>

      {/* PWA Install Banner */}
      {isInstallable && (
        <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Install SmartEditor AI</p>
              <p className="text-sm opacity-90">Get the full app experience</p>
            </div>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Install
            </button>
          </div>
        </div>
      )}
    </div>
  )
}