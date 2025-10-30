describe('Resume Analysis API', () => {
  it('should successfully analyze uploaded resume PDF', async () => {
    // Test PDF upload and AI analysis
    const mockResume = new FormData();
    mockResume.append('file', mockPdfFile);
    
    const response = await fetch('/api/analyze-resume', {
      method: 'POST',
      body: mockResume
    });
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('skills');
    expect(response.data).toHaveProperty('experience');
    expect(response.data).toHaveProperty('suggestions');
  });

  it('should handle invalid file formats gracefully', async () => {
    const invalidFile = new FormData();
    invalidFile.append('file', 'invalid-file.txt');
    
    const response = await fetch('/api/analyze-resume', {
      method: 'POST',
      body: invalidFile
    });
    
    expect(response.status).toBe(400);
    expect(response.data.error).toContain('Invalid file format');
  });
});
