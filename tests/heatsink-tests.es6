jest.dontMock('../source/javascripts/components/heat.jsx')

describe("Heatsink", () => {

  it("presets heatsink count when loaded", () => {
    var React = require('react')
    var TestUtils = require("react-addons-test-utils");
    var Heatsink = require("../source/javascripts/components/heatsink.jsx")

    // Render a Heat component into the document
    var heatsink_component = TestUtils.renderIntoDocument(
      <Heatsink />
   )

   expect(heatsink_component.state.internal_heatsinks).toEqual(10)
   expect(heatsink_component.state.external_heatsinks).toEqual(4)
   expect(heatsink_component.state.double_heatsinks).toEqual(false)
  })

})
