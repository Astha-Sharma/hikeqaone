import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'react-select-box-container': {
    position: 'relative',
    width: [{ unit: 'px', value: 240 }],
    display: 'inline-block',
    backgroundColor: '#fff',
    borderRadius: '4px',
    textAlign: 'left',
    boxShadow: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 2 }, { unit: 'string', value: 'rgba(0, 0, 0, .3)' }]
  },
  'react-select-box': {
    padding: [{ unit: 'px', value: 15 }, { unit: 'px', value: 0 }, { unit: 'px', value: 15 }, { unit: 'px', value: 0 }],
    display: 'inline-block',
    cursor: 'pointer',
    border: [{ unit: 'string', value: 'none' }],
    width: [{ unit: '%H', value: 1 }],
    textAlign: 'left',
    backgroundColor: 'transparent'
  },
  'react-select-box:focus': {
    outline: '0',
    boxShadow: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 4 }, { unit: 'string', value: '#0493D1' }]
  },
  'react-select-box:before': {
    content: '' '',
    zIndex: '1',
    position: 'absolute',
    height: [{ unit: 'px', value: 20 }],
    top: [{ unit: 'px', value: 15 }],
    right: [{ unit: 'px', value: 34 }],
    borderLeft: [{ unit: 'px', value: 1 }, { unit: 'string', value: 'solid' }, { unit: 'string', value: '#CBD2D7' }]
  },
  'react-select-box:after': {
    content: '' '',
    position: 'absolute',
    zIndex: '1',
    top: [{ unit: 'px', value: 23 }],
    right: [{ unit: 'px', value: 13 }],
    borderTop: [{ unit: 'px', value: 6 }, { unit: 'string', value: 'solid' }, { unit: 'string', value: '#7B8E9B' }],
    borderLeft: [{ unit: 'px', value: 5 }, { unit: 'string', value: 'solid' }, { unit: 'string', value: 'transparent' }],
    borderRight: [{ unit: 'px', value: 5 }, { unit: 'string', value: 'solid' }, { unit: 'string', value: 'transparent' }]
  },
  'react-select-box-label': {
    lineHeight: [{ unit: 'px', value: 16 }],
    fontSize: [{ unit: 'px', value: 12 }],
    fontWeight: 'bold',
    color: '#7B8E9B'
  },
  'react-select-box-option': {
    lineHeight: [{ unit: 'px', value: 16 }],
    fontSize: [{ unit: 'px', value: 12 }],
    fontWeight: 'bold',
    color: '#7B8E9B'
  },
  'react-select-box-label': {
    padding: [{ unit: 'px', value: 0 }, { unit: 'px', value: 40 }, { unit: 'px', value: 0 }, { unit: 'px', value: 20 }],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#0493D1'
  },
  'react-select-box-empty react-select-box-label': {
    color: '#7B8E9B'
  },
  'react-select-box-click-outside-layer': {
    position: 'fixed',
    top: [{ unit: 'px', value: 0 }],
    left: [{ unit: 'px', value: 0 }],
    right: [{ unit: 'px', value: 0 }],
    bottom: [{ unit: 'px', value: 0 }],
    zIndex: '2'
  },
  'react-select-box-clear': {
    position: 'absolute',
    top: [{ unit: 'px', value: 15 }],
    right: [{ unit: 'px', value: 0 }],
    width: [{ unit: 'px', value: 35 }],
    height: [{ unit: 'px', value: 20 }],
    backgroundColor: '#fff',
    textIndent: '-9999em',
    zIndex: '3',
    border: [{ unit: 'string', value: 'none' }]
  },
  'react-select-box-clear:before': {
    content: ''×'',
    position: 'absolute',
    top: [{ unit: 'px', value: 2 }],
    left: [{ unit: 'px', value: 10 }],
    zIndex: '1',
    backgroundColor: '#7B8E9B',
    borderRadius: '100%',
    fontSize: [{ unit: 'px', value: 13 }],
    color: '#fff',
    lineHeight: [{ unit: 'px', value: 1 }],
    width: [{ unit: 'px', value: 15 }],
    height: [{ unit: 'px', value: 15 }],
    textIndent: '0',
    textAlign: 'center'
  },
  'react-select-box-clear:hover': {
    outline: '0'
  },
  'react-select-box-clear:focus': {
    outline: '0'
  },
  'react-select-box-clear:hover:before': {
    backgroundColor: '#0493D1'
  },
  'react-select-box-clear:focus:before': {
    backgroundColor: '#0493D1'
  },
  'react-select-box-hidden': {
    display: 'none'
  },
  'react-select-box-options': {
    margin: [{ unit: 'px', value: 2 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
    position: 'absolute',
    padding: [{ unit: 'px', value: 10 }, { unit: 'px', value: 0 }, { unit: 'px', value: 10 }, { unit: 'px', value: 0 }],
    width: [{ unit: 'px', value: 240 }],
    top: [{ unit: '%V', value: 1 }],
    left: [{ unit: 'px', value: 0 }],
    zIndex: '4',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 2 }, { unit: 'string', value: 'rgba(0, 0, 0, .3)' }]
  },
  'react-select-box-options-list': {
    listStyle: 'none outside',
    margin: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
    padding: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }]
  },
  'react-select-box-option': {
    padding: [{ unit: 'px', value: 10 }, { unit: 'px', value: 20 }, { unit: 'px', value: 10 }, { unit: 'px', value: 20 }],
    margin: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
    cursor: 'pointer',
    display: 'block',
    lineHeight: [{ unit: 'px', value: 1.2 }],
    textDecoration: 'none'
  },
  'react-select-box-option:hover': {
    color: '#0493D1',
    backgroundColor: '#f4f4f4'
  },
  'react-select-box-option-selected': {
    color: '#CBD2D7'
  },
  'react-select-box-multi react-select-box-option': {
    paddingLeft: [{ unit: 'px', value: 42 }],
    position: 'relative'
  },
  'react-select-box-multi react-select-box-option:before': {
    content: '' '',
    position: 'absolute',
    lineHeight: [{ unit: 'px', value: 1 }],
    textAlign: 'center',
    left: [{ unit: 'px', value: 20 }],
    top: [{ unit: 'px', value: 9 }],
    borderRadius: '3px',
    height: [{ unit: 'px', value: 12 }],
    width: [{ unit: 'px', value: 12 }],
    marginRight: [{ unit: 'px', value: 10 }],
    border: [{ unit: 'px', value: 1 }, { unit: 'string', value: 'solid' }, { unit: 'string', value: '#7B8E9B' }],
    background: '#f9f9f9',
    verticalAlign: 'middle'
  },
  'react-select-box-multi react-select-box-option-selected:before': {
    content: ''✓''
  },
  'react-select-box-multi react-select-box-option-selected': {
    color: '#1F3344'
  },
  'react-select-box-option:focus': {
    color: '#0493D1',
    outline: '0',
    backgroundColor: '#DDE2E5'
  },
  'react-select-box-option-focused': {
    color: '#0493D1',
    outline: '0',
    backgroundColor: '#DDE2E5'
  },
  'react-select-box-close': {
    color: '#0493D1',
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    border: [{ unit: 'string', value: 'none' }],
    padding: [{ unit: 'px', value: 5 }, { unit: 'px', value: 0 }, { unit: 'px', value: 5 }, { unit: 'px', value: 0 }],
    display: 'block',
    textAlign: 'center',
    width: [{ unit: '%H', value: 1 }],
    fontWeight: 'bold',
    cursor: 'pointer',
    outline: 'none'
  },
  'react-select-box-close:hover': {
    textDecoration: 'underline'
  },
  'react-select-box-close:focus': {
    textDecoration: 'underline'
  },
  'react-select-box-empty react-select-box-close': {
    color: '#CBD2D7'
  },
  'react-select-box-native': {
    position: 'absolute',
    left: [{ unit: 'em', value: -99999 }]
  }
});
