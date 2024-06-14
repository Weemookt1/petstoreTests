import request from 'supertest';

const API_BASE_URL = 'https://petstore.swagger.io/v2';

describe('Swagger Petstore API', () => {
  let createdPetId: number;

  it('should create a new pet', async () => {
    const newPet = {
      id: Math.floor(Math.random() * 10000000), // Generate a random pet ID
      name: 'Test Pet',
      photoUrls: ['http://example.com/photo1'],
      status: 'available'
    };
    const response = await request(API_BASE_URL)
      .post('/pet')
      .send(newPet)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(newPet);
    createdPetId = newPet.id;
  });

  it('should get a pet by ID', async () => {
    const response = await request(API_BASE_URL)
      .get(`/pet/${createdPetId}`)
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdPetId);
  });

  it('should update an existing pet', async () => {
    const updatedPet = {
      id: createdPetId,
      name: 'Updated Test Pet',
      photoUrls: ['http://example.com/photo1'],
      status: 'sold'
    };
    const response = await request(API_BASE_URL)
      .put('/pet')
      .send(updatedPet)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedPet);
  });

  it('should delete a pet by ID', async () => {
    const response = await request(API_BASE_URL)
      .delete(`/pet/${createdPetId}`)
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });

  it('should return 404 for a non-existing pet', async () => {
    const response = await request(API_BASE_URL)
      .get('/pet/0') // Assuming pet with ID 0 does not exist
      .set('Accept', 'application/json');
    expect(response.status).toBe(404);
  });
});
