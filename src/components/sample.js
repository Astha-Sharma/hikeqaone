import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'spanmultiselect-native-select': {
    position: 'relative'
  },
  'spanmultiselect-native-select select': {
    border: [{ unit: 'px', value: 0 }],
    clip: 'rect(0 0 0 0)!important',
    height: [{ unit: 'px', value: 1 }],
    margin: [{ unit: 'px', value: -1 }, { unit: 'px', value: -1 }, { unit: 'px', value: -1 }, { unit: 'px', value: -3 }],
    overflow: 'hidden!important',
    padding: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
    position: 'absolute!important',
    width: [{ unit: 'px', value: 1 }],
    left: [{ unit: '%H', value: 0.5 }],
    top: [{ unit: 'px', value: 30 }]
  },
  'multiselect-container': {
    position: 'absolute',
    listStyleType: 'none',
    margin: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
    padding: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }]
  },
  'multiselect-container input-group': {
    margin: [{ unit: 'px', value: 5 }, { unit: 'px', value: 5 }, { unit: 'px', value: 5 }, { unit: 'px', value: 5 }]
  },
  'multiselect-container>li': {
    padding: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }]
  },
  'multiselect-container>li>amultiselect-all label': {
    fontWeight: '700'
  },
  'multiselect-container>limultiselect-group label': {
    margin: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
    padding: [{ unit: 'px', value: 3 }, { unit: 'px', value: 20 }, { unit: 'px', value: 3 }, { unit: 'px', value: 20 }],
    height: [{ unit: '%V', value: 1 }],
    fontWeight: '700'
  },
  'multiselect-container>limultiselect-group-clickable label': {
    cursor: 'pointer'
  },
  'multiselect-container>li>a': {
    padding: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }]
  },
  'multiselect-container>li>a>label': {
    margin: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
    height: [{ unit: '%V', value: 1 }],
    cursor: 'pointer',
    fontWeight: '400',
    padding: [{ unit: 'px', value: 3 }, { unit: 'px', value: 0 }, { unit: 'px', value: 3 }, { unit: 'px', value: 30 }]
  },
  'multiselect-container>li>a>labelradio': {
    margin: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }]
  },
  'multiselect-container>li>a>labelcheckbox': {
    margin: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }]
  },
  'multiselect-container>li>a>label>input[type=checkbox]': {
    marginBottom: [{ unit: 'px', value: 5 }]
  },
  'btn-group>btn-group:nth-child(2)>multiselectbtn': {
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px'
  },
  'form-inline multiselect-container labelcheckbox': {
    padding: [{ unit: 'px', value: 3 }, { unit: 'px', value: 20 }, { unit: 'px', value: 3 }, { unit: 'px', value: 40 }]
  },
  'form-inline multiselect-container labelradio': {
    padding: [{ unit: 'px', value: 3 }, { unit: 'px', value: 20 }, { unit: 'px', value: 3 }, { unit: 'px', value: 40 }]
  },
  'form-inline multiselect-container li a labelcheckbox input[type=checkbox]': {
    marginLeft: [{ unit: 'px', value: -20 }],
    marginRight: [{ unit: 'px', value: 0 }]
  },
  'form-inline multiselect-container li a labelradio input[type=radio]': {
    marginLeft: [{ unit: 'px', value: -20 }],
    marginRight: [{ unit: 'px', value: 0 }]
  }
});
