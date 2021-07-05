import * as api from "./ItemsApi";
import * as db from "../database/firebase/Items";

/** Mocking database layer. All tested methods should be mocked here. */
jest.mock("../database/firebase/Items", () => {
  return {
    findById: jest.fn(() => Promise.resolve()),
    insert: jest.fn(() => Promise.resolve()),
    update: jest.fn(() => Promise.resolve()),
    deleteById: jest.fn(() => Promise.resolve()),
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

describe('test docToItem', () => {

  it('should convert Firestore document to item object', () => {
    const mockData = { name: "Milk", status: "pending" };
    const doc = { id: "testItemId", data: () => mockData };
    const item = api.testable.docToItem(doc);
    expect(item).toStrictEqual({ ...mockData, id: doc.id });
  });

  it('should return undefined if doc is undefined', () => {
    let doc;
    const item = api.testable.docToItem(doc);
    expect(item).toBeFalsy();
  });

});

describe('test findById', () => {
  
  it('should return item with id provided', async () => {
    const itemId = "testItemId";
    const mockData = { name: "Milk", status: "pending" };
    const doc = { id: itemId, data: () => mockData };
    db.findById.mockResolvedValue(doc);

    const accountId = "testAccountId";
    const item = await api.findById(accountId, itemId);

    expect(item).toStrictEqual({ ...mockData, id: itemId });
    expect(db.findById).toHaveBeenCalledWith(accountId, itemId);
  });
  
  it('should return undefined if item was not found', async () => {
    db.findById.mockResolvedValue();

    const accountId = "testAccountId";
    const itemId = "testItemId";
    const item = await api.findById(accountId, itemId);

    expect(item).toBeFalsy();
    expect(db.findById).toHaveBeenCalledWith(accountId, itemId);
  });
});

describe('test insert', () => {
  
  it('should return the item that was inserted', async () => {
    const item = { name: "Milk", status: "pending" };
    const doc = { id: "testItemId", data: () => item };
    db.insert.mockResolvedValue(doc);

    const accountId = "testAccountId";
    const itemInserted = await api.insert(accountId, item);

    expect(itemInserted).toStrictEqual({ ...item, id: doc.id });
    expect(db.insert).toHaveBeenCalledWith(accountId, item);
  });
});

describe('test update', () => {
  
  it('should call update function with correct params', async () => {
    const item = { name: "Milk", status: "pending" };
    db.update.mockResolvedValue();

    const accountId = "testAccountId";
    await api.update(accountId, item);

    expect(db.update).toHaveBeenCalledWith(accountId, item);
  });
});

describe('test deleteById', () => {
  
  it('should call delete function with correct params', async () => {
    const itemId = "testItemId";
    db.deleteById.mockResolvedValue();

    const accountId = "testAccountId";
    await api.deleteById(accountId, itemId);

    expect(db.deleteById).toHaveBeenCalledWith(accountId, itemId);
  });
});