import _getType from '../_.internal/_getType';

/**
 * @description 检验参数并提示错误
 * @param inspectParams 参数的数组列表
 * @returns 返回出参数检验结果
 */
const testArg = (...inspectParams: any[]): boolean => {
  let index = -1;
  let inspect = true; // 所有参数检查结果
  // 对每个参数列表遍历，检验每个参数
  while (++index < inspectParams.length) {
    const [param, ...inspectParam] = inspectParams[index];
    const listLength = inspectParam.length;
    let listIndex = -1; 
    /**
     * 每个参数到检验列表
     * 成功加一，失败不变
     * 如果大于0就说明检验成功
     */
    let inspectList = 0;
    // 对每个参数列表多个类型遍历
    while (++listIndex < listLength) {
      const isLast = listIndex >= listLength - 1 // 是不是某个参数对最后一个检验
      const test = inspectParam[listIndex];
      const errMsg = `传入的参数--${param}--是${_getType(param)}类型，实际应该为${test}类型，参数检验不通过`;
      const isTest = typeof test === 'string' || typeof test === 'function';
      if (!isTest) {
        console.error(`传入的验证需要函数或者字符串`);
        return
      }

      const paramTest = typeof test === 'string'
        ? _getType(param) === test
        : test(param);

      inspectList += paramTest ? 1 : 0;
      // 发现有检验成功的直接结束循环
      if (inspectList > 0) break;
      // 多个类型检验都没通过打印出错误信息
      isLast && console.error(errMsg);
    }
    inspect = inspect && (inspectList > 0);
    if (!inspect) break;
  }
  return inspect;
};
export default testArg;
