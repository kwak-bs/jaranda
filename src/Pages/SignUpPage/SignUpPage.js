import React, { useState, useEffect, useRef } from 'react';
import { style } from './SignUpPageStyle';
import { FiCheck } from 'react-icons/fi';
import get_address from './get_address';
import userDataForm from 'utils/storage/userDataForm';
import setUserData from 'utils/setUserInfo';
import { Validation } from 'utils/checkValid';
import { LOCAL_STORAGE, ROUTES } from 'utils/constants';
import Modal from 'Modal';
import CreditCardForm from 'Compnents/CreditCardForm';
import ToastForm from 'Compnents/ToastForm/ToastForm';
import { useHistory } from 'react-router-dom';

export default function SignUpPage() {
  const history = useHistory();
  const idInput = useRef();
  const pwInput = useRef();
  const pwConfirmInput = useRef();
  const nameInput = useRef();
  const ageInput = useRef();
  const [userPwconfirm, setUserPwConfirm] = useState('');
  const [isNumber, setIsNumber] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isLength, setIsLength] = useState(false);

  const { checkIdSignUp, checkPasswordSignUp } = Validation;
  const [inputChk, setInputChk] = useState({
    userId: false,
    password: false,
    password_confirm: false,
    name: false,
    age: false,
    creditCard: {
      cardNumber: false,
      holderName: false,
      expired: false,
      CVC: false,
    },
    role: false,
    zcode: false,
    roadAddr: false,
    jibunAddr: false,
  });

  const [userInfo, setUserInfo] = useState({
    userId: '',
    password: '',
    name: '',
    age: '',
    creditCard: {
      cardNumber: '',
      holderName: '',
      expired: '',
      CVC: '',
    },
    role: '',
    zcode: '',
    roadAddr: '',
    jibunAddr: '',
    detailAddr: '',
    menubar: '',
  });

  const [toast, setToast] = useState({
    status: false,
    msg: '',
  });

  useEffect(() => {
    if (toast.status) {
      const timeInterver = setTimeout(() => {
        setToast({ ...toast, status: false });
      }, 2000);
      return () => clearTimeout(timeInterver);
    }
  }, [toast]);

  const inputCheck = (limit) => {
    const { userId, password, password_confirm, name, age, zcode, creditCard } =
      inputChk;
    const { cardNumber } = creditCard;
    for (let i = 0; i < limit; i++) {
      if (i === 0 && !userId) {
        setToast({
          ...toast,
          status: true,
          msg: '중복 확인 버튼을 눌러주세요.',
        });
        return false;
      } else if (i === 1 && !password) {
        setToast({
          ...toast,
          status: true,
          msg: '비밀번호를 다시 입력해주세요.',
        });
        return false;
      } else if (i === 2 && !password_confirm) {
        setToast({
          ...toast,
          status: true,
          msg: '비밀번호 확인을 해주세요.',
        });
        return false;
      } else if (i === 3 && !name) {
        setToast({
          ...toast,
          status: true,
          msg: '이름을 입력해주세요.',
        });
        return false;
      } else if (i === 4 && !age) {
        setToast({
          ...toast,
          status: true,
          msg: '나이를 입력해주세요.',
        });
        return false;
      } else if (i === 5 && !zcode) {
        setToast({
          ...toast,
          status: true,
          msg: '주소를 입력해주세요',
        });
        return false;
      } else if (i === 6 && !cardNumber) {
        setToast({
          ...toast,
          status: true,
          msg: '카드를 등록해주세요.',
        });
        return false;
      } else if (i === 7 && !password_confirm) {
        setToast({
          ...toast,
          status: true,
          msg: '비밀번호 확인을 해주세요.',
        });
        return false;
      }
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleId = (e) => {
    setUserInfo({
      ...userInfo,
      userId: e.target.value,
    });
  };

  const handleIdValidate = async () => {
    const checkValidId = checkIdSignUp(userInfo.userId);
    let userData = LOCAL_STORAGE.get('userData');

    const reduplication = userData.find(
      (data) => data.userId === userInfo.userId,
    );
    if (checkValidId && reduplication === undefined) {
      console.log('사용가능한 아이디입니다.');
      setToast({ ...toast, status: true, msg: '사용가능한 아이디입니다.' });

      setInputChk({
        ...inputChk,
        userId: true,
      });
      return;
    } else if (!checkValidId) {
      console.log('사용 가능하지 않은 아이디입니다.');
      setToast({
        ...toast,
        status: true,
        msg: '5자리 이상, 숫자 혹은 영문자만 사용해주시기 바랍니다.',
      });
      setInputChk({
        ...inputChk,
        userId: false,
      });
      return;
    } else {
      console.log('중복된 아이디입니다.');
      setToast({ ...toast, status: true, msg: '중복된 아이디입니다.' });
      setInputChk({
        ...inputChk,
        userId: false,
      });
    }
  };

  // const regex1 = (pw) => {

  // }
  const onChangePW = (e) => {
    inputCheck(1);

    const pw = e.target.value;
    const regex1 = /[A-Za-z]+/;
    const regex2 = /[0-9]+/;
    const regex3 = /[!@#$%^*+=-]+/;

    if(regex1.test(pw)){
      setIsEnglish(true);
    }else {
      setIsEnglish(false);
    }
    if(regex2.test(pw)){
      setIsNumber(true);
    }else {
      setIsNumber(false);
    }
    if(regex3.test(pw)){
      setIsSpecial(true);
    }else {
      setIsSpecial(false);
    }
    if(pw.length >= 8) {
      setIsLength(true);
    }
    else {
      setIsLength(false);
    }



    setUserInfo({
      ...userInfo,
      password: e.target.value,
    });

    HandleValidatePW(e.target.value);
  };

  const HandleValidatePW = (value) => {
    const checkValidPw = checkPasswordSignUp(value);

    if (checkValidPw) {
      setToast({
        ...toast,
        status: true,
        msg: '사용가능한 비밀번호입니다.',
      });
      setInputChk({
        ...inputChk,
        password: true,
      });
    } else if (!checkValidPw) {
      setToast({
        ...toast,
        status: true,
        msg: '사용할 수 없는 비밀번호입니다.',
      });
      setInputChk({
        ...inputChk,
        password: false,
      });
    }
  };

  const onChangePwconfirm = (e) => {
    inputCheck(2);
    setUserPwConfirm(e.target.value);
    MatchPW(e.target.value);
  };

  const MatchPW = (value) => {
    if (value !== userInfo.password) {
      setToast({
        ...toast,
        status: true,
        msg: '비밀번호가 일치하지 않습니다.',
      });

      setInputChk({
        ...inputChk,
        password_confirm: false,
      });
    } else if (value === userInfo.password) {
      setToast({
        ...toast,
        status: true,
        msg: '비밀번호가 일치합니다.',
      });

      setInputChk({
        ...inputChk,
        password_confirm: true,
      });
    }
  };

  const onChangeName = (e) => {
    inputCheck(3);
    setUserInfo({
      ...userInfo,
      name: e.target.value,
    });
    if (e.target.value === '' || !userInfo.name) {
      setInputChk({
        ...inputChk,
        name: false,
      });
    } else {
      setInputChk({
        ...inputChk,
        name: true,
      });
    }
  };

  const onChangeAge = (e) => {
    inputCheck(4);
    setUserInfo({
      ...userInfo,
      age: e.target.value,
    });

    if (e.target.value === '' || !userInfo.age) {
      setInputChk({
        ...inputChk,
        age: false,
      });
    } else {
      setInputChk({
        ...inputChk,
        age: true,
      });
    }
  };

  const addrBtnEvent = () => {
    get_address(userInfo, setUserInfo);
  };

  useEffect(() => {
    if (userInfo.zcode) {
      setInputChk({
        ...inputChk,
        zcode: true,
      });
      setToast({
        ...toast,
        status: true,
        msg: '주소가 등록되었습니다.',
      });
    }
  }, [userInfo.zcode]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, detailAddr: e.target.value });
    inputCheck(5);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCardInput = (cardInput) => {
    setUserInfo({
      ...userInfo,
      creditCard: {
        ...userInfo.creditCard,
        cardNumber: cardInput.cardNumber,
        holderName: cardInput.holderName,
        expired: cardInput.expired,
        CVC: cardInput.CVC,
      },
    });
  };

  useEffect(() => {
    if (userInfo.creditCard.cardNumber) {
      setInputChk({
        ...inputChk,
        creditCard: {
          cardNumber: true,
        },
      });
      setToast({
        ...toast,
        status: true,
        msg: '카드가 등록되었습니다.',
      });
    }
  }, [userInfo.creditCard.cardNumber]);

  const signupBtnEvnt = () => {
    const { userId, password, name, age, role, menubar } = userInfo;
    const { cardNumber, holderName, expired, CVC } = userInfo.creditCard;
    const userAddr =
      userInfo.zcode + ' ' + userInfo.roadAddr + ' ' + userInfo.detailAddr;

    const check = inputCheck(7);

    if (check) {
      setToast({ ...toast, status: true, msg: '회원 가입이 완료되었습니다!' });
      inputData(
        userId,
        password,
        name,
        age,
        cardNumber,
        holderName,
        expired,
        CVC,
        role,
        userAddr,
        menubar,
      );
      setTimeout(() => {
        history.push(ROUTES.SIGN_IN);
      }, 1500);
    } else {
      const { userId, password, password_confirm, name, age } = inputChk;

      if (!userId) {
        idInput.current.focus();
      } else if (!password) {
        pwInput.current.focus();
      } else if (!password_confirm) {
        pwConfirmInput.current.focus();
      } else if (!name) {
        nameInput.current.focus();
      } else if (!age) {
        ageInput.current.focus();
      }
    }
  };

  // id,pwd, name, age, cardNumber, c_name, expired, cvc, role,
  const inputData = (
    userId,
    pw,
    name,
    age,
    cardNumber,
    holderName,
    expired,
    cvc,
    role,
    addr,
    menubar,
  ) => {
    const data = userDataForm(
      userId,
      pw,
      name,
      age,
      cardNumber,
      holderName,
      expired,
      cvc,
      role,
      addr,
      menubar,
    );
    return setUserData(data);
  };

  return (
    <>
      <Container>
        <Wrap>
          <Title>
            10초 만에
            <br />
            원하는 역할로 가입해보세요 <br />
            <br />
            예리님.
          </Title>

          <Wrapper_ID>
            <Input_ID
              placeholder="ID"
              maxLength="30"
              onChange={handleId}
              ref={idInput}
            />
            <Submit_ID_btn onClick={handleIdValidate}>
              {' '}
              아이디 중복 확인{' '}
            </Submit_ID_btn>
          </Wrapper_ID>
          <Input_PW
            onChange={onChangePW}
            value={userInfo.password}
            ref={pwInput}
          />

          <PW_policy_container>
            <PW_poclicy_item>
              <span>
                <FiCheck
                  size="1rem"
                  color={isNumber ? 'blue' : 'red'}
                />{' '}
                숫자
              </span>
            </PW_poclicy_item>
            <PW_poclicy_item>
              <span>
                <FiCheck
                  size="1rem"
                  color={isSpecial ? 'blue' : 'red'}
                />{' '}
                특수문자
              </span>
            </PW_poclicy_item>
            <PW_poclicy_item>
              <span>
                <FiCheck
                  size="1rem"
                  color={isEnglish ? 'blue' : 'red'}
                />{' '}
                영문
              </span>
            </PW_poclicy_item>
            <PW_poclicy_item>
              <span>
                <FiCheck
                  size="1rem"
                  color={isLength ? 'blue' : 'red'}
                />{' '}
                8자리 이상
              </span>
            </PW_poclicy_item>
          </PW_policy_container>

          <Input_PW_confirm
            onChange={onChangePwconfirm}
            value={userPwconfirm}
            ref={pwConfirmInput}
          />
          <Input_name
            onChange={onChangeName}
            value={userInfo.name}
            ref={nameInput}
          />
          <Input_age
            onChange={onChangeAge}
            value={userInfo.age}
            ref={ageInput}
          />

          <Address_container>
            <Address_title>주소</Address_title>
            <Wrapper_ZipCode>
              <ZipCode value={userInfo.zcode} readOnly />
              <Button_ZipCode_find onClick={addrBtnEvent}>
                우편번호 찾기{' '}
              </Button_ZipCode_find>
            </Wrapper_ZipCode>

            <Wrapper_addr>
              <Street_addr value={userInfo.roadAddr} readOnly />
              <Lot_addr value={userInfo.jibunAddr} readOnly />
            </Wrapper_addr>

            <Wrapper_addr>
              <Detailed_addr
                value={userInfo.detailAddr}
                onChange={handleChange}
              />
              {/* <Note_addr /> */}
            </Wrapper_addr>
          </Address_container>
          <Button_credit onClick={openModal}>신용카드 등록</Button_credit>
          <Submit_SignUp_btn onClick={signupBtnEvnt}>
            가입하기
          </Submit_SignUp_btn>
        </Wrap>
      </Container>
      <Modal show={showModal} onClose={closeModal}>
        <CreditCardForm
          closeModal={closeModal}
          creditCard={userInfo.creditCard}
          handleCardInput={handleCardInput}
        />
      </Modal>

      <ToastForm show={toast.status} contents={toast.msg} />
    </>
  );
}

const {
  Container,
  Wrap,
  Title,
  // Wrapper_Radio,
  Wrapper_ID,
  Input_ID,
  Submit_ID_btn,
  Input_PW,
  PW_policy_container,
  PW_poclicy_item,
  Input_PW_confirm,
  Submit_SignUp_btn,
  Input_name,
  Input_age,
  Button_credit,
  Address_container,
  Wrapper_ZipCode,
  ZipCode,
  Address_title,
  Button_ZipCode_find,
  Wrapper_addr,
  Street_addr,
  Lot_addr,
  Detailed_addr,
  // Input_Radio,
  // Note_addr,
} = style;
