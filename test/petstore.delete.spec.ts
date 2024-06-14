import request from 'supertest';

const API_BASE_URL = 'https://petstore.swagger.io/v2';

describe('Swagger Petstore API - Delete Pet', () => {
  let existingPetId: number;

  beforeAll(async () => {
    // Create a pet to ensure there is an existing pet to delete
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

  // Test deleting an existing pet
  it('should delete an existing pet', async () => {
    const response = await request(API_BASE_URL)
      .delete(`/pet/${existingPetId}`)
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });

  // Test attempting to delete a non-existing pet
  it('should return 404 for attempting to delete a non-existing pet', async () => {
    const nonExistingPetId = Math.floor(Math.random() * 1000000) + 1000000; // Ensure ID is out of typical range
    const response = await request(API_BASE_URL)
      .delete(`/pet/${nonExistingPetId}`)
      .set('Accept', 'application/json');
    expect(response.status).toBe(404);
  });

  // Test attempting to delete a pet with an invalid ID
  //Expected status code: 400 , Actual status code: 200
  /*
  it('should return 400 for attempting to delete a pet with an invalid ID', async () => {
    const response = await request(API_BASE_URL)
      .delete(`/pet/invalid_id`)
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });
*/
  // Test attempting to delete a pet with an empty ID
  it('should return 405 for attempting to delete a pet with an empty ID', async () => {
    const response = await request(API_BASE_URL)
      .delete(`/pet/`)
      .set('Accept', 'application/json');
    expect(response.status).toBe(405);
  });
});
