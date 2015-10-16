import { React, sinon, assert, expect, TestUtils} from '../test_helper'
import Heatsink from "../../../source/javascripts/components/heatsink"
import weapons_list from "../../../source/javascripts/components/weapons_list"

describe("Heatsink", () => {

  var sandbox, heatsink_component

  beforeEach(()=> {
    sandbox = sinon.sandbox.create()
    heatsink_component = TestUtils.renderIntoDocument( <Heatsink /> )
  })

  afterEach(() => {
    sandbox.restore()
  })

  it("renders the heatsink with initial data", () => {
   expect(heatsink_component.state.internal_heatsinks).to.equal(10)
   expect(heatsink_component.state.external_heatsinks).to.equal(4)
   expect(heatsink_component.state.double_heatsinks).to.equal(false)
  })
})
