import React from 'react'
import Widget from '../elements/Widget'
import SliderWithTooltip from '../components/forms/SliderWithTooltip'
import RangeSliderWithTooltip from '../components/forms/RangeSliderWithTooltip'
import DefaultSlider from '../components/forms/Slider'
import RangeSlider from '../components/forms/RangeSlider'
import '../css/forms/sliders.css'
import 'rc-tooltip/assets/bootstrap.css'

const Sliders = () =>
  <div className="row">
    <div className="col">
      <Widget title="Simple slider" description="This is an empty page">
        <DefaultSlider
          onChange={e => console.log(e)}
          onAfterChange={e => console.log(e)}
          min={0}
          max={100}
          defaultValue={40}
        />
      </Widget>
      <Widget title="Range slider" description="This is an empty page">
        <RangeSlider
          onChange={e => console.log(e)}
          onAfterChange={e => console.log(e)}
          min={0}
          max={100}
          defaultValue={[30, 70]}
        />
      </Widget>
      <Widget title="Slider with tooltip" description="This is an empty page">
        <SliderWithTooltip
          onChange={e => console.log(e)}
          onAfterChange={e => console.log(e)}
          min={0}
          max={100}
          defaultValue={40}
        />
      </Widget>
      <Widget
        title="Range slider with tooltip"
        description="This is an empty page">
        <RangeSliderWithTooltip
          onChange={e => console.log(e)}
          onAfterChange={e => console.log(e)}
          min={0}
          max={100}
          defaultValue={[30, 70]}
        />
      </Widget>
    </div>
  </div>
export default Sliders
