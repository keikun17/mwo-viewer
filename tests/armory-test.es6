jest.dontMock('../source/javascripts/components/armory.jsx')

describe("Armory", () => {

  it("loads and the weapon list", () => {
    var React = require('react')
    var TestUtils = require("react-addons-test-utils");
    var Armory = require("../source/javascripts/components/armory.jsx")

    // Render a Heat component into the document
    var armory_component = TestUtils.renderIntoDocument(
      <Armory />
   )

   expect(armory_component.state.weapons_list.length).toBeGreaterThan(5)

  })

})
