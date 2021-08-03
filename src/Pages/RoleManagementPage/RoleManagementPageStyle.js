import styled from 'styled-components';

export const TableContainer = styled.div`
  max-width: 960px;
  margin: 3rem auto;

  & > table {
    width: 100%;
    vertical-align: middle;
  }

  & > table > thead > tr > th {
    font-weight: 500;
  }
`;

export const TableHeader = styled.div`
  padding-left: 16px;
  padding-right: 8px;
  min-height: 64px;
  display: flex;
  justify-content: space-between;
`;

export const TableTitle = styled.h4`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.6rem;
  letter-spacing: 0.0075em;
  padding-top: 0.5rem;
`;

export const Cell = styled.th`
  display: table-cell;
  padding: 16px;
  font-size: 0.875rem;
  text-align: left;
  font-weight: 400;
  line-height: 1.5rem;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  letter-spacing: 0.01071em;
  vertical-align: inherit;

  & > div {
    display: flex;
  }
`;

export const RoleButton = styled.button`
  display: flex;
  -webkit-box-align: center;
  padding-top: 10px;
  align-items: center;
  margin-right: 10px;
  padding: 10px 20px;
  background-color: gray;
  color: white;
  border-radius: 50px;
  border: 1px solid rgb(233, 235, 237);
  color: white;
`;

export const SelectBox = styled.select`
  border: none;
  font-size: 19px;
  font-weight: 500;
  padding: 10px;
  color: rgb(70, 70, 77);
  margin-right: 1rem;
`;

export const TableFooter = styled.div`
  min-height: 52px;
  padding-right: 2px;
  text-align: right;

  & > div {
    padding-top: 20px;
    font-size: 20px;
    margin-right: 1rem;
    float: right;
  }

  & > div > button {
    cursor: pointer;
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 200px;
  height: 50px;
  border-radius: 5px;
  background-color: #52c41a;
  color: white;
  font-size: 18px;
  font-weight: 500;
`;

export const GoAdminPageButton = styled.button`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 17px;
  font-weight: 600;
  color: rgb(44, 44, 49);

  &:hover {
    background-color: #f6ffed;
    cursor: pointer;
  }

  & > svg {
    margin-right: 0.7rem;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
`;

export const style = {
  TableHeader,
  RoleButton,
  SelectBox,
  TableFooter,
  Cell,
  SelectContainer,
  TableContainer,
  TableTitle,
  SubmitButton,
  GoAdminPageButton,
};
