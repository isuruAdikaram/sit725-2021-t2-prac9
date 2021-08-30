var expect = require('chai').expect;
var request = require('request');

describe("Test get post api",function(){
    var url = "http://localhost:3000/api/projects";
    // To test if the api exists 
    it("return status 200 to check if api works",function(done){
        request(url,function(error,response,body){
            expect(response.statusCode).to.equal(200);
            done()
        });
    });
    // To test if the api is working correctly
    it("return statusCode key in the body to check if api give right result should be 200",function(done){
        request(url,function(error,response,body){
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(200);
            done()
        });
    });
    it("return result as an object",function(done){
        request(url,function(error,response,body){
            body = JSON.parse(body)
            expect(body).to.be.a('Object');
            done()
        });
    });


});