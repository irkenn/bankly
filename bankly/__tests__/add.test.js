// Set ENV VAR to test before we load anything, so our app's config will use
// testing settings

process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const db = require("../db");
const bcrypt = require("bcrypt");
const createToken = require("../helpers/createToken");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const User = require("../models/user");
const ExpressError = require("../helpers/expressError");
const { authUser } = require("../middleware/auth");


// tokens for our sample users
const tokens = {};

/** before each test, insert u1, u2, and u3  [u3 is admin] */

// beforeEach(() => {
//     jest.resetModules();
//     app = require("../app");
// });

beforeEach(async function() {
  async function _pwd(password) {
    return await bcrypt.hash(password, 1);
  }

  let sampleUsers = [
    ["u1", "fn1", "ln1", "email1", "phone1", await _pwd("pwd1"), false],
    ["u2", "fn2", "ln2", "email2", "phone2", await _pwd("pwd2"), false],
    ["u3", "fn3", "ln3", "email3", "phone3", await _pwd("pwd3"), true]
  ];

  for (let user of sampleUsers) {
    await db.query(
      `INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      user
    );
    tokens[user[0]] = createToken(user[0], user[6]);
  }
});



/**  Things to test so far is that there are no tests when the user tries to 
 * PATCH, DELETE itself. Tests are done to prove that the admin can only
 * Will read the routes before writing tests about this.
 * Even test it with Insomnia before.
*/
    
describe("Bug #2 POST /auth/login route crashes and responds with a wrong status code", function (){
    
    test('An invalid username should throw an error and give a 401 status code', async function (){
    
            let resp = await request(app)
            .post("/auth/login")
            .send({
                username: "invalid-user",
                password: "pwd00"
            });
            
            expect(resp.statusCode).toBe(401); // Status Code should be 401 Not found
    }); 

    test("An invalid password should throw an error and give a 401 status code", async function (){
    
        const response2 = await request(app)
        .post("/auth/login")
        .send({
            username: "u2",
            password: "wrong-password-again"
        });
        
        expect(response2.statusCode).toEqual(401); // Status Code should be 401 Not found
    });
}); 



describe('Bug #3 authUser verifies the JWT token correctly', function (){
    
    test("a token with an invalid signature should cause and error", async function(){
        
        let u1Token = tokens.u1;
        const arr = u1Token.split('.');
        const u1Header = arr[0];
        const u1Payload = arr[1];
        const u1Signature = arr[2];

        const u1InvalidSignature = "Not-a-valid-signature";
        
      
        const mockReq = {
            body:{
                  _token: `${u1Header}.${u1Payload}.${u1InvalidSignature}`
                },
            };
          
        const mockRes = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
      
        const mockNext = jest.fn();
        
        authUser(mockReq, mockRes, mockNext);
        expect(mockReq.curr_username).toBe(undefined);
        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));//An error should be thrown with an invalid JWT signature
    });
});

describe("Bug #4 throws correctly an error when User.get() receives an invalid username", function (){
    test("Throws an error with an invalid username", async function (){
        try{
            let invalidUsername = "Invalid-username";
            await User.get(invalidUsername);

            fail("Expected error from User.get() function");
        }catch(error){
            expect(error instanceof ExpressError).toBeTruthy();
        }
    });

});


describe("Bug #6 should let the same user to patch its own information", function (){
  test("Changes the user information and returns a 200 OK status code", async function(){
      
      const resp = await request(app)
      .patch("/users/u1")
      .send({
          username: "u1",
          first_name: "PATCHEDfn1",
          last_name: "PATCHEDln1",
          email: "PATCHEDemail1", 
          phone: "PATCHEDphone1",
          _token: tokens.u1,
      })
      
      expect(resp.statusCode).toEqual(200); // Status Code should be 401 Not found
      expect(resp.body.user).toEqual({
          username: "u1",
          first_name: "PATCHEDfn1",
          last_name: "PATCHEDln1",
          email: "PATCHEDemail1",
          phone: "PATCHEDphone1",
          password: expect.any(String),
          admin: false,
      })
  });

});

afterEach(async function() {
    await db.query("DELETE FROM users");
  });
  
  afterAll(function() {
    db.end();
  });
  