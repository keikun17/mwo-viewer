jest.dontMock('../source/javascripts/components/heat.jsx')

describe("Heat", () => {

  it("is initialized", () => {
    var React = require('react/addons')
    var Heat = require("../source/javascripts/components/heat.jsx")
    var TestUtils = require("react-addons-test-utils");

    // Render a Heat component into the document
    var heat_component = TestUtils.renderIntoDocument(
      <Heat />
    )


  })

})

