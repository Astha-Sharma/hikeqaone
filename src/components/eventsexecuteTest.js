import React from 'react'
import Widget from '../elements/Widget'
import DT from './SampleDateTIme'
import ExecuteEvent from './executeEvents'
import FetchEventResult from './EventExecutionResult'
import JavascriptHTML from './JavascriptHTML'
import TextInputs from '../forms/TextInputs'
import RadioInputs from '../forms/RadioInputs'
import InlineForms from '../forms/InlineForms'
import SelectMenus from '../forms/RamSelectMenus'
import Checkboxes from '../forms/Checkboxes'
import InputSizing from '../forms/InputSizing'
import LeftAlignedInputGroups from '../forms/LeftAlignedInputGroups'
import RightAlignedInputGroups from '../forms/RightAlignedInputGroups'
import CombinedInputGroups from '../forms/CombinedInputGroups'
import '../css/forms/default-forms.css'
import '../forms/react-date.css'
import '../css/elements/checkbox.css'
const DefaultForms = () =>
  <div>
    <div className="row">
      <div className="col-12 col-lg-12">
        <Widget title="Run your Analytics Job" description="">
          <ExecuteEvent/>
        </Widget>

      </div>
    </div>
  </div>
export default DefaultForms
