export const inputCheck = (limit, inputChk, setToast, toast) => {
  const { userId, password, password_confirm, name, age, zcode, creditCard } =
    inputChk;
  const { cardNumber } = creditCard;
  let result = true;
  for (let i = 0; i < limit; i++) {
    if (i === 0 && !userId) {
      setToast({
        ...toast,
        status: true,
        msg: '중복 확인 버튼을 눌러주세요.',
      });
      result = false;
    } else if (i === 1 && !password) {
      setToast({
        ...toast,
        status: true,
        msg: '비밀번호를 다시 입력해주세요.',
      });
      result = false;
    } else if (i === 2 && !password_confirm) {
      setToast({
        ...toast,
        status: true,
        msg: '비밀번호 확인을 해주세요.',
      });
      result = false;
    } else if (i === 3 && !name) {
      setToast({
        ...toast,
        status: true,
        msg: '이름을 입력해주세요.',
      });
      result = false;
    } else if (i === 4 && !age) {
      setToast({
        ...toast,
        status: true,
        msg: '나이를 입력해주세요.',
      });
      result = false;
    } else if (i === 5 && !zcode) {
      setToast({
        ...toast,
        status: true,
        msg: '주소를 입력해주세요',
      });
      result = false;
    } else if (i === 6 && !cardNumber) {
      setToast({
        ...toast,
        status: true,
        msg: '카드를 등록해주세요.',
      });
      result = false;
    }
    if (!result) break;
  }
  return result;
};
