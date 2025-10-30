describe('AI Performance Tests', () => {
    it('should process resume within acceptable time limits', async () => {
      const startTime = Date.now();
      
      const result = await aiService.enhanceResume(sampleResumeData);
      
      const processingTime = Date.now() - startTime;
      expect(processingTime).toBeLessThan(30000); // 30 seconds max
      expect(result).toBeDefined();
    });
  
    it('should handle concurrent AI requests efficiently', async () => {
      const concurrentRequests = 5;
      const requests = Array(concurrentRequests).fill().map((_, i) => 
        aiService.enhanceResume({ content: `Test content ${i}` })
      );
      
      const results = await Promise.all(requests);
      
      expect(results).toHaveLength(concurrentRequests);
      results.forEach(result => {
        expect(result).toBeDefined();
      });
    });
  });
  