const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { expect } = chai;

chai.use(chaiHttp);

describe("GET /api/bookings", () => {
  it("should get all bookings", (done) => {
    // Simulate a GET request to the /api/bookings endpoint
    chai
      .request(app)
      .get("/api/bookings")
      .end((err, res) => {
        // Check if there is no error
        if (err) done(err);

        // Assert status code
        expect(res).to.have.status(200);

        // Assert the response body is an array (assuming the response is an array of bookings)
        expect(res.body).to.be.an("array");

        // Optionally, check for specific fields in the response (e.g., booking ID, hotel ID)
        // expect(res.body[0]).to.have.property("bookingId");
        // expect(res.body[0]).to.have.property("hotelId");

        done();
      });
  });

  it("should handle errors properly", (done) => {
    // Simulate a GET request that triggers an error in your controller
    // You can simulate errors here by mocking the controller method if needed
    chai
      .request(app)
      .get("/api/bookings")
      .end((err, res) => {
        // Assert the error response (assuming your error handling sends a statusCode)
        expect(res).to.have.status(500);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
