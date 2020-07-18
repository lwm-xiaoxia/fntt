/**
 * @description 获取本机IP 在node.js环境下有效
 */
// const getIP = () => {
//   let local = {};
//   const network = os.networkInterfaces();
//   Object.keys(network).forEach(value => {
//     const _local = network[value].find(net => {
//       return net.family === 'IPv4' 
//         && net.address.search(/\d+\.\d+\.\d+\.\d+/) !== -1 
//         && !net.internal;
//     })
//     _local && (local = _local);
//   })
//   return local.address;
// };

// export default getIP;