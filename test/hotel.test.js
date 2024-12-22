const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { expect } = chai;
const hotelModel = require("../src/models/hotelModel");
const sinon = require("sinon");

chai.use(chaiHttp);

describe("GET /api/hotel", () => {
  afterEach(() => {
    // Restore the original method after each test
    sinon.restore();
  });

  it("should get all hotels", (done) => {
    chai
      .request(app)
      .get("/api/hotels")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should throw db error", (done) => {
    const getAllDataStub = sinon.stub(hotelModel, "getAllData");
    getAllDataStub.rejects(new Error("Database error"));

    chai
      .request(app)
      .get("/api/hotels")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(500);
        done();
      });
  });
});

describe("GET /api/hotel/search", () => {
    afterEach(() => {
      // Restore the original method after each test
      sinon.restore();
    });
  
    it("should get data based on the search parameter", (done) => {
      chai
        .request(app)
        .get("/api/hotels/search?id=1")
        .end((err, res) => {
          if (err) done(err);          
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  
    it("should throw db error", (done) => {
      const getAllDataStub = sinon.stub(hotelModel, "getAllData");
      getAllDataStub.rejects(new Error("Database error"));
  
      chai
        .request(app)
        .get("/api/hotels/search?something=1")
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400);
          done();
        });
    });
  });
  