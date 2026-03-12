import { registerUser, isUserExist } from "../controllers/auth";
import User from "../models/user";
import { expect, jest, test } from '@jest/globals';



jest.mock("../models/user")

const req: any = {
    body: {
        email: "test@gmail.com",
        userName: "test user",
        contact: "989899889",
        address: "test address",
        password: "testpassword"
    }
};

const res: any =
{
    status: jest.fn(() => res),
    json: jest.fn(),
};
// {
//     status: "success",
//     message: "Regisration Done",
//     data: { userId: {} }
// };
const next: any = jest.fn();


it("should send status success when user register", () => {
    registerUser(req, res, next);
})


it('can find things', () => {
    return User.findOne((results: any) => {
        expect(results.length).toBeGreaterThan(0);
    });
});

// it(' email not found', () => {
//     const email = jest.fn();
//     const email = new mockFn();
//     expect(isUserExist(email)).toBe(true);
// });


























// test('should send status success when user register', async () => {
//     const data = await User;
//     expect(data).toBe({ data: {} });
// });


// test('the data is success', async () => {
//     const data = await getUser;
//     expect(data).toBe('success');
// });

// const mockRequest = () => {
//     return {
//         body: {
//             userName: "test user",
//             email: "test@gmail.com",
//             contact: "989899889",
//             address: "test address",
//             password: "testpassword"
//         }
//     }
// }
// const mockResponce = () => {
//     return {
//         ststus: "test status",
//         // jest.fn().mockReturnThis(),
//         message: "test message",
//         // jest.fn().mockReturnThis(),     
//         data: {}
//     }
// }

// test('Register User', () => {
//     it(" should Registration done!", async () => {

//     })
// })