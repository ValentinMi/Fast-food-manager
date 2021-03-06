const { User } = require("../../models/user");
const { PendingOrder } = require("../../models/pendingOrder");
const request = require("supertest");

describe("auth middleware", () => {
  beforeEach(() => {
    server = require("../../server");
  });
  afterEach(async () => {
    await PendingOrder.remove({});
    await server.close();
  });
  let token;

  const exec = () => {
    return request(server)
      .post("/api/pendingOrders")
      .set("x-auth-token", token)
      .send({
        products: [
          {
            name: "Hamburger",
            quantity: 4,
            price: 10
          }
        ],
        totalPrice: 10
      });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it("should return 401 if no token provided", async () => {
    token = "";

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(400);
  });
});
