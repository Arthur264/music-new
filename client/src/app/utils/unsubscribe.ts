// export function AutoUnsubscribe( constructor ) {
//
//     const original = constructor.prototype.ngOnDestroy;
//
//     constructor.prototype.ngOnDestroy = function () {
//         for ( let prop in this ) {
//             const property = this[ prop ];
//             if ( property && (typeof property.unsubscribe === "function") ) {
//                 property.unsubscribe();
//             }
//         }
//         original && typeof original === "function" && original.apply(this, arguments);
//     };
//
// }

// export function test() {
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         console.log(target, propertyKey, descriptor)
//     };
// }
//
