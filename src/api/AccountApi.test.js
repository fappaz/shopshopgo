import * as AccountApi from "./AccountApi";
import * as db from "../database/firebase/Authentication";

/** Mocking database layer. All tested methods should be mocked here. */
jest.mock("../database/firebase/Authentication", () => {
  return {
    signIn: jest.fn(() => Promise.resolve()),
    signOut: jest.fn(() => Promise.resolve()),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

const getMockUser = () => {
  return {
    id: "user1",
    name: "Test User",
    email: "test@fernandpaz.net",
  };
};

const getMockUserDoc = () => {
  const mockUser = getMockUser();
  return {
    id: mockUser.id,
    data: () => {
      return {
        name: mockUser.name,
        email: mockUser.email,
      };
    },
  };
};

describe('test signIn', () => {

  it('should sign in with correct parameters', async () => {
    const mockAuth = {
      user: getMockUser()
    };
    db.signIn.mockResolvedValue(mockAuth);
    const user = await AccountApi.signIn(mockAuth.user.email, 'testPassword');
    expect(user).toStrictEqual(mockAuth.user);
  });

});

describe('test signOut', () => {
  
  it('should sign out', async () => {
    const mockUserDoc = getMockUserDoc();
    await AccountApi.signOut(mockUserDoc.id);
    expect(db.signOut.mock.calls.length).toBeTruthy();
  });
});