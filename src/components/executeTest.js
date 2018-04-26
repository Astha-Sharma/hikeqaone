import React from 'react'
import Widget from '../elements/Widget'
import TextInputs from '../forms/TextInputs'
import RadioInputs from '../forms/RadioInputs'
import InlineForms from '../forms/InlineForms'
import SelectMenus from '../forms/SelectMenus'
import Checkboxes from '../forms/Checkboxes'
import InputSizing from '../forms/InputSizing'
import LeftAlignedInputGroups from '../forms/LeftAlignedInputGroups'
import RightAlignedInputGroups from '../forms/RightAlignedInputGroups'
import CombinedInputGroups from '../forms/CombinedInputGroups'
import '../css/forms/default-forms.css'
const DefaultForms = () =>
  <div>
    <div className="row">
      <div className="col-12 col-lg-12">
        <Widget title="Run your Analytics Job" description="">
          <TextInputs />
        </Widget>
        <Widget title="Query Result" description="">

        </Widget>
      </div>
    </div>
  </div>
export default DefaultForms
