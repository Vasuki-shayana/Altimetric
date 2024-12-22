const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { expect } = chai;
const bookingModel = require("../src/models/bookingModel");
const sinon = require("sinon");

chai.use(chaiHttp);

describe("GET /api/bookings", () => {
  afterEach(() => {
    // Restore the original method after each test
    sinon.restore();
  });
  
  it("should get all bookings", (done) => {
    chai
      .request(app)
      .get("/api/bookings")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should handle errors properly", (done) => {
    const getAllDataStub = sinon.stub(bookingModel, "getAllData");
    getAllDataStub.rejects(new Error("Database error"));

    chai
      .request(app)
      .get("/api/bookings")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(500);
        done();
      });
  });
});

describe("POST /api/bookings/book", () => {
  afterEach(() => {
    // Restore the original method after each test
    sinon.restore();
  });
  
  it("should create a new booking", (done) => {
    const bookingData = {
      hotelId: "1",
      userId: "123",
      checkInDate: "2024-12-24",
      checkOutDate: "2024-12-25",
      roomsBooked: 1,
    };

    chai
      .request(app)
      .post("/api/bookings/book")
      .send(bookingData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("status").eq(true);
        done();
      });
  });

  it("should handle errors properly", (done) => {
    const getStubData = sinon.stub(bookingModel, "createBooking");
    getStubData.rejects(new Error("Database error"));

    chai
      .request(app)
      .post("/api/bookings/book")
      .send({})
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(500);
        expect(res.body).to.be.an("object")
        done();
      });
  });
});

describe("PUT /api/bookings/book", () => {
  afterEach(() => {
    // Restore the original method after each test
    sinon.restore();
  });
  
  it("should update a booking", (done) => {
    const bookingData = {
      bookingId: "43b124d3-7a62-460c-85db-e41a4ff4c4ef",
      hotelId: "1",
      userId: "123",
      checkInDate: "2024-12-24",
      checkOutDate: "2024-12-25",
    };

    const getStubData = sinon.stub(bookingModel, "updateBooking");
    getStubData.resolves({
      status: true,
      message: 'Booking update completed successfully'
    });


    chai
      .request(app)
      .put("/api/bookings/book")
      .send(bookingData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("status").eq(true);
        done();
      });
  });
  it("should throw error for update a booking with invalid booking id", (done) => {
    const bookingData = {
      bookingId: "somerandomId",
      hotelId: "1",
      userId: "123",
      checkInDate: "2024-12-24",
      checkOutDate: "2024-12-25",
    };

    chai
      .request(app)
      .put("/api/bookings/book")
      .send(bookingData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("status").eq(false);
        done();
      });
  });
  it("should handle errors properly", (done) => {
    chai
      .request(app)
      .put("/api/bookings/book")
      .send({})
      .end((err, res) => {
        if (err) done(err);
        
        expect(res).to.have.status(404);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("status").eq(false);
        done();
      });
  });
});

describe("DELETE /api/bookings/book/:bookingId", () => {
  afterEach(() => {
    // Restore the original method after each test
    sinon.restore();
  });
  
  it("should delete a booking", (done) => {
    const bookingId = "43b124d3-7a62-460c-85db-e41a4ff4c4ef";
    const getStubData = sinon.stub(bookingModel, "cancelBooking");
    getStubData.resolves({
      status: true,
      message: 'Booking remove completed successfully'
    });

    chai
      .request(app)
      .delete(`/api/bookings/book/${bookingId}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("status").eq(true);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("should handle errors properly", (done) => {
    chai
      .request(app)
      .delete("/api/bookings/book/invalidBookingId")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe("GET /api/bookings/bookingData", () => {
  it("should get booking data based on filters", (done) => {
    chai
      .request(app)
      .get("/api/bookings/bookingData")
      .query({ hotelId: "1", userId: "123" })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});