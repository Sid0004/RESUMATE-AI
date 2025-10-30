describe('Resume Processing Pipeline', () => {
    it('should complete full AI enhancement workflow', async () => {
      const testResume = {
        personalInfo: { name: 'John Doe', email: 'john@example.com' },
        experience: ['Software Developer at ABC Corp'],
        skills: ['JavaScript', 'Node.js'],
        education: ['BS Computer Science']
      };
      
      // Test the complete pipeline
      const analysisResult = await resumeProcessor.analyzeResume(testResume);
      expect(analysisResult.score).toBeGreaterThan(0);
      
      const enhancedResume = await resumeProcessor.enhanceWithAI(testResume, analysisResult);
      expect(enhancedResume.experience[0]).not.toBe(testResume.experience[0]);
      
      const finalResume = await resumeProcessor.generateFinalResume(enhancedResume);
      expect(finalResume).toHaveProperty('pdf');
      expect(finalResume).toHaveProperty('html');
    });
  
    it('should maintain data integrity throughout pipeline', async () => {
      const originalData = { name: 'Test User', email: 'test@example.com' };
      const processedData = await resumeProcessor.processResume(originalData);
      
      expect(processedData.personalInfo.name).toBe(originalData.name);
      expect(processedData.personalInfo.email).toBe(originalData.email);
    });
  });
  