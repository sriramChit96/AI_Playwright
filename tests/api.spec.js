const { test, expect } = require('@playwright/test');

test.describe('API Tests', () => {
  test('should hit todos API endpoint and get status code and response', async ({ page }) => {
    await page.goto('https://dummy-json.mock.beeceptor.com/todos', { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const pageContent = await page.content();
    console.log('Page HTML:', pageContent.substring(0, 500));
    
    const jsonText = await page.textContent('body');
    console.log('API Response:', jsonText?.trim());
    
    try {
      const jsonData = JSON.parse(jsonText || '{}');
      console.log('Parsed JSON:', JSON.stringify(jsonData, null, 2));
    } catch (e) {
      console.log('Could not parse JSON');
    }
    
    expect(jsonText).toBeTruthy();
  });

  test('should fetch API response via request context', async ({ request }) => {
    const response = await request.get('https://dummy-json.mock.beeceptor.com/todos');
    
    const statusCode = response.status();
    console.log('Status Code:', statusCode);
    
    const headers = response.headers();
    console.log('Response Headers:', headers);
    
    const responseText = await response.text();
    console.log('Response Text:', responseText);
    
    try {
      const responseJson = await response.json();
      console.log('Response JSON:', JSON.stringify(responseJson, null, 2));
    } catch (e) {
      console.log('Response is not JSON format');
    }
    
    expect(statusCode).toBeTruthy();
    expect(responseText).toBeTruthy();
    expect([200, 201, 202, 203, 204, 205, 206]).toContain(statusCode);
  });

  test('should get todos and display details', async ({ request }) => {
    const response = await request.get('https://dummy-json.mock.beeceptor.com/todos');
    
    const statusCode = response.status();
    console.log('✓ Status Code:', statusCode);
    
    let responseBody;
    try {
      responseBody = await response.json();
    } catch (e) {
      responseBody = await response.text();
    }
    
    console.log('✓ Response Body:');
    console.log(JSON.stringify(responseBody, null, 2));
    
    const contentType = response.headers()['content-type'];
    console.log('✓ Content-Type:', contentType);
    
    expect(statusCode).toBeGreaterThanOrEqual(200);
    expect(statusCode).toBeLessThan(400);
  });

  test('should find and get details of "Write a report" todo', async ({ request }) => {
    const response = await request.get('https://dummy-json.mock.beeceptor.com/todos');
    
    const statusCode = response.status();
    console.log('✓ Status Code:', statusCode);
    
    const todos = await response.json();
    
    const writeReportTodo = todos.find(todo => todo.title === 'Write a report');
    
    console.log('✓ Found Todo with title "Write a report":');
    console.log(JSON.stringify(writeReportTodo, null, 2));
    
    console.log('✓ Todo Details:');
    console.log(`  - userId: ${writeReportTodo.userId}`);
    console.log(`  - id: ${writeReportTodo.id}`);
    console.log(`  - title: ${writeReportTodo.title}`);
    console.log(`  - completed: ${writeReportTodo.completed}`);
    
    expect(writeReportTodo).toBeTruthy();
    expect(writeReportTodo.title).toBe('Write a report');
    expect(writeReportTodo.userId).toBe(8);
    expect(writeReportTodo.id).toBe(9);
    expect(writeReportTodo.completed).toBe(false);
  });
});
