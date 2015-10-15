import { React, sinon, assert, expect, TestUtils} from '../test_helper'
import Armory from "../../../source/javascripts/components/armory"
import weapons_list from "../../../source/javascripts/components/weapons_list"

describe("Armory", () => {

  let data = {
    selected_faction: 'innersphere',
    weapons_list: weapons_list
  }

  var sandbox, armory_component


  beforeEach(() =>{
    sandbox = sinon.sandbox.create()
    armory_component = TestUtils.renderIntoDocument( <Armory weapons_list={weapons_list}/> )

  })

  afterEach(() => {
    sandbox.restore()
  })

  it("renders the armory with weapon list", () => {

    expect(armory_component.state.weapons_list.length).to.equal(26)
  })
})

