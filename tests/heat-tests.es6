jest.dontMock('../source/javascripts/components/heat.jsx')

describe("Heat", () => {

  it("Initializes with '0' heat and capacity", () => {
    var React = require('react')
    var TestUtils = require("react-addons-test-utils");
    var Heat = require("../source/javascripts/components/heat.jsx")

    // Render a Heat component into the document
    var heat_component = TestUtils.renderIntoDocument(
      <Heat />
   )

   expect(heat_component.state.value).toEqual(0)
   expect(heat_component.state.capacity).toEqual(0)
  })

})

