import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/ai-enhance';

describe('/api/ai-enhance', () => {
  it('should handle POST request for AI enhancement', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        resumeContent: 'Sample resume content',
        targetJob: 'Software Engineer'
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toHaveProperty('enhancedContent');
  });

  it('should return 405 for unsupported methods', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Method not allowed'
    });
  });
});
