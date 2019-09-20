const { Product } = require("../../models/product");
const { User } = require("../../models/user");
const mongoose = require("mongoose");
const request = require("supertest");


let server;

describe("/api/products", () => {
  beforeEach(() => {
    server = require("../../server");
  });
  afterEach(async () => {
    await server.close();
    await Product.remove({});
  });

  describe("GET /", () => {
    it("should return all products", async () => {
      const products = [
        { name: "prod1", price: 1, stock: 5 },
        { name: "prod2", price: 2, stock: 6 }
      ];

      await Product.collection.insertMany(products);

      const res = await request(server).get("/api/products");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === "prod1")).toBeTruthy;
      expect(res.body.some(g => g.name === "prod2")).toBeTruthy;
    });
  });

  describe("GET /:id", () => {
    it("should return a product if valid id is passed", async () => {
      const product = new Product({ name: "prod1" });
      await product.save();

      const res = await request(server).get(`/api/products/${product._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", product.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/products/1");

      expect(res.status).toBe(404);
    });

    it("should return 404 if no product with the given id exists", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/products/${id}`);

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", async () => {
    let token;
    let name;
    let price;
    let stock;

    const exec = async () => {
      return await request(server)
        .post("/api/products")
        .set("x-auth-token", token)
        .send({ name, price, stock });
    };

    beforeEach(() => {
        token = new User().generateAuthToken();
        name = "prod1";
        price = 2;
        stock = 10;
    });

    it('should return 401 if user is not logged in', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if product is less than 2 characters', async () => {
        name = "a";

        const res = await exec();

        expect(res.status).toBe(400)
    });

     it('should return 400 if product is more than 50 characters', async () => {
        name = new Array(52).join('a');

        const res = await exec();

        expect(res.status).toBe(400)
    });

    it('should return the product if it is valid', async () => {
        const res = await exec();

        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name', 'prod1')
        expect(res.body).toHaveProperty('price', 2)
        expect(res.body).toHaveProperty('stock', 10)
    });
  });

  describe('PUT /:id', async () => {
      let token;
      let product;
      let newName;
      let newPrice;
      let newStock;
      let id;

      const exec = async () => {
          return await request(server)
            .put(`/api/products/${id}`)
            .set("x-auth-token", token)
            .send({name: newName, price: newPrice, stock: newStock});
      };

      beforeEach(async () => {
          // Create product before update it 
          product = new Product({name: "prod1", price: 2, stock: 10});
          await product.save();

          token = new User({isAdmin: true}).generateAuthToken();
          id = product._id;
          newName = "updatedName";
          newPrice = 3;
          newStock = 2;
      });

      it('should  return 401 if user is not logged in', async () => {
          token = '';

          const res = await exec();

          expect(res.status).toBe(401)
      });

      it('should return 403 if user is not admin', async () => {
          token = new User({isAdmin: false}).generateAuthToken();

          const res = await exec();

          expect(res.status.toBe(403))
      });

      it('should return 400 if product is less than 2 characters', async () => {
          newName = "a";

          const res = await exec();
    
          expect(res.status).toBe(400);
      });

      it('should return 400 if product is more than 50 characters', async () => {
          newName = new Array(52).join('a');

          const res = await exec();

          expect(res.status).toBe(400);
      });

      it('should return 404 if id is invalid', async () => {
          id = 1;

          const res = await exec();

          expect(res.status).toBe(404)
      });

      it('should return 404 if product with the guven id was not found ', async () => {
          id = mongoose.Types.ObjectId();

          const res = await exec();

          expect(res.status).toBe(404)
      });

      it('should update the product if input is valid', async () => {
          await exec();

          const updatedProduct = await Product.findById(product._id);

          expect(updatedProduct.name).toBe(newName)
      });

      it('should retur the updated product if it is valid', async () => {
          const res  = await exec();

          expect(res.body).toHaveProperty("_id");
          expect(res.body).toHaveProperty("name", newName);
          expect(res.body).toHaveProperty("price", newPrice);
          expect(res.body).toHaveProperty("stock", newStock);
      });
  });


});
