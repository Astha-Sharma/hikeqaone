import _ from 'underscore';
import immutable from 'immutable';

let commonFunctions = {

    getConsumerListFromArray(list) {
        var check = list[0];
        if(check && typeof check === "object"){
            return _.pluck(list, "value");
        }else{
            return list;
        }
    },
    parseValueFormEventObj(e) {
        return (typeof e.value ==="object")?Array.isArray(e.value)?this.getConsumerListFromArray(e.value):e.value&&e.value.value:e.value;
    },
    parseLabelFormEventObj(e) {
        return (typeof e.value ==="object")?Array.isArray(e.value)?this.getConsumerListFromArray(e.value):e.value&&e.value.label:e.label;
    }
};

export default commonFunctions;
