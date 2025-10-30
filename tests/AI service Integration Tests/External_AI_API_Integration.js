describe('External AI Service Integration', () => {
    beforeEach(() => {
      // Mock external AI service responses
      jest.spyOn(global, 'fetch').mockImplementation();
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('should successfully communicate with OpenAI/Gemini API', async () => {
      const mockAIResponse = {
        choices: [{ text: 'Enhanced resume content here' }]
      };
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAIResponse
      });
      
      const result = await aiService.enhanceText('Original resume text');
      
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('api.openai.com'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': expect.stringContaining('Bearer'),
            'Content-Type': 'application/json'
          })
        })
      );
      expect(result).toBe('Enhanced resume content here');
    });
  
    it('should handle AI API failures gracefully', async () => {
      fetch.mockRejectedValueOnce(new Error('API Error'));
      
      const result = await aiService.enhanceText('Test content');
      
      expect(result).toBe(null);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('AI API Error')
      );
    });
  });
  