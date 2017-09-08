import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../app";

const should = chai.should();
chai.use(chaiHttp);

describe("routes: index", () => {
	describe("GET /", () => {
		it("should return the index page", done => {
			chai
				.request(server)
				.get("/")
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.text.should.match(/id="application-root"/);
					done();
				});
		});
	});
});
