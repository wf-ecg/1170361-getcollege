/*jslint white:false */
/*globals _, C, W, Util */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/// EXTENDS
//
// UNDERSCORE // _.mixin(_.string.exports());
//
(function (_, U) {
    var NULS = /[\W_]+/g;
    var SEGS = /([^\W_]{3})([^\W_]*)/g;

    _.mixin({
        hasher: function (obj, self) {
            // {key:values} doubled as {val1:key, val2:key}
            if (!self) {
                obj = _.extend({}, obj);
            }
            _.each(obj, function (arr, nom) {
                if (!arr.pop) {
                    arr = obj[nom] = [arr]; // ensure array wrapper
                }
                _.each(arr, function (idx) {
                    var sub = obj[idx] = (obj[idx] || []); // ensure array
                    if (sub.length < 1 || (_.indexOf(sub, nom) < 0)) {
                        sub.push(nom);
                    }
                });
            });
            return obj;
        },
        idSafe: function (str, ns) {
            str = _.claSafe(str);
            return _.reserve(str, ns);
        },
        claSafe: function (str, ns) {
            str = str || ('X_' + btoa(Math.random() * 1e5 | 0));
            str = str.replace(NULS, '-');
            if (ns) {
                str = str.replace(SEGS, '$1');
            }
            return str.replace(NULS, '_');
        },
        isPlain: function (etc) {
            return (etc && _.isString(etc));
        },
        isPrivate: function (nom) {
            return (nom.toString().charAt(0) === '_');
        },
        objSort: function (obj, arr) {
            // return <obj> with values added in order by <arr>
            var neo = {};
            _.each(arr, function (e) {
                neo[e] = obj[e];
            });
            return neo;
        },
        reserve: function (nom, ns) {
            var self, cache, count;
            // register used keys by namespace <ns>
            self = _.reserve;
            nom = JSON.stringify(nom).slice(1, -1);
            ns = '+' + (ns || 'default');

            cache = self[ns] = (self[ns] || new U.Cache());
            count = cache[nom] = (cache[nom] || new U.Counter(1));
            return nom + '-' + count;
        },
        singler: function (obj, self) {
            // unbox sets with only 1 item
            if (!self) {
                obj = _.extend({}, obj);
            }
            _.each(obj, function (e, i) {
                if (e.length === 1) {
                    obj[i] = e.pop();
                }
            });
            return obj;
        },
        turnout: function (arr, prop, kill) {
            // index a hash<arr> by <prop> name
            // optional destruction<kill> of array index
            _.each(arr, function (item, name) {
                // use prop from each object as alias
                arr[item[prop]] = item;
                if (kill) {
                    delete arr[name];
                }
            });
            return _.extend({}, arr);
        },
    });
}(_, Util));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
