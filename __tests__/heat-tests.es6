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

   expect(heat_component.state.value).toEqual(0)
   expect(heat_component.state.capacity).toEqual(0)
  })

})

