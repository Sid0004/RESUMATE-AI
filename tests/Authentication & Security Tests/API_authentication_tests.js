describe('API Authentication', () => {
    it('should require valid API key for AI endpoints', async () => {
      const response = await fetch('/api/enhance-resume', {
        method: 'POST',
        body: JSON.stringify({ content: 'test' })
      });
      
      expect(response.status).toBe(401);
      expect(response.data.error).toContain('Authentication required');
    });
  
    it('should validate user permissions for premium features', async () => {
      const response = await fetch('/api/premium-enhancement', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer basic-user-token' },
        body: JSON.stringify({ content: 'test' })
      });
      
      expect(response.status).toBe(403);
      expect(response.data.error).toContain('Premium subscription required');
    });
  });
  