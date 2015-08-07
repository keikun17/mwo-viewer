import {EventEmitter} from 'events'

/**
 * Store data format
 *   <group name>: <ghost heat properties>
 *     {key}    <group name>           - Abbreviated Ghost heat group name (e.g. slas, mlas, llas)
 *     {object} <ghost heat properies> :
 *        {float}   trigger_time            - time remaining before `current` counter is reset
 *        {integer} limit                   - number of shots that can be fired within the ghost 
 *                                            heat group without triggering ghost heat
 *        {integer} current                 - number of times a weapon has been fired within the `trigger_time`
 *
 */
var data = {
  slas: {trigger_time: 0, limit: 6, current: 0}
}
