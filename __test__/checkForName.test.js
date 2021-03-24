// Import the js file to test
import { checkForName } from "../src/client/js/nameChecker"
console.log(checkForName);
// The describe function takes 'returns false' and a test suite as a callback function as arguments.  
// A test suite may contain one or more related tests    
describe("Testing the check for URL functionality", () => {
    // The test function has two arguments - a string description, and an actual test as a callback function.  
    test('returns false', () => {
        expect(checkForName("Hello")).toBeFalsy();
})});