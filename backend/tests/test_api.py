import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_get_tasks(client):
    response = client.get('/api/tasks')
    assert response.status_code == 200
    assert isinstance(response.get_json(), list)

def test_post_task(client):
    response = client.post('/api/tasks', json={'title': 'Test', 'priority': 'media'})
    assert response.status_code == 201
    data = response.get_json()
    assert data['title'] == 'Test'
    assert data['priority'] == 'media'
