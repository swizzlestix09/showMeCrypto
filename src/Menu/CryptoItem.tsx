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
      <MenuItem className="cryptoparam" value={props.tokenId} onClick={(e) => props.clickCurrency(e.target)}>
          {`${props.tokenId} `}
      </MenuItem>
    </>
  );
};

export default CryptoItem;