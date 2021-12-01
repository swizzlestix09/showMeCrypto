import MenuItem from '@mui/material/MenuItem';
export interface Props {
  tokenId: string,
  tokenName: string,
  tokenSym: string,
  clickCurrency?: any
};

const CryptoItem = (props: Props) => {
  return (
    <>
      <MenuItem>
        <li className="eachCryptoc" value={props.tokenId} onClick={(e) => props.clickCurrency(e.target)}>
          {`${props.tokenId} `}
          {`${props.tokenName} `}
          {props.tokenSym === null ? '' : props.tokenSym}
        </li>
      </MenuItem>
    </>
  );
};

export default CryptoItem;