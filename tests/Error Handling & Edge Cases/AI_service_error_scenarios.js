describe('AI Error Handling', () => {
    it('should handle empty resume content', async () => {
      const result = await aiService.enhanceResume({ content: '' });
      
      expect(result.error).toBe('Content cannot be empty');
      expect(result.enhancedContent).toBeNull();
    });
  
    it('should handle extremely long resume content', async () => {
      const longContent = 'A'.repeat(100000); // 100k characters
      const result = await aiService.enhanceResume({ content: longContent });
      
      expect(result.error).toContain('Content too long');
    });
  
    it('should implement proper retry logic for failed AI calls', async () => {
      let callCount = 0;
      jest.spyOn(aiService, 'makeAPICall').mockImplementation(() => {
        callCount++;
        if (callCount < 3) {
          throw new Error('Temporary failure');
        }
        return { success: true, data: 'Enhanced content' };
      });
      
      const result = await aiService.enhanceResumeWithRetry('Test content');
      
      expect(callCount).toBe(3);
      expect(result.data).toBe('Enhanced content');
    });
  });
  