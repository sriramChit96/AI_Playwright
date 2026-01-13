const { test, expect } = require('@playwright/test');

test.describe('REST API Tests - Write a Report Todo', () => {
  test('should fetch todos API and find "Write a report" todo', async ({ request }) => {
    const response = await request.get('https://dummy-json.mock.beeceptor.com/todos');
    
    expect(response.status()).toBe(200);
    console.log('✓ Status Code: 200');
    
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
    console.log('✓ Content-Type:', contentType);
    
    const todos = await response.json();
    console.log('✓ Total todos received:', todos.length);
    
    const writeReportTodo = todos.find(todo => todo.title === 'Write a report');
    
    expect(writeReportTodo).toBeTruthy();
    console.log('\n✓ Found "Write a report" todo');
    
    expect(writeReportTodo.userId).toBe(8);
    expect(writeReportTodo.id).toBe(9);
    expect(writeReportTodo.title).toBe('Write a report');
    expect(writeReportTodo.completed).toBe(false);
    
    console.log('\n📋 TODO DETAILS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  UserId:    ', writeReportTodo.userId);
    console.log('  ID:        ', writeReportTodo.id);
    console.log('  Title:     ', writeReportTodo.title);
    console.log('  Completed: ', writeReportTodo.completed);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('✓ All assertions passed');
  });

  test('should verify all properties of "Write a report" todo', async ({ request }) => {
    const response = await request.get('https://dummy-json.mock.beeceptor.com/todos');
    
    const todos = await response.json();
    const writeReportTodo = todos.find(todo => todo.title === 'Write a report');
    
    console.log('\n📊 FULL RESPONSE OBJECT:');
    console.log(JSON.stringify(writeReportTodo, null, 2));
    
    expect(writeReportTodo).toHaveProperty('userId');
    expect(writeReportTodo).toHaveProperty('id');
    expect(writeReportTodo).toHaveProperty('title');
    expect(writeReportTodo).toHaveProperty('completed');
    
    console.log('\n✓ All required properties are present');
    
    expect(typeof writeReportTodo.userId).toBe('number');
    expect(typeof writeReportTodo.id).toBe('number');
    expect(typeof writeReportTodo.title).toBe('string');
    expect(typeof writeReportTodo.completed).toBe('boolean');
    
    console.log('✓ All data types are correct');
  });

  test('should extract and validate "Write a report" todo data', async ({ request }) => {
    const response = await request.get('https://dummy-json.mock.beeceptor.com/todos');
    const todos = await response.json();
    
    const writeReportTodo = todos.find(todo => todo.title === 'Write a report');
    
    const assertions = [
      { property: 'userId', expected: 8, actual: writeReportTodo.userId },
      { property: 'id', expected: 9, actual: writeReportTodo.id },
      { property: 'title', expected: 'Write a report', actual: writeReportTodo.title },
      { property: 'completed', expected: false, actual: writeReportTodo.completed }
    ];
    
    console.log('\n✅ VALIDATION RESULTS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    assertions.forEach(assertion => {
      const isValid = assertion.expected === assertion.actual;
      const icon = isValid ? '✓' : '✗';
      console.log(`${icon} ${assertion.property}: ${assertion.actual} (expected: ${assertion.expected})`);
      expect(assertion.actual).toEqual(assertion.expected);
    });
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  });
});
