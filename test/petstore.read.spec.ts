import request from 'supertest';

const API_BASE_URL = 'https://petstore.swagger.io/v2';

describe('Swagger Petstore API - Retrieve Pet', () => {
  let existingPetId: number;

  beforeAll(async () => {
    // Create a pet to ensure there is an existing pet to retrieve
    const newPet = {
      id: Math.floor(Math.random() * 1000000),
      name: 'Test Pet',
      category: { id: 1, name: 'Dogs' },
      photoUrls: ['http://example.com/photo1'],
      tags: [{ id: 1, name: 'tag1' }],
      status: 'available'
    };
    const response = await request(API_BASE_URL)
      .post('/pet')
      .send(newPet)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    existingPetId = newPet.id;
  });

  // Test retrieving an existing pet by valid ID
  it('should retrieve an existing pet by valid ID', async () => {
    const response = await request(API_BASE_URL)
      .get(`/pet/${existingPetId}`)
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(existingPetId);
  });

  // Test retrieving a non-existing pet by valid ID
  it('should return 404 for non-existing pet by valid ID', async () => {
    const nonExistingPetId = Math.floor(Math.random() * 1000000) + 1000000; // Ensure ID is out of typical range
    const response = await request(API_BASE_URL)
      .get(`/pet/${nonExistingPetId}`)
      .set('Accept', 'application/json');
    expect(response.status).toBe(404);
  });

  // Test retrieving a pet by invalid ID (non-numeric)
  it('should return 404 for retrieving a pet by non-numeric ID', async () => {
    const invalidId = 'invalid_id';
    const response = await request(API_BASE_URL)
      .get(`/pet/${invalidId}`)
      .set('Accept', 'application/json');
    expect(response.status).toBe(404);
  });

  // Test retrieving a pet by invalid ID (negative number)
  it('should return 404 for retrieving a pet by negative numeric ID', async () => {
    const invalidId = -1;
    const response = await request(API_BASE_URL)
      .get(`/pet/${invalidId}`)
      .set('Accept', 'application/json');
    expect(response.status).toBe(404);
  });

  // Test retrieving a pet by empty ID
  it('should return 405 for retrieving a pet by empty ID', async () => {
    const response = await request(API_BASE_URL)
      .get(`/pet/`)
      .set('Accept', 'application/json');
    expect(response.status).toBe(405);
  });
});
