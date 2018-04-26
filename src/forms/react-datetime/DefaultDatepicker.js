import React from 'react'
import Datetime from 'react-datetime'

const DefaultDatepicker = ({onChange}) =>
    <Datetime
      dateFormat="yyyy-MM-dd HH:mm:ss"
			timeFormat={false}
      open={false}
      input={true}
      viewMode={'days'}
			onChange={onChange}
    />

export default DefaultDatepicker
