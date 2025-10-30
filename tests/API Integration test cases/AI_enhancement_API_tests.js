describe('AI Enhancement API', () => {
    it('should enhance resume content with AI suggestions', async () => {
      const resumeData = {
        experience: 'Software developer with 2 years experience',
        skills: ['JavaScript', 'React'],
        jobDescription: 'Senior Frontend Developer position'
      };
      
      const response = await fetch('/api/enhance-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData)
      });
      
      expect(response.status).toBe(200);
      expect(response.data.enhancedContent).toBeDefined();
      expect(response.data.improvements).toBeInstanceOf(Array);
    });
  
    it('should handle API rate limiting', async () => {
      // Simulate multiple rapid requests
      const requests = Array(10).fill().map(() => 
        fetch('/api/enhance-resume', {
          method: 'POST',
          body: JSON.stringify({ content: 'test' })
        })
      );
      
      const responses = await Promise.all(requests);
      const rateLimitedResponses = responses.filter(r => r.status === 429);
      
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });
  