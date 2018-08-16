(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { Ossuary } = require('./ossuary');
const LibrumOfExperiences = require('./LibrumOfExperiences');

class Kafka {

  constructor () {
    this.ossuary = new Ossuary(LibrumOfExperiences);
  }

}

module.exports = Kafka;
},{"./LibrumOfExperiences":2,"./ossuary":5}],2:[function(require,module,exports){
const LibrumOfExperiences = {

}
module.exports = LibrumOfExperiences;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pluck = (arr) => {
    return arr[randomInt(0, arr.length - 1)];
};
exports.pluck = pluck;
const weightedPluck = (arr) => {
    const scalars = {};
    const items = [].concat(arr);
    let scaleMax = 0;
    let min = 1;
    let max = 1;
    items.forEach((el, i) => {
        if (el.match(/\^/g)) {
            const [str, scalar] = el.split('^');
            scalars[i] = Number(scalar);
            items[i] = str;
            // Default scale if at least one item is scaled is 1
        }
        else {
            scalars[i] = 1;
        }
        const scalar = scalars[i];
        min = scalar < min ? scalar : min;
        max = scalar > max ? scalar : max;
    });
    const scale = max / min;
    items.forEach((el, i) => {
        scaleMax += scale * (scalars[i] ? scalars[i] : 1);
    });
    let weightedSelection;
    let currentIndex = 0;
    const atIndex = randomInt(0, scaleMax);
    for (let i = 0; i < items.length; i++) {
        currentIndex += scale * (scalars[i] ? scalars[i] : 1);
        if (atIndex <= currentIndex) {
            weightedSelection = items[i];
            break;
        }
    }
    return weightedSelection;
};
exports.weightedPluck = weightedPluck;
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
exports.randomInt = randomInt;
const randomIntR = (range) => {
    return randomInt(range.low, range.high);
};
exports.randomIntR = randomIntR;
const clamp = (value, low, high) => {
    if (value < low) {
        return low;
    }
    if (value > high) {
        return high;
    }
    return value;
};
exports.clamp = clamp;

},{}],4:[function(require,module,exports){
const Kafka = require('./Kafka');

window.onload = () => {
  const kafka = new Kafka();
};
},{"./Kafka":1}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Random_1 = require("./Random");
var Tokens;
(function (Tokens) {
    Tokens["A_LOWER"] = "{a}";
    Tokens["A_UPPER"] = "{A}";
    Tokens["SPACE"] = " ";
})(Tokens || (Tokens = {}));
const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
class Ossuary {
    constructor(dictionary) {
        // Load language libraries
        this.lists = dictionary;
    }
    /**
     * Does things similar to parse, but retrieves the arbitrary data object
     */
    retrieve(source) {
        const lists = source.match(/\[.+\]/g);
        let selection;
        lists.forEach((listGroup) => {
            const listReferences = listGroup.split('|');
            let results = [];
            let weighted = false;
            listReferences.forEach((listReference) => {
                let [accessor] = listReference.match(/([a-zA-Z\^\.[0-9])+/);
                accessor = accessor.replace('[', '').replace(']', '');
                const result = this.deepDiveRetrieve(accessor);
                results.push(result);
                if (result.val && result.val.indexOf('^') !== -1) {
                }
                else if (result.indexOf('^') !== -1) {
                    weighted = true;
                }
            });
            selection = weighted ? Random_1.weightedPluck(results) : Random_1.pluck(results);
        });
        return selection;
    }
    /**
     * [list] - selects from list, same as ...
     * [list:unique(1)] - selects 1, unique, from list
     * [list:unique(2)] - selects 2, unique, from list
     * [list:any(2)] - selects 2, not unqiue
     * [listA|listB|...listN] - selects 1 from either A..N
     * [listA:any(2).join(' ')] - select 2, join with ' '
     * {A|B} - select A or B
     * [list.sublist] - select 1, unqiue, from sublist
     * {import:list} - specifies that one list belongs to another list
     * {a} - uses a/an on the next word
     * {A} - uses A/An on the next word
     * @param source
     */
    parse(source) {
        const bracketLists = source.match(/\[.+?\]/g);
        const curlyLists = source.match(/\{.+?\}/g);
        source = Array.isArray(bracketLists) ? this.parseLists(bracketLists.filter(this.filterEmpty), source) : source;
        if (curlyLists) {
            const adHocLists = this.filterATags(curlyLists.filter(this.filterEmpty));
            source = Array.isArray(adHocLists) ? this.parseAdHocLists(adHocLists, source) : source;
            if (source.indexOf(Tokens.A_LOWER) !== -1) {
                source = this.replaceATags(source, Tokens.A_LOWER);
            }
            if (source.indexOf(Tokens.A_UPPER) !== -1) {
                source = this.replaceATags(source, Tokens.A_UPPER);
            }
        }
        return source;
    }
    /**
     * Removes a/an tags from a curly brace list
     * @param arr {string[]}
     */
    filterATags(arr) {
        let filtered = [];
        arr.forEach((str, index) => {
            if (str !== Tokens.A_LOWER && str !== Tokens.A_UPPER) {
                filtered.push(arr[index]);
            }
        });
        return filtered;
    }
    /**
     * Removes empty items
     * @TODO this probably has to be smarter
     * @param arr
     */
    filterEmpty(str) {
        return str.trim().length !== 0;
    }
    /**
     * Replaces a/an tags with their appropriate token
     * @param source
     * @param tag
     */
    replaceATags(source, tag) {
        const raw = tag.match(/[a-zA-Z]/g).join('');
        while (source.indexOf(tag) !== -1) {
            const index = source.indexOf(tag);
            // 4 is the length of the tag plus the next space
            const nextLetter = source[index + 4];
            if (vowels.includes(nextLetter)) {
                source = source.slice(0, index) + raw + 'n' + ' ' + source.slice(index + 4);
            }
            else {
                source = source.slice(0, index) + raw + ' ' + source.slice(index + 4);
            }
        }
        return source;
    }
    /**
     *
     * @param lists
     * @param source
     */
    parseLists(lists, source) {
        // Process each list
        lists.forEach((listGroup) => {
            let uniqueOptionReferenceIndex = {};
            let uniqueOptions = false;
            // Divide on each pipe
            const listReferences = listGroup.split('|');
            let results = [];
            let weighted = false;
            listReferences.forEach((listReference, referenceIndex) => {
                let [accessor] = listReference.match(/[a-zA-ZÀ-ÿ-\s]+/);
                let scalar;
                // Parse out the scalar for frequency
                if (listReference.indexOf('^') !== -1) {
                    scalar = listReference.split('^')[1].match(/[0-9]+/).join('');
                }
                // Parse out unique
                let quantity;
                if (listReference.indexOf(':') !== -1) {
                    quantity = listReference.split(':')[1].match(/[0-9]+/).join('');
                    uniqueOptions = true;
                }
                // Unique selections have to select from a list
                let result;
                if (uniqueOptions && quantity) {
                    result = this.deepDive(accessor, true);
                    uniqueOptionReferenceIndex[referenceIndex] = {
                        result,
                        quantity
                    };
                    // i.e. results [1^10, 'frog', 5]
                    if (scalar) {
                        weighted = true;
                        results.push(`${referenceIndex}^${scalar}`);
                        // i.e. results [1, 'frog', 5]
                    }
                    else {
                        results.push(`${referenceIndex}`);
                    }
                    // Regular - thank god  
                }
                else {
                    result = this.deepDive(accessor);
                    if (scalar) {
                        weighted = true;
                        results.push(`${result}^${scalar}`);
                    }
                    else {
                        results.push(result);
                    }
                }
            });
            // Unique lists mess with everything
            if (uniqueOptions) {
                let intermediarySelection;
                if (weighted) {
                    intermediarySelection = Random_1.weightedPluck(results);
                }
                else {
                    intermediarySelection = Random_1.pluck(results);
                }
                // The selected item was part of a unique list selection
                if (uniqueOptionReferenceIndex[intermediarySelection]) {
                    // @TODO this might become an issue for selecting from a list of numeric values
                    const uniqueSelection = uniqueOptionReferenceIndex[intermediarySelection];
                    const { result, quantity } = uniqueSelection;
                    if (quantity > result.length) {
                        source = source.replace(listGroup, result.join(Tokens.SPACE));
                    }
                    else {
                        source = source.replace(listGroup, this.reducePluck(result, quantity).join(Tokens.SPACE));
                    }
                }
                else {
                    source = source.replace(listGroup, intermediarySelection);
                }
                // Replace the list group for each section
            }
            else {
                source = source.replace(listGroup, weighted ? Random_1.weightedPluck(results) : Random_1.pluck(results));
            }
        });
        // Return the wholly modified source
        return source;
    }
    reducePluck(arr, quantity) {
        let values = [];
        let mut = [].concat(arr);
        for (let i = 0; i < quantity; i++) {
            const value = Random_1.pluck(mut);
            values.push(value);
            const index = mut.indexOf(value);
            mut.splice(index, 1);
        }
        return values;
    }
    parseAdHocLists(adHocLists, source) {
        adHocLists.forEach((listGroup) => {
            const choices = listGroup.replace(/\{/g, '').replace(/\}/g, '').split('|');
            let results = [];
            let weighted = false;
            choices.forEach((choice) => {
                const [result] = choice.match(/([a-zA-ZÀ-ÿ-\s\^\.0-9])+/);
                results.push(result);
                if (result.indexOf('^') !== -1) {
                    weighted = true;
                }
            });
            source = source.replace(listGroup, weighted ? Random_1.weightedPluck(results) : Random_1.pluck(results));
        });
        return source;
    }
    /**
     * Recursively unfurl an object
     * @param accessor {string}
     */
    deepDive(accessor, array) {
        let selections = [];
        let a;
        let ref = this.lists;
        if (accessor.indexOf('.') !== -1) {
            a = accessor.split('.');
            a.forEach((k) => {
                ref = ref[k];
            });
        }
        else {
            ref = ref[accessor];
        }
        if (typeof ref === 'undefined') {
            return [];
        }
        const diveIn = (swimmingPool) => {
            if (Array.isArray(swimmingPool)) {
                selections = selections.concat(swimmingPool);
            }
            else if (typeof swimmingPool === 'object') {
                const keys = Object.keys(swimmingPool);
                keys.forEach((key) => {
                    diveIn(swimmingPool[key]);
                });
            }
            else {
            }
        };
        diveIn(ref);
        if (array) {
            return selections;
        }
        else {
            return Random_1.pluck(selections);
        }
    }
    /**
     * Recursively unfurl and object
     * @param accessor {string}
     */
    deepDiveRetrieve(accessor) {
        let selections = [];
        let a;
        let ref = this.lists;
        if (accessor.indexOf('.') !== -1) {
            a = accessor.split('.');
            a.forEach((k) => {
                ref = ref[k];
            });
        }
        else {
            ref = ref[accessor];
        }
        const diveIn = (swimmingPool) => {
            if (Array.isArray(swimmingPool)) {
                selections = selections.concat(swimmingPool);
            }
            else if (typeof swimmingPool === 'object') {
                // This is for fetching datastructures from legendary
                if (swimmingPool.val) {
                    selections.push(swimmingPool);
                }
                else {
                    const keys = Object.keys(swimmingPool);
                    keys.forEach((key) => {
                        diveIn(swimmingPool[key]);
                    });
                }
            }
            else {
            }
        };
        diveIn(ref);
        return Random_1.pluck(selections);
    }
}
exports.Ossuary = Ossuary;

},{"./Random":3}]},{},[4]);
